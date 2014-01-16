var sh = require("execSync");

exports.ram = function() {
	var result = sh.exec("free -mo");
	var ram = result.stdout.split("\n")[1];
	var match = ram.match(/([0-9]+)/g);
	
	var total   = parseInt(match[0]);
	var used    = parseInt(match[1]);
	var free    = parseInt(match[2]);
	var shared  = parseInt(match[3]);
	var buffers = parseInt(match[4]);
	var cached  = parseInt(match[5]);
	
	var result = {
		percentage : Math.round((used - buffers - cached) / total * 100),
		free       : free + buffers + cached,
		used       : used - buffers - cached,
		total      : total
	};
	result.icon = result.percentage < 80 ? "ok" : "warning-sign";
	result.bar  = result.percentage < 80 ? "success" : "warning";
	
	return result;
};

exports.swap = function() {
	var result = sh.exec("free -mo");
	var ram = result.stdout.split("\n")[2];
	var match = ram.match(/([0-9]+)/g);
	
	var total = parseInt(match[0]);
	var used  = parseInt(match[1]);
	var free  = parseInt(match[2]);
	
	var result = {
		percentage : Math.round(used / total * 100),
		free       : free,
		used       : used,
		total      : total
	};
	result.icon = result.percentage < 80 ? "ok" : "warning-sign";
	result.bar  = result.percentage < 80 ? "success" : "warning";
	
	return result;
};