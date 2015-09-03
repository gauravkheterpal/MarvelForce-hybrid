/**
 * @class salesforcemarvel.store.Contacts
 * @extends Ext.data.Store
 * Description
 */
Ext.define('salesforcemarvel.store.Badge', {
    extend: 'Ext.data.Store',
    xtype : 'badges', 
    
    requires: [
        'salesforcemarvel.model.Badge'
    ],

    config: {
        model : 'salesforcemarvel.model.Badge'
    }
});