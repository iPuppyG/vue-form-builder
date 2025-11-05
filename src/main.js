import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import ElementUI from "element-ui"
import VueI18n from "vue-i18n"
import VueEditor from "vue2-editor"
import FormMaking from "./index"
import "element-ui/lib/theme-chalk/index.css"
import enLocale from "element-ui/lib/locale/lang/en"
import zhLocale from "element-ui/lib/locale/lang/zh-CN"

Vue.use(VueI18n)
Vue.use(VueEditor)

const i18n = new VueI18n({
	locale: "zh-CN",
	messages: {
		"en-US": enLocale,
		"zh-CN": zhLocale,
	},
})

Vue.use(ElementUI, {
	size: "small",
	i18n: (key, value) => i18n.t(key, value),
})

Vue.use(FormMaking, {
	i18n,
})

new Vue({
	i18n,
	router,
	render: h => h(App),
}).$mount("#app")
