import axios from 'axios';
import VueAxios from 'vue-axios';

export default ({ Vue }) => {
  const instance = axios.create({ baseURL: process.env.AXIOS_BASE_URL });
  Vue.use(VueAxios, instance);
};
