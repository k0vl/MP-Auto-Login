(function(){
	var q = document.querySelector.bind(document);
	if( q("#loginForm") && !q("p.error") ){
		chrome.storage.sync.get(["username", "password"], function(data) {
			if(data.username && data.password){
				q("#loginForm #nme").value = data.username;
				q("#loginForm #pwd").value = data.password;
				q("#loginForm [type=submit]").click();
			}else{
				alert("please set the username and password in the options page first.\n\n"
				+"(click the extension, then click \"Options\")\n");
			}
		});
	}
})();
