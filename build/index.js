"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    req.body.name = 'wahaha';
    next();
});
app.use(router_1.default);
app.listen(3000, function () {
    console.log('app is running');
});