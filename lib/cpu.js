var sh = require("execSync");
var os = require("os");
var fs = require("fs");

exports.cpu = function() {
	var loadavg = os.loadavg();
	
	var cpu_curfreq = Math.round(parseInt(fs.readFileSync("/sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq", { encoding : "utf8" })) / 1000);
	var cpu_minfreq = Math.round(parseInt(fs.readFileSync("/sys/devices/system/cpu/cpu0/cpufreq/scaling_min_freq", { encoding : "utf8" })) / 1000);
	var cpu_maxfreq = Math.round(parseInt(fs.readFileSync("/sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq", { encoding : "utf8" })) / 1000);
	var cpu_freq_governor = fs.readFileSync("/sys/devices/system/cpu/cpu0/cpufreq/scaling_governor", { encoding : "utf8" });
	
	var result = {
		load   : Math.round(loadavg[0] * 100) / 100,
		load5  : Math.round(loadavg[1] * 100) / 100,
		load15 : Math.round(loadavg[2] * 100) / 100,
		freq : {
			current  : cpu_curfreq,
			min      : cpu_minfreq,
			max      : cpu_maxfreq,
			governor : cpu_freq_governor.substr(0, cpu_freq_governor.length - 1)
		}
	};
	result.icon = result.load < 1 ? "ok" : "warning-sign";
	
	return result;
};

exports.heat = function() {
	var curtemp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp", { encoding : "utf8" });
	curtemp = curtemp.replace("\n", "");
	curtemp = Math.round(parseInt(curtemp) / 100) / 10;
	
	var percentage = Math.round(curtemp / 85 * 100);
	
	var result = {
		temp       : curtemp,
		percentage : percentage
	};
	     if(percentage >= 80) { result.bar = "danger"; }
	else if(percentage >= 60) { result.bar = "warning"; result.icon = "warning-sign"; }
	else                      { result.bar = "success"; result.icon = "ok"; }
	
	return result;
};