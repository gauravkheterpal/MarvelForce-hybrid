Ext.define('salesforcemarvel.model.Badge', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ 
        	{name : 'Id', type : 'auto'},
            {name : 'Name', type : 'auto'},
            {name : 'Badge_Image_URL__c', type : 'auto'},
            {name : 'Marvel_Char_ID__c', type : 'auto'},
            {name : 'user_ID__c', type : 'auto'},
            { name: 'small', type: 'string'},
            { name: 'medium', type: 'string'},
            { name: 'xlarge', type: 'string'}
        ]
    }
});