Ext.define('salesforcemarvel.controller.ContactController', {
    extend: 'Ext.app.Controller',
    /**
     * @requires ListView
     */
    requires: [
        'salesforcemarvel.view.ListView'
    ],
    config: {
        refs: {
            contactlist : 'list[itemId="list"]',
            navigationView : 'navigationview[itemId="contactNavigationView"]',
            contactlistView : 'listview[itemId="contactList"]'
        },
        control: {
            contactlistView : {
                listTap : 'onListTap'
            }
        },
        timeout : null, 
        contacts : []
    },  

    loadContactList : function() {
        var  query = salesforcemarvel.config.SOQLManager.Contact.Select, me = this; 
        
        var comicCallback = function(response) {
             marvelController.setCharacters(marvelController.clean(response.data.results));
        
            
        }; 
        //get characters 
        marvelController.getMarvelCharacters(comicCallback); 
       
        var  ajaxCaller = Ext.create('salesforcemarvel.connection.AjaxCall');
        
        //success callback 
         var callback= function(records){
            salesforcemarvel.config.Util.hideMask(); 
             var list = me.getContactlist(), store = list ? list.getStore() : null; 
             if(store && list){
                store.setData(records);
                list.setMasked(false);
            }
        }; 

        //make ajax call and process request. 
        salesforcemarvel.config.Util.showMask('loading ...'); 
        ajaxCaller.call(query, function(response) {
            
            if(!response.statusCode){
                me.setContacts(response.records);
                me.createList(callback); 
            }
            
        });
        
    },

    /**
     * @method createList [description]
     
     * @return {void}
     */
    createList: function(callback) {
        var me= this; 
        me.config.timeout = setInterval(function() {
            if(me.getContacts().length > 0 && marvelController.getCharacters().length > 0){
                clearInterval(me.config.timeout); 
                var contacts = []; 
                for (var i = me.getContacts().length - 1; i >= 0; i--) {
                    var hasThumbnail = marvelController.getCharacters().length > i && marvelController.getCharacters()[i].thumbnail && marvelController.getCharacters()[i].thumbnail.path; 
                    var contact = {
                        Name : me.getContacts()[i].Name,
                        FirstName :  me.getContacts()[i].FirstName,
                        LastName :  me.getContacts()[i].LastName,
                        Id : me.getContacts()[i].Id,
                        Email :  me.getContacts()[i].Email? me.getContacts()[i].Email : null,
                        Thumbnail : hasThumbnail ?  marvelController.getCharacters()[i].thumbnail.path+'/'+salesforcemarvel.config.AppConfig.Images.PORTRAIT_SMALL + '.' + marvelController.getCharacters()[i].thumbnail.extension : null,
                        Profile : hasThumbnail ?  marvelController.getCharacters()[i].thumbnail.path+'/'+salesforcemarvel.config.AppConfig.Images.PORTRAIT_MEDIUM + '.' + marvelController.getCharacters()[i].thumbnail.extension : null,
                        character : marvelController.getCharacters()[i]
                    }
                    contacts.push(contact);
                };

                if(callback){
                    callback(contacts); 
                }
            }
            
        },1500); 
        
    },
    showDetails : function(detailView,record) {
        detailView.setRecord(record);
        this.getNavigationView().push(detailView);

        //update profile image. 
        var profileImage = detailView.down('#profileImage');
        if (profileImage) {
            profileImage.setSrc(record.get('Profile'));
                    
        }
        var emailLabel = detailView.down('#emailLabel');
        if (emailLabel) {
            emailLabel.setHtml(record.get('Email'));
                    
        }
        
    },

    /**
     * @method getContactListView [description]
     
     * @return {void}
     */
    getContactListView: function() {
         var view = this.getNavigationView(), newView = null, createView = false;
        if(view.getActiveItem() && view.getActiveItem().getItemId() === "contactList"){
            //check for detail view. 
            if(view.getNavigationBar().backButtonStack.indexOf('Contacts')=== -1){
               createView = true
            }
        }
        else if(!view.getActiveItem()){
            createView = true; 
        }

        if(!createView){
            newView = view.getItems().getByKey('contactList');
        }
        else {
            newView = Ext.create('salesforcemarvel.view.ListView', {
                layout : 'fit',
                itemId : 'contactList',
                title : 'Contacts',
                store : {
                    xtype : 'contacts'
                },
                itemTpl : salesforcemarvel.config.AppConfig.ContactList.itemTpl
            });
        }   
        return newView; 
    },

    /**
     * @method onListTap [description]
     
     * @return {void}
     */
    onListTap: function(list, index, item, record, e, eOpts) {
        var view = contactController.getNavigationView(), newView = null, isCreate = false; 
        if(!view.getActiveItem())
        {  
            isCreate = true; 
        }
        else if(view.getActiveItem().getItemId() === "contactList")
        {
            //check for detail view. 
            if(view.getNavigationBar().backButtonStack.indexOf('Details')=== -1){
                isCreate = true; 
            }else {
                isCreate = false; 
                newView = view.getItems().getByKey('detailView');
            }
        }
        if(isCreate){
            newView = Ext.create('salesforcemarvel.view.Details', {
                itemId : 'detailView',
                title : 'Details'
            }); 
        }else {
            newView = view.getItems().getByKey('detailView');
        }
        this.showDetails(newView, record);
    },

    /**
     * @method loadHomeView [description]
     
     * @return {void}
     */
    loadHomeView: function() {
        var view = this.getNavigationView().getItems().getByKey('contactList');
        if(view){
            this.getNavigationView().setActiveItem(view);
        }else {
            view = this.getContactListView();
            this.getNavigationView().push(view);  
        }
        this.loadContactList();
    }
});
