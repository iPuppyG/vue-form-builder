<template>
	<el-container class="user-config">
		<el-aside class="permission-subject">
			<div class="title">{{ $t("permissionConfig.userPermissionConfig.permissionSubject") }}</div>
			<el-tabs v-model="permissionSubject.activeTab">
				<el-tab-pane name="organization">
					<template slot="label">{{ $t("permissionConfig.userPermissionConfig.organization") }}</template>
					<div class="search-panel">
						<el-input
							v-model="permissionSubject.orgSearchValue"
							prefix-icon="el-icon-search"
							:placeholder="$t('permissionConfig.userPermissionConfig.searchOrganization')"
						/>
						<div class="tree-container">
							<el-tree
								:data="orgTreeOptions"
								:render-content="renderContent"
								:check-strictly="false"
								:expand-on-click-node="false"
								highlight-current
								default-expand-all
								@node-click="handleOrgaClick"
							/>
						</div>
					</div>
				</el-tab-pane>

				<el-tab-pane name="user">
					<template slot="label">
						{{ $t("permissionConfig.userPermissionConfig.user") }}
					</template>
					<div class="search-panel">
						<el-input
							v-model="permissionSubject.userSearchValue"
							prefix-icon="el-icon-search"
							:placeholder="$t('permissionConfig.userPermissionConfig.user')"
						/>
						<div class="user-list-container">
							<div class="user-list">
								<div
									class="user-item"
									:class="
										permissionSubject.checkedUser && permissionSubject.checkedUser.id === user.id ? 'checked' : null
									"
									v-for="user in userList"
									:key="user.id"
									@click="handleUserClick(user)"
								>
									<AvatarPanel iconClass="ri-user-line" :label="user.name" :desc="user.email" />
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-aside>

		<el-main class="permission-config">
			<template v-if="permissionSubject.checkedOrg || permissionSubject.checkedUser">
				<el-header class="header">
					<span class="title">{{ $t("permissionConfig.userPermissionConfig.permissionConfig") }}</span>
					<div class="search-container">
						<span class="search-desc">{{ $t("permissionConfig.userPermissionConfig.selectOrganization") }}</span>
						<TreeSelect
							v-model="permissionConfig.checkedOrgId"
							iconClass="ri-building-line"
							:width="256"
							:options="orgTreeOptions"
						/>
					</div>
				</el-header>
				<el-main>
					<el-tabs class="tabs" v-model="permissionConfig.activeTab">
						<el-tab-pane v-for="item in tabsOptions" :name="item.name" :key="item.name" :label="item.label">
							<div>{{ item.label }}</div>
						</el-tab-pane>
					</el-tabs>
				</el-main>
			</template>
			<template v-else>
				<span class="empty-desc">{{ $t("permissionConfig.userPermissionConfig.selectLeftSubject") }}</span>
			</template>
		</el-main>
	</el-container>
</template>

<script>
import AvatarPanel from "../../../components/AvatarPanel.vue"
import TreeSelect from "../../../components/TreeSelect.vue"
import { orgTreeOptions, tabsOptions, userList } from "../constant"

export default {
	name: "UserConfig",
	components: {
		AvatarPanel,
		TreeSelect,
	},
	data() {
		return {
			userList,
			tabsOptions,
			orgTreeOptions,
			// 权限主体
			permissionSubject: {
				activeTab: "organization",
				orgSearchValue: null,
				userSearchValue: null,
				checkedOrg: null,
				checkedUser: null,
			},
			// 权限配置
			permissionConfig: {
				activeTab: "dashboard",
				checkedOrgId: orgTreeOptions[0].id || null,
			},
		}
	},
	methods: {
		renderContent(_, { node }) {
			return <AvatarPanel iconClass="ri-building-line" label={node.label} />
		},

		handleOrgaClick(organization) {
			this.permissionSubject.checkedOrg = organization
		},

		handleUserClick(user) {
			this.permissionSubject.checkedUser = user
		},
	},
}
</script>

<style lang="scss">
.user-config {
	height: 100%;
	padding-top: 24px;

	.permission-subject {
		display: flex;
		flex-direction: column;
		width: 320px;
		padding-right: 24px;
		border-right: 1px solid #e5e7eb;

		.title {
			color: #111827;
			font-size: 18px;
			font-weight: 500;
			margin-bottom: 16px;
		}

		.el-tabs {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: hidden;

			.el-tabs__header {
				padding: 4px;
				border-radius: 8px;
				background-color: #f3f4f6;
			}

			.el-tabs__content {
				padding-top: 16px;
				flex: 1;

				.el-tree-node__expand-icon {
					margin-left: 4px;
				}
			}

			.el-tabs__nav-wrap {
				&::after {
					display: none;
				}

				.el-tabs__item {
					padding: 4px 12px;
					border-radius: 6px;
					line-height: 20px;
					height: 28px;
					font-weight: 400;

					&.is-active {
						background-color: #fff;
						box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);
					}
				}

				.el-tabs__active-bar {
					display: none;
				}
			}
		}

		.search-panel {
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 12px;

			.tree-container {
				flex: 1;
				border: 1px solid #e5e7eb;
				border-radius: 8px;
				overflow: scroll;

				.custom-tree-node {
					display: flex;
					align-items: center;
					gap: 8px;

					.text {
						color: #111827;
						font-size: 14px;
						font-weight: 500;
					}
				}

				.el-tree {
					.el-tree-node {
						&.is-current {
							&::before {
								content: "";
								width: 4px;
								height: 56px;
								background-color: #409eff;
								position: absolute;
							}
						}

						.el-tree-node__content {
							height: 56px;
							padding: 12px;

							&:hover {
								background-color: #f9fafb;
							}
						}
					}
				}
			}

			.user-list-container {
				flex: 1;
				border: 1px solid #e5e7eb;
				border-radius: 8px;
				overflow: hidden;

				.user-list {
					height: 100%;
					overflow-y: scroll;

					.user-item {
						position: relative;
						display: flex;
						padding: 12px;
						gap: 12px;
						align-items: center;
						height: 60px;
						cursor: pointer;

						&.checked {
							background-color: #f0f7ff;

							&::before {
								content: "";
								width: 4px;
								height: 60px;
								background-color: #409eff;
								position: absolute;
								left: 0;
							}
						}

						&:hover {
							background-color: #f9fafb;
						}
					}
				}
			}
		}
	}

	.permission-config {
		position: relative;
		padding: 0 24px;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				color: #111827;
				font-size: 18px;
				font-weight: 500;
				line-height: 28px;
			}

			.search-container {
				display: flex;
				flex-direction: column;
				gap: 8px;

				.search-desc {
					color: #374151;
					font-size: 14px;
					font-weight: 500;
					line-height: 20px;
				}
			}
		}

		.empty-desc {
			position: absolute;
			top: 48px;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			font-size: 16px;
			color: #6b7280;
		}
	}
}
</style>
