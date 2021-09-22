import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.config.productionTip = false;
Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: true }
});
