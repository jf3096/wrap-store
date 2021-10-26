import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { IAnyObject } from './global';

/**
 * wrap store 高阶包裹组件 props 属性
 */
export interface IWrapStoreHOCProps extends IAnyObject {
  store?: IAnyObject;
}

/**
 * 通用 class
 */
export type IClass = { new(...args: any[]): any }

/**
 * 选项参数
 */
export interface IWrapStoreOptions {
  create: () => any;
}

/**
 * 当外部没有提供 store 时, 可以自动注入创建匿名 store, 并捆绑对应组件
 * @example
 *   wrapStore(TinyInput, TinyInputStore);
 */
function wrapStore<TProps = any>(Component: React.FC<any>, StoreClass: IClass | IWrapStoreOptions): React.FC<TProps> {
  const ObserverComponent = observer(Component);
  return ({ store, ...rest }: IWrapStoreHOCProps) => {
    const memoStore = useMemo(() => {
      if (store) {
        return store;
      }
      if (typeof StoreClass === 'function') {
        return new StoreClass();
      } else {
        return StoreClass.create();
      }
    }, []);
    return <ObserverComponent store={memoStore} {...rest} />;
  };
}

export default wrapStore;
