Ext.define('salesforcemarvel.controller.TaskController', {
    extend: 'Ext.app.Controller',
    requires: [
        'salesforcemarvel.view.ListView', 'Ext.Toast'
    ],
    config: {
        refs: {
            navigationView : 'navigationview[itemId="taskNavigationView"]',
            statusButton : 'button[itemId="changeStatusButton"]',
            listView : 'listview[itemId="taskListView"]',
            detailView : 'taskdetails[itemId="taskDetailView"]'
        },
        control: {
            listView : {
                listTap : 'onlistTap'
            },
            statusButton : {
                tap : 'onChangeStatus'
            },

            navigationView : {
                back : 'onBack'
            }
        }
    },

    /**
     * @method crateTaskList [description]
     
     * @return {void}
     */
    crateTaskList: function() {
        var view = this.getNavigationView().getItems().getByKey('taskListView');
        if(view){
            this.getNavigationView().setActiveItem(view);
        }else {
            view = this.getTaskListView();
            this.getNavigationView().push(view);  
        }
        this.loadTaskList()
    },

     loadTaskList : function() {

        var  query = salesforcemarvel.config.SOQLManager.Task.Select, me = this; 
       
        var  ajaxCaller = Ext.create('salesforcemarvel.connection.AjaxCall');
        
        //success callback 
         var callback= function(records){
             var list = me.getListView().down('#list'), store = list ? list.getStore() : null; 
             if(store && list){
                store.setData(records);
                salesforcemarvel.config.Util.hideMask();
            }
        }; 
        salesforcemarvel.config.Util.showMask('Loading ...');

		//make ajax call and process request. 
        ajaxCaller.call(query, function(response) {
            if(!response.statusCode){
                me.processTaskRecord(response, callback);
            }
            
        })
        
    },

    /**
     * @method processTaskRecord [Process task response]
     * @param {object} jsonTaskResponse        [JSON string for Tasks]
     * @param {object} callback        [Additional callback]
     * @return {void}
     */
    processTaskRecord: function(jsonTaskResponse, callback) {
        
        //process json
        if(jsonTaskResponse.records){
           //currently no extra processing so return same list. 
           if(callback) callback(jsonTaskResponse.records); 
        }
    },

    /**
     * @method onBack [description]
     * @param {[type]} navigationView        [Description of navigationView]
     * @param {[type]} event        [Description of event]
     * @param {[type]} el        [Description of el]
     
     * @return {void}
     */
    onBack: function(navigationView, event, el) {
        var itemId  = navigationView.getActiveItem().getItemId(); 
        switch(itemId){
            case 'taskListView':
                this.showButton('Profile');
            break;
        }
        
    },

    /**
     * @method showButton [description]
     * @param {[type]} buttonType        [Description of buttonType]
     
     * @return {void}
     */
    showButton: function(buttonType) {
        this.getStatusButton().hide(); 
        //this.getProfileButton().hide(); 

        switch(buttonType){
            case 'Status':
                this.getStatusButton().show(); 
            break;
        }
    },

    /**
     * [onChangeStatus Will update current task status to completed]
     * @param  {Object} field [description]
     * @param  {Event} e     [description]
     * @return {[type]}       [description]
     */
    onChangeStatus : function(field,e) {
        var detailView = this.getDetailView(), me = this; 
        if(detailView){
            var record = detailView.getRecord(); 

            if(record){
                //update record. 
                var  ajaxCaller = Ext.create('salesforcemarvel.connection.AjaxCall');

                var data= {
                    Status : 'Completed'
                }, success = function(response) {
                    salesforcemarvel.config.Util.hideMask();
                    
                        //success
                        Ext.toast({message: 'Status changed!', timeout: 2000});
                        
                        var insertBadgecallback = function(character) {
                            var ajaxCaller1 = Ext.create('salesforcemarvel.connection.AjaxCall');
                            var badge={"Name":character.name,"Badge_Image_URL__c":character.thumbnail.path+"/imagetypeplaceholder."+character.thumbnail.extension,"Marvel_Char_ID__c":character.id,"user_ID__c":forcetkClient.userId},
                            success = function(response) {
                                salesforcemarvel.config.Util.hideMask();

                                //Show badge screen 
                                badgeController.showBadgeScreen(character);
                                me.updateTaskList();
                            };
                            salesforcemarvel.config.Util.showMask('creating badge'); 
                            forcetkClient.create('Badge__c', badge, success, null);
                        };   

                        //get characters and assigned task  
                        var profile = salesforcemarvel.config.Util.getFromLocalStorage('user_' + forcetkClient.userId);
                        var profileCallback = function(response) {

                            var badges = [], lastBadge = null, number = 10; 
                                for (var i = 1; i <= number;  i++) {
                                    var name = "Badge" + i + "__c"; 
                                    var badge = response[name];
                                    
                                    if(!badge){
                                        lastBadge = i;
                                        break;
                                    }
                                    badges.push(badge);
                                };
                                if(badges.length == 10) //do nothing
                                { 
                                    return ; 
                                }
                                //get random character except badges
                                var character=marvelController.generateRandomCharacter(badges);
                                response["Badge" + lastBadge + "__c"] = character.id;
                                
                                //update profile locally
                                salesforcemarvel.config.Util.saveToLocalStorage('user_' + forcetkClient.userId, {});
                                salesforcemarvel.config.Util.saveToLocalStorage('user_' + forcetkClient.userId, response);
                                if(insertBadgecallback)insertBadgecallback(character);
                        };
                        if(!profile){
                            userController.loadUserDetails(function(response) {
                                salesforcemarvel.config.Util.saveToLocalStorage('user_' + forcetkClient.userId, response);
                                profileCallback(response);
                            }); 
                        }else {
                            profileCallback(profile);
                        }
                    
                }, failure = function(response, callback) {
                   salesforcemarvel.config.Util.hideMask();
                   Ext.toast({message: 'Update Failed!' + response.statusText, timeout: 2000});
                }; 
                salesforcemarvel.config.Util.showMask('saving ...'); 
                //upsert record 
                ajaxCaller.upsert('Task', 'Id', record.data.Id, data, success, failure);
            }
        }
        
    },

    /**
     * @method updateTaskList [description]
     
     * @return {void}
     */
    updateTaskList: function() {
         var detailView = this.getDetailView(), record = null;
        record = detailView.getRecord();
        record.set('IsClosed', true);
        record.commit();
        var me = this; 
        // setTimeout(function() { 
        //         me.getNavigationView().getNavigationBar().fireEvent('back', me.getNavigationView().getNavigationBar());
        //  }, 10);
        
    },

    /**
     * @method onlistTap [description]
     * @param {[type]} list        [Description of list]
     * @param {[type]} index        [Description of index]
     * @param {[type]} item        [Description of item]
     * @param {[type]} record        [Description of record]
     
     * @return {void}
     */
    onlistTap: function(list, index, item, record, e, eOpts) {
        var view = this.getNavigationView(), create = false;
        if(view.getActiveItem().getItemId() === "taskListView"){
            //check for detail view. 
            if(view.getNavigationBar().backButtonStack.indexOf('Task Details')=== -1){
                create = true; 
            }else {
                create = false;
            }
        }
        if(create){
            newView = this.createDetailsView();
            this.getNavigationView().push(newView);
            this.showDetails(record);
        }else {
            view.setActiveItem(view.getItems().getByKey('taskDetailView'));
            this.showDetails(record);
        }

    },

    /**
     * @method getDetails [description]
     
     * @return {void}
     */
    createDetailsView: function() {
        return  Ext.create('salesforcemarvel.view.TaskDetails', {
            itemId : 'taskDetailView',
            title : 'Task Details'
        }); 
    },

    showDetails : function(record) {
        if(this.getDetailView()){
            this.getDetailView().setRecord(record);
            this.showButton('Status');
        }
    },

    getTaskListView : function() {
        var view = this.getNavigationView(), newView = null, createView = false;
        if(view.getActiveItem()){
            if(view.getActiveItem().getItemId() === "taskListView"){
                //check for detail view. 
                if(view.getNavigationBar().backButtonStack.indexOf('Tasks')=== -1){
                   createView = true
                }
            }
        }else {
            createView = true; 
        }

        if(!createView){
            newView = view.getItems().getByKey('taskListView');
        }
        else {
            newView = Ext.create('salesforcemarvel.view.ListView', {
                layout : 'fit',
                itemId : 'taskListView',
                title : 'Tasks',
                store : {
                    xtype : 'tasks'
                },
                itemTpl : salesforcemarvel.config.AppConfig.TaskList.itemTpl
            });
        }

        return newView; 
        
    }
});