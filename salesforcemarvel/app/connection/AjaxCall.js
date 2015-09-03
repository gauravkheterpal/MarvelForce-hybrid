/**
 * @class salesforcemarvel.AjaxCall
 * @extends extendsClass
 * Description
 */
Ext.define('salesforcemarvel.connection.AjaxCall', {
    //singleton : true,
    
    /**
	 * SOQL or REST Failure
	 */
	failure : function(response, callback) {
		console.log("Inside Failure :: " + JSON.stringify(response));
		 salesforcemarvel.config.Util.hideMask(); 
	},

	/*
	 * Lists summary information about each Salesforce.com version currently
	 * available, including the version, label, and a link to each version's
	 * root. @param callback function to which response will be passed @param
	 * [error=null] function to which jqXHR will be passed in ca0 of error
	 */
	versions : function(callback, error) {
		forcetkClient.ajax('/', callback, error);
	},

	/*
	 * Lists available resources for the client's API version, including
	 * resource name and URI. @param callback function to which response will be
	 * passed @param [error=null] function to which jqXHR will be passed in case
	 * of error
	 */
	resources : function(callback, error) {
		forcetkClient.ajax('/v24.0/', callback, error);
	},
	/*
	 * Lists the available objects and their metadata for your organization's
	 * data. @param callback function to which response will be passed @param
	 * [error=null] function to which jqXHR will be passed in case of error
	 */
	describeGlobal : function(callback, error) {
		forcetkClient.ajax('/v24.0/sobjects/', callback, error);
	},

	/*
	 * Describes the individual metadata for the specified object. @param
	 * objtype object type; e.g. "Account" @param callback function to which
	 * response will be passed @param [error=null] function to which jqXHR will
	 * be passed in case of error
	 */
	metadata : function(objtype, callback, error) {
		forcetkClient.ajax('/v24.0/sobjects/' + objtype + '/', callback, error);
	},

	/*
	 * Completely describes the individual metadata at all levels for the
	 * specified object. @param objtype object type; e.g. "Account" @param
	 * callback function to which response will be passed @param [error=null]
	 * function to which jqXHR will be passed in case of error
	 */
	describe : function(objtype, callback, error) {
		forcetkClient.ajax('/v24.0/sobjects/' + objtype + '/describe/', callback, error);
	},

	/*
	 * Creates a new record of the given type. @param objtype object type; e.g.
	 * "Account" @param fields an object containing initial field names and
	 * values for the record, e.g. {:Name "salesforce.com", :TickerSymbol "CRM"}
	 * @param callback function to which response will be passed @param
	 * [error=null] function to which jqXHR will be passed in case of error
	 */
	create : function(objtype, fields, callback, error) {
		forcetkClient.ajax('/services/data/v24.0/sobjects/' + objtype + '/', callback, this.failure, "POST", false, JSON.stringify(fields));
	},

	/*
	 * Retrieves field values for a record of the given type. @param objtype
	 * object type; e.g. "Account" @param id the record's object ID @param
	 * [fields=null] optional comma-separated list of fields for which to return
	 * values; e.g. Name,Industry,TickerSymbol @param callback function to which
	 * response will be passed @param [error=null] function to which jqXHR will
	 * be passed in case of error
	 */
	retrieve : function(objtype, id, fieldlist, callback, error) {
		var fields = fieldlist ? '?fields=' + fieldlist : '';
		forcetkClient.retrieve(objtype, id, fieldlist, callback, this.failure);
	},

	/*
	 * Upsert - creates or updates record of the given type, based on the given
	 * external Id. @param objtype object type; e.g. "Account" @param
	 * externalIdField external ID field name; e.g. "accountMaster__c" @param
	 * externalId the record's external ID value @param fields an object
	 * containing field names and values for the record, e.g. {:Name
	 * "salesforce.com", :TickerSymbol "CRM"} @param callback function to which
	 * response will be passed @param [error=null] function to which jqXHR will
	 * be passed in case of error
	 */
	upsert : function(objtype, externalIdField, externalId, fields, callback, error) {
		forcetkClient.ajax('/v24.0/sobjects/' + objtype + '/' + externalIdField + '/' + externalId + '?_HttpMethod=PATCH', callback, error, "POST", JSON.stringify(fields));
	},

	/*
	 * Updates field values on a record of the given type. @param objtype object
	 * type; e.g. "Account" @param id the record's object ID @param fields an
	 * object containing initial field names and values for the record, e.g.
	 * {:Name "salesforce.com", :TickerSymbol "CRM"} @param callback function to
	 * which response will be passed @param [error=null] function to which jqXHR
	 * will be passed in case of error
	 */
	update : function(objtype, id, fields, callback, error) {
		forcetkClient.ajax('/v24.0/sobjects/' + objtype + '/' + id + '?_HttpMethod=PATCH', callback, error, "POST", JSON.stringify(fields));
	},

	/*
	 * Deletes a record of the given type. Unfortunately, 'delete' is a reserved
	 * word in JavaScript. @param objtype object type; e.g. "Account" @param id
	 * the record's object ID @param callback function to which response will be
	 * passed @param [error=null] function to which jqXHR will be passed in case
	 * of error
	 */
	del : function(objtype, id, callback, error) {
		forcetkClient.ajax('/services/data/v24.0/sobjects/' + objtype + '/' + id, callback, error, "DELETE");
	},

	/*
	 * Executes the specified SOQL query. @param soql a string containing the
	 * query to execute - e.g. "SELECT Id, Name from Account ORDER BY Name LIMIT
	 * 20" @param callback function to which response will be passed @param
	 * [error=null] function to which jqXHR will be passed in case of error
	 */
	query : function(soql, callback, error) {
		forcetkClient.ajax('/services/data/v24.0/query?q=' + escape(soql), callback, error);
	},

	/*
	 * Executes the specified SOSL query. @param sosl a string containing the
	 * query to execute - e.g. "Find {serachkey} in .." @param callback function
	 * to which response will be passed @param [error=null] function to which
	 * jqXHR will be passed in case of error
	 */
	search : function(sosl, callback, error) {	
		forcetkClient.search(sosl, callback, error);
	},

	/*
	 * Executes the specified SOQL query. @param soql a string containing the
	 * query to execute - e.g. "SELECT Id, Name from Account ORDER BY Name LIMIT
	 * 20" @param fnCallback function to which response will be passed
	 */
	call : function(soqlQuery, callback) {
		// console.log('inside call :: ');
		this.query(soqlQuery, callback, this.failure);
	}

});