/**
 * @class salesforcemarvel.config.SOQLManager
 * @extends extendsClass
 * Description
 */
Ext.define('salesforcemarvel.config.SOQLManager', {
    singleton : true,

    /* Task block, maintain all queries related to Task */
    Task : {
    	Select : "SELECT ActivityDate,Description,Id,IsClosed,Priority,ReminderDateTime,Status,Subject,Type FROM Task WHERE Status !='Completed' limit 100"
    },
    
    /* Contact block, maintain all queries related to Contact */
    Contact : {
    	Select : "SELECT Id, Name, FirstName, LastName, Title,Email from Contact limit 100"
    },
    Badge : {
    	Select : "SELECT Id, Name, Badge_Image_URL__c, Marvel_Char_ID__c, user_ID__c from Badge__c"
    }
});