<template>
	<div class="config-item">
		<AvatarPanel
			iconClass="ri-dashboard-line"
			iconColor="#22c55e"
			:label="data.name"
			:desc="$t(`permissionConfig.permissionTypeMap.${permissionType}`)"
		/>
		<el-checkbox-group v-model="privilege" :disabled="!data.editable">
			<el-checkbox
				v-for="action in ACTION_TYPE_LIST[permissionType]"
				v-model="checkData[action]"
				:key="action"
				:label="$t(`permissionTypeMap.actionMap.${action}`)"
			/>
		</el-checkbox-group>
	</div>
</template>

<script>
import AvatarPanel from "@/components/AvatarPanel"
import { ACTION_TYPE_LIST, PERMISSION_TYPE, PERMISSION_TYPE_LIST } from "../constant"

export default {
	name: "PermissionConfigItem",
	components: { AvatarPanel },
	props: {
		// 权限类型
		permissionType: {
			type: String,
			required: true,
			validator: value => {
				return PERMISSION_TYPE_LIST.includes(value)
			},
		},
		// 权限项配置数据
		data: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			PERMISSION_TYPE,
			ACTION_TYPE_LIST,
			privilege: [],
		}
	},
}
</script>

<style>
.config-item {
	width: 100%;
	height: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 16px;
	border-radius: 8px;
	background-color: #f9fafb;
	gap: 12px;
}
</style>
