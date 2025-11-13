<template>
	<el-container class="user-config">
		<el-aside class="permission-subject">
			<div class="title">{{ $t("permissionConfig.userPermissionConfig.permissionSubject") }}</div>
			<el-tabs v-model="permissionSubject">
				<el-tab-pane v-for="subject in PERMISSION_SUBJECT_LIST" :key="subject" :name="subject">
					<template slot="label">
						{{ $t(`permissionConfig.userPermissionConfig.permissionSubjectMap.${subject}`) }}
					</template>
					<div class="search-panel">
						<el-input
							v-model="searchValue"
							prefix-icon="el-icon-search"
							:placeholder="$t(`permissionConfig.userPermissionConfig.searchPlaceholder.${subject}`)"
						/>
						<!-- 权限主体-组织 -->
						<div v-show="permissionSubject === PERMISSION_SUBJECT.ORG" class="tree-container">
							<el-tree
								node-key="orgId"
								:data="filteredOrgTreeData"
								:render-content="renderContent"
								:check-strictly="false"
								:expand-on-click-node="false"
								:props="{ label: 'name', children: 'subOrganizations' }"
								highlight-current
								default-expand-all
								@node-click="handleOrgClick"
							/>
						</div>
						<!-- 权限主体-用户 -->
						<div v-show="permissionSubject === PERMISSION_SUBJECT.USER" class="user-list-container">
							<div class="user-list">
								<div
									v-for="user in filteredMemberData"
									:key="user.userId"
									class="user-item"
									:class="targetUserId === user.userId ? 'checked' : null"
									@click="handleUserClick(user)"
								>
									<AvatarPanel icon-class="ri-user-line" :label="user.nickName" :desc="user.email" />
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-aside>

		<PermissionConfig
			:key="`${permissionSubject}-${targetId || 'empty'}`"
			:permission-subject="permissionSubject"
			:target-id="targetId"
		/>
	</el-container>
</template>

<script>
import AvatarPanel from "@/components/avatarPanel"
import PermissionConfig from "./PermissionConfig"
import { PERMISSION_SUBJECT, PERMISSION_SUBJECT_LIST } from "../constant"
import { mockOrgTreeData, mockMemberData, mockOrgResourcePermissions, mockUserResourcePermissions } from "../../mock"

export default {
	name: "UserConfig",
	components: {
		AvatarPanel,
		PermissionConfig,
	},
	data() {
		return {
			PERMISSION_SUBJECT,
			PERMISSION_SUBJECT_LIST,
			permissionSubject: PERMISSION_SUBJECT.ORG,
			searchValue: "",
			targetOrgId: null,
			targetUserId: null,
			mockOrgTreeData,
			mockMemberData,
			mockOrgResourcePermissions,
			mockUserResourcePermissions,
		}
	},
	computed: {
		targetId() {
			return this.permissionSubject === PERMISSION_SUBJECT.ORG ? this.targetOrgId : this.targetUserId
		},
		// 组织搜索结果
		filteredOrgTreeData() {
			if (!this.searchValue) {
				return this.mockOrgTreeData
			}
			const keyword = this.searchValue.toLowerCase()
			return this.filterOrgTree(this.mockOrgTreeData, keyword)
		},
		// 用户搜索结果
		filteredMemberData() {
			if (!this.searchValue) {
				return this.mockMemberData
			}
			const keyword = this.searchValue.toLowerCase()
			return this.mockMemberData.filter(user => {
				return user.nickName.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword)
			})
		},
	},
	watch: {
		permissionSubject() {
			// 切换Tab时清空搜索词
			this.searchValue = ""
		},
	},
	methods: {
		// 组织搜索
		filterOrgTree(treeData, keyword) {
			return treeData
				.map(node => {
					const matches = node.name.toLowerCase().includes(keyword)
					const filteredChildren = node.subOrganizations ? this.filterOrgTree(node.subOrganizations, keyword) : null

					// 如果当前节点匹配或有匹配的子节点，则保留该节点
					if (matches || (filteredChildren && filteredChildren.length > 0)) {
						return {
							...node,
							subOrganizations: filteredChildren,
						}
					}
					return null
				})
				.filter(Boolean)
		},
		renderContent(_, { node }) {
			return <AvatarPanel iconClass="ri-building-line" label={node.label} />
		},
		handleOrgClick(org) {
			this.targetOrgId = org.orgId
		},
		handleUserClick(user) {
			this.targetUserId = user.userId
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
}
</style>
