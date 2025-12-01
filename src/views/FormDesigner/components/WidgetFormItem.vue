<template>
	<el-form-item
		v-if="element && element.key"
		class="widget-view"
		:class="{ active: selectWidget.key == element.key, is_req: element.options.required }"
		:label="element.name"
		:style="formItemStyle"
		@click.native.stop="handleSelectWidget(index)"
	>
		<div v-if="element.options.description" class="field-description">{{ element.options.description }}</div>
		<template v-if="element.type == 'input'">
			<el-input
				v-model="element.options.defaultValue"
				:style="{ width: '100%' }"
				:placeholder="element.options.placeholder"
				:disabled="element.options.disabled"
				:maxlength="element.options.maxlength"
				:show-word-limit="element.options.showWordLimit"
			/>
		</template>

		<template v-if="element.type == 'textarea'">
			<el-input
				v-model="element.options.defaultValue"
				type="textarea"
				:rows="5"
				:style="{ width: '100%' }"
				:disabled="element.options.disabled"
				:placeholder="element.options.placeholder"
				:maxlength="element.options.maxlength"
				:show-word-limit="element.options.showWordLimit"
			/>
		</template>

		<template v-if="element.type == 'number'">
			<el-input-number
				v-model="element.options.defaultValue"
				:disabled="element.options.disabled"
				controls-position="right"
				:placeholder="element.options.placeholder"
				:style="{ width: '100%' }"
			/>
		</template>

		<template v-if="element.type == 'radio'">
			<el-radio-group
				v-model="element.options.defaultValue"
				:style="{ width: '100%' }"
				:disabled="element.options.disabled"
			>
				<el-radio
					v-for="(item, index) in element.options.options"
					:key="item.value + index"
					:style="{ display: element.options.inline ? 'inline-block' : 'block' }"
					:label="item.value"
				>
					{{ element.options.showLabel ? item.label : item.value }}
				</el-radio>
			</el-radio-group>
		</template>

		<template v-if="element.type == 'checkbox'">
			<el-checkbox-group
				v-model="element.options.defaultValue"
				:style="{ width: '100%' }"
				:disabled="element.options.disabled"
			>
				<el-checkbox
					v-for="(item, index) in element.options.options"
					:key="item.value + index"
					:style="{ display: element.options.inline ? 'inline-block' : 'block' }"
					:label="item.value"
				>
					{{ element.options.showLabel ? item.label : item.value }}
				</el-checkbox>
			</el-checkbox-group>
		</template>

		<template v-if="element.type == 'time'">
			<el-time-picker
				v-model="element.options.defaultValue"
				:is-range="element.options.isRange"
				:placeholder="element.options.placeholder"
				:start-placeholder="element.options.startPlaceholder"
				:end-placeholder="element.options.endPlaceholder"
				:readonly="element.options.readonly"
				:disabled="element.options.disabled"
				:editable="element.options.editable"
				:clearable="element.options.clearable"
				:arrow-control="element.options.arrowControl"
				:style="{ width: '100%' }"
			/>
		</template>

		<template v-if="element.type == 'date'">
			<el-date-picker
				v-model="element.options.defaultValue"
				:type="element.options.type"
				:is-range="element.options.isRange"
				:placeholder="element.options.placeholder"
				:start-placeholder="element.options.startPlaceholder"
				:end-placeholder="element.options.endPlaceholder"
				:readonly="element.options.readonly"
				:disabled="element.options.disabled"
				:editable="element.options.editable"
				:clearable="element.options.clearable"
				:style="{ width: '100%' }"
			/>
		</template>

		<template v-if="element.type == 'rate'">
			<el-rate
				v-model="element.options.defaultValue"
				:max="element.options.max"
				:disabled="element.options.disabled"
				:allow-half="element.options.allowHalf"
			/>
		</template>

		<template v-if="element.type == 'color'">
			<el-color-picker
				v-model="element.options.defaultValue"
				:disabled="element.options.disabled"
				:show-alpha="element.options.showAlpha"
			/>
		</template>

		<template v-if="element.type == 'select'">
			<el-select
				v-model="element.options.defaultValue"
				:disabled="element.options.disabled"
				:multiple="element.options.multiple"
				:clearable="element.options.clearable"
				:placeholder="element.options.placeholder"
				:style="{ width: '100%' }"
			>
				<el-option
					v-for="item in element.options.options"
					:key="item.value"
					:value="item.value"
					:label="element.options.showLabel ? item.label : item.value"
				/>
			</el-select>
		</template>

		<template v-if="element.type == 'switch'">
			<el-switch v-model="element.options.defaultValue" :disabled="element.options.disabled" />
		</template>

		<template v-if="element.type == 'slider'">
			<el-slider
				v-model="element.options.defaultValue"
				:min="element.options.min"
				:max="element.options.max"
				:disabled="element.options.disabled"
				:step="element.options.step"
				:show-input="element.options.showInput"
				:range="element.options.range"
				:style="{ width: '100%' }"
			/>
		</template>

		<template v-if="element.type == 'imgupload'">
			<fm-upload
				v-model="element.options.defaultValue"
				:disabled="element.options.disabled"
				:style="{ width: '100%' }"
				:width="element.options.size.width"
				:height="element.options.size.height"
				token="xxx"
				domain="xxx"
			/>
		</template>

		<template v-if="element.type == 'cascader'">
			<el-cascader
				v-model="element.options.defaultValue"
				:disabled="element.options.disabled"
				:clearable="element.options.clearable"
				:placeholder="element.options.placeholder"
				:style="{ width: '100%' }"
				:options="element.options.remoteOptions"
			/>
		</template>

		<template v-if="element.type == 'editor'">
			<vue-editor v-model="element.options.defaultValue" :editor-toolbar="customToolbar" :style="{ width: '100%' }" />
		</template>

		<template v-if="element.type == 'blank'">
			<div style="height: 50px; color: #999; background: #eee; line-height: 50px; text-align: center">
				{{ $t("fm.components.fields.blank") }}
			</div>
		</template>

		<template v-if="element.type == 'text'">
			<span>{{ element.options.defaultValue }}</span>
		</template>

		<div v-if="selectWidget.key == element.key" class="widget-view-action">
			<i class="ri-file-copy-line" @click.stop="handleWidgetClone(index)" />
			<i class="ri-delete-bin-6-line" @click.stop="handleWidgetDelete(index)" />
		</div>

		<div v-if="selectWidget.key == element.key" class="widget-view-drag">
			<i class="ri-drag-move-2-fill drag-widget" />
		</div>
	</el-form-item>
</template>

<script>
export default {
	props: ["element", "select", "index", "data"],
	data() {
		return {
			selectWidget: this.select,
			customToolbar: [["bold", "italic", "underline", "strike"]],
		}
	},
	computed: {
		formItemStyle() {
			if (!this.element || !this.element.options) return {}
			const opts = this.element.options
			if (opts.size && typeof opts.size.width !== "undefined" && opts.size.width !== null) {
				return { width: opts.size.width + "%" }
			}
			if (opts.width) {
				return { width: opts.width }
			}
			return {}
		},
	},
	watch: {
		select(val) {
			this.selectWidget = val
		},
		selectWidget: {
			handler(val) {
				this.$emit("update:select", val)
			},
			deep: true,
		},
	},
	mounted() {},
	methods: {
		handleSelectWidget(index) {
			this.selectWidget = this.data.list[index]
		},
		handleWidgetDelete(index) {
			if (this.data.list.length - 1 === index) {
				if (index === 0) {
					this.selectWidget = {}
				} else {
					this.selectWidget = this.data.list[index - 1]
				}
			} else {
				this.selectWidget = this.data.list[index + 1]
			}

			this.$nextTick(() => {
				this.data.list.splice(index, 1)
			})
		},
		handleWidgetClone(index) {
			const key = Date.parse(new Date().toString())
			let cloneData = {
				...this.data.list[index],
				options: {
					...this.data.list[index].options,
					remoteFunc: "func_" + key,
				},
				key,
				model: this.data.list[index].type + "_" + key,
				rules: this.data.list[index].rules || [],
			}

			if (
				this.data.list[index].type === "radio" ||
				this.data.list[index].type === "checkbox" ||
				this.data.list[index].type === "select"
			) {
				cloneData = {
					...cloneData,
					options: {
						...cloneData.options,
						options: cloneData.options.options.map(item => ({ ...item })),
					},
				}
			}

			this.data.list.splice(index, 0, cloneData)

			this.$nextTick(() => {
				this.selectWidget = this.data.list[index + 1]
			})
		},
	},
}
</script>

<style lang="scss">
$is_req_color: #f56c6c;
$primary-color: #3b82f6;
$default-border-color: #d1d5dc;
$hover-border-color: #9da3af;
$active-background-color: #eff6ff;

.widget-view {
	display: inline-block;
	vertical-align: top;
	box-sizing: border-box;
	padding: 16px;
	position: relative;
	border: 2px dashed $default-border-color;
	border-radius: 8px;
	margin-bottom: 16px;

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

	.el-form-item__label {
		line-height: 24px;
		padding: 0;
	}

	.el-form-item__content {
		position: unset;
	}

	&.is_req {
		.el-form-item__label::before {
			content: "*";
			color: $is_req_color;
			margin-right: 4px;
		}
	}

	&:hover {
		border: 2px dashed $hover-border-color;
	}

	&.active {
		border: 2px dashed $primary-color;
		background-color: $active-background-color;
	}

	.widget-view-action {
		position: absolute;
		right: -2px;
		bottom: -2px;
		height: 22px;
		line-height: 22px;
		z-index: 9;
		border-radius: 0 0 8px 0;
		background-color: $primary-color;

		i {
			font-size: 14px;
			color: #fff;
			margin: 0 5px;
			cursor: pointer;
		}
	}

	.widget-view-drag {
		position: absolute;
		left: -2px;
		top: -2px;
		bottom: -18px;
		height: 22px;
		line-height: 22px;
		background: $primary-color;
		z-index: 9;
		border-radius: 8px 0 0 0;

		i {
			font-size: 14px;
			color: #fff;
			margin: 0 5px;
			cursor: move;
		}
	}
}
</style>
