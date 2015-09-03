/**
 * @class salesforcemarvel.view.ListView
 * @extends Ext.Container
 * Description
 */
Ext.define('salesforcemarvel.view.ListView', {
    extend: 'Ext.Container',
    xtype : 'listview', 
    requires: [
        'Ext.List','salesforcemarvel.config.AppConfig'
    ],

    config: {
    	layout : {
            type : 'fit'
        },
        enableSearch : false, 
        loadMask : true, 
        store : {
                xtype : 'contacts'
        }, 
        itemTpl : '<pre>{Name}</pre>', 
        searchPlaceHolderText : salesforcemarvel.config.AppConfig.searchPlaceHolder,
        items: [
        /**
         *  Search toolbar and search field 
         */
        {
            xtype : 'toolbar', // top toolbar
            docked : 'top',
            hidden : true, 
            itemId : 'searchToolbar',
            items : [{
                xtype : 'searchfield', // here is the searchfield
                itemId : 'searchfield',
                
                placeHolder  : '', 
                style: 'padding: 0px;width: 100%;'

            }]
        },
        /**
         *  List field 
         */
        {
        	xtype : 'list', 
        	deferEmptyText : true,
            scrollToTopOnRefresh : false,
            scrollable : {
                direction : 'vertical',
                directionLock : true
            },
        	itemId : 'list', 
            mode : 'SINGLE',
        	emptyText : salesforcemarvel.config.AppConfig.emptyText,
        	itemTpl : salesforcemarvel.config.AppConfig.ContactList.itemTpl,
            flex : 1
        }],
        /**
         * [listeners for list]
         * @type {Array}
         */
        listeners : [{
            fn : 'onItemTap',
            event : 'itemtap',
            delegate : '#list'
        }]
    },

    /**
     * Override of onRender method. Attaches event handlers to the element to handler
     * @method
     * @private
     * @return {void}
     */
    initialize : function() {
        this.callParent();
        
        //if search enabled, show search field. 
        if(this.getEnableSearch()){
            var searchfield = this.down('#searchfield'), searchToolbar = this.down('#searchToolbar');
            if(searchfield){
                searchfield.setPlaceHolder(this.getSearchPlaceHolderText());
                searchToolbar.setHidden(false);
            }
        }
        var list = this.down('#list');

        if(list){
            //if loadMask is false, hide loading mask
            if(!this.getLoadMask()){
                var list = this.down('#list');
                list.setMasked(false); 
            }
            //set store. 
            list.setStore(this.getStore()); 

            if(this.getItemTpl()){
                list.setItemTpl(this.getItemTpl());
            }
        }

    },
    /**
     * @method onItemTap 
     * @param {Object} list        
     * @param {Object} index        
     * @param {Object} item       
     * @param {Object} record      
     
     * @return {void}
     */
    onItemTap: function(list, index, item, record, e, eOpts) {
       console.log('item tap ' + index); 
       this.fireEvent("listTap", list, index, item, record, e, eOpts);
    }
});