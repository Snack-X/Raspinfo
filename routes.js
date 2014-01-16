var rpi     = require("./lib/rpi.js");
var uptime  = require("./lib/uptime.js");
var memory  = require("./lib/memory.js");
var cpu     = require("./lib/cpu.js");
var storage = require("./lib/storage.js");
var network = require("./lib/network.js");
var users   = require("./lib/users.js");

exports.overview = function(req, res) {
	var mem_stat  = memory.ram();
	var swap_stat = memory.swap();
	var cpu_stat  = cpu.cpu();
	var heat_stat = cpu.heat();

	var variables = {
		hostname    : rpi.hostname(),
		internal_ip : rpi.internal_ip(),
		external_ip : rpi.external_ip(),
		uptime      : uptime.uptime(),
		ram_icon    : mem_stat.icon,
		swap_icon   : swap_stat.icon,
		load_icon   : cpu_stat.icon,
		heat_icon   : heat_stat.icon,
		drives      : storage.hdd(),
		network     : network.connections(),
		user_count  : users.connected().length
	};
	
	res.render("overview", variables);
};

exports.detail = function(req, res) {
	var variables = {
		rpi      : rpi,
		uptime   : uptime,
		ram      : memory.ram(),
		swap     : memory.swap(),
		cpu      : cpu.cpu(),
		cpu_temp : cpu.heat(),
		drives   : storage.hdd(),
		network  : network.connections(),
		ethernet : network.ethernet(),
		users    : users.connected()
	};
	
	res.render("detail", variables);
};