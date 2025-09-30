import Vue from 'vue'
import App from './App.vue'
import './style.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import store from '@/store'
import axioser from '@/axios'
import axios from 'axios'
import * as login from '@/api/login';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import Prism from 'prismjs';
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';

// 引入使用主题的样式
// import '@kangc/v-md-editor/lib/theme/style/vuepress';

VueMarkdownEditor.use(vuepressTheme, {
	Prism,
	extend(md) {
	  // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
	  // md.set(option).use(plugin);
	},
  });
Vue.use(VueMarkdownEditor);

Vue.use(VMdPreviewHtml);

Vue.use(ElementUI);

Vue.use(axioser, axios);

// 路由拦截器
router.beforeEach((to, from, next) => {

	if (to.path === '/admin') {

		login.checkAdminTokenAPI()
		.then((resp) => {

			const content = resp.data;
	
			if (content.check) {
				next();
			}
			else {

				ElementUI.Message.warning(content.message);
				next({path: "/login"});

			}

		});
	}

	else if (['/scienceResearch/networkAnalysis'].includes(to.path)) {
		next();
		return;
	}

	else if (['/login', '/'].includes(to.path)) {

		const token = localStorage.getItem("token");

		if (token == null) {

			next();
			return;

		}

		login.checkTokenAPI()
		.then((resp) => {

			const content = resp.data;
	
			if (content.check) {
				next({path: "/desktop"});
			}
			else {

				localStorage.removeItem("token");
				ElementUI.Message.warning(content.message);
				next({path: "/login"});

			}

		});
	}

	else if (to.matched.some(res => res.meta.requireAuth)) {

		const token = localStorage.getItem("token");

		if (token == null) {

			ElementUI.Message.warning("请先登录");
			next({path: "/login"});
			return;

		}

		login.checkTokenAPI()
		.then((resp) => {

			const content = resp.data;
	
			if (content.check) {
				next();	
			}
			else {

				localStorage.removeItem("token");
				ElementUI.Message.warning(content.message);
				next({path: "/login"});

			}

		});


	}
	else {
		next();
	}
});


new Vue({
	render: h => h(App),
	router: router,
    store: store
}).$mount('#app');
