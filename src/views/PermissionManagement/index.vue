<template>
	<div class="permission-management">
		<el-tabs class="tabs" v-model="activeTab" @tab-click="handleClick">
			<el-tab-pane name="userConfig">
				<template slot="label">
					<i class="ri-user-settings-line"></i>
					{{ $t("permissionConfig.userPermissionConfig") }}
				</template>
				<UserConfig />
			</el-tab-pane>
			<el-tab-pane name="resourceConfig">
				<template slot="label">
					<i class="ri-database-2-line"></i>
					{{ $t("permissionConfig.resourcePermissionConfig") }}
				</template>
				<ResourceConfig />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import ResourceConfig from "./ResourceConfig/index.vue"
import UserConfig from "./UserConfig/index.vue"

export default {
	name: "PermissionManagement",
	components: {
		ResourceConfig,
		UserConfig,
	},
	data() {
		return {
			activeTab: "userConfig",
		}
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event)
		},
	},
}
</script>

<style lang="scss">
.permission-management {
	height: 100%;
	padding: 4px 24px 24px;
	border-radius: 8px;
	box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

	.tabs {
		height: 100%;
		display: flex;
		flex-direction: column;

		.el-tabs__header {
			margin-bottom: 0;

			.el-tabs__nav-wrap::after {
				height: 1px;
			}
		}

		.el-tabs__content {
			flex: 1;

			.el-tab-pane {
				height: 100%;
			}
		}
	}
}
</style>
