/**
 * @class salesforcemarvel.field.ImageField
 * @extends Ext.field.Field
 * Description
 */
Ext.define('salesforcemarvel.field.ImageField', {
    extend: 'Ext.field.Field',
    requires: [
        'Ext.Img'
    ],
    xtype: 'imagefield',
    config: {
        component: {
            xtype: 'image'
        }
    },
    updateValue: function(value, oldValue) {
	    var me = this,component = me.getComponent();
	    component.setSrc(value);
	},

	proxyConfig: {
	    width: '100%',
	    height: '100%'
	}
});