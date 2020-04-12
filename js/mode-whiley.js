ace.define('ace/mode/whiley', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var Tokenizer = require("ace/tokenizer").Tokenizer;
    var WhileyHighlightRules = require("ace/mode/whiley_highlight_rules").WhileyHighlightRules;

    var getKeywords = function() {
      return ["all", "any", "assert", "assume", "bool", "break", "byte",
        "catch", "case", "catch", "char", "continue", "constant", "debug",
        "default", "do", "else", "ensures", "export", "false", "finite", "for",
        "function", "fail", "from", "if", "import", "in", "int", "is", "method",
        "native", "new", "no", "null", "package", "private", "protected",
        "property", "public", "requires", "return", "skip", "some", "string",
        "switch", "total", "throw", "throws", "true", "try", "type", "void",
        "where", "while"];
    };

    var Mode = function() {
        this.$tokenizer = new Tokenizer(new WhileyHighlightRules().getRules());
    };
    oop.inherits(Mode, TextMode);

    exports.Mode = Mode;
    exports.keywords = getKeywords();
});

ace.define('ace/mode/whiley_highlight_rules', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var WhileyHighlightRules = function() {

        var types = (
            "void|any|bool|byte|char|int|string"
        );

        var keywordMapper = this.createKeywordMapper({
            "type": types,
            "keyword": require('ace/mode/whiley').keywords.join("|")
        }, "identifier");

        this.$rules = {
            "start": [{
                token : "comment",
                regex : "\\/\\/.*$"
            }, {
                token : "comment",
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string",
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string",
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token: "constant.numeric",
                regex: "\\d+(.\\d+)?"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "constant.language",
                regex : "(?:true|false|null)\\b"
            }, {
                token: "function",
                regex: "==|!=|>=|<=|&&|=|!|>|<|&|\\|\\||\\||\\+|\\-|\\*|%|\\/]"
            }, {
                token : "paren.lparen",
                regex : "[\\[\\(\\{]"
            }, {
                token : "paren.rparen",
                regex : "[\\]\\)\\}]"
            }, {
                token : "text",
                regex : "\\s+"
            }],
            "comment": [{
                token : "comment",
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                token : "comment",
                regex : ".+"
            }]
        }
    };

    oop.inherits(WhileyHighlightRules, TextHighlightRules);

    exports.WhileyHighlightRules = WhileyHighlightRules;
});
