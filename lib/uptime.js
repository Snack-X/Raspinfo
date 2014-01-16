var os = require("os");

exports.uptime = function() {
	var uptime = Math.floor(os.uptime());
	
	var s = uptime % 60;  uptime = (uptime - s) / 60;
	var m = uptime % 60;  uptime = (uptime - m) / 60;
	var h = uptime % 24;  uptime = (uptime - h) / 24;
	var d = uptime % 365; uptime = (uptime - d) / 365;
	var y = uptime;
	
	var result = "";
	
	if(y > 0) result = result + y + (y > 1 ?   " years " :   " year ");
	if(d > 0) result = result + d + (d > 1 ?    " days " :    " day ");
	if(h > 0) result = result + h + (h > 1 ?   " hours " :   " hour ");
	if(m > 0) result = result + m + (m > 1 ? " minutes " : " minute ");
	if(s > 0) result = result + s + (s > 1 ? " seconds " : " second ");
	
	result = result.replace(/\s+/g, " ");
	return result;
};