/**
 * @class salesforcemarvel.view.CharacterDetails
 * @extends Ext.form.Panel
 * Description
 */
 Ext.define('salesforcemarvel.view.CharacterDetails', {
 	extend: 'Ext.form.Panel',
 	xtype : 'characterdetails',
 	requires: [
 	'salesforcemarvel.model.Character'
 	],

 	config: {
 		layout  : 'vbox',
 		scrollable : {
 			direction : 'vertical',
 			directionLock : true
 		},
 		items: [
 		{
 			xtype : 'panel', 
 			layout  : 'hbox', 
 			items : [
 			{
 				xtype : 'image', 
 				height: 120,
 				itemId : 'profileImage',
 				width: 100,
 				align : 'left',
 				margin : '5px'
 			},
 			{ 
 				xtype : 'panel', 
 				layout  : 'vbox',
 				items: [{
 					xtype: 'textfield',
 					name: 'name',
 					readOnly : true,
 					align : 'left',
 					labelWidth : '0%',
 					paddgin: 0, 
 					margin : 0
 				},
 				{
 					xtype: 'panel',
 					baseCls: 'x-plain',
 					name: 'description',
 					itemId : 'descriptionLabel',
 					html : 'description',
 					scrollable : {
      					direction     : 'vertical',
      					directionLock : true
					},
 					height : '120px',
 					paddgin: 0, 
 					bodyStyle:{"background-color":"red"}, 
 					margin : 0,
 					style : 'font-size: 0.85em;padding : 05px; width: 200px;word-wrap: break-word;background-color:#fff'
 				}
 				]
 			}]
 		},
 		{
 			xtype : 'tabpanel', 
 			width : '97%',
 			itemId : 'characterTabs',  
 			items : 
 			[{
 				title : 'Stories',
 				html : 'stories'
 			},{
 				title : 'Series',
 				html : 'series'
 			}, {
 				title : 'Comics',
 				html : 'comics'
 			},{
 				title : 'Events',
 				html : 'events'
 			}

 			]
 		}, {
	        	xtype : 'panel', 
	        	baseCls: 'x-plain',
	        	layout : {
					type : 'vbox'
				},
				scrollable :false,
				height: '55%',
				docked : 'bottom',
				style : 'padding-left: 05px;',
	        	items: [{
		        	xtype : 'list', 
		        	scrollable :true,
		        	baseCls: 'x-plain',
		        	style  : 'padding : 05px',
		        	itemId : 'characterLists', 
		            mode : 'SINGLE',
		            inline : false, 
		        	emptyText : salesforcemarvel.config.AppConfig.emptyText,
		        	itemTpl :  salesforcemarvel.config.AppConfig.MarvelCharcters.itemTpl, //'<pre>{name}</pre>',
		            flex : 1,
        		}]
	        } 
 		],
 		listeners : [{
            fn : 'onActiveitemchange',
            event : 'activeitemchange',
            delegate : '#characterTabs'
        }] 
 	},


 	/**
 	 * @method onActiveitemchange [description]
 	 * @param {[type]} tabPanel		[Description of tabPanel]
 	 * @param {[type]} value		[Description of value]
 	 * @param {[type]} oldValue		[Description of oldValue]
 	 * @param {[type]} eOpts		[Description of eOpts]
 	 
 	 * @return {void}
 	 */
 	onActiveitemchange: function(tabPanel, value, oldValue, eOpts) {
 		//TODO - UPDATE LIST
 		this.fireEvent('tabChanges', tabPanel, value, oldValue, eOpts);
 	}
 });