/**
 * @class salesforcemarvel.view.Details
 * @extends Ext.form.Panel
 * Description
 */
Ext.define('salesforcemarvel.view.TaskDetails', {
    extend: 'Ext.form.Panel',
    xtype : 'taskdetails',
    requires: [
        'salesforcemarvel.model.Task'
    ],

    config: {
    	flex : 1, 
    	scrollable : true, 
        items: [
	        {
	            xtype: 'textfield',
	            name: 'Subject',
	            readOnly : true,
	            labelWidth : '40%', 
	            label: 'Subject'
	        },
	        {
	            xtype: 'textfield',
	            name: 'Type',
	            readOnly : true,
	            labelWidth : '40%', 
	            label: 'Type'
	     	},
	     	{
	            xtype: 'textfield',
	            name: 'Priority',
	            readOnly : true,
	            labelWidth : '40%', 
	            label: 'Priority'
	     	},
	     	{
	            xtype: 'textfield',
	            name: 'Status',
	            readOnly : true,
	            labelWidth : '40%', 
	            label: 'Status'
	     	},
	     	{
	            xtype: 'textfield',
	            name: 'ActivityDate',
	            labelWidth : '40%', 
	            readOnly : true,
	            label: 'Due Date'
	     	},
	     	{
	            xtype: 'textfield',
	            name: 'Description',
	            labelWidth : '40%', 
	            readOnly : true,
	            label: 'Comment'
	     	}
	    ]
  	}
});