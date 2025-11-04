<template>
	<div class="permission-management">
		<el-tabs class="tabs" v-model="activeTab">
			<el-tab-pane name="userConfig">
				<template slot="label">
					<i class="ri-user-settings-line"></i>
					{{ $t("permissionConfig.tabs.userPermissionConfig") }}
				</template>
				<UserConfig />
			</el-tab-pane>
			<el-tab-pane name="resourceConfig">
				<template slot="label">
					<i class="ri-database-2-line"></i>
					{{ $t("permissionConfig.tabs.resourcePermissionConfig") }}
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
	methods: {},
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

			.el-tabs__nav-wrap {
				&::after {
					height: 1px;
				}

				.el-tabs__active-bar {
					background-color: #2563eb; // FIXME 根据 element-ui 主题颜色变量修改
				}

				.el-tabs__item {
					font-size: 14px;
					font-weight: 400;
					color: #6b7280;

					&:hover {
						color: #374151;
					}

					&.is-active {
						color: #2563eb; // FIXME 根据 element-ui 主题颜色变量修改
						font-weight: 500;
					}
				}
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
