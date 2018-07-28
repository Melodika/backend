import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/ru';

export default ({ Vue }) => {
  Vue.use(VueMoment, { moment });
};
