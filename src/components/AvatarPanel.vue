<template>
	<div class="avatar-panel" v-bind="$attrs">
		<Avatar :icon="iconClass" />
		<div class="content">
			<span class="label">{{ label }}</span>
			<span class="desc">{{ desc }}</span>
		</div>
	</div>
</template>

<script>
import Avatar from "./Avatar.vue"

export default {
	name: "AvatarPanel",
	components: {
		Avatar,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: false,
		},
		iconClass: {
			type: String,
			default: "ri-user-line",
			required: false,
		},
		color: {
			type: String,
			default: "#3b82f6",
		},
	},
}
</script>

<style lang="scss">
.avatar-panel {
	display: flex;
	max-width: 100%;
	overflow: hidden;
	align-items: center;

	.content {
		display: flex;
		flex-direction: column;
		margin-left: 12px;

		.label,
		.desc {
			text-overflow: hidden;
			white-space: nowrap;
			overflow: hidden;
		}

		.label {
			color: #111827;
			font-size: 14px;
			font-weight: 500;
			line-height: 20px;
		}

		.desc {
			color: #6b7280;
			font-size: 12px;
			line-height: 16px;
		}
	}
}
</style>
