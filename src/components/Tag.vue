<template>
	<div :class="['tag', `tag--${color}`]">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "Tag",
	props: {
		color: {
			type: String,
			required: false,
			default: "blue",
			validator: value => {
				return ["blue", "green", "orange", "yellow"].includes(value)
			},
		},
	},
}
</script>

<style lang="scss">
.tag {
	padding: 2px 10px;
	border-radius: 9999px;
	font-size: 12px;
	text-align: center;
	display: inline-block;

	&--blue {
		color: #1e40af;
		background-color: #dbeafe;
	}

	&--green {
		color: #166534;
		background-color: #dcfce7;
	}

	&--orange {
		color: #854d0e;
		background-color: #ffedd5;
	}

	&--yellow {
		color: #854d0e;
		background-color: #fef9c3;
	}
}
</style>
