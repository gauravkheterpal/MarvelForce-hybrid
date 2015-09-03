Ext.define('salesforcemarvel.controller.MarvelController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
             navigationView : 'navigationview[itemId="characterNavigationView"]',
             listView : 'listview[itemId="characterList"]',
             characterdetails : 'characterdetails'
        },
        control: {
            listView : {
                listTap : 'onTap'
            },
            characterdetails : {
                tabChanges : 'onTabChanges'
            }
        },
        characters : [],
        record : null
    },


    /**
     * @method getMarvelCharacters [description]  
     * @return {void}
     */
    getMarvelCharacters: function(callback) {
        var me =this, comicCallback = null ; //get marvel comic characters, 
        salesforcemarvel.config.Util.showMask('loading ...'); 
        
        if(callback){
            comicCallback = callback; 
        }else 
        {
            comicCallback = function(response) {
                salesforcemarvel.config.Util.hideMask();
                if(response.statusCode) return ; 

                var view = me.getListView();
                if(view){
                    var list = view.down('#list'); 
                    if(list){
                        list.setMasked(false);

                        list.setData(me.processCharacters(response.data.results));
                    }
                }
            }; 
        }
        
        var url = salesforcemarvel.config.AppConfig.getMarvelGateway(salesforcemarvel.config.AppConfig.MarvelEndPoints.Characters.characters); 
        var req= salesforcemarvel.config.Util.ajax(url, comicCallback, null, 'GET', null, null);
    },

    /**
     * @method processCharacters [description]
     * @param {[type]} response        [Description of response]
     
     * @return {void}
     */
    processCharacters: function(response) {
        var characters = []; 
        for (var i = 0; i < response.length; i++) {
            response[i]["small"] =  (response[i].thumbnail && response[i].thumbnail.path) ? response[i].thumbnail.path + '/portrait_small.'+ response[i].thumbnail.extension  : null;
            response[i]["medium"] = (response[i].thumbnail && response[i].thumbnail.path) ? response[i].thumbnail.path + '/portrait_medium.'+ response[i].thumbnail.extension : null;
            response[i]["xlarge"] = (response[i].thumbnail && response[i].thumbnail.path) ? response[i].thumbnail.path + '/portrait_xlarge.'+ response[i].thumbnail.extension : null;
        };
        return this.clean(response); 
    },

    /**
     * @method clean [description]
     * @param {[type]} characters        [Description of characters]
     
     * @return {void}
     */
    clean: function(characters) {
        var items = []; 
        for (var i = characters.length - 1; i >= 0; i--) {
            if(characters[i].thumbnail && characters[i].thumbnail.path && characters[i].thumbnail.path.indexOf('image_not_available') ===-1)
               items.push(characters[i]); 
        };
        return items; 
    },

    /**
     * @method onShowMarvelCharacters [description]
     * @param {[type]} field        [Description of field]
     * @param {[type]} event        [Description of event]
     
     * @return {void}
     */
    showMarvelCharacters: function() {
        var view = this.getNavigationView();
        
        if(!view.getActiveItem()){
            view.push(marvelController.getCharacterView()); 
             this.getMarvelCharacters();
            return; 
        }
        if(!view.getItems().getByKey('characterList')){
            view.push(marvelController.getCharacterView());
            this.getMarvelCharacters();
        }
        else {
            view.setActiveItem(view.getItems().getByKey('characterList'));
             this.getMarvelCharacters();
        }
    },

    /**
     * @method generateRandomCharacter [description]
     * @param {[type]} excludes        [Description of excludes]
     
     * @return {void}
     */
    generateRandomCharacter: function(excludes) {
        var characters = this.getCharacters(); 
        var random = this.randomCharacter(); 
        if(excludes){
            random = excludes.indexOf(random.id)== -1 ? random :  this.generateRandomCharacter(excludes);
        }
        return random; 
    },

    onTap : function(list, index, item, record, e, eopts) {
        this.showDetails(this.getDetailView(), record);
    },

    /**
     * @method getDetailView [description]
     
     * @return {void}
     */
    getDetailView: function() {
         var view = this.getNavigationView(), newView = null; 
         var newView = view.getItems().getByKey('characterDetailView');
         if(!newView){
            newView = Ext.create('salesforcemarvel.view.CharacterDetails', {
                itemId : 'characterDetailView',
                title : 'Details'
            });
        }
        return newView; 
    },

    /**
     * @method showDetails [description]
     * @param {[type]} view        [Description of view]
     * @param {[type]} record        [Description of record]
     
     * @return {void}
     */
   showDetails : function(detailView,record) {
        detailView.setRecord(record);
        this.getNavigationView().push(detailView);
        
        this.setRecord(record);
        //update profile image. 
        var profileImage = detailView.down('#profileImage');
        if (profileImage) {
            profileImage.setSrc(record.get('xlarge'));
                    
        }
        var emailLabel = detailView.down('#descriptionLabel');
        if (emailLabel) {
            emailLabel.setHtml(record.get('description'));
                    
        }
        //load stories list 
        //set store 
        this.loadCharacterListsTab('stories');
        
    },

    /**
     * @method loadCharacterListsTab [description]
     
     * @return {void}
     */
    loadCharacterListsTab: function(listType) {
        var detailView = this.getDetailView(); 
        if(!detailView.down('#characterLists').getStore())
            detailView.down('#characterLists').setStore({
                       xtype : 'characters'
            });
        else 
            detailView.down('#characterLists').getStore().removeAll();
        
        var record = this.getRecord();
        if(!detailView) return ; 
        switch(listType.toLowerCase()){
            case 'stories':
                 detailView.down('#characterLists').getStore().setData(record.data.stories.items);
            break; 
            case 'series':
                detailView.down('#characterLists').getStore().setData(record.data.series.items);
            break; 
            case 'comics':
                detailView.down('#characterLists').getStore().setData(record.data.comics.items);
            break; 
            case 'events':
                detailView.down('#characterLists').getStore().setData(record.data.events.items);
            break; 
        }
    },

    randomCharacter : function() {
        var characters = marvelController.getCharacters(); 
        var r = Math.round(Math.random() * (characters.length -1));
        return characters[r]; 
    },

    getCharacterView : function() {
        return {   
               layout : 'fit',
               title  : 'Characters',
               enableSearch : false,
               itemId : 'characterList',
               //loadMask : true,  
               xtype: 'listview',
               itemTpl : salesforcemarvel.config.AppConfig.MarvelCharcters.itemTpl,
               store : {
                   xtype : 'characters'
               }
            };
    }, /**
     * @method onTabChanges [description]
     * @param {[type]} tabPanel        [Description of tabPanel]
     * @param {[type]} value        [Description of value]
     * @param {[type]} oldValue        [Description of oldValue]
     * @param {[type]} eOpts        [Description of eOpts]
     
     * @return {void}
     */
    onTabChanges: function(tabPanel, value, oldValue, eOpts) {
        var listType = value.getHtml().toLocaleLowerCase(); 

        this.loadCharacterListsTab(listType);
        
    }
});