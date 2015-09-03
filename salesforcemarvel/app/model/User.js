Ext.define('salesforcemarvel.model.User', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'Id', type: 'int' },
            { name: 'Name', type: 'auto' },
            { name: 'LastName', type: 'auto' },
            { name: 'FirstName', type: 'auto' },
            { name: 'CompanyName', type: 'auto' },
            { name: 'Name', type: 'auto' },
            { name: 'FullPhotoUrl', type: 'auto' },
            { name: 'SmallPhotoUrl', type: 'auto' },
            { name: 'Badge1__c', type: 'auto' },
            { name: 'Badge2__c', type: 'auto' },
            { name: 'Badge3__c', type: 'auto' },
            { name: 'Badge4__c', type: 'auto' },
            { name: 'Badge5__c', type: 'auto' },
            { name: 'Badge6__c', type: 'auto' },
            { name: 'Badge7__c', type: 'auto' },
            { name: 'Badge8__c', type: 'auto' },
            { name: 'Badge9__c', type: 'auto' },
            { name: 'Badge10__c', type: 'auto' },
            { name: 'Country', type: 'auto' },
            { name: 'Latitude', type: 'auto' },
            { name: 'Longitude', type: 'auto' },
            { name: 'Email', type: 'auto' }
            
        ]
    }
});
