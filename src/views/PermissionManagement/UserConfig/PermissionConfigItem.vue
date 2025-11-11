<template>
	<div class="config-item">
		<AvatarPanel :label="item.name" :desc="$t(`orgManagement.tabMap.${tabKey}`)" />
		<el-checkbox-group :disabled="!item.editable">
			<el-checkbox
				v-for="type in permissionTypes"
				:key="type"
				v-if="typeof item[type] === 'boolean'"
				v-model="checkData[type]"
				:label="$t(`orgManagement.configAction.${type}`)"
			/>
		</el-checkbox-group>
	</div>
</template>

<script>
import AvatarPanel from "@/components/AvatarPanel"

export default {
	name: "OrgManagement",
	components: { AvatarPanel },
	props: {
		tabKey: {
			type: String,
			required: true,
		},
		item: {
			type: Object,
			required: true,
		},
	},
	data() {
		const permissionTypes = ["view", "edit", "manage", "submit", "export"]
		return {
			permissionTypes,
			checkData: permissionTypes.reduce((obj, type) => {
				obj[type] = typeof this.item[type] === "boolean" ? true : false
				return obj
			}, {}),
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
	border-radius: 8px;
	background-color: #f9fafb;
}
</style>
