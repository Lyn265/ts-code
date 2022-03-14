import { RequestHandler, Router } from 'express';

enum Method {
  get = 'get',
  post = 'post',
}
export const router = Router();
// Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");
export function controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);
    const handler = target.prototype[key];
    const method: Method = Reflect.getMetadata('method', target.prototype, key);
    const middleware = Reflect.getMetadata('middleware', target.prototype, key);
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler);
      }
      router[method](path, handler);
    }
  }
}
// function login(path: string) {
//   return function (target: any, methodKey: string) {
//     Reflect.defineMetadata('path', path, target, methodKey);
//   };
// }
// export function get(path: string) {
//   return function (target: any, methodKey: string) {
//     Reflect.defineMetadata('path', path, target, methodKey);
//     Reflect.defineMetadata('method', 'get', target, methodKey);
//   };
// }
// export function post(path: string) {
//   return function (target: any, methodKey: string) {
//     Reflect.defineMetadata('path', path, target, methodKey);
//     Reflect.defineMetadata('method', 'post', target, methodKey);
//   };
// }
export function use(middleware: RequestHandler) {
  return function (target: any, methodKey: string) {
    Reflect.defineMetadata('middleware', middleware, target, methodKey);
  };
}

function getRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: any, methodKey: string) {
      Reflect.defineMetadata('path', path, target, methodKey);
      Reflect.defineMetadata('method', type, target, methodKey);
      // Reflect.defineMetadata('middleware', middleware, target, methodKey);
    };
  };
}
export const post = getRequestDecorator('post');
export const get = getRequestDecorator('get');
