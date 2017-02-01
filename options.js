var gebi = document.getElementById.bind(document);
var messageTimeout;

function show_status(message){
	// Update status to let user know options were saved.
	var status = gebi('status');
	status.textContent = message;
	clearTimeout(messageTimeout);
	messageTimeout = setTimeout(function() {
		status.textContent = String.fromCharCode(160); // == &nbsp; this keeps height
	}, 1000);
}

function save_options(){
	chrome.storage.sync.set({
			username: gebi("user").value,
			password: gebi("pass").value
		},
		function(){show_status('Options saved.')}
	);
}

function clear_options(){
	gebi("user").value = "";
	gebi("pass").value = "";
	chrome.storage.sync.clear(function(){
		show_status('Options cleared.');
	});
}

function restore_options(){
	chrome.storage.sync.get(["username", "password"], function(data) {
		gebi("user").value = data.username || "";
		gebi("pass").value = data.password ? "******" : ""; //do not set actual password!
	});
	gebi("save").addEventListener('click', save_options);
	gebi("clear").addEventListener('click', clear_options);
}

document.addEventListener('DOMContentLoaded', restore_options);