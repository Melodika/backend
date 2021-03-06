import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';

export default ({ Vue }) => {
  Vue.use(VeeValidate);
  Validator.localize('ru', ru);
};
