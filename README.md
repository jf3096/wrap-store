# @xfe-team/wrap-store

> 用于内部 mobx 状态管理使用

## 安装

```bash
npm install @xfe-team/wrap-store
```

## 使用
```js
/**
 * 外装列表
 * @param store {DressListStore} 逻辑
 * @param className {string} 样式
 */
const DressList = ({ store, className }) => {
  return (
    <div className={cx(className, styles.root)}>
      {store.$items.map((item, index) => {
        return <DressItem className={styles.item} store={item} key={index} />;
      })}
    </div>
  );
};

export default wrapStore(DressList, DressListStore);
```

## 0.0.1 (2021-10-26)

* init commit

## 作者
Ailun She