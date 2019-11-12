import { Toast } from "materialize-css";

export default {
  install(Vue: any, options: any) {
    Vue.prototype.$message = function(html: string) {
      new Toast({ html });
    };

    Vue.prototype.$error = function(html: string) {
      new Toast({ html: `[Error]: ${html}` });
    };
  }
};
