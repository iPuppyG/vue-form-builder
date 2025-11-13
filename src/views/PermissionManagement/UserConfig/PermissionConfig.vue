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
						<TreeSelect
							v-model="orgId"
							icon-class="ri-building-line"
							:width="256"
							:options="mockOrgTreeData"
							:normalizer="orgTreeDataNormalizer"
						/>
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
							:key="item.id"
							:permission-type="type"
							:data="item"
							@privilege-change="handlePrivilegeChange"
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
import PermissionConfigItem from "./PermissionConfigItem"
import {
	PERMISSION_SUBJECT_LIST,
	PERMISSION_TYPE_LIST,
	PERMISSION_TYPE,
	PERMISSION_SUBJECT,
	ACTION_TYPE_LIST,
} from "../constant"
import { mockOrgTreeData, mockOrgResourcePermissions, mockUserResourcePermissions } from "../../mock"
import { orgTreeDataNormalizer } from "../../OrgManagement/utils"

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
		return {
			PERMISSION_TYPE_LIST,
			PERMISSION_TYPE,
			orgId: mockOrgTreeData[0].orgId || null,
			mockOrgTreeData,
			permissionType: PERMISSION_TYPE.PANEL,
			permissionChanges: {},
		}
	},
	computed: {
		actionList() {
			return this.permissionSubject === PERMISSION_SUBJECT.ORG
				? mockOrgResourcePermissions
				: mockUserResourcePermissions
		},
		showSubmitBtn() {
			// 当权限变更数据不为空时，显示提交按钮
			return Object.keys(this.permissionChanges).length > 0
		},
		originalData() {
			// 获取原始数据，用于比较
			return this.actionList
		},
	},
	watch: {
		targetId() {
			// 切换targetId时，清空权限变更数据
			this.permissionChanges = {}
		},
	},
	methods: {
		orgTreeDataNormalizer,
		handlePrivilegeChange(changeData) {
			// 更新权限变更数据
			const key = `${changeData.permissionType}-${changeData.id}`
			const originalItem = this.originalData[changeData.permissionType].find(item => item.id === changeData.id)

			if (!originalItem) return

			// 获取原始权限数组
			const actionList = ACTION_TYPE_LIST[changeData.permissionType]
			const originalPrivilege = actionList.map(action => originalItem[action] || false)

			// 比较是否与原始数据相同
			const isChanged = !this.arraysEqual(originalPrivilege, changeData.privilege)

			if (isChanged) {
				this.$set(this.permissionChanges, key, changeData)
			} else {
				// 如果恢复原状，则移除变更记录
				this.$delete(this.permissionChanges, key)
			}
		},
		arraysEqual(arr1, arr2) {
			if (arr1.length !== arr2.length) return false
			return arr1.every((val, index) => val === arr2[index])
		},
		handleSubmit() {
			// 收集所有权限变更数据
			const permissions = Object.values(this.permissionChanges).map(change => ({
				id: change.id,
				permissionType: change.permissionType,
				privilege: change.privilege,
			}))

			const requestData = {
				permissionTarget: this.targetId,
				permissions,
			}

			console.log("提交权限配置数据:", JSON.stringify(requestData, null, 2))

			// 提交后清空变更记录
			this.permissionChanges = {}
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
