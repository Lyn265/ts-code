"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.send("<body>\n    <form action='getData' method='post'>\n    <input type='password' name='password'/>\n    <button>\u63D0\u4EA4</button>\n    </form>\n    </body>");
});
router.post('/getData', function (req, res) {
    if (req.body.password === '123') {
        var secretKey = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secrect=".concat(secretKey);
        var analyzer = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(analyzer, url);
        res.send('getData success');
    }
    else {
        res.send("".concat(req.body.name, " getData error"));
    }
});
exports.default = router;
