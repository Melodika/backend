import VueWait from 'vue-wait';
import { LOADER_MODULE_NAME } from '@/loader/types';

export default ({ Vue, app }) => {
  Vue.use(VueWait);
  app.wait = new VueWait({
    useVuex: true,
    vuexModuleName: LOADER_MODULE_NAME,
    registerComponent: false,
    registerDirective: false,
  });
};
