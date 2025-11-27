<template>
	<el-container class="resource-config">
		<el-aside class="aside" width="460px">
			<el-header class="resource-config-header" height="38px">
				<div class="resource-config-title">
					{{ $t("permissionConfig.resourcePermissionConfig.resourceList") }}
				</div>
				<TreeSelect v-model="orgId" icon-class="ri-building-line" :width="256" :options="orgTreeOptions" />
			</el-header>
			<el-tabs v-model="resourceType" class="resource-tabs">
				<el-tab-pane
					v-for="resource in RESOURCE_TYPE_LIST"
					:key="resource"
					:name="resource"
					:label="$t(`permissionConfig.permissionTypeMap.${resource}`)"
				>
					<el-input
						v-model="searchResourceValue"
						class="search-input"
						prefix-icon="el-icon-search"
						:placeholder="$t('permissionConfig.resourcePermissionConfig.searchResource')"
					/>
					<div class="resource-list-container">
						<div class="resource-list">
							<div
								v-for="item in filteredResources"
								:key="item.id"
								class="resource-item"
								:class="checkedResourceItem.id === item.id ? 'checked' : null"
								@click="handleResourceClick(item)"
							>
								<AvatarPanel
									:icon-class="RESOURCE_TYPE_ICON[resource]"
									icon-color="#22c55e"
									:label="item.name"
									:desc="orgMap[orgId]"
								/>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-aside>

		<el-main class="resource-config-right">
			<template v-if="checkedResourceItem.id">
				<div class="header">
					<div class="config-title-wrap">
						<span class="title">{{ $t(`permissionConfig.permissionTypeMap.${resourceType}`) }}</span>
						<span class="desc">{{ checkedResourceItem.name }}</span>
					</div>
					<el-button v-if="showSubmitButton" type="primary" @click="handleSubmit">
						{{ $t("permissionConfig.savePermissionConfig") }}
					</el-button>
				</div>
				<el-tabs class="config-tabs" v-model="configTab">
					<!-- 搜索框 -->
					<el-input
						v-model="searchOrgOrUserValue"
						class="search-input"
						prefix-icon="el-icon-search"
						:placeholder="$t('permissionConfig.resourcePermissionConfig.searchResource')"
					/>
					<el-tab-pane
						v-for="tab in RESOURCE_CONFIG_TAB_LIST"
						:key="tab"
						:name="tab"
						:label="$t(`permissionConfig.resourcePermissionConfig.tabMap.${tab}`)"
					>
						<template slot="label">
							<i class="tab-icon" :class="tabIcon(tab)" />
							<span>{{ $t(`permissionConfig.resourcePermissionConfig.tabMap.${tab}`) }}</span>
						</template>
						<!-- 组织维度权限配置 -->
						<OrgConfigTree
							v-if="configTab === RESOURCE_CONFIG_TAB.ORG"
							:key="renderKeys[RESOURCE_CONFIG_TAB.ORG]"
							class="org-tree-list"
							:resource-type="resourceType"
							:search-value="searchOrgOrUserValue"
							:permissions="mockResourceOrgPermissions"
							@privilege-change="handlePermissionChange(RESOURCE_CONFIG_TAB.ORG, $event)"
						/>
						<!-- 用户维度权限配置 -->
						<UserConfigList
							v-if="configTab === RESOURCE_CONFIG_TAB.USER"
							:key="renderKeys[RESOURCE_CONFIG_TAB.USER]"
							class="user-config-list"
							:resource-type="resourceType"
							:search-value="searchOrgOrUserValue"
							:permissions="mockResourceUserPermissions"
							:render-key="renderKeys[RESOURCE_CONFIG_TAB.USER]"
							@privilege-change="handlePermissionChange(RESOURCE_CONFIG_TAB.USER, $event)"
						/>
					</el-tab-pane>
				</el-tabs>
			</template>
			<template v-else>
				<span class="empty-desc">{{ $t("permissionConfig.resourcePermissionConfig.selectLeftResource") }}</span>
			</template>
		</el-main>
	</el-container>
</template>

<script>
import AvatarPanel from "@/components/avatarPanel"
import TreeSelect from "@/components/treeSelect"
import OrgConfigTree from "./OrgConfigTree"
import UserConfigList from "./UserConfigList"
import { formatOrgTreeData } from "../utils"
import {
	mockOrgResourcePermissions,
	mockResourceOrgPermissions,
	mockOrgTreeData,
	mockResourceUserPermissions,
} from "../../mock"
import {
	RESOURCE_CONFIG_TAB,
	RESOURCE_CONFIG_TAB_LIST,
	RESOURCE_TYPE,
	RESOURCE_TYPE_ICON,
	RESOURCE_TYPE_LIST,
	RESOURCE_ACTION_TYPE_LIST,
} from "../constant"
import { convertOrgTreeToMap } from "../../org/utils"

export default {
	name: "ResourceConfig",
	components: {
		AvatarPanel,
		TreeSelect,
		OrgConfigTree,
		UserConfigList,
	},
	data() {
		return {
			RESOURCE_TYPE_LIST,
			RESOURCE_TYPE_ICON,
			RESOURCE_CONFIG_TAB,
			RESOURCE_CONFIG_TAB_LIST,
			RESOURCE_ACTION_TYPE_LIST,
			resourceType: RESOURCE_TYPE.PANEL, // 左侧Tab选中的资源类型
			orgId: mockOrgTreeData[0].orgId || null, // 左侧选中的组织
			searchResourceValue: "", // 左侧搜索资源
			checkedResourceItem: {
				name: null,
				id: null,
			},
			searchOrgOrUserValue: "", // 右侧搜索组织用户
			configTab: RESOURCE_CONFIG_TAB.ORG, // 右侧Tab选中类型: 组织/用户
			mockOrgTreeData,
			mockOrgResourcePermissions,
			mockResourceOrgPermissions,
			mockResourceUserPermissions,
			permissionChanges: {
				[RESOURCE_CONFIG_TAB.ORG]: {},
				[RESOURCE_CONFIG_TAB.USER]: {},
			},
			renderKeys: {
				[RESOURCE_CONFIG_TAB.ORG]: 0,
				[RESOURCE_CONFIG_TAB.USER]: 0,
			},
		}
	},
	computed: {
		showSubmitButton() {
			if (!this.checkedResourceItem.id) {
				return false
			}
			const changes = this.permissionChanges[this.configTab]
			return changes && Object.keys(changes).length > 0
		},
		orgTreeOptions() {
			return formatOrgTreeData(this.mockOrgTreeData)
		},
		orgMap() {
			return convertOrgTreeToMap(mockOrgTreeData)
		},
		filteredResources() {
			// 获取当前选中类型的所有资源
			const resources = mockOrgResourcePermissions[this.resourceType] || []

			// 搜索值为空时，返回全部资源
			if (!this.searchResourceValue.trim()) {
				return resources
			}
			// 不区分大小写，模糊匹配 name 字段
			const keyword = this.searchResourceValue.trim().toLowerCase()
			return resources.filter(item => item.name.toLowerCase().includes(keyword))
		},
		orgPermissionMap() {
			const map = {}
			this.collectOrgPermissions(this.mockResourceOrgPermissions, map)
			return map
		},
		userPermissionMap() {
			return (this.mockResourceUserPermissions || []).reduce((acc, item) => {
				acc[item.userId] = this.getPrivilegeArrayFromItem(item, this.RESOURCE_ACTION_TYPE_LIST)
				return acc
			}, {})
		},
	},
	watch: {
		resourceType: {
			immediate: true,
			deep: true,
			handler() {
				this.searchResourceValue = ""
				this.configTab = RESOURCE_CONFIG_TAB.ORG
				this.checkedResourceItem = {
					name: null,
					id: null,
				}
				this.resetAllChanges()
				this.resetAllRenderKeys()
			},
		},
		configTab: {
			immediate: true,
			handler(newTab, oldTab) {
				this.searchOrgOrUserValue = ""
				if (oldTab) {
					this.resetTabState(oldTab)
				}
			},
		},
	},
	methods: {
		handleResourceClick(resource) {
			this.checkedResourceItem = resource
			this.resetAllChanges()
			this.resetAllRenderKeys()
		},
		tabIcon(tab) {
			return tab === this.RESOURCE_CONFIG_TAB.ORG ? "ri-building-line" : "ri-user-line"
		},
		handlePermissionChange(tab, payload) {
			const originalPrivilege = this.getOriginalPrivilege(tab, payload.id)
			if (!originalPrivilege) {
				return
			}
			if (this.isPrivilegeEqual(originalPrivilege, payload.privilege)) {
				this.$delete(this.permissionChanges[tab], payload.id)
				return
			}
			this.$set(this.permissionChanges[tab], payload.id, payload.privilege)
		},
		getOriginalPrivilege(tab, id) {
			const map = tab === this.RESOURCE_CONFIG_TAB.ORG ? this.orgPermissionMap : this.userPermissionMap
			return map[id]
		},
		isPrivilegeEqual(origin, current) {
			if (!origin || !current || origin.length !== current.length) {
				return false
			}
			return origin.every((value, index) => value === current[index])
		},
		handleSubmit() {
			if (!this.showSubmitButton) {
				this.$message && this.$message.info("当前权限未发生变更")
				return
			}
			const payload = {
				id: this.checkedResourceItem.id,
				permissionType: this.resourceType,
				permissions: this.buildPermissionsPayload(this.configTab),
			}
			console.log("[ResourceConfig] Permission payload:", payload)
			this.$message && this.$message.success("权限配置已提交，详情见控制台")
			this.resetTabState(this.configTab)
		},
		buildPermissionsPayload(tab) {
			if (tab === this.RESOURCE_CONFIG_TAB.ORG) {
				return this.buildOrgPayload()
			}
			return this.buildUserPayload()
		},
		buildOrgPayload() {
			const overrides = this.permissionChanges[this.RESOURCE_CONFIG_TAB.ORG] || {}
			const list = []
			const traverse = node => {
				if (!node) {
					return
				}
				list.push({
					permissionTarget: node.orgId,
					privilege: overrides[node.orgId] || this.getPrivilegeArrayFromItem(node, this.RESOURCE_ACTION_TYPE_LIST),
				})
				const children = Array.isArray(node.child) ? node.child : []
				children.forEach(traverse)
			}
			traverse(this.mockResourceOrgPermissions)
			return list
		},
		buildUserPayload() {
			const overrides = this.permissionChanges[this.RESOURCE_CONFIG_TAB.USER] || {}
			return (this.mockResourceUserPermissions || []).map(user => ({
				permissionTarget: user.userId,
				privilege: overrides[user.userId] || this.getPrivilegeArrayFromItem(user, this.RESOURCE_ACTION_TYPE_LIST),
			}))
		},
		getPrivilegeArrayFromItem(item, actionList) {
			if (!item) {
				return actionList.map(() => false)
			}
			return actionList.map(action => Boolean(item[action]))
		},
		collectOrgPermissions(node, map) {
			if (!node) {
				return
			}
			map[node.orgId] = this.getPrivilegeArrayFromItem(node, this.RESOURCE_ACTION_TYPE_LIST)
			const children = Array.isArray(node.child) ? node.child : []
			children.forEach(child => this.collectOrgPermissions(child, map))
		},
		resetTabState(tab) {
			if (!tab) {
				return
			}
			this.$set(this.permissionChanges, tab, {})
			this.bumpRenderKey(tab)
		},
		resetAllChanges() {
			Object.keys(this.permissionChanges).forEach(tab => {
				this.$set(this.permissionChanges, tab, {})
			})
		},
		resetAllRenderKeys() {
			Object.keys(this.renderKeys).forEach(tab => {
				this.bumpRenderKey(tab)
			})
		},
		bumpRenderKey(tab) {
			this.$set(this.renderKeys, tab, (this.renderKeys[tab] || 0) + 1)
		},
	},
}
</script>

<style lang="scss">
.resource-config {
	position: relative;
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

	.resource-config-right {
		position: relative;
		padding-bottom: 0;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.config-title-wrap {
				display: flex;
				flex-direction: column;
				margin-bottom: 16px;

				.title {
					color: #111827;
					font-size: 18px;
					font-weight: 500;
					line-height: 28px;
					margin-bottom: 0;
				}

				.desc {
					color: #6b7280;
					font-size: 14px;
					line-height: 20px;
				}
			}
		}

		.config-tabs {
			height: calc(100% - 48px - 16px);

			.tab-icon {
				margin-right: 8px;
			}

			.search-input {
				margin-top: 16px;
				margin-bottom: 10px;
			}

			.el-tabs__content {
				height: calc(100% - 40px);

				.org-tree-list,
				.user-config-list {
					height: calc(100% - 58px);
					overflow-y: auto;
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
