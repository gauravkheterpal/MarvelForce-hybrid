/**
 * @class salesforcemarvel.controller.BadgeController
 * @extends Ext.Controller
 * Description
 */
Ext.define('salesforcemarvel.controller.BadgeController', {
    extend: 'Ext.app.Controller',
    requires: [
        
    ],

    config: {
        configName: null
    },
    getBadges : function(badgeCallback) {
    	 		salesforcemarvel.config.Util.showMask('Loading badges');
                var  query = salesforcemarvel.config.SOQLManager.Badge.Select + " where user_ID__c like'" + forcetkClient.userId+"%'", me = this; 
                
                var ajaxCaller = Ext.create('salesforcemarvel.connection.AjaxCall');

                var callback= function(response){
                    salesforcemarvel.config.Util.hideMask();
                    for(var i=0; i<response.records.length; i++){
                    	//http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04/imagetypeplaceholder.jpg
                    	response.records[i]["small"] = response.records[i].Badge_Image_URL__c ? response.records[i].Badge_Image_URL__c.replace('imagetypeplaceholder', 'portrait_medium'): null ;
                    	response.records[i]["medium"] = response.records[i].Badge_Image_URL__c ? response.records[i].Badge_Image_URL__c.replace('imagetypeplaceholder', 'portrait_medium'): null ;
                    	response.records[i]["xlarge"] = response.records[i].Badge_Image_URL__c ? response.records[i].Badge_Image_URL__c.replace('imagetypeplaceholder', 'portrait_xlarge'): null ;
                   }
                    if(badgeCallback)badgeCallback(response);  
                }; 

                ajaxCaller.call(query, function(response) {
            
                if(!response.statusCode){
                       callback(response); 
                    }
                    
                });
    },
    /**
     * @method showBadgeScreen [description]
     * @param {[type]} record        [Description of record]
     
     * @return {void}
     */
    showBadgeScreen: function(JSONRecord) {
        var badge = null; 
        if(JSONRecord){
            badge = Ext.create('salesforcemarvel.model.Badge', {
                Name : JSONRecord.name,
                Badge_Image_URL__c : JSONRecord.thumbnail.path +'/'+ salesforcemarvel.config.AppConfig.Images.PORTRAIT_XLARGE+'.' + JSONRecord.thumbnail.extension,
                Marvel_Char_ID__c : JSONRecord.id,
                user_ID__c : forcetkClient.userId
            });
        }else {
            badge = Ext.create('salesforcemarvel.model.Badge', {

            });
        }
        //create view 
        var badgeView = Ext.create('salesforcemarvel.view.Badge', {
            record : badge
        }); 
        badgeView.setRecord(badge);

        var profileImage = badgeView.down('#profileImage');
        if(profileImage){
            profileImage.setSrc(badge.get('Badge_Image_URL__c'));
        }

        Ext.Viewport.setActiveItem(badgeView, salesforcemarvel.config.Util.coverUpTransaction); 
    }
});