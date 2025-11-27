<template>
	<el-tree
		class="org-config-tree"
		:data="filteredTreeData"
		:check-strictly="false"
		:expand-on-click-node="false"
		:props="{ children: 'child' }"
		highlight-current
		default-expand-all
		v-bind="$attrs"
	>
		<template slot-scope="{ node, data }">
			<PermissionConfigItem
				:data="data"
				:label="data.orgName"
				:icon="RESOURCE_TYPE_ICON[resourceType]"
				:action-list="RESOURCE_ACTION_TYPE_LIST"
				:disabled="!data.canEdit"
				id-field="orgId"
				@privilege-change="handlePrivilegeChange"
			/>
		</template>
	</el-tree>
</template>

<script>
import PermissionConfigItem from "../PermissionConfigItem"
import { RESOURCE_TYPE_ICON, RESOURCE_ACTION_TYPE_LIST } from "../constant"

export default {
	name: "OrgConfigTree",
	props: {
		resourceType: {
			type: String,
			required: true,
		},
		searchValue: {
			type: String,
			default: "",
		},
		permissions: {
			type: Object,
			required: true,
		},
	},
	components: {
		PermissionConfigItem,
	},
	data() {
		return {
			RESOURCE_TYPE_ICON,
			RESOURCE_ACTION_TYPE_LIST,
		}
	},
	computed: {
		filteredTreeData() {
			const base = this.permissions ? [this.permissions] : []
			if (!this.searchValue.trim()) {
				return base
			}
			const keyword = this.searchValue.trim().toLowerCase()
			const filtered = this.filterTreeNode(this.permissions, keyword)
			return filtered ? [filtered] : []
		},
	},
	methods: {
		filterTreeNode(node, keyword) {
			if (!node) {
				return null
			}
			const children = Array.isArray(node.child) ? node.child : []
			const filteredChildren = children.map(child => this.filterTreeNode(child, keyword)).filter(Boolean)
			const matches = node.orgName.toLowerCase().includes(keyword)
			if (matches || filteredChildren.length) {
				return {
					...node,
					child: filteredChildren.length ? filteredChildren : null,
				}
			}
			return null
		},
		handlePrivilegeChange(payload) {
			this.$emit("privilege-change", payload)
		},
	},
}
</script>

<style lang="scss">
.org-config-tree {
	.el-tree-node__content {
		border-radius: 8px;
		height: 112px;
		background-color: #fff !important;

		&:hover {
			background-color: #fff !important;
		}
	}
}
</style>
