(function() {
  var escape;

  escape = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  window.plugins.code = (function() {
    var load;

    function code() {}

    load = function(callback) {
      wiki.getScript('/plugins/code/prettify.js', callback);
      return $('<style type="text/css"></style>').html('@import url("/plugins/code/prettify.css")').appendTo("head");
    };

    code.emit = function(div, item) {
      return load(function() {
        return div.append("<pre class='prettyprint'>" + (prettyPrintOne(escape(item.text))) + "</pre>");
      });
    };

    code.bind = function(div, item) {
      return load(function() {
        return div.dblclick(function() {
          return wiki.textEditor(div, item);
        });
      });
    };

    return code;

  })();

}).call(this);
