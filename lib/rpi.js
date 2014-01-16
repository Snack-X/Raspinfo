var sh = require("execSync");
var os = require("os");

exports.distribution = function() {
	var result = sh.exec("cat /etc/*-release | grep PRETTY_NAME=");
	result = result.stdout;
	
	result = result.match(/PRETTY_NAME=\"(.*)\"/)[1];
	return result;
};

exports.kernel = function() {
	var result = sh.exec("uname -mrs");
	result = result.stdout.replace("\n", "");
	return result;
};

exports.firmware = function() {
	var result = sh.exec("uname -v");
	result = result.stdout.replace("\n", "");
	return result;
};

exports.hostname = function() {
	return os.hostname();
};

exports.internal_ip = function() {
	var nif = os.networkInterfaces();
	for(i in nif) {
		for(i2 in nif[i]) {
			if(nif[i][i2].family == "IPv4" && nif[i][i2].internal === false) return nif[i][i2].address;
		}
	}
};

exports.external_ip = function() {
	var result = sh.exec("curl -s http://korsnack.kr/ip.php");
	return result.stdout;
};