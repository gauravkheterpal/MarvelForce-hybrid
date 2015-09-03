/**
 * @class salesforcemarvel.config.AppConfig
 * @extends extendsClass
 * Description
 */
Ext.define('salesforcemarvel.config.AppConfig', {
    singleton : true,
    MarvelAccount: {
    	PublicKey : '1971c5c1a55b92fbbd444d12b4831d38',
    	PrivateKey : '229e1692e67820a99745cd7889af0017f8c5317f'
    }, 
    Gateway: "http://gateway.marvel.com", 
    MarvelEndPoints : {
    	Characters : {
    		characters : '/v1/public/characters',
    		detail : '/v1/public/characters/{characterId}',
    		comics : '/v1/public/characters/{characterId}/comics',
    		events : '/v1/public/characters/{characterId}/events',
    		series :'/v1/public/characters/{characterId}/series',
    		stories: '/v1/public/characters/{characterId}/stories'
    	},
    	Comics : {
    		comics : '/v1/public/comics', 
    		detail : '/v1/public/comics/{comicId}',
    		characters: '/v1/public/comics/{comicId}/characters',
    		creators : '/v1/public/comics/{comicId}/creators'
    	}
    	
    },
    Images : {
             PORTRAIT_SMALL : "portrait_small", //50x75px 
             PORTRAIT_MEDIUM : "portrait_medium",          //100x150px
             PORTRAIT_XLARGE : "portrait_xlarge",          //150x225px
             PORTRAIT_FANTASTIC :"portrait_fantastic",    //168x252px
             PORTRAIT_UNCANNY : "portrait_uncanny",        //300x450px
             PORTRAIT_INCREDIBLE : "portrait_incredible"  //216x324px

    },
    ContactList : {
        itemTpl : '<div class="fullwidth"><div class="left" style= "width:32px;"><img src= "{Thumbnail}" style="width:32px; padding-right: 10px"/></div><div class=" word-wrap left">{Name}</div><div class="clear"></div></div>'
    },
    TaskList : {
        itemTpl : '<div class="fullwidth"><div class="word-wrap task-Subject left">{Subject}</div><div class=" word-wrap right task-Status">{Status}</div><div class="clear"></div></div>'
    },
    MarvelCharcters : {
         itemTpl : new Ext.XTemplate('<div class="fullwidth"><tpl if="values.small"> <div class="left" style= "width:32px;"><img src= "{small}" style="width:32px; padding-right: 10px"/></div></tpl><div class=" word-wrap left">{name}</div><div class="clear"></div></div>')
    },
    Badges : {
         itemTpl : new Ext.XTemplate('<div class="left" style= "width:64x;"><img src= "{medium}" style="width:64px; padding-right: 10px"/></div>')
    },
    emptyText : 'No Record found',
    Loading : 'Loading ...',
    searchPlaceHolder : 'Tap to begin search',

    getMarvelGateway : function(marvelEndpoint) {
    	var timestamp = $.now();
    	var msg = timestamp  +  salesforcemarvel.config.AppConfig.MarvelAccount.PrivateKey + salesforcemarvel.config.AppConfig.MarvelAccount.PublicKey
    	var hash = CryptoJS.MD5(msg);
    	var url = salesforcemarvel.config.AppConfig.Gateway +  marvelEndpoint+"?ts="+timestamp+"&apikey="+salesforcemarvel.config.AppConfig.MarvelAccount.PublicKey+"&hash="+hash+"&limit=100"; 
    	return url;
    }

});