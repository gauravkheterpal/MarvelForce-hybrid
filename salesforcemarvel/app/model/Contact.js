Ext.define('salesforcemarvel.model.Contact', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'Id', type: 'string'},
            { name: 'Name', type: 'string'},
            { name: 'FirstName', type: 'string'},
            { name: 'LastName', type: 'string'},
            { name: 'Email', type: 'string'},
            {name : 'Thumbnail', type : 'string'},
            {name : 'Profile', type : 'string'},
            {name : 'character', type : 'auto'}

        ]
    }
});
