<template>
	<TreeSelect
		class="tree-select"
		:style="{ width: `${width}px` }"
		:options="options"
		:clearable="clearable"
		:max-height="maxHeight"
		:placeholder="placeholder"
		:defaultExpandLevel="defaultExpandLevel"
		@change="handleChange"
		v-bind="$attrs"
	>
		>
		<label class="tree-node-label" slot="option-label" slot-scope="{ node }">
			<i class="icon" :class="iconClass"></i>
			<span class="label">{{ node.label }}</span>
		</label>
	</TreeSelect>
</template>

<script>
import TreeSelect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"

export default {
	name: "CustomTreeSelect",
	components: { TreeSelect },
	props: {
		iconClass: {
			type: String,
			default: "ri-building-line",
		},
		options: {
			type: Array,
			required: true,
		},
		width: {
			type: Number,
			default: 256,
		},
		clearable: {
			type: Boolean,
			default: false,
		},
		maxHeight: {
			type: Number,
			default: 268,
		},
		placeholder: {
			type: String,
			default: " ",
			description: "输入框占位符",
		},
		defaultExpandLevel: {
			type: [Number, String],
			default: Infinity,
		},
	},
	methods: {
		handleChange(val) {
			this.$emit("change", val)
		},
	},
}
</script>

<style lang="scss">
.tree-select {
	font-size: 14px;

	.vue-treeselect__control {
		border-radius: 6px !important;
		border: 1px solid #d1d5db !important;
		box-shadow: none !important;
	}

	.vue-treeselect__menu {
		padding: 8px;
		margin-top: 4px;
		border: 1px solid #d1d5db;
		border-radius: 6px;

		.vue-treeselect__list {
			cursor: pointer;

			.vue-treeselect__option {
				padding-top: 8px;
				padding-bottom: 8px;
				border-radius: 4px;
				color: #374151;

				&.vue-treeselect__option--selected {
					background-color: #f0f7ff;
					color: #2563eb;
				}

				&.vue-treeselect__option--highlight {
					background-color: #f9fafb;
				}

				.tree-node-label {
					font-size: 14px;
					font-weight: 400;
					cursor: pointer;

					.icon,
					.label {
						margin-left: 8px;
					}
				}
			}
		}
	}
}
</style>
