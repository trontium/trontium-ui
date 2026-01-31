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
  themeConfig: {
    name: 'Trontium',
    logo: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
    socialLinks: {
      github: 'https://github.com/trontium/trontium-ui',
    },
    nav: [
      { title: 'Guide', link: '/getting-started' },
      { title: 'Components', link: '/components/button' },
    ],
    footer: 'Open-source MIT Licensed | Copyright © 2026 Trontium UI Team',
  },
  favicons: [
    'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
  ],
  exportStatic: {},
  forkTSChecker: {},
});
