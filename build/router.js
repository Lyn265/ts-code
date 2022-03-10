"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var crowller_1 = __importDefault(require("./utils/crowller"));
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var util_1 = require("./utils/util");
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(null, '请先登录'));
    }
};
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send("<body>\n        <a href='/getData'>\u722C\u53D6\u5185\u5BB9</a>\n        <a href='/showData'>\u5C55\u793A\u5185\u5BB9</a>\n        <a href='/logout'>\u9000\u51FA</a>\n      </body>");
    }
    else {
        res.send("<body>\n      <form action='login' method='post'>\n      <input type='password' name='password'/>\n      <button>\u63D0\u4EA4</button>\n      </form>\n      </body>");
    }
});
//登录
router.post('/login', function (req, res) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.json((0, util_1.getResponseData)(null, '已经登录'));
    }
    else {
        if (req.session && req.body.password === '123') {
            req.session.login = true;
            res.json((0, util_1.getResponseData)(true));
        }
        else {
            res.json((0, util_1.getResponseData)(null, 'getData error'));
        }
    }
});
//退出
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json((0, util_1.getResponseData)(true));
});
router.get('/getData', checkLogin, function (req, res) {
    var secretKey = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secrect=".concat(secretKey);
    var analyzer = analyzer_1.default.getInstance();
    new crowller_1.default(analyzer, url);
});
router.get('/showData', checkLogin, function (req, res) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(position, 'utf8');
        var jsonObj = JSON.parse(result);
        res.json((0, util_1.getResponseData)(jsonObj));
    }
    catch (error) {
        res.json((0, util_1.getResponseData)(null, '文件不存在'));
    }
});
exports.default = router;
