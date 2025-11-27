<template>
	<div class="config-item">
		<AvatarPanel :icon-class="icon" :iconColor="iconColor" :label="label" :desc="desc" />
		<el-checkbox-group v-model="privilege" :disabled="disabled" @change="handlePrivilegeChange">
			<el-checkbox class="checkbox" v-for="action in actionList" :key="action" :label="action">
				{{ $t(`${I18N_KEYS.action}.${action}`) }}
			</el-checkbox>
		</el-checkbox-group>
	</div>
</template>

<script>
import AvatarPanel from "@/components/avatarPanel"
import { I18N_KEYS } from "./constant"

export default {
	name: "ConfigItem",
	components: { AvatarPanel },
	props: {
		// 权限项配置数据
		data: {
			type: Object,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		// 描述信息
		desc: {
			type: String,
			default: "",
		},
		// 图标
		icon: {
			type: String,
			default: "ri-building-line",
		},
		// 图标颜色
		iconColor: {
			type: String,
			default: "#3b82f6",
		},
		// 支持的权限类型
		actionList: {
			type: Array,
			default: () => [],
		},
		// 是否允许修改权限
		disabled: {
			type: Boolean,
			default: false,
		},
		// 权限主体唯一标识字段
		idField: {
			type: String,
			default: "id",
		},
	},
	data() {
		return {
			I18N_KEYS,
			privilege: [],
		}
	},
	watch: {
		data: {
			immediate: true,
			deep: true,
			handler() {
				this.initPrivilege()
			},
		},
	},
	methods: {
		initPrivilege() {
			this.privilege = this.actionList
				.map(action => {
					return this.data[action] ? action : null
				})
				.filter(Boolean)
		},
		handlePrivilegeChange() {
			this.$emit("privilege-change", {
				id: this.getPermissionTargetId(),
				privilege: this.getPrivilegeArray(),
			})
		},
		getPrivilegeArray() {
			return this.actionList.map(action => {
				return this.privilege.includes(action)
			})
		},
		getPermissionTargetId() {
			if (this.data && this.idField && this.data[this.idField] !== undefined) {
				return this.data[this.idField]
			}
			if (this.data && this.data.id !== undefined) {
				return this.data.id
			}
			if (this.data && this.data.orgId !== undefined) {
				return this.data.orgId
			}
			if (this.data && this.data.userId !== undefined) {
				return this.data.userId
			}
			return null
		},
	},
}
</script>

<style lang="scss">
.config-item {
	width: 100%;
	min-height: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 16px;
	padding-right: 16px;
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
