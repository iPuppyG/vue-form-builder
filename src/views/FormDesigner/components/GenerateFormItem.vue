<template>
	<el-form-item class="generate-form" :label="widget.name" :prop="widget.model" :style="formItemStyle">
		<div v-if="widget.options.description" class="field-description">{{ widget.options.description }}</div>
		<template v-if="widget.type == 'input'">
			<el-input
				v-if="
					widget.options.dataType == 'number' ||
					widget.options.dataType == 'integer' ||
					widget.options.dataType == 'float'
				"
				v-model.number="dataModel"
				type="number"
				:placeholder="widget.options.placeholder"
				:style="{ width: widget.options.width }"
				:disabled="elementDisabled"
			/>
			<el-input
				v-else-if="widget.options.dataType == 'idCardNumber'"
				v-model="dataModel"
				type="text"
				:disabled="elementDisabled"
				:placeholder="widget.options.placeholder || '请输入身份证号'"
				:style="{ width: widget.options.width }"
				:maxlength="18"
				:show-word-limit="widget.options.showWordLimit"
			/>
			<el-input
				v-else-if="widget.options.dataType == 'phone'"
				v-model="dataModel"
				type="text"
				:disabled="elementDisabled"
				:placeholder="widget.options.placeholder || '请输入手机号'"
				:style="{ width: widget.options.width }"
				:maxlength="11"
				:show-word-limit="widget.options.showWordLimit"
			/>
			<el-input
				v-else
				v-model="dataModel"
				type="text"
				:disabled="elementDisabled"
				:placeholder="widget.options.placeholder"
				:style="{ width: widget.options.width }"
				:maxlength="widget.options.maxlength"
				:show-word-limit="widget.options.showWordLimit"
			/>
		</template>

		<template v-if="widget.type == 'textarea'">
			<el-input
				v-model="dataModel"
				type="textarea"
				:rows="5"
				:disabled="elementDisabled"
				:placeholder="widget.options.placeholder"
				:style="{ width: widget.options.width }"
				:maxlength="widget.options.maxlength"
				:show-word-limit="widget.options.showWordLimit"
			/>
		</template>

		<template v-if="widget.type == 'number'">
			<el-input-number
				v-model="dataModel"
				:style="{ width: widget.options.width, textAlign: 'left' }"
				:step="widget.options.step"
				controls-position="right"
				:disabled="elementDisabled"
				:min="widget.options.min"
				:max="widget.options.max"
			/>
		</template>

		<template v-if="widget.type == 'radio'">
			<el-radio-group v-model="dataModel" :style="{ width: widget.options.width }" :disabled="elementDisabled">
				<el-radio
					v-for="(item, index) in widget.options.remote ? widget.options.remoteOptions : widget.options.options"
					:key="index"
					:style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
					:label="item.value"
				>
					<template v-if="widget.options.remote">{{ item.label }}</template>
					<template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
				</el-radio>
			</el-radio-group>
		</template>

		<template v-if="widget.type == 'checkbox'">
			<el-checkbox-group v-model="dataModel" :style="{ width: widget.options.width }" :disabled="elementDisabled">
				<el-checkbox
					v-for="(item, index) in widget.options.remote ? widget.options.remoteOptions : widget.options.options"
					:key="index"
					:style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
					:label="item.value"
				>
					<template v-if="widget.options.remote">{{ item.label }}</template>
					<template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
				</el-checkbox>
			</el-checkbox-group>
		</template>

		<template v-if="widget.type == 'time'">
			<el-time-picker
				v-model="dataModel"
				:is-range="widget.options.isRange"
				:placeholder="widget.options.placeholder"
				:start-placeholder="widget.options.startPlaceholder"
				:end-placeholder="widget.options.endPlaceholder"
				:readonly="widget.options.readonly"
				:disabled="elementDisabled"
				:editable="widget.options.editable"
				:clearable="widget.options.clearable"
				:arrow-control="widget.options.arrowControl"
				:value-format="widget.options.format"
				:style="{ width: widget.options.width }"
			/>
		</template>

		<template v-if="widget.type == 'date'">
			<el-date-picker
				v-model="dataModel"
				:type="widget.options.type"
				:placeholder="widget.options.placeholder"
				:start-placeholder="widget.options.startPlaceholder"
				:end-placeholder="widget.options.endPlaceholder"
				:readonly="widget.options.readonly"
				:disabled="elementDisabled"
				:editable="widget.options.editable"
				:clearable="widget.options.clearable"
				:value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
				:format="widget.options.format"
				:style="{ width: widget.options.width }"
			/>
		</template>

		<template v-if="widget.type == 'rate'">
			<el-rate
				v-model="dataModel"
				:max="widget.options.max"
				:disabled="elementDisabled"
				:allow-half="widget.options.allowHalf"
			/>
		</template>

		<template v-if="widget.type == 'color'">
			<el-color-picker v-model="dataModel" :disabled="elementDisabled" :show-alpha="widget.options.showAlpha" />
		</template>

		<template v-if="widget.type == 'select'">
			<el-select
				v-model="dataModel"
				:disabled="elementDisabled"
				:multiple="widget.options.multiple"
				:clearable="widget.options.clearable"
				:placeholder="widget.options.placeholder"
				:style="{ width: widget.options.width }"
				:filterable="widget.options.filterable"
			>
				<el-option
					v-for="item in widget.options.remote ? widget.options.remoteOptions : widget.options.options"
					:key="item.value"
					:value="item.value"
					:label="widget.options.showLabel || widget.options.remote ? item.label : item.value"
				/>
			</el-select>
		</template>

		<template v-if="widget.type == 'switch'">
			<el-switch v-model="dataModel" :disabled="elementDisabled" />
		</template>

		<template v-if="widget.type == 'slider'">
			<el-slider
				v-model="dataModel"
				:min="widget.options.min"
				:max="widget.options.max"
				:disabled="elementDisabled"
				:step="widget.options.step"
				:show-input="widget.options.showInput"
				:range="widget.options.range"
				:style="{ width: widget.options.width }"
			/>
		</template>

		<template v-if="widget.type == 'imgupload'">
			<fm-upload
				v-model="dataModel"
				:disabled="elementDisabled"
				:style="{ width: widget.options.width }"
				:width="widget.options.size.width"
				:height="widget.options.size.height"
				:token="widget.options.token"
				:domain="widget.options.domain"
				:multiple="widget.options.multiple"
				:length="widget.options.length"
				:is-qiniu="widget.options.isQiniu"
				:is-delete="widget.options.isDelete"
				:min="widget.options.min"
				:is-edit="widget.options.isEdit"
				:action="widget.options.action"
			/>
		</template>

		<template v-if="widget.type == 'editor'">
			<vue-editor
				v-model="dataModel"
				:editor-toolbar="customToolbar"
				:style="{
					width: widget.options.width,
					cursor: elementDisabled ? 'no-drop' : '',
					backgroundColor: elementDisabled ? '#F5F7FA' : '',
				}"
				:disabled="elementDisabled"
			/>
		</template>

		<template v-if="widget.type == 'cascader'">
			<el-cascader
				v-model="dataModel"
				:disabled="elementDisabled"
				:clearable="widget.options.clearable"
				:placeholder="widget.options.placeholder"
				:style="{ width: widget.options.width }"
				:options="widget.options.remoteOptions"
			/>
		</template>

		<template v-if="widget.type == 'text'">
			<span>{{ dataModel }}</span>
		</template>
	</el-form-item>
</template>

<script>
export default {
	props: ["widget", "models", "rules", "remote", "edit"],
	data() {
		return {
			dataModel: this.models[this.widget.model],
			customToolbar: [["bold", "italic", "underline", "strike"]],
		}
	},
	computed: {
		elementDisabled() {
			return !this.edit || this.widget.options.disabled
		},
		formItemStyle() {
			if (!this.widget || !this.widget.options) return {}
			const opts = this.widget.options
			if (opts.size && typeof opts.size.width !== "undefined" && opts.size.width !== null) {
				return { width: opts.size.width + "%" }
			}
			if (opts.width) return { width: opts.width }
			return {}
		},
	},
	watch: {
		dataModel: {
			deep: true,
			handler(val) {
				this.models[this.widget.model] = val
				this.$emit("update:models", {
					...this.models,
					[this.widget.model]: val,
				})
				this.$emit("input-change", val, this.widget.model)
			},
		},
		models: {
			deep: true,
			handler(val) {
				this.dataModel = val[this.widget.model]
			},
		},
	},
	created() {
		if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
			this.remote[this.widget.options.remoteFunc](data => {
				this.widget.options.remoteOptions = data.map(item => {
					return {
						value: item[this.widget.options.props.value],
						label: item[this.widget.options.props.label],
						children: item[this.widget.options.props.children],
					}
				})
			})
		}

		if (this.widget.type === "imgupload" && this.widget.options.isQiniu) {
			this.remote[this.widget.options.tokenFunc](data => {
				this.widget.options.token = data
			})
		}
	},
	methods: {},
}
</script>

<style lang="scss">
.generate-form {
	.field-description {
		font-size: 12px;
		line-height: 16px;
		color: #6b7280;
		margin-bottom: 8px;
	}

	.el-input {
		input {
			text-align: left;
		}
	}
}
</style>
