/**
 * @class salesforcemarvel.store.Contacts
 * @extends Ext.data.Store
 * Description
 */
Ext.define('salesforcemarvel.store.Tasks', {
    extend: 'Ext.data.Store',
    xtype : 'tasks', 
    requires: [
        'salesforcemarvel.model.Task'
    ],

    config: {
        model : 'salesforcemarvel.model.Task',

        filters : [{
            property : 'IsClosed',
            value : /false/
        }]
    }
});