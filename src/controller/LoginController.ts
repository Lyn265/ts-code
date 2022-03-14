import { Request, Response } from 'express';
import 'reflect-metadata';
interface bodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
function get(path: string) {
  return function (target: any, methodKey: string) {
    Reflect.defineMetadata('path', path, target, methodKey);
  };
}
// Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");

class LoginController {
  @get('/')
  home(req: bodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
      res.send(
        `<body>
          <a href='/getData'>爬取内容</a>
          <a href='/showData'>展示内容</a>
          <a href='/logout'>退出</a>
        </body>`
      );
    } else {
      res.send(
        `<body>
        <form action='login' method='post'>
        <input type='password' name='password'/>
        <button>提交</button>
        </form>
        </body>`
      );
    }
  }
}
