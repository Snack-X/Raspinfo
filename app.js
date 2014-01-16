var express = require("express");
var http    = require("http");
var path    = require("path");
var swig    = require("swig");

var routes  = require("./routes.js");

var app = express();

app.set("port", process.env.PORT || 2001);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", swig.renderFile);
swig.setDefaults({ cache: false });

app.configure("development", function() {
	app.use(express.logger("dev"));
	app.use(express.errorHandler());
});

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, "static")));

app.get("/", routes.overview);
app.get("/overview", routes.overview);
app.get("/detail", routes.detail);

http.createServer(app).listen(app.get("port"), function(){
	console.log("Raspinfo is running at port " + app.get("port"));
});