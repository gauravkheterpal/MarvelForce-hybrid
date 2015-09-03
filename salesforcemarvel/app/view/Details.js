/**
 * @class salesforcemarvel.view.Details
 * @extends Ext.form.Panel
 * Description
 */
Ext.define('salesforcemarvel.view.Details', {
    extend: 'Ext.form.Panel',
    xtype : 'details',
    requires: [
        'salesforcemarvel.model.Task'
    ],

    config: {
    	flex : 1, 
    	scrollable : true, 
        items: [
	         {
	        	xtype : 'panel', 
	        	layout  : 'hbox', 
	        	items : [
	        	{
	        		xtype : 'image', 
	        		height: 150,
	        		itemId : 'profileImage',
    				width: 100,
    				align : 'left',
    				margin : '5px 15px'
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
	            			html : 'Email'
	     				}
	     			]
	     		}]
	        },
	        {
	            xtype: 'textfield',
	            name: 'FirstName',
	            readOnly : true,
	            labelWidth : '40%', 
	            label: 'FirstName'
	     	},
	     	{
	            xtype: 'textfield',
	            name: 'LastName',
	            readOnly : true,
	            labelWidth : '40%', 
	            label: 'LastName'
	     	},
	     	{
	            xtype: 'textfield',
	            name: 'Title',
	            readOnly : true,
	            labelWidth : '40%', 
	            label: 'Title'
	     	}
	    ]
  	}
});