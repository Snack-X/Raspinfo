var sh = require("execSync");

exports.hdd = function() {
	var result = sh.exec('df -T | grep -vE "tmpfs|rootfs|Filesystem"');
	var drives = result.stdout.split("\n");
	
	result = [];
	
	for(d in drives) {		
		drive = drives[d];
		if(drive == "") continue;
		
		match = drive.match(/\S+/g);
		
		fs      = match[0];
		type    = match[1];
		size    = parseInt(match[2]);
		used    = parseInt(match[3]);
		avail   = parseInt(match[4]);
		percent = parseInt(match[5].substr(0, match[5].length - 1));
		mount   = match[6];
		
		result[d] = {
			name       : mount,
			total      : prefix(size),
			free       : prefix(avail),
			used       : prefix(size - avail),
			format     : type,
			percentage : percent
		};
		result[d].icon = result[d].percentage < 80 ? "ok" : "warning-sign";
		result[d].bar  = result[d].percentage < 80 ? "success" : "warning";
	}
	
	return result;
};

function prefix(size) {
	var p = ["K", "M", "G", "T"];
	var i = 0;
	var s = size;
	
	while(i < 3 && s > 1024) {
		i++;
		s = s / 1024;
	}
	
	return (Math.round(s * 100) / 100) + p[i];
}