<template>
	<div class="wrapper">
		<div class="module-name">{{ $t("permissionConfig.moduleName") }}</div>
		<div class="permission-management">
			<el-tabs v-model="activeTab" class="tabs">
				<el-tab-pane name="userConfig">
					<template slot="label">
						<i class="ri-user-settings-line" />
						{{ $t("permissionConfig.tabs.userPermissionConfig") }}
					</template>
					<UserConfig />
				</el-tab-pane>
				<el-tab-pane name="resourceConfig">
					<template slot="label">
						<i class="ri-database-2-line" />
						{{ $t("permissionConfig.tabs.resourcePermissionConfig") }}
					</template>
					<ResourceConfig />
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import ResourceConfig from "./ResourceConfig"
import UserConfig from "./UserConfig"

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
.wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding: 24px;
	background-color: #f5f6f7;

	.module-name {
		color: #1f2329;
		font-size: 20px;
		font-weight: 500;
		line-height: 28px;
		margin-bottom: 24px;
	}

	.permission-management {
		flex: 1;
		overflow: hidden;
		background-color: #fff;
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
}
</style>
