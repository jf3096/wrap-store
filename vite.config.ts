import useCommonViteConfig from './use-common-vite-config';
import { name } from './package.json';

/** 使用通用 vite 配置 */
export default useCommonViteConfig({
  name,
  dirname: __dirname,
});
