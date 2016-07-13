mappings = {};

function readFile(evt, callback) {
    var f = evt.target.files[0]; 

    if (f) {
      	var r = new FileReader();
      	r.onload = function(e) { 
	  	    var contents = e.target.result;
	  	    var usernames = contents.split('\n').map(function(s) {return decodeURI(s.trim())});
	  	    fetchGitNames(usernames);
      	}
      	r.readAsText(f);
    } else { 
      	alert("Failed to load file");
    }
}

var fetchGitNames = function(usernames) {
	var reqs = [];

	for (var i = 0; i < usernames.length; i++) {
		currentUname = usernames[i];
		//Assume names having spaces or starts with capital are real names
		if(usernames[i].indexOf(' ') < 0) {
			$.ajax({
			  	url: "https://api.github.com/users/" + usernames[i]
			}).done(function(resp) {
				console.log(resp.name);
				mappings[resp.login] = resp.name;
			});
		}
	}

}

document.getElementById('fileinput').addEventListener('change', readFile, false);

$(document).ajaxComplete(function(event, xhr, settings) {
	$('#results').empty();
  	for(var uname in mappings) {
		$('#results').append("<p>" + uname + ": " + mappings[uname] + "</p>");
	}
});