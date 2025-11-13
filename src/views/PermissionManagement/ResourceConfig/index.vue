<template>
	<el-container class="resource-config">
		<el-aside class="aside" width="460px">
			<el-header class="resource-config-header" height="38px">
				<div class="resource-config-title">
					{{ $t("permissionConfig.resourcePermissionConfig.resourceList") }}
				</div>
				<TreeSelect
					v-model="resourceList.checkedOrgId"
					icon-class="ri-building-line"
					:width="256"
					:options="mockOrgTreeData"
					:normalizer="orgTreeDataNormalizer"
				/>
			</el-header>
			<el-tabs v-model="resourceList.activeTab" class="resource-tabs">
				<el-tab-pane
					v-for="permissionType in PERMISSION_TYPE_LIST"
					:key="permissionType"
					:name="permissionType"
					:label="$t(`permissionConfig.permissionTypeMap.${permissionType}`)"
				>
					<el-input
						v-model="resourceList.searchValue"
						class="search-input"
						prefix-icon="el-icon-search"
						:placeholder="$t('permissionConfig.resourcePermissionConfig.searchResource')"
					/>
					<div class="resource-list-container">
						<div class="resource-list">
							<div
								v-for="user in mockMemberData"
								:key="user.userId"
								class="resource-item"
								@click="handleUserClick(user)"
							>
								<AvatarPanel icon-class="ri-user-line" :label="user.nickName" :desc="user.email" />
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-aside>
		<el-main class="resource-config" />
	</el-container>
</template>

<script>
import AvatarPanel from "@/components/avatarPanel"
import TreeSelect from "@/components/treeSelect"
import { mockMemberData, mockOrgTreeData } from "../../mock"
import { PERMISSION_TYPE, PERMISSION_TYPE_LIST } from "../constant"
import { orgTreeDataNormalizer } from "../../OrgManagement/utils"

export default {
	name: "ResourceConfig",
	components: {
		AvatarPanel,
		TreeSelect,
	},
	data() {
		return {
			PERMISSION_TYPE_LIST,
			resourceList: {
				checkedOrgId: mockOrgTreeData[0].orgId || null,
				activeTab: PERMISSION_TYPE.PANEL,
				searchValue: null,
			},
			mockOrgTreeData,
			mockMemberData,
		}
	},
	methods: {
		orgTreeDataNormalizer,
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
.resource-config {
	height: calc(100% - 24px);
	margin-top: 24px;

	.aside {
		height: 100%;
		padding-right: 24px;
		border-right: 1px solid #e5e7eb;
		overflow: hidden;

		.resource-config-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0;
			margin-bottom: 16px;

			.resource-config-title {
				color: #111827;
				font-size: 18px;
				font-weight: 500;
			}
		}

		.resource-tabs {
			display: flex;
			flex-direction: column;
			height: calc(100% - 54px);

			.el-tab-pane {
				display: flex;
				flex-direction: column;
				gap: 16px;

				.search-input {
					margin-top: 16px;
				}

				.resource-list-container {
					flex: 1;
					border: 1px solid #e5e7eb;
					border-radius: 8px;
					overflow: hidden;

					.el-tabs__content {
						flex: 1;
						overflow: hidden;
					}

					.resource-list {
						height: 100%;
						overflow-y: auto;

						.resource-item {
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
}
</style>
