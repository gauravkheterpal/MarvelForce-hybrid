/**
 * @class salesforcemarvel.store.Contacts
 * @extends Ext.data.Store
 * Description
 */
Ext.define('salesforcemarvel.store.Contacts', {
    extend: 'Ext.data.Store',
    xtype : 'contacts', 
    requires: [
        'salesforcemarvel.model.Contact'
    ],

    config: {
        model : 'salesforcemarvel.model.Contact'
    }
});