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
								:data="mockOrgTreeData"
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
									v-for="user in mockMemberData"
									:key="user.userId"
									class="user-item"
									:class="targetUserId === user.userId ? 'checked' : null"
									@click="handleUserClick(user)"
								>
									<AvatarPanel icon-class="ri-user-line" :label="user.username" :desc="user.email" />
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-aside>

		<PermissionConfig
			v-show="permissionSubject === PERMISSION_SUBJECT.ORG"
			:permission-subject="PERMISSION_SUBJECT.ORG"
			:target-id="targetOrgId"
		/>

		<PermissionConfig
			v-show="permissionSubject === PERMISSION_SUBJECT.USER"
			:permission-subject="PERMISSION_SUBJECT.USER"
			:target-id="targetUserId"
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
			searchValue: null,
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
	},
	methods: {
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
