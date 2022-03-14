"use strict";
// import { Router, Request, Response, NextFunction } from 'express';
// import path from 'path';
// import fs from 'fs';
// import Crowller from './utils/crowller';
// import Analyzer from './utils/analyzer';
// import { getResponseData } from './utils/util';
// interface bodyRequest extends Request {
//   body: {
//     [key: string]: string | undefined;
//   };
// }
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : undefined;
//   if (isLogin) {
//     next();
//   } else {
//     res.json(getResponseData(null, '请先登录'));
//   }
// };
// const router = Router();
// router.get('/', () => {});
// //登录
// router.post('/login', (req: bodyRequest, res: Response) => {
//   const isLogin = req.session ? req.session.login : undefined;
//   if (isLogin) {
//     res.json(getResponseData(null, '已经登录'));
//   } else {
//     if (req.session && req.body.password === '123') {
//       req.session.login = true;
//       res.json(getResponseData(true));
//     } else {
//       res.json(getResponseData(null, 'getData error'));
//     }
//   }
// });
// //退出
// router.get('/logout', (req: Request, res: Response) => {
//   if (req.session) {
//     req.session.login = undefined;
//   }
//   res.json(getResponseData(true));
// });
// router.get('/getData', checkLogin, (req: bodyRequest, res: Response) => {
//   const secretKey = 'x3b174jsx';
//   const url = `http://www.dell-lee.com/typescript/demo.html?secrect=${secretKey}`;
//   const analyzer = Analyzer.getInstance();
//   new Crowller(analyzer, url);
//   res.json(getResponseData(true));
// });
// router.get('/showData', checkLogin, (req: bodyRequest, res: Response) => {
//   try {
//     const position = path.resolve(__dirname, '../data/course.json');
//     const result = fs.readFileSync(position, 'utf8');
//     const jsonObj = JSON.parse(result);
//     res.json(getResponseData(jsonObj));
//   } catch (error) {
//     res.json(getResponseData(null, '文件不存在'));
//   }
// });
// export default router;
