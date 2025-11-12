<template>
	<el-main class="permission-config">
		<template v-if="targetId">
			<el-header class="header">
				<span class="title">{{ $t("permissionConfig.userPermissionConfig.permissionConfig") }}</span>
				<div class="search-container">
					<span class="search-desc">{{ $t("permissionConfig.userPermissionConfig.selectOrganization") }}</span>
					<TreeSelect
						v-model="orgId"
						iconClass="ri-building-line"
						:width="256"
						:options="mockOrgTreeData"
						:normalizer="normalizer"
					/>
				</div>
			</el-header>
			<el-main>
				<el-tabs class="tabs" v-model="permissionType">
					<el-tab-pane
						v-for="type in PERMISSION_TYPE_LIST"
						:name="type"
						:key="type"
						:label="$t(`permissionConfig.permissionTypeMap.${type}`)"
					>
						<div class="config-list">
							<PermissionConfigItem
								v-for="item in actionList[type]"
								:key="item.id"
								:permission-type="type"
								:data="item"
							/>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</template>

		<template v-else>
			<span class="empty-desc">{{ $t("permissionConfig.userPermissionConfig.selectLeftSubject") }}</span>
		</template>
	</el-main>
</template>

<script>
import TreeSelect from "@/components/TreeSelect"
import PermissionConfigItem from "./PermissionConfigItem"
import { PERMISSION_SUBJECT_LIST, PERMISSION_TYPE_LIST, PERMISSION_TYPE, PERMISSION_SUBJECT } from "../constant"
import { mockOrgTreeData, mockOrgResourcePermissions, mockUserResourcePermissions } from "../../../mock"

export default {
	name: "PermissionCOnfig",
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
		}
	},
	computed: {
		actionList() {
			return this.permissionSubject === PERMISSION_SUBJECT.ORG
				? mockOrgResourcePermissions
				: mockUserResourcePermissions
		},
	},
	methods: {
		normalizer(node) {
			return {
				id: node.orgId,
				label: node.name,
				children: node.subOrganizations,
			}
		},
	},
}
</script>

<style lang="scss">
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

	.tabs {
		.config-list {
			display: flex;
			flex-direction: column;
			gap: 12px;
			margin-top: 16px;
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
