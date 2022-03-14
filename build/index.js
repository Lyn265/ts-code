"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/CrowllerController");
var decorator_1 = require("./controller/decorator");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['secret'],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use(function (req, res, next) {
    req.body.name = 'wahaha';
    next();
});
app.use(decorator_1.router);
app.listen(3000, function () {
    console.log('app is running');
});
