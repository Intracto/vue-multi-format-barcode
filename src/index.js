import MultiFormatBarcode from "./MultiFormatBarcode.vue";

export default {
  install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("multi-format-barcode", MultiFormatBarcode);
  }
};