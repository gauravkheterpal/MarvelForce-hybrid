/**
 * @class salesforcemarvel.config.AppConfig
 * @extends extendsClass
 * Description
 */
Ext.define('salesforcemarvel.config.Util', {
    singleton : true,
    ajax : function(path, callback, error, method, payload, headerParams) {
    	return $.ajax({
            type : 'get',
            url : path,
            success : callback,
            error : error
        });
    },

    showMask : function(optionalMessage) {
    	Ext.Viewport.setMasked({
				xtype : 'loadmask',
				cls : 'loadingMask',
				message : optionalMessage ? optionalMessage : 'Loading...'
			});
    },
    hideMask : function() {
    	Ext.Viewport.setMasked(false);
    },
    saveToLocalStorage : function(key, item) {

        $.jStorage.set(key, item);
    },
    getFromLocalStorage : function(key) {

        return $.jStorage.get(key);
    },
    coverUpTransaction : {
        type : 'cover',
        direction : 'up',
        duration : 400
    },
    coverDownTransaction : {
        type : 'reveal',
        direction : 'down',
        duration : 400
    }

});