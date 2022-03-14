import { RequestHandler } from 'express';
export function use(middleware: RequestHandler) {
  return function (target: any, methodKey: string) {
    Reflect.defineMetadata('middleware', middleware, target, methodKey);
  };
}
