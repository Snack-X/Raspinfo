var sh = require("execSync");

exports.connections = function() {
	var result = sh.exec("netstat -nta --inet | wc -l");
	var connections = parseInt(result.stdout) - 1;
	
	result = {
		connections : connections,
	};
	result.icon = result.connections < 50 ? "ok" : "warning-sign";
	
	return result;
};

exports.ethernet = function() {
	var result = sh.exec('/sbin/ifconfig eth0 | grep "RX bytes"');
	result = result.stdout;
	
	var match = result.match(/RX bytes\:([0-9]*).*TX bytes\:([0-9]*)/);
	var rx = parseInt(match[1]);
	var tx = parseInt(match[2]);
	
	result = {
		up    : prefix(tx),
		down  : prefix(rx),
		total : prefix(rx + tx)
	};
	
	return result;
};

function prefix(size) {
	var p = ["K", "M", "G", "T"];
	var i = 0;
	var s = size / 1024;
	
	while(i < 3 && s > 1024) {
		i++;
		s = s / 1024;
	}
	
	return (Math.round(s * 100) / 100) + p[i];
}