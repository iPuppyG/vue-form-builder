<template>
	<el-container class="resource-config">
		<el-aside class="resource-list" width="460px">
			<el-header class="header" height="38px">
				<div class="title">{{ $t("permissionConfig.resourcePermissionConfig.resourceList") }}</div>
				<TreeSelect
					v-model="resourceList.checkedOrgId"
					:width="256"
					:options="mockOrgTreeData"
					:normalizer="normalizer"
					iconClass="ri-building-line"
				/>
			</el-header>
			<el-tabs class="tabs" v-model="resourceList.activeTab">
				<el-tab-pane
					v-for="permissionType in PERMISSION_TYPE_LIST"
					:name="permissionType"
					:key="permissionType"
					:label="$t(`orgManagement.tabMap.${permissionType}`)"
				>
					<el-input
						class="search-input"
						v-model="resourceList.searchValue"
						prefix-icon="el-icon-search"
						:placeholder="$t('permissionConfig.resourcePermissionConfig.searchResource')"
					/>
					<div class="resource-list-container">
						<div class="resource-list">
							<div
								class="resource-item"
								v-for="user in mockMemberData"
								:key="user.userId"
								@click="handleUserClick(user)"
							>
								<AvatarPanel iconClass="ri-user-line" :label="user.username" :desc="user.email" />
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-aside>
		<el-main class="resource-config"></el-main>
	</el-container>
</template>

<script>
import Avatar from "../../../components/Avatar.vue"
import AvatarPanel from "../../../components/AvatarPanel.vue"
import TreeSelect from "../../../components/TreeSelect.vue"
import { mockMemberData, mockOrgTreeData } from "../../../mock"
import { PERMISSION_TYPE_LIST } from "../constant"

export default {
	name: "ResourceConfig",
	components: {
		Avatar,
		AvatarPanel,
		TreeSelect,
	},
	data() {
		return {
			PERMISSION_TYPE_LIST,
			mockMemberData,
			mockOrgTreeData,
			resourceList: {
				checkedOrgId: mockOrgTreeData[0].orgId || null,
				activeTab: "panel",
				searchValue: null,
			},
		}
	},
	methods: {
		normalizer(node) {
			return {
				id: node.subOrganizations,
				label: node.name,
				children: node.subOptions,
			}
		},
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
	height: 100%;
	padding-top: 24px;

	.resource-list {
		display: flex;
		flex-direction: column;
		padding-right: 24px;
		border-right: 1px solid #e5e7eb;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0;
			margin-bottom: 16px;

			.title {
				color: #111827;
				font-size: 18px;
				font-weight: 500;
			}
		}

		.tabs {
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

					.resource-list {
						height: 100%;
						overflow-y: scroll;

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
