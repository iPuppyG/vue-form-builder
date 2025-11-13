<template>
	<div class="config-item">
		<AvatarPanel
			icon-class="ri-dashboard-line"
			icon-color="#22c55e"
			:label="data.name"
			:desc="$t(`permissionConfig.permissionTypeMap.${permissionType}`)"
		/>
		<el-checkbox-group v-model="privilege" :disabled="!data.editable">
			<el-checkbox
				class="checkbox"
				v-for="action in ACTION_TYPE_LIST[permissionType]"
				:key="action"
				:label="$t(`${I18N_KEYS.action}.${action}`)"
			/>
		</el-checkbox-group>
	</div>
</template>

<script>
import AvatarPanel from "@/components/avatarPanel"
import { ACTION_TYPE_LIST, I18N_KEYS, PERMISSION_TYPE, PERMISSION_TYPE_LIST } from "../constant"

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
			I18N_KEYS,
			privilege: [],
		}
	},
}
</script>

<style lang="scss">
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

	.checkbox {
		.el-checkbox__label {
			color: #374151;
			font-weight: 400;
		}
	}
}
</style>
