/**
 * @class salesforcemarvel.store.Users
 * @extends Ext.data.Store
 * Description
 */
Ext.define('salesforcemarvel.store.Users', {
    extend: 'Ext.data.Store',
    xtype : 'users', 
    requires: [
        'salesforcemarvel.model.User'
    ],

    config: {
        model : 'salesforcemarvel.model.User'
    }
});