/**
 * @class salesforcemarvel.view.Main2
 * @extends Ext.TabPanel
 * Description
 */
 Ext.define('salesforcemarvel.view.Main', {
 	extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.NavigationView','Ext.List'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'Contacts',
                iconCls: 'icongen',
                layout : 'fit', 
                iconMask: true,
                flex : 1,
                itemId : 'contactTab', 
                items: [
                {
                    xtype : 'navigationview',
                    scrollable : false,
                    itemId : 'contactNavigationView',
                    navigationBar : {
                        docked : 'top',
                        cls : 'header'
                    },
                    items : [],
                    flex : 1
                }
                ]
            },
            {
                title: 'Tasks',
                iconCls: 'task',
                layout : 'fit', 
                iconMask: true,
                flex : 1,
                itemId : 'taskTab',
                items: [
                {
                    xtype : 'navigationview',
                    scrollable : false,
                    itemId : 'taskNavigationView',
                    navigationBar : {
                        docked : 'top',
                        cls : 'header',
                        items : [{
                            xtype : 'button',
                            align : 'right',
                            hidden : true,
                            itemId : 'changeStatusButton',
                            text : 'Complete'
                        }]
                    },
                    items : [],
                    flex : 1
                }
                ]
            },
            {
                title: 'Characters',
                iconCls: 'character',
                layout : 'fit', 
                iconMask: true,
                flex : 1, 
                itemId : 'characterTab',
            
                items: [
                {
                    xtype : 'navigationview',
                    scrollable : false,
                    itemId : 'characterNavigationView',
                    navigationBar : {
                        docked : 'top',
                        cls : 'header'
                    },
                    items : [],
                    flex : 1
                }
                ]
            },

            {
                title: 'Profile',
                iconCls: 'user',
                layout : 'fit', 
                 flex : 1,
                itemId : 'profileTab',
                items: [
                {
                    xtype : 'navigationview',
                    scrollable : false,
                    itemId : 'profileNavigationView',
                    navigationBar : {
                        docked : 'top',
                        cls : 'header'
                    },
                    items : [],
                    flex : 1
                }
                ]
            }
        ]
    }
});
