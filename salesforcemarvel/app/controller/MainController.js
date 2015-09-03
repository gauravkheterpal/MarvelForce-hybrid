/**
 * @class salesforcemarvel.controller.MainController
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('salesforcemarvel.controller.MainController', {
    extend : 'Ext.app.Controller',
    config : {
        requires : ['salesforcemarvel.view.ListView'],
        refs : {
            contactlist : 'list[itemId="list"]',
            navigationView : 'navigationview[itemId="navigationView"]',
            contactlistView : 'listview',
            main : 'main'
        },
        control : {
            main : {
                activeitemchange : 'onActiveItemChange'
            }
        }
    },
    openSearchView : function() {

    },

    /**
     * @method loadHomeView [Load home view]
     * @return {void}
     */
    loadHomeView : function() {
        //taskController.loadTaskList();
        contactController.loadHomeView();
    },
    getSearchView : function() {
        return {
            layout : 'fit',
            title : 'Search',
            itemId : 'searchView',
            enableSearch : true,
            loadMask : false,
            xtype : 'listview'
        };
    },
    /**
     * @method onShowProfile [description]
     * @param {[type]} field        [Description of field]
     * @param {[type]} e        [Description of e]

     * @return {void}
     */
    onShowProfile : function(field, e) {
        userController.loadProfile();
    },
    
    
    refreshWebSession : function(retUrl) {
        $.ajax({
            url : forcetkClient.instanceUrl + "/secur/frontdoor.jsp?sid=" + forcetkClient.sessionId + "&retURL=" + retUrl,
            success : function(response) {
            
            },
            error : function(response) {
                
            },
            data : {
                "Authorization" : "Bearer " + forcetkClient.sessionId,
                "X-Connect-Bearer-Urls" : true
            }
        });
    },
    /**
     * @method onActiveItemChange [description]
     
     * @return {void}
     */
    onActiveItemChange : function(tabPanel, value, oldValue, eOpts) {
        switch(value.getItemId()){
            case 'contactTab':
                contactController.loadHomeView();
            break; 
            case 'taskTab':
                taskController.crateTaskList();
            break; 
            case 'characterTab':
                marvelController.showMarvelCharacters();
            break; 
            case 'profileTab':
                userController.loadProfile();
            break; 

        }
    
        
    }
}); 