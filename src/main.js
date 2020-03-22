import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App)
}).$mount("#app");
