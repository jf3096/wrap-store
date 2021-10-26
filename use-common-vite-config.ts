import { defineConfig, UserConfigExport } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';
import invariant from 'tiny-invariant';

/** Vite 配置参数定义 */
export interface IUseCommonViteConfigParams {
  /** UMD 包名 */
  name: string;
  /** 剔除外部字段 */
  external?: string[];
  /** 所在包目录 */
  dirname: string;
}

/** 使用通用的 vite 配置 */
const useCommonViteConfig = ({
  name: packageName,
  external,
  dirname,
}: IUseCommonViteConfigParams) => {
  /** 检查确保 name 属性存在 */
  invariant(!!packageName, '请确认传入 {name}, 该字段用于作为 UMD 包名');
  invariant(
    !!dirname,
    '请确认传入 {dirname}, 该字段用于作为标记内部工具包所在目录',
  );
  /** 属性 */
  let options: UserConfigExport = {
    plugins: [
      reactRefresh(),
    ],
    define: {
      'process.env': {
        // VITE_RUN_ENV: 'test'
      },
    },
    server: {
      host: '0.0.0.0',
      fs: {
        strict: false,
      },
    },
  };
  /** 正式环境时以打包的形式 */
  if (process.env.NODE_ENV === 'production') {
    options = {
      build: {
        /** 输出文件夹 */
        outDir: 'lib',
        /** 当前库配置 */
        lib: {
          /** 程序入口点 */
          entry: path.resolve(dirname, 'src/library.tsx'),
          /** 格式 */
          formats: ['es', 'cjs', 'umd'],
          /** 全局 UMD 命令暴露的全局变量, 即: window[下面的名称] */
          name: packageName,
          /** 文件名 */
          fileName: (format: string) => `index.${format}.js`,
        },
        /** Rollup 设置 */
        rollupOptions: {
          /** 确保外部化处理那些你不想打包进库的依赖 */
          external: external || [
            'react',
            'react-dom',
            'mobx',
            'mobx-react',
          ],
        },
      },
      server: {
        fs: {
          strict: false,
        },
      },
    };
  }
  return defineConfig(options);
};

export default useCommonViteConfig;
