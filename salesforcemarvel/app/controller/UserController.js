/**
 * @class salesforcemarvel.controller.UserController
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('salesforcemarvel.controller.UserController', {
    extend : 'Ext.app.Controller',
    config : {
        requires : ['salesforcemarvel.view.ListView'],
        refs : {
            profile : '#prfileView',
            navigationView : 'navigationview[itemId="profileNavigationView"]',
            badgeList : 'dataview["itemId="badgeList"]'
            
        },
        control : {
            profile : {

            }
        }
    },

    /**
     * @method getUserProfileView [description]

     * @return {void}
     */
    getUserProfileView : function() {
        var newView = null, navigationView = this.getNavigationView(); 
        if(!navigationView.getActiveItem()){
            return this.createProfileView();
        }
        if(navigationView.getActiveItem().getItemId() !== "prfileView"){
            
            if(navigationView.getNavigationBar().backButtonStack.indexOf('User Details')=== -1){
                newView = this.createProfileView();
            }
            else {
                newView = view.getItems().getByKey('prfileView');
            }
        }
        return newView;
    },

    /**
     * @method loadProfileView [description]
     
     * @return {void}
     */
    loadProfileView: function() {
        var view = this.getNavigationView().getItems().getByKey('prfileView');
        if(view) {
            this.getNavigationView().setActiveItem(view);
        }else {
            this.getNavigationView().push(this.createProfileView());
        }   
    },

    /**
     * @method createProfileView [description]
     
     * @return {void}
     */
    createProfileView: function() {
        return Ext.create('salesforcemarvel.view.UserProfile', {
                    itemId : 'prfileView',
                    title : 'User',
                    title : 'User Details'
                });
    
        
    },

    /**
     * @method loadUserDetails  [description]
     * @param {[type]} callback        [Description of callback]

     * @return {void}
     */
    loadUserDetails : function(callback) {
        var ajaxCaller = Ext.create('salesforcemarvel.connection.AjaxCall');
        ajaxCaller.retrieve('User', forcetkClient.userId, null, callback, null);

    },

    /**
     * @method onShowProfile [description]
     * @param {[type]} field        [Description of field]
     * @param {[type]} e        [Description of e]

     * @return {void}
     */
    loadProfile : function(field, e) {
        console.log('load profile');
        var me = this;
        me.loadProfileView();
        //get user details
        salesforcemarvel.config.Util.showMask('Loading ...');

        badgeController.getBadges(function(response) {
            
            var list = userController.getProfile().down('#badgeList'), store = list ? list.getStore() : null; 
                if(store && list){
                    store.setData(response.records);
                    salesforcemarvel.config.Util.hideMask();
                }
        });

        this.loadUserDetails(function(respose) {
            var view = me.getProfile();
            salesforcemarvel.config.Util.saveToLocalStorage('user_' + forcetkClient.userId, respose);

            var user = Ext.create('salesforcemarvel.model.User', {
                Name : respose.Name,
                FirstName : respose.FirstName,
                LastName : respose.LastName,
                CompanyName : respose.CompanyName,
                Country : respose.Country,
                Latitude : respose.Latitude,
                Longitude : respose.Longitude,
                Email : respose.Email,
                FullPhotoUrl : respose.FullPhotoUrl,
                SmallPhotoUrl : respose.SmallPhotoUrl,
                AboutMe : respose.AboutMe,
                Badge1__c : respose.Badge1__c,
                Badge2__c : respose.Badge2__c,
                Badge3__c : respose.Badge3__c,
                Badge4__c : respose.Badge4__c,
                Badge5__c : respose.Badge5__c,
                Badge6__c : respose.Badge6__c,
                Badge7__c : respose.Badge7__c,
                Badge8__c : respose.Badge8__c,
                Badge9__c : respose.Badge9__c,
                Badge10__c : respose.Badge10__c
            });
            salesforcemarvel.config.Util.hideMask();
            //var view = me.getProfile();
            if (view) {
                view.setRecord(user);
                var profileImage = view.down('#profileImage');
                if (profileImage) {

                    profileImage.setSrc(me.imageUrl(user.get('SmallPhotoUrl')));

                    setTimeout(function() {
                        profileImage.setSrc(user.get('SmallPhotoUrl'));
                    }, 10);
                }
                var name = view.down('#Name');
                if (name) {
                    name.setHtml(user.get('Name'));
                }
                var emailLabel = view.down('#emailLabel');
                if (emailLabel) {
                    emailLabel.setHtml(user.get('Email'));
                    
                }


            }
        });
    }, /**
     * @method imageUrl [description]
     * @param {[type]} imageUrl        [Description of imageUrl]
     
     * @return {void}
     */
    imageUrl: function(imageUrl) {
        return forcetkClient.instanceUrl + "/secur/frontdoor.jsp?sid=" + forcetkClient.sessionId + "&retURL=" + imageUrl
    
        
    },
}); 