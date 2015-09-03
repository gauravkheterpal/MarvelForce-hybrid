/**
 * @class salesforcemarvel.view.UserProfile
 * @extends Ext.form.Panel
 * Description
 */
Ext.define('salesforcemarvel.view.UserProfile', {
    extend: 'Ext.form.Panel',
    xtype : 'userprofile',
    requires: [
        'salesforcemarvel.model.User'
    ],

    config: {
    	layout : 'vbox',
    	scrollable : false, 
        items: [
	        {
	        	xtype : 'panel', 
	        	layout  : 'hbox', 
	        	height: 65,
	        	items : [
	        	{
	        		xtype : 'image', 
	        		height: 64,
	        		itemId : 'profileImage',
    				width: 64,
    				align : 'left',
    				margin : '05px'
	        	},
	        	{ 
	        		xtype : 'panel', 
	        		layout  : 'vbox',
	        		items: [{
	            			xtype: 'textfield',
	            			name: 'Name',
	            			readOnly : true,
	            			labelWidth : '0%'
	     				},
	     				{
	            			xtype: 'label',
	            			name: 'Email',
	            			itemId : 'emailLabel',
	            			style : 'font-size: 0.93em; w'
	     				}
	     			]
	     		}]
	        },{
	        	xtype : 'panel', 
	        	layout : {
					type : 'vbox'
				},
				scrollable :false,
				height: '78%',
				docked : 'bottom',
				style : 'padding-left: 05px;',
	        	items: [{
		        	xtype : 'dataview', 
		        	scrollable :true,
		        	style  : 'padding : 05px',
		        	itemId : 'badgeList', 
		            mode : 'SINGLE',
		            inline : true, 
		        	emptyText : salesforcemarvel.config.AppConfig.emptyText,
		        	itemTpl :  salesforcemarvel.config.AppConfig.Badges.itemTpl,
		            flex : 1,
		            store : {
		            	xtype : 'badges'
		            }
        		}]
	        } 
	        
	    ]
  	}
});