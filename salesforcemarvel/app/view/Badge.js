/**
 * @class salesforcemarvel.view.Details
 * @extends Ext.form.Panel
 * Description
 */
 Ext.define('salesforcemarvel.view.Badge', {
 	extend: 'Ext.form.Panel',
 	xtype : 'details',
 	requires: [
 	'salesforcemarvel.model.Badge'
 	],

 	config: {
 		flex : 1, 
 		scrollable : false, 
 		items: [
 		{xtype : 'titlebar', title : 'Badge', 
 			items : 
 			[{
 				xtype : 'button', text : 'Close', align : 'right', itemId : 'closeButton'
 			}]
 		},
 		{
 			xtype : 'panel', 
 			layout  : 'hbox', 
 			items : [
 			{
 				xtype : 'label', itemId : 'header'  
 			},	{	
	 				xtype : 'image', 
	 				height: 150,
	 				itemId : 'profileImage',
	 				width: 100,
	 				align : 'left',
	 				margin : '5px 15px'
 				},  
 				{
 					xtype : 'label', itemId : 'description'  
 				} 
 			]
 		}
 		],
 		 /**
         * [listeners for list]
         * @type {Array}
         */
        listeners : [{
            fn : 'onCloseTap',
            event : 'tap',
            delegate : '#closeButton'
        }] 
 	},

 	/**
 	 * @method onCloseTap [description]
 	 * @param {[type]} field		[Description of field]
 	 * @param {[type]} e		[Description of e]
 	 
 	 * @return {void}
 	 */
 	onCloseTap: function(field, e) {
 		Ext.Viewport.setActiveItem('main', salesforcemarvel.config.Util.coverDownTransaction); 
 		
 		setTimeout(function() {
            taskController.getNavigationView().getNavigationBar().fireEvent('back', taskController.getNavigationView().getNavigationBar());
        }, 1000);
 		
 	},
 });