<template>
	<el-container class="user-config">
		<el-aside class="permission-subject">
			<div class="title">{{ $t("permissionConfig.core_subject.permission_subject") }}</div>
			<el-tabs v-model="activeTab">
				<el-tab-pane name="organization">
					<template slot="label">{{ $t("permissionConfig.core_subject.organization") }}</template>
					<div class="search-panel">
						<el-input
							v-model="searchValue"
							prefix-icon="el-icon-search"
							:placeholder="$t('permissionConfig.core_subject.search_organization')"
						/>
						<div class="tree-container">
							<el-tree
								:data="treeData"
								:render-content="renderContent"
								:check-strictly="false"
								:expand-on-click-node="false"
								highlight-current
								default-expand-all
								@node-click="handleOrganizationClick"
							/>
						</div>
					</div>
				</el-tab-pane>

				<el-tab-pane name="user">
					<template slot="label">
						{{ $t("permissionConfig.core_subject.user") }}
					</template>
					<div class="search-panel">
						<el-input
							v-model="searchValue"
							prefix-icon="el-icon-search"
							:placeholder="$t('permissionConfig.core_subject.user')"
						/>
						<div class="user-list-container">
							<div class="user-list">
								<div
									class="user-item"
									:class="checkedUserId === user.id ? 'checked' : null"
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
			<template v-if="checkedUserId || checkedOrganizationId">
				<el-header class="header">
					<span class="title">{{ $t("permissionConfig.operation_config.permission_config") }}</span>
					<div class="search-container">
						<span class="search-desc">{{ $t("permissionConfig.operation_config.select_organization") }}</span>
						<TreeSelect iconClass="ri-building-line" :width="256" :options="treeData" />
					</div>
				</el-header>
			</template>
			<template v-else>
				<span class="empty-desc">{{ $t("permissionConfig.operation_config.select_left_subject") }}</span>
			</template>
		</el-main>
	</el-container>
</template>

<script>
import Avatar from "../../../components/Avatar.vue"
import AvatarPanel from "../../../components/AvatarPanel.vue"
import TreeSelect from "../../../components/TreeSelect.vue"

export default {
	name: "UserConfig",
	components: {
		Avatar,
		AvatarPanel,
		TreeSelect,
	},
	data() {
		return {
			activeTab: "organization",
			searchValue: "",
			treeData: [
				{
					id: "company_001",
					label: "总公司",
					children: [
						{
							id: "dept_001",
							label: "技术部",
						},
						{
							id: "dept_002",
							label: "产品部",
						},
						{
							id: "dept_003",
							label: "运营部",
						},
					],
				},
				{
					id: "company_002",
					label: "分公司A",
					children: [
						{
							id: "dept_004",
							label: "销售部",
						},
						{
							id: "dept_005",
							label: "市场部",
						},
					],
				},
			],
			userList: [
				{ id: 1, name: "张三", email: "zhangsan@company.com" },
				{ id: 2, name: "李四", email: "lisi@company.com" },
				{ id: 3, name: "王五", email: "wangwu@company.com" },
				{ id: 4, name: "赵六", email: "zhaoliu@company.com" },
				{ id: 5, name: "钱七", email: "qianqi@company.com" },
				{ id: 6, name: "孙八", email: "sunba@company.com" },
			],
			checkedOrganizationId: null,
			checkedUserId: null,
		}
	},
	methods: {
		renderContent(_, { node }) {
			return <AvatarPanel iconClass="ri-building-line" label={node.label} />
		},

		handleOrganizationClick(organization) {
			this.checkedOrganizationId = organization.id
		},

		handleUserClick(user) {
			console.log("Clicked user:", user)
			this.checkedUserId = user.id
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

						.content {
							display: flex;
							flex-direction: column;
							justify-content: center;

							.name,
							.email {
								text-overflow: hidden;
								white-space: nowrap;
								overflow: hidden;
							}

							.name {
								color: #111827;
								font-size: 14px;
								font-weight: 500;
								line-height: 20px;
							}

							.email {
								color: #6b7280;
								font-size: 12px;
								line-height: 16px;
							}
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
