<template>
	<el-main class="permission-config">
		<template v-if="targetId">
			<el-header class="header">
				<span class="permission-config-title">{{ $t("permissionConfig.userPermissionConfig.permissionConfig") }}</span>
				<div class="action-wrap">
					<el-button v-if="showSubmitBtn" class="btn" type="primary" @click="handleSubmit">
						{{ $t("permissionConfig.savePermissionConfig") }}
					</el-button>
					<div class="search-container">
						<span class="search-desc">{{ $t("permissionConfig.userPermissionConfig.selectOrganization") }}</span>
						<TreeSelect v-model="orgId" icon-class="ri-building-line" :width="256" :options="orgTreeOptions" />
					</div>
				</div>
			</el-header>

			<el-tabs v-model="permissionType" class="tabs">
				<el-tab-pane
					v-for="type in PERMISSION_TYPE_LIST"
					:key="type"
					:name="type"
					:label="$t(`permissionConfig.permissionTypeMap.${type}`)"
				>
					<div class="config-list">
						<PermissionConfigItem
							v-for="item in actionList[type]"
							:key="`${item.id}-${renderKeys[type]}`"
							:label="item.name"
							:data="item"
							:action-list="ACTION_TYPE_LIST[type]"
							:disabled="!item.canEdit"
							:desc="$t(`permissionConfig.permissionTypeMap.${permissionType}`)"
							icon-class="ri-dashboard-line"
							icon-color="#22c55e"
							@privilege-change="handlePrivilegeChange(type, $event)"
						/>
					</div>
				</el-tab-pane>
			</el-tabs>
		</template>

		<template v-else>
			<span class="empty-desc">{{ $t("permissionConfig.userPermissionConfig.selectLeftSubject") }}</span>
		</template>
	</el-main>
</template>

<script>
import TreeSelect from "@/components/treeSelect"
import PermissionConfigItem from "../PermissionConfigItem"
import {
	PERMISSION_SUBJECT_LIST,
	PERMISSION_TYPE_LIST,
	PERMISSION_TYPE,
	PERMISSION_SUBJECT,
	ACTION_TYPE_LIST,
} from "../constant"
import { mockOrgTreeData, mockOrgResourcePermissions, mockUserResourcePermissions } from "../../mock"
import { formatOrgTreeData } from "../utils"

export default {
	name: "PermissionConfig",
	components: {
		TreeSelect,
		PermissionConfigItem,
	},
	props: {
		// 权限主体: 组织/用户
		permissionSubject: {
			type: String,
			required: true,
			validator: value => {
				return PERMISSION_SUBJECT_LIST.includes(value)
			},
		},
		// 权限主体ID: orgId/userId
		targetId: {
			type: Number,
			default: null,
		},
	},
	data() {
		const permissionChanges = {}
		const renderKeys = {}
		PERMISSION_TYPE_LIST.forEach(type => {
			permissionChanges[type] = {}
			renderKeys[type] = 0
		})
		return {
			PERMISSION_TYPE_LIST,
			PERMISSION_TYPE,
			ACTION_TYPE_LIST,
			orgId: mockOrgTreeData[0].orgId || null,
			mockOrgTreeData,
			permissionType: PERMISSION_TYPE.PANEL,
			permissionChanges,
			renderKeys,
		}
	},
	computed: {
		orgTreeOptions() {
			return formatOrgTreeData(this.mockOrgTreeData)
		},
		actionList() {
			return this.permissionSubject === PERMISSION_SUBJECT.ORG
				? mockOrgResourcePermissions
				: mockUserResourcePermissions
		},
		showSubmitBtn() {
			if (!this.targetId) {
				return false
			}
			const changes = this.permissionChanges[this.permissionType]
			return changes && Object.keys(changes).length > 0
		},
	},
	watch: {
		permissionType(newType, oldType) {
			if (oldType) {
				this.resetTabState(oldType)
			}
		},
		targetId() {
			this.resetAllChanges()
			this.resetAllRenderKeys()
		},
	},
	methods: {
		handlePrivilegeChange(permissionType, payload) {
			const targetPrivilege = this.getOriginalPrivilege(permissionType, payload.id)
			if (!targetPrivilege) {
				return
			}
			if (this.isPrivilegeEqual(targetPrivilege, payload.privilege)) {
				this.$delete(this.permissionChanges[permissionType], payload.id)
				return
			}
			this.$set(this.permissionChanges[permissionType], payload.id, payload.privilege)
		},
		getOriginalPrivilege(permissionType, id) {
			const items = this.actionList[permissionType] || []
			const actionList = this.ACTION_TYPE_LIST[permissionType] || []
			const targetItem = items.find(item => item.id === id)
			return this.getPrivilegeArrayFromItem(targetItem, actionList)
		},
		isPrivilegeEqual(origin, current) {
			if (!origin || !current || origin.length !== current.length) {
				return false
			}
			return origin.every((value, index) => value === current[index])
		},
		getPrivilegeArrayFromItem(item, actionList) {
			if (!item) {
				return actionList.map(() => false)
			}
			return actionList.map(action => Boolean(item[action]))
		},
		handleSubmit() {
			if (!this.showSubmitBtn) {
				this.$message && this.$message.info("当前权限未发生变更")
				return
			}
			const payload = {
				permissionTarget: this.targetId,
				permissions: this.buildPermissionsPayload(),
			}
			console.log("[UserConfig] Permission payload:", payload)
			this.$message && this.$message.success("权限配置已提交，详情见控制台")
			this.resetTabState(this.permissionType)
		},
		buildPermissionsPayload() {
			const currentType = this.permissionType
			const overrides = this.permissionChanges[currentType] || {}
			const actionList = this.ACTION_TYPE_LIST[currentType] || []
			return (this.actionList[currentType] || []).map(item => ({
				id: item.id,
				permissionType: currentType,
				privilege: overrides[item.id] || this.getPrivilegeArrayFromItem(item, actionList),
			}))
		},
		resetTabState(permissionType) {
			this.$set(this.permissionChanges, permissionType, {})
			this.bumpRenderKey(permissionType)
		},
		resetAllChanges() {
			Object.keys(this.permissionChanges).forEach(type => {
				this.$set(this.permissionChanges, type, {})
			})
		},
		resetAllRenderKeys() {
			Object.keys(this.renderKeys).forEach(type => {
				this.bumpRenderKey(type)
			})
		},
		bumpRenderKey(permissionType) {
			this.$set(this.renderKeys, permissionType, (this.renderKeys[permissionType] || 0) + 1)
		},
	},
}
</script>

<style lang="scss">
.permission-config {
	position: relative;
	padding: 0 24px 0 !important;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.permission-config-title {
			color: #111827;
			font-size: 18px;
			font-weight: 500;
			line-height: 28px;
		}

		.action-wrap {
			display: flex;
			align-items: flex-end;
			gap: 24px;

			.btn {
				border-radius: 8px;
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
	}

	.tabs {
		padding-left: 24px;
		height: calc(100% - 60px) !important;

		.el-tabs__content {
			.el-tab-pane {
				height: calc(100% - 16px) !important;
			}
		}

		.config-list {
			display: flex;
			flex-direction: column;
			gap: 12px;
			margin-top: 16px;
			height: 100%;
			overflow-y: auto;
			padding-bottom: 12px;
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
</style>
