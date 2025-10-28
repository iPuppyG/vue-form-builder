<template>
	<el-container class="fm-style">
		<el-aside class="aside-container" width="256px">
			<div class="widget-component-library-title">{{ $t("fm.description.componentLibrary") }}</div>
			<div class="widget-groups">
				<!-- 基础控件 -->
				<template v-if="basicFields.length">
					<div class="widget-group-title">{{ $t("fm.components.basic.title") }}</div>
					<draggable
						class="widget-group"
						:list="basicComponents"
						v-bind="{ group: { name: 'people', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
						@end="handleMoveEnd"
						@start="handleMoveStart"
						:move="handleMove"
					>
						<template v-for="(item, index) in basicComponents">
							<li
								v-if="basicFields.indexOf(item.type) >= 0"
								class="widget-item"
								:class="{ 'no-put': item.type == 'divider' }"
								:key="index"
							>
								<a class="widget-content">
									<i class="icon" :class="item.icon"></i>
									<span>{{ item.name }}</span>
								</a>
							</li>
						</template>
					</draggable>
				</template>

				<!-- 高级控件 -->
				<template v-if="advanceFields.length">
					<div class="widget-group-title">{{ $t("fm.components.advance.title") }}</div>
					<draggable
						class="widget-group"
						:list="advanceComponents"
						v-bind="{ group: { name: 'people', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
						@end="handleMoveEnd"
						@start="handleMoveStart"
						:move="handleMove"
					>
						<template v-for="(item, index) in advanceComponents">
							<li
								v-if="advanceFields.indexOf(item.type) >= 0"
								class="widget-item"
								:class="{ 'no-put': item.type == 'table' }"
								:key="index"
							>
								<a class="widget-content">
									<i class="icon" :class="item.icon"></i>
									<span>{{ item.name }}</span>
								</a>
							</li>
						</template>
					</draggable>
				</template>

				<!-- 布局控件 -->
				<template v-if="layoutFields.length">
					<div class="widget-group-title">{{ $t("fm.components.layout.title") }}</div>
					<draggable
						class="widget-group"
						:list="layoutComponents"
						v-bind="{ group: { name: 'people', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
						@end="handleMoveEnd"
						@start="handleMoveStart"
						:move="handleMove"
					>
						<template v-for="(item, index) in layoutComponents">
							<li v-if="layoutFields.indexOf(item.type) >= 0" class="widget-item no-put" :key="index">
								<a class="widget-content">
									<i class="icon" :class="item.icon"></i>
									<span>{{ item.name }}</span>
								</a>
							</li>
						</template>
					</draggable>
				</template>
			</div>
		</el-aside>

		<el-container class="center-container" direction="vertical">
			<el-header class="header">
				<div class="title-container">
					<span class="title">{{ $t("fm.description.formDesigner") }}</span>
					<span class="desc">{{ $t("fm.description.formDesignerDesc") }}</span>
				</div>
				<div>
					<slot name="action"></slot>
					<el-button v-if="upload" size="small" @click="handleUpload">
						{{ $t("fm.actions.import") }}
					</el-button>
					<el-button v-if="clearable" size="small" @click="handleClear">
						{{ $t("fm.actions.clear") }}
					</el-button>
					<el-button v-if="preview" size="small" icon="el-icon-view" @click="handlePreview">
						{{ $t("fm.actions.preview") }}
					</el-button>
					<el-button v-if="save" type="primary" size="small" icon="el-icon-collection">
						{{ $t("fm.actions.save") }}
					</el-button>
					<el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">
						{{ $t("fm.actions.json") }}
					</el-button>
					<el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">
						{{ $t("fm.actions.code") }}
					</el-button>
				</div>
			</el-header>
			<el-main>
				<widget-form v-if="!resetJson" ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect" />
			</el-main>
		</el-container>

		<el-aside class="widget-config-container">
			<widget-config :data="widgetFormSelect" />
		</el-aside>

		<cus-dialog :visible="previewVisible" @on-close="previewVisible = false" ref="widgetPreview" width="1000px" form>
			<generate-form
				:edit="formEdit"
				@on-change="handleDataChange"
				v-if="previewVisible"
				:data="widgetForm"
				:value="widgetModels"
				:remote="remoteFuncs"
				ref="generateForm"
			/>
			<template slot="action">
				<el-button @click="handleReset">{{ $t("fm.actions.reset") }}</el-button>
				<el-button type="primary">{{ $t("fm.actions.submit") }}</el-button>
			</template>
		</cus-dialog>

		<cus-dialog
			:visible="uploadVisible"
			@on-close="uploadVisible = false"
			@on-submit="handleUploadJson"
			ref="uploadJson"
			width="800px"
			form
		>
			<el-alert type="info" :title="$t('fm.description.uploadJsonInfo')"></el-alert>
			<div id="uploadeditor" style="height: 400px; width: 100%">{{ jsonEg }}</div>
		</cus-dialog>

		<cus-dialog :visible="jsonVisible" @on-close="jsonVisible = false" ref="jsonPreview" width="800px" form>
			<div id="jsoneditor" style="height: 400px; width: 100%">{{ jsonTemplate }}</div>

			<template slot="action">
				<el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">
					{{ $t("fm.actions.copyData") }}
				</el-button>
			</template>
		</cus-dialog>

		<cus-dialog
			:visible="codeVisible"
			@on-close="codeVisible = false"
			ref="codePreview"
			width="800px"
			form
			:action="false"
		>
			<el-tabs type="border-card" style="box-shadow: none" v-model="codeActiveName">
				<el-tab-pane label="Vue Component" name="vue">
					<div id="vuecodeeditor" style="height: 500px; width: 100%">{{ vueTemplate }}</div>
				</el-tab-pane>
				<el-tab-pane label="HTML" name="html">
					<div id="codeeditor" style="height: 500px; width: 100%">{{ htmlTemplate }}</div>
				</el-tab-pane>
			</el-tabs>
		</cus-dialog>
	</el-container>
</template>

<script>
import Draggable from "vuedraggable"
import WidgetConfig from "./WidgetConfig"
import FormConfig from "./FormConfig"
import WidgetForm from "./WidgetForm"
import CusDialog from "./CusDialog"
import GenerateForm from "./GenerateForm"
import Clipboard from "clipboard"
import { basicComponents, layoutComponents, advanceComponents } from "./componentsConfig"
import request from "../../../util/request"
import generateCode from "./generateCode"

export default {
	name: "fm-making-form",
	components: {
		Draggable,
		WidgetConfig,
		FormConfig,
		WidgetForm,
		CusDialog,
		GenerateForm,
	},
	props: {
		preview: {
			type: Boolean,
			default: false,
		},
		save: {
			type: Boolean,
			default: false,
		},
		generateCode: {
			type: Boolean,
			default: false,
		},
		generateJson: {
			type: Boolean,
			default: false,
		},
		upload: {
			type: Boolean,
			default: false,
		},
		clearable: {
			type: Boolean,
			default: false,
		},
		basicFields: {
			type: Array,
			default: () => [
				"input",
				"textarea",
				"number",
				"radio",
				"checkbox",
				"time",
				"date",
				"rate",
				"color",
				"select",
				"switch",
				"slider",
				"text",
			],
		},
		advanceFields: {
			type: Array,
			default: () => ["blank", "imgupload", "editor", "cascader"],
		},
		layoutFields: {
			type: Array,
			default: () => ["grid"],
		},
	},
	data() {
		return {
			basicComponents,
			layoutComponents,
			advanceComponents,
			resetJson: false,
			widgetForm: {
				list: [],
				config: {
					labelWidth: 100,
					labelPosition: "top",
					size: "small",
				},
			},
			configTab: "widget",
			widgetFormSelect: null,
			previewVisible: false,
			jsonVisible: false,
			codeVisible: false,
			uploadVisible: false,
			remoteFuncs: {
				func_test(resolve) {
					setTimeout(() => {
						const options = [
							{ id: "1", name: "1111" },
							{ id: "2", name: "2222" },
							{ id: "3", name: "3333" },
						]

						resolve(options)
					}, 2000)
				},
				funcGetToken(resolve) {
					request.get("http://tools-server.making.link/api/uptoken").then(res => {
						resolve(res.uptoken)
					})
				},
				upload_callback(response, file, fileList) {
					console.log("callback", response, file, fileList)
				},
			},
			widgetModels: {},
			blank: "",
			htmlTemplate: "",
			vueTemplate: "",
			jsonTemplate: "",
			uploadEditor: null,
			jsonCopyValue: "",
			jsonClipboard: null,
			jsonEg: `{
                  "list": [],
                  "config": {
                    "labelWidth": 100,
                    "labelPosition": "top",
                    "size": "small"
                  }
                }`,
			codeActiveName: "vue",
			formEdit: true,
		}
	},
	mounted() {
		this._loadComponents()
	},
	methods: {
		_loadComponents() {
			this.basicComponents = this.basicComponents.map(item => {
				return {
					...item,
					name: this.$t(`fm.components.fields.${item.type}`),
				}
			})
			this.advanceComponents = this.advanceComponents.map(item => {
				return {
					...item,
					name: this.$t(`fm.components.fields.${item.type}`),
				}
			})
			this.layoutComponents = this.layoutComponents.map(item => {
				return {
					...item,
					name: this.$t(`fm.components.fields.${item.type}`),
				}
			})
		},
		handleMoveEnd(evt) {
			console.log("end", evt)
		},
		handleMoveStart({ oldIndex }) {
			console.log("start", oldIndex, this.basicComponents)
		},
		handleMove() {
			return true
		},
		handlePreview() {
			console.log(this.widgetForm)
			this.previewVisible = true
		},
		handleReset() {
			this.$refs.generateForm.reset()
		},
		handleGenerateJson() {
			this.jsonVisible = true
			this.jsonTemplate = this.widgetForm
			console.log(JSON.stringify(this.widgetForm))
			this.$nextTick(() => {
				const editor = ace.edit("jsoneditor")
				editor.session.setMode("ace/mode/json")

				if (!this.jsonClipboard) {
					this.jsonClipboard = new Clipboard(".json-btn")
					this.jsonClipboard.on("success", e => {
						this.$message.success(this.$t("fm.message.copySuccess"))
					})
				}
				this.jsonCopyValue = JSON.stringify(this.widgetForm)
			})
		},
		handleGenerateCode() {
			this.codeVisible = true
			this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), "html")
			this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), "vue")
			this.$nextTick(() => {
				const editor = ace.edit("codeeditor")
				editor.session.setMode("ace/mode/html")

				const vueeditor = ace.edit("vuecodeeditor")
				vueeditor.session.setMode("ace/mode/html")
			})
		},
		handleUpload() {
			this.uploadVisible = true
			this.$nextTick(() => {
				this.uploadEditor = ace.edit("uploadeditor")
				this.uploadEditor.session.setMode("ace/mode/json")
			})
		},
		handleUploadJson() {
			try {
				this.setJSON(JSON.parse(this.uploadEditor.getValue()))
				this.uploadVisible = false
			} catch (e) {
				this.$message.error(e.message)
				this.$refs.uploadJson.end()
			}
		},
		handleClear() {
			this.widgetForm = {
				list: [],
				config: {
					labelWidth: 100,
					labelPosition: "right",
					size: "small",
					customClass: "",
				},
			}

			this.widgetFormSelect = {}
		},
		clear() {
			this.handleClear()
		},
		getJSON() {
			return this.widgetForm
		},
		getHtml() {
			return generateCode(JSON.stringify(this.widgetForm))
		},
		setJSON(json) {
			this.widgetForm = json

			if (json.list.length > 0) {
				this.widgetFormSelect = json.list[0]
			}
		},
		handleDataChange(field, value, data) {
			console.log(field, value, data)
		},
	},
	watch: {
		widgetForm: {
			deep: true,
			handler: function (val) {
				console.log(this.$refs.widgetForm)
			},
		},
		"$i18n.locale": function (val) {
			this._loadComponents()
		},
	},
}
</script>

<style lang="scss">
@import "@/styles/style.scss";

$background-color: #f9fafb;
$text-color: #374151;
$border-color: #e5e7eb;
$primary-color: #3b82f6;

.fm-style {
	height: 100vh;

	.aside-container {
		display: flex;
		flex-direction: column;
		background-color: $background-color;
		overflow-y: hidden;

		.widget-component-library-title {
			height: 60px;
			display: flex;
			align-items: center;
			padding: 0 16px;
			font-size: 14px;
			font-weight: 500;
			border-bottom: 1px solid #d1d5db;
		}

		.widget-groups {
			flex: 1;
			overflow-y: scroll;
			padding: 16px;
		}

		.widget-group-title {
			margin-bottom: 12px;
			font-size: 14px;
			font-weight: 500;
		}

		.widget-group {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 8px;

			&:not(:last-child) {
				margin-bottom: 24px;
			}
		}

		.widget-item {
			padding: 12px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: $text-color;
			border: 1px solid $border-color;
			border-radius: 8px;
			background-color: #fff;
			font-size: 12px;
			cursor: move;

			&:hover {
				border: 1px solid $primary-color;
				color: $primary-color;
			}

			.widget-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 12px;
				font-size: 12px;

				.icon {
					font-size: 18px;
				}
			}
		}
	}

	.center-container {
		border-left: 1px solid $border-color;
		border-right: 1px solid $border-color;

		.header {
			height: 100px !important;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 18px;
			border-bottom: solid 1px $border-color;

			.title-container {
				display: flex;
				flex-direction: column;
				gap: 8px;
				padding: 0 12px;

				.title {
					color: $text-color;
					font-size: 18px;
					font-weight: 500;
				}

				.desc {
					color: #6b7280;
					font-size: 14px;
				}
			}

			.el-button--primary {
				background-color: #2563eb;
				border-color: #2563eb;

				&:hover {
					background-color: #1d4ed8;
					border-color: #1d4ed8;
				}
			}

			.el-button--default {
				border-color: #d1d5db;
				background-color: #fff;
				color: $text-color;

				&:hover {
					border-color: #d1d5db;
					background-color: #f9fafb;
				}
			}
		}

		.el-main {
			flex: 1;
			padding: 0;
			background: #fff;
		}
	}

	.widget-config-container {
		position: relative;
		background-color: $background-color;
		overflow-y: hidden;

		.el-header {
			border-bottom: solid 2px #e4e7ed;
			padding: 0 5px;
		}

		.config-tab {
			height: 45px;
			line-height: 45px;
			display: inline-block;
			width: 145px;
			text-align: center;
			font-size: 14px;
			font-weight: 500;
			position: relative;
			cursor: pointer;

			&.active {
				border-bottom: solid 1px $primary-color;
			}
		}

		.config-content {
			padding: 10px;

			.el-form-item__label {
				padding: 0;
				font-weight: 500;
			}

			.el-form-item {
				border-bottom: solid 1px #e1e1e1;
				padding-bottom: 10px;
			}

			.config-pattern-input {
				.el-input-group__prepend,
				.el-input-group__append {
					padding: 0 8px;
				}
			}
		}

		.ghost {
			background: #fff;
			border: 1px dashed $primary-color;

			&::after {
				background: #fff;
				display: block;
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
		}
	}
}
</style>
