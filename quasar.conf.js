const path = require('path');
const env = require('dotenv').config().parsed;
require('@babel/polyfill');

function parsedEnv(env) {
  let result = {};
  Object.keys(env).map((key) => {
    if (typeof env[key] === 'string') {
      result[key] = JSON.stringify(env[key]);
    }
  });

  return result;
}

module.exports = function () {
  return {
    extras: ['mdi'],
    plugins: ['axios', 'auth', 'moment', 'validate', 'wait'],
    css: ['main.scss'],
    supportIE: false,
    build: {
      env: parsedEnv(env),
      vueRouterMode: 'history',
      extendWebpack(cfg, { isClient }) {
        if (isClient) {
          cfg.entry.app.unshift('@babel/polyfill');
        }
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/,
        });
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@': path.resolve(__dirname, 'src'),
        };
      },
    },
    devServer: {
      open: true,
    },
    framework: {
      components: [
        'QLayout', 'QLayoutHeader', 'QLayoutDrawer', 'QLayoutFooter', 'QPageContainer', 'QPage',
        'QCard', 'QCardTitle', 'QCardMain', 'QCardSeparator', 'QCardActions',
        'QToolbar', 'QToolbarTitle',
        'QTable', 'QTr', 'QTd',
        'QTabs', 'QTab', 'QRouteTab',
        'QBreadcrumbs', 'QBreadcrumbsEl',
        'QField', 'QInput', 'QSearch', 'QBtn',
        'QPopover', 'QCollapsible',
        'QList', 'QListHeader',
        'QItem', 'QItemMain', 'QItemSide', 'QItemTile', 'QItemSeparator',
        'QScrollArea', 'QInnerLoading', 'QSpinnerMat', 'QAjaxBar',
      ],
      plugins: ['Dialog', 'Notify'],
      iconSet: 'mdi',
      i18n: 'ru',
    },
  };
};
