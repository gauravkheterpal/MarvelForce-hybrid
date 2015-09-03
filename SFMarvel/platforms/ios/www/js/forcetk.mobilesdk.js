(function(e){var d="3.2.0";var b=this.forcetk;if(b===undefined){b=this.forcetk={}}if(b.Client===undefined){b.Client=function(f,g,h){b.Client(f,g,h,null)};b.Client=function(f,g,i,h){this.clientId=f;this.loginUrl=g||"https://login.salesforce.com/";if(typeof i==="undefined"||i===null){this.proxyUrl=null;this.authzHeader="Authorization"}else{this.proxyUrl=i;this.authzHeader="X-Authorization"}this.refreshToken=null;this.sessionId=null;this.apiVersion=null;this.instanceUrl=null;this.asyncAjax=true;this.userAgentString=this.computeWebAppSdkAgent(navigator.userAgent);this.authCallback=h};b.Client.prototype.setUserAgentString=function(f){this.userAgentString=f};b.Client.prototype.getUserAgentString=function(){return this.userAgentString};b.Client.prototype.computeWebAppSdkAgent=function(j){var p=d;var n="Unknown";var h="Unknown";var i="Unknown";var q=window.location.pathname.split("/").pop();var k="1.0";var o=function(){var w=/CPU OS ([0-9_]*) like Mac OS X/.exec(j);return(w!=null&&w.length==2?w[1].replace(/_/g,"."):"Unknown")};var v=function(){var w=/CPU iPhone OS ([0-9_]*) like Mac OS X/.exec(j);return(w!=null&&w.length==2?w[1].replace(/_/g,"."):"Unknown")};var f=function(){var w=/(iPad|iPhone|iPod)/.exec(j);return(w!=null&&w.length==2?w[1]:"Unknown")};var l=function(){var w=/Android ([0-9\.]*)/.exec(j);return(w!=null&&w.length==2?w[1]:"Unknown")};var g=function(){var w=/Android[^\)]*; ([^;\)]*)/.exec(j);return(w!=null&&w.length==2?w[1].replace(/[\/ ]/g,"_"):"Unknown")};var u=function(){var w=/Windows Phone OS ([0-9\.]*)/.exec(j);return(w!=null&&w.length==2?w[1]:"Unknown")};var t=function(){var w=/Windows Phone OS [^\)]*; ([^;\)]*)/.exec(j);return(w!=null&&w.length==2?w[1].replace(/[\/ ]/g,"_"):"Unknown")};var r=function(){var w=/Mac OS X ([0-9_]*)/.exec(j);return(w!=null&&w.length==2?w[1].replace(/_/g,"."):"Unknown")};var s=function(){var w=/Windows NT ([0-9\.]*)/.exec(j);return(w!=null&&w.length==2?w[1]:"Unknown")};var m=/(iPhone|iPad|iPod|Android|Windows Phone|Macintosh|Windows)/.exec(j);if(m!=null&&m.length==2){switch(m[1]){case"iPad":h="iPhone OS";i=o();n="iPad";break;case"iPhone":case"iPod":h="iPhone OS";i=v();n=m[1];break;case"Android":h="android mobile";i=l();n=g();break;case"Windows Phone":h="Windows Phone";i=u();n=t();break;case"Macintosh":h="Mac OS";i=r();break;case"Windows":h="Windows";i=s();break}}return"SalesforceMobileSDK/"+p+" "+h+"/"+i+" ("+n+") "+q+"/"+k+" Web "+j};b.Client.prototype.setRefreshToken=function(f){this.refreshToken=f};b.Client.prototype.refreshAccessToken=function(i,g){var h=this;if(typeof this.authCallback==="undefined"||this.authCallback===null){if(this.refreshToken){var f=this.loginUrl+"/services/oauth2/token";return e.ajax({type:"POST",url:(this.proxyUrl!==null)?this.proxyUrl:f,cache:false,processData:false,data:"grant_type=refresh_token&client_id="+this.clientId+"&refresh_token="+this.refreshToken,success:function(j){h.setSessionToken(j.access_token,null,j.instance_url);i()},error:g,dataType:"json",beforeSend:function(j){if(h.proxyUrl!==null){j.setRequestHeader("SalesforceProxy-Endpoint",f)}}})}else{if(typeof g==="function"){g()}}}else{this.authCallback(h,i,g)}};b.Client.prototype.setSessionToken=function(h,g,f){this.sessionId=h;this.apiVersion=(typeof g==="undefined"||g===null)?"v33.0":g;if(location.protocol==="file:"||this.proxyUrl!=null){this.instanceUrl=f}else{this.instanceUrl=location.protocol+"//"+location.hostname}};var c=function(f){var g={};g[f.authzHeader]="Bearer "+f.sessionId;g["Cache-Control"]="no-store";g["content-type"]="application/json";g["X-Connect-Bearer-Urls"]=true;if(f.userAgentString!==null){g["X-User-Agent"]=f.userAgentString}return g};var a=0;b.Client.prototype.ajax=function(n,m,j,g,k,l){var o="";var i=this;var f=0;var h=(n.indexOf(this.instanceUrl)==0?n:this.instanceUrl+(n.indexOf("/services/data")==0?n:"/services/data"+n));return e.ajax({type:g||"GET",async:this.asyncAjax,url:(this.proxyUrl!==null)?this.proxyUrl:h,contentType:g=="DELETE"||g=="GET"?null:"application/json",cache:false,processData:false,dataType:"json",data:k,timeout:50000,headers:c(this),success:function(p){console.timeEnd(o);m(p)},error:function(q,t,r){console.timeEnd(o);var s=this;var p=function(){if(typeof j=="function"){j(q,t,r)}};if(q.status===401&&f++==0){i.refreshAccessToken(function(){i.replay(s)},p)}else{p()}},beforeSend:function(q){a++;var p=document.createElement("a");p.href=h;o="TIMING "+p.pathname+"(#"+a+")";console.time(o);if(i.proxyUrl!==null){q.setRequestHeader("SalesforceProxy-Endpoint",h)}for(paramName in (l||{})){q.setRequestHeader(paramName,l[paramName])}}})};b.Client.prototype.replay=function(f){f.headers=c(this);e.ajax(f)};b.Client.prototype.getChatterFile=function(k,l,m,h,f){var j=this;var g=this.instanceUrl+"/services/data"+k;var i=new XMLHttpRequest();i.open("GET",(this.proxyUrl!==null)?this.proxyUrl:g,true);i.responseType="arraybuffer";i.setRequestHeader(j.authzHeader,"Bearer "+j.sessionId);if(j.userAgentString!==null){i.setRequestHeader("User-Agent",j.userAgentString);i.setRequestHeader("X-User-Agent",j.userAgentString)}if(this.proxyUrl!==null){i.setRequestHeader("SalesforceProxy-Endpoint",g)}i.setRequestHeader("Cache-Control","no-store");i.onreadystatechange=function(){if(i.readyState==4){if(i.status==200){try{m(i.response)}catch(n){alert("Error reading the response: "+n.toString())}}else{if(i.status==401&&!f){j.refreshAccessToken(function(){j.getChatterFile(k,l,m,h,true)},h)}else{h(i,i.statusText,i.response)}}}};i.send()};b.Client.prototype.apexrest=function(h,k,g,j,i,f){return this.ajax(this.instanceUrl+"/services/apexrest"+h,i,f,k,g,j)};b.Client.prototype.versions=function(g,f){return this.ajax("/",g,f)};b.Client.prototype.resources=function(g,f){return this.ajax("/"+this.apiVersion+"/",g,f)};b.Client.prototype.describeGlobal=function(g,f){return this.ajax("/"+this.apiVersion+"/sobjects/",g,f)};b.Client.prototype.metadata=function(f,h,g){return this.ajax("/"+this.apiVersion+"/sobjects/"+f+"/",h,g)};b.Client.prototype.describe=function(f,h,g){return this.ajax("/"+this.apiVersion+"/sobjects/"+f+"/describe/",h,g)};b.Client.prototype.describeLayout=function(f,h,i,g){h=h?h:"";return this.ajax("/"+this.apiVersion+"/sobjects/"+f+"/describe/layouts/"+h,i,g)};b.Client.prototype.create=function(g,f,i,h){return this.ajax("/"+this.apiVersion+"/sobjects/"+g+"/",i,h,"POST",JSON.stringify(f))};b.Client.prototype.retrieve=function(g,k,i,j,h){if(arguments.length==4){h=j;j=i;i=null}var f=i?"?fields="+i:"";return this.ajax("/"+this.apiVersion+"/sobjects/"+g+"/"+k+f,j,h)};b.Client.prototype.upsert=function(g,j,i,f,k,h){return this.ajax("/"+this.apiVersion+"/sobjects/"+g+"/"+j+"/"+i+"?_HttpMethod=PATCH",k,h,"POST",JSON.stringify(f))};b.Client.prototype.update=function(g,j,f,i,h){return this.ajax("/"+this.apiVersion+"/sobjects/"+g+"/"+j+"?_HttpMethod=PATCH",i,h,"POST",JSON.stringify(f))};b.Client.prototype.del=function(f,i,h,g){return this.ajax("/"+this.apiVersion+"/sobjects/"+f+"/"+i,h,g,"DELETE")};b.Client.prototype.query=function(h,g,f){return this.ajax("/"+this.apiVersion+"/query?q="+encodeURI(h),g,f)};b.Client.prototype.queryMore=function(g,h,f){return this.ajax(g,h,f)};b.Client.prototype.search=function(g,h,f){return this.ajax("/"+this.apiVersion+"/search?q="+encodeURI(g),h,f)};b.Client.prototype.batch=function(g,h,f){return this.ajax("/"+this.apiVersion+"/composite/batch",h,f,"POST",JSON.stringify(g))};b.Client.prototype.ownedFilesList=function(g,h,i,f){return this.ajax("/"+this.apiVersion+"/chatter/users/"+(g==null?"me":g)+"/files"+(h!=null?"?page="+h:""),i,f)};b.Client.prototype.filesInUsersGroups=function(g,h,i,f){return this.ajax("/"+this.apiVersion+"/chatter/users/"+(g==null?"me":g)+"/files/filter/groups"+(h!=null?"?page="+h:""),i,f)};b.Client.prototype.filesSharedWithUser=function(g,h,i,f){return this.ajax("/"+this.apiVersion+"/chatter/users/"+(g==null?"me":g)+"/files/filter/sharedwithme"+(h!=null?"?page="+h:""),i,f)};b.Client.prototype.fileDetails=function(g,f,i,h){return this.ajax("/"+this.apiVersion+"/chatter/files/"+g+(f!=null?"?versionNumber="+f:""),i,h)};b.Client.prototype.batchFileDetails=function(g,h,f){return this.ajax("/"+this.apiVersion+"/chatter/files/batch/"+g.join(","),h,f)};b.Client.prototype.fileRendition=function(g,f,l,i,k,h){var j=(l=="FLASH"?"application/x-shockwave-flash":(l=="PDF"?"application/pdf":"image/jpeg"));return this.getChatterFile(this.fileRenditionPath(g,f,l,i),j,k,h)};b.Client.prototype.fileRenditionPath=function(g,f,i,h){return"/"+this.apiVersion+"/chatter/files/"+g+"/rendition?type="+i+(f!=null?"&versionNumber="+f:"")+(h!=null?"&page="+h:"")};b.Client.prototype.fileContents=function(g,f,j,h){var i=null;return this.getChatterFile(this.fileContentsPath(g,f),i,j,h)};b.Client.prototype.fileContentsPath=function(g,f){return"/"+this.apiVersion+"/chatter/files/"+g+"/content"+(f!=null?"?versionNumber="+f:"")};b.Client.prototype.fileShares=function(f,h,i,g){return this.ajax("/"+this.apiVersion+"/chatter/files/"+f+"/file-shares"+(h!=null?"?page="+h:""),i,g)};b.Client.prototype.addFileShare=function(f,h,i,j,g){return this.create("ContentDocumentLink",{ContentDocumentId:f,LinkedEntityId:h,ShareType:i},j,g)};b.Client.prototype.deleteFileShare=function(g,h,f){return this.del("ContentDocumentLink",g,h,f)}}}).call(this,jQuery);