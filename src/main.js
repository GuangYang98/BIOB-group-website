import Vue from 'vue'
import app from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'aos/dist/aos.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueUI from 'view-design'
import routes from './routes'

import 'hover.css/css/hover.css'
import 'view-design/dist/styles/iview.css'

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.use(VueUI);
Vue.use(Vuex);

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)


const router = new VueRouter({
  routes,
});


new Vue({
  router,
  //store,
  render: h => h(app)
}).$mount('#app');


