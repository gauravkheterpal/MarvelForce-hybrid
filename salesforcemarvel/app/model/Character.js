Ext.define('salesforcemarvel.model.Character', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'string'},
            { name: 'name', type: 'string'},
            { name: 'description', type: 'string'},
            { name: 'resourceURI', type: 'string'},
            { name: 'thumbnail', type: 'string'},
            {name : 'comics', type : 'auto'},
            {name : 'series', type : 'auto'},
            {name : 'stories', type : 'auto'},
            {name : 'events', type : 'auto'},
            { name: 'small', type: 'string'},
            { name: 'medium', type: 'string'},
            { name: 'xlarge', type: 'string'}
        ]
    }
});
