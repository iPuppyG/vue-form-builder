<template>
	<div class="avatar-container" :style="{ width: `${size}px`, height: `${size}px`, backgroundColor: color }">
		<i class="avatar-icon" :class="icon" :style="{ fontSize: `${fontSize}px` }"></i>
	</div>
</template>

<script>
export default {
	name: "Avatar",
	props: {
		icon: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			default: 32,
		},
		fontSize: {
			type: Number,
			default: 14,
		},
		color: {
			type: String,
			default: "#3b82f6",
		},
	},
}
</script>

<style lang="scss">
.avatar-container {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	color: #fff;

	.avatar-icon {
		font-size: 14px;
	}
}
</style>
