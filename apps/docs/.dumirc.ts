import { defineConfig } from 'dumi';
import path from 'path';

let base: string | undefined;
let publicPath: string | undefined;

// Github Pages 部署时需要更换为自己的仓库名
if (process.env.NODE_ENV === 'production' && process.env.PREVIEW !== '1') {
  base = '/trontium-ui/';
  publicPath = '/trontium-ui/';
}

export default defineConfig({
  base,
  publicPath,
  title: 'Trontium UI',
  outputPath: 'doc-site',
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: '../../packages/ui/src' }],
  },
  alias: {
    '@trontium/ui': path.resolve(__dirname, '../../packages/ui/src'),
  },
  exportStatic: {},
  forkTSChecker: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@trontium/ui',
        libraryDirectory: '',
        customStyleName: (name: string) =>
          path.resolve(__dirname, `../../packages/ui/src/${name}/style/index.ts`),
      },
    ],
  ],
});
