<template>
	<div class="user-config-list" v-bind="$attrs">
		<PermissionConfigItem
			v-for="data in filteredPermissions"
			:key="`${data.userId}-${renderKey}`"
			:data="data"
			:label="data.userName"
			:icon="RESOURCE_TYPE_ICON[resourceType]"
			:action-list="RESOURCE_ACTION_TYPE_LIST"
			:disabled="!data.canEdit"
			id-field="userId"
			@privilege-change="handlePrivilegeChange"
		/>
	</div>
</template>

<script>
import PermissionConfigItem from "../PermissionConfigItem"
import { RESOURCE_TYPE_ICON, RESOURCE_ACTION_TYPE_LIST } from "../constant"

export default {
	name: "UserConfigList",
	components: {
		PermissionConfigItem,
	},
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
			type: Array,
			default: () => [],
		},
		renderKey: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			RESOURCE_TYPE_ICON,
			RESOURCE_ACTION_TYPE_LIST,
		}
	},
	computed: {
		filteredPermissions() {
			if (!this.searchValue.trim()) {
				return this.permissions
			}
			const keyword = this.searchValue.trim().toLowerCase()
			return this.permissions.filter(item => item.userName.toLowerCase().includes(keyword))
		},
	},
	methods: {
		handlePrivilegeChange(payload) {
			this.$emit("privilege-change", payload)
		},
	},
}
</script>

<style lang="scss">
.user-config-list {
	display: flex;
	flex-direction: column;
	gap: 12px;
}
</style>
