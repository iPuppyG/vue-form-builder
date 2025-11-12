<template>
	<el-dialog
		class="edit-dialog"
		:visible="innerVisible"
		:show-close="false"
		width="900px"
		center
		destroy-on-close
		@close="close"
	>
		<el-form label-position="'top'" :model="formData">
			<el-form-item
				:label="$t('orgManagement.dialog.edit.orgName')"
				prop="name"
				:rules="[{ required: true, message: $t('orgManagement.dialog.edit.nameInputRequireMessage'), trigger: 'blur' }]"
			>
				<el-input
					v-model="formData.name"
					:placeholder="$t('orgManagement.dialog.edit.nameInputPlaceholder')"
				></el-input>
			</el-form-item>
			<el-form-item :label="$t('orgManagement.dialog.edit.parentOrg')" prop="pid">
				<el-input class="pid-input-name" v-model="pidName" disabled></el-input>
			</el-form-item>
			<div v-if="type === 'add'" class="org-tree-container">
				<el-tree
					class="org-tree"
					node-key="orgId"
					:data="orgTreeOptions"
					:render-content="renderContent"
					:check-strictly="false"
					:expand-on-click-node="false"
					:props="{ label: 'name', children: 'subOrganizations' }"
					highlight-current
					default-expand-all
					@node-click="handleNodeClick"
				/>
			</div>
		</el-form>
		<template slot="footer">
			<footer class="footer-wrapper">
				<el-button class="btn" @click="close">{{ $t("actions.dialog.cancel") }}</el-button>
				<el-button class="btn" type="primary">{{ $t("actions.dialog.confirm") }}</el-button>
			</footer>
		</template>
	</el-dialog>
</template>

<script>
import { convertOrgTreeToMap } from "./utils"
import { mockOrgTreeData, ORG_ROOT_NODE } from "../../mock"
import { ROOT_ORG_ID } from "./constant"

export default {
	name: "EditDialog",
	props: {
		type: {
			type: String,
			required: true,
			default: "add",
			validator: value => {
				const allowedTypes = ["add", "edit", "add-sub"]
				return allowedTypes.includes(value)
			},
		},
		visible: {
			type: Boolean,
			required: true,
			default: false,
		},
		editRow: {
			type: Object,
			required: false,
		},
	},
	data() {
		return {
			innerVisible: this.visible,
			orgTreeOptions: [ORG_ROOT_NODE, ...mockOrgTreeData],
			formData: {
				name: null,
				pid: null,
			},
			pidName: "",
		}
	},
	watch: {
		visible(newVal) {
			this.innerVisible = newVal
		},
		innerVisible(newVal) {
			this.$emit("update:visible", newVal)
		},
		"formData.pid": {
			handler() {
				this.pidName = this.getPidInputContent()
			},
			immediate: true,
		},
		type: {
			handler() {
				this.pidName = this.getPidInputContent()
			},
			immediate: true,
		},
		editRow: {
			handler() {
				this.pidName = this.getPidInputContent()
			},
			immediate: true,
			deep: true,
		},
	},
	methods: {
		renderContent(_, { data, node }) {
			return data.id === ROOT_ORG_ID ? (
				<div class="root-item">
					<i class="icon ri-home-line"></i>
					<span class="label">{this.$t("orgManagement.dialog.edit.noParentOrg")}</span>
				</div>
			) : (
				<div>
					<i class="icon ri-building-line"></i>
					<span class="label">{node.label}</span>
				</div>
			)
		},
		handleRootItemClick() {
			this.formData.pid = ROOT_ORG_ID
		},
		handleNodeClick(node) {
			this.formData.pid = node.orgId
		},
		close() {
			this.innerVisible = false
		},
		getPidInputContent() {
			const orgMap = convertOrgTreeToMap([ORG_ROOT_NODE, ...mockOrgTreeData])
			switch (this.type) {
				case "add":
					// 新增组织：显示“当前选择 + 父组织名称”（如果未选择则显示空）
					return this.formData.pid !== null
						? `${this.$t("orgManagement.dialog.edit.currentSelect")}: ${orgMap[this.formData.pid] || ""}`
						: ""
				case "edit":
					// 编辑子组织：显示父组织名称（即当前选中的组织）
					if (!this.editRow) return ""
					return this.editRow.pid === null // 无父组织
						? this.$t("orgManagement.dialog.edit.rootOrg")
						: orgMap[this.editRow.pid] || ""
				case "add-sub":
					// 新增子组织：显示“作为 + 父组织名称 + 的子组织”
					if (!this.editRow) return ""
					return this.editRow.orgId === null
						? this.$t("orgManagement.dialog.edit.rootOrg") // 父组织为根组织
						: `${this.$t("orgManagement.dialog.edit.as")} "${orgMap[this.editRow.orgId] || ""}" ${this.$t(
								"orgManagement.dialog.edit.subOrg"
						  )}`

				default:
					return ""
			}
		},
	},
}
</script>

<style lang="scss">
.edit-dialog {
	.el-dialog__header {
		padding: 0;
	}

	.pid-input-name {
		input {
			color: #374151 !important;
			cursor: text !important;
		}
	}

	.org-tree-container {
		margin-top: 12px;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		overflow: hidden;

		.org-tree {
			.el-tree-node {
				.el-tree-node__content {
					height: 36px;

					&:hover {
						background-color: #f9fafb;
					}
				}

				&.is-current {
					> .el-tree-node__content {
						color: #2563eb;
						background-color: #eff6ff;
					}
				}
			}

			.root-item {
				.label {
					font-weight: 500;
				}
			}

			.label {
				margin-left: 8px;
			}
		}
	}
}

.footer-wrapper {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
</style>
