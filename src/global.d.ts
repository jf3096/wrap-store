/** 通用对象泛型类型 */
export interface IAnyObject<T = any> {
  [key: string]: T;
}
