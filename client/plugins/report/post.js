// Generated by CoffeeScript 1.4.0
(function() {
  var compose, exec, farm, fold, fs, header, pageObject, pagePaths, print, report,
    __slice = [].slice;

  exec = require('child_process').exec;

  fs = require('fs');

  report = require('./report.js');

  farm = '../../../data/farm';

  print = function() {
    var arg;
    arg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return console.log.apply(console, arg);
  };

  fold = function(text) {
    return text.match(/(\S*\s*){1,9}/g).join("\n");
  };

  header = function(fields) {
    var k, v;
    return ((function() {
      var _results;
      _results = [];
      for (k in fields) {
        v = fields[k];
        _results.push("" + k + ": " + v);
      }
      return _results;
    })()).join("\n");
  };

  compose = function(page) {
    var item, result, _i, _len, _ref;
    result = [];
    _ref = page.story;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item.type === 'paragraph') {
        result.push(fold(item.text));
      }
    }
    return result.join("\n");
  };

  pagePaths = function(sufix, done) {
    return exec("ls " + farm + "/*/pages/*-" + sufix, function(err, stdout, stderr) {
      return done(stdout.split(/\n/));
    });
  };

  pageObject = function(path, done) {
    var text;
    return text = fs.readFile(path, 'utf8', function(err, text) {
      return done(JSON.parse(text));
    });
  };

  pagePaths('report', function(paths) {
    return pageObject(paths[0], function(page) {
      var schedule, site, slug, x, _ref;
      schedule = report.decode(page.story[1].text);
      _ref = paths[0].split('/'), x = _ref[0], x = _ref[1], x = _ref[2], x = _ref[3], x = _ref[4], site = _ref[5], x = _ref[6], slug = _ref[7];
      return print([
        header({
          To: schedule[0].recipients.join(", "),
          Subject: "" + page.title + " (" + schedule[0].interval + ")"
        }), compose(page), "See details at http://" + site + "/" + slug + ".html"
      ].join("\n\n"));
    });
  });

}).call(this);
