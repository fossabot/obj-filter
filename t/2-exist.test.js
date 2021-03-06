"use strict";
var test = require("tape"); // assign the tape library to the variable "test"
var appRoot = require("app-root-path");
var filter = require(appRoot + "/index.js");

var template = {
	"vm": undefined,
	"runtime": {
		"connectionState": undefined,
		"powerState": function (args) {return "HELLO WORLD " + args;},
		"bootTime": ["my boot time"],
		"obj jj": { "kk": "yy" }
	},
	"running": Boolean
};

var data_success = {
	"runtime": {
		"device": 9999,
		"connectionState": "connected",
		"powerState": "poweredOn",
		"bootTime": 2,
		"obj jj": { "kk": "zz" }
	},
	"running": false
};

var data_fail = {
	"runtime": {
		"device": 9999,
		"connectionState": "connected",
		"powerState": "poweredOn",
		"bootTime": undefined,
		"paused": false,
		"snapshotInBackground": false
	}
};

var exam_success  = {
	"runtime": {
		"powerState": "HELLO WORLD poweredOn",
		"bootTime": 2,
		"obj jj": { "kk": "zz" }
	},
	"running": false
};


test("filter.exist with undefined template should fail", function (t) {
	var result_fail = filter.exist(undefined, data_success);
	t.false(result_fail);
	t.end();
});

test("filter.exist with String Type template", function (t) {
	t.equal("data", filter.exist(String, "data"), "string matches String");
	t.false(filter.exist(String, String), "not equal to `String` object");
	t.equal("cb", filter.exist(String, 1, () => { return "cb"; }));
	t.end();
});

test("filter.exist should contain: runtime, connectionState, powerState, bootTime, obj jj, kk", function (t) {
	var result = filter.exist(template, data_success);
	t.deepEqual(result, exam_success);
	t.end();
});

test("filter.exist should fail", function (t) {
	var result_fail = filter.exist(template, data_fail);
	t.false(result_fail);
	t.false(filter.exist(template, undefined));
	t.false(filter.exist(template, data_fail, () => {return undefined;} ));
	t.end();
});