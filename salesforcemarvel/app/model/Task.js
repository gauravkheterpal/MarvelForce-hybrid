Ext.define('salesforcemarvel.model.Task', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ 
        	{ name: 'Id', type: 'string'},
            { name: 'Subject', type: 'string'},
            { name: 'Status', type: 'string'}, 
            { name: 'Type', type: 'string'},
            { name: 'IsClosed', type: 'boolean'},
            { name: 'ActivityDate', type: 'string'},
            { name: 'Description', type: 'string'},
            { name: 'Priority', type: 'string'},
            { name: 'ReminderDateTime', type: 'string'}

       ]
    }
});