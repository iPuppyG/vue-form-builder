import Vue from "vue"
import Router from "vue-router"
import FormDesigner from "../views/FormDesigner/index.vue"
import LanguageView from "./LanguageView.vue"
import PermissionManagement from "../views/PermissionManagement/index.vue"
import OrgManagement from "../views/OrgManagement/index.vue"

Vue.use(Router)

const language = localStorage.getItem("language") || (navigator.language == "zh-CN" ? "zh-CN" : "en-US")

export default new Router({
	routes: [
		{
			path: "/",
			redirect: to => ({ name: "form-designer", params: { lang: language } }),
		},
		{
			path: "/:lang",
			component: LanguageView,
			children: [
				{
					path: "",
					name: "form-designer",
					component: FormDesigner,
				},
				{
					path: "permission-management",
					name: "permission-management",
					component: PermissionManagement,
				},
				{
					path: "org-management",
					name: "org-management",
					component: OrgManagement,
				},
			],
		},
	],
})
