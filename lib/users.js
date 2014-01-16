var sh = require("execSync");

exports.connected = function() {
	var result = sh.exec("who --ips");
	var data = result.stdout.split("\n");
	
	var result = [];
	
	for(i in data) {
		str = data[i];
		if(str == "") continue;
		
		str = str.replace(/\s+/g, " ");
		arr = str.split(" ");
		
		result[i] = {
			user : arr[0],
			ip   : arr[4].substr(1, arr[4].length-2),
			date : arr[2] + " " + arr[3]
		}
	}
	
	return result;
};