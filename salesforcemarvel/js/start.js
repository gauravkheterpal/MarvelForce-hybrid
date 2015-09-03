(function () {

    "use strict";

    /* Wait until cordova is ready to initiate the use of cordova plugins and app launch */
    document.addEventListener("deviceready", function() {
        authenticateUser(launchApp);
    }, false);

    /* Method to authenticate user with Salesforce Mobile SDK's OAuth Plugin */
    var authenticateUser = function(successHandler, errorHandler) {

        // Get salesforce mobile sdk OAuth plugin
        var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");

        // Call getAuthCredentials to get the initial session credentials
        oauthPlugin.getAuthCredentials(
            // Callback method when authentication succeeds.
            function (creds) {
                // Create forcetk client instance for rest API calls
                var forceClient = new forcetk.Client(creds.clientId, creds.loginUrl);
                forceClient.setSessionToken(creds.accessToken, "v34.0", creds.instanceUrl);
                forceClient.setRefreshToken(creds.refreshToken);
                forceClient["userId"] = creds.userId;
                forceClient["orgId"]  = creds.orgId;

                // Call success handler and handover the forcetkClient
                successHandler(forceClient);
            },
            function (error) {
                alert('Failed to authenticate user: ' + error);
            }
        );
    }

    /* This method will render a list of users from current salesforce org */
    var launchApp = function(forceClient) {

        deviceReady = true; 
        forcetkClient = forceClient; 
    }

})();