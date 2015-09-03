/**
 * @class salesforcemarvel.store.Characters
 * @extends Ext.data.Store
 * Description
 */
Ext.define('salesforcemarvel.store.Characters', {
    extend: 'Ext.data.Store',
    xtype : 'characters', 
    requires: [
        'salesforcemarvel.model.Character'
    ],

    config: {
        model : 'salesforcemarvel.model.Character'
    }
});