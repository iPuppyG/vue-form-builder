<template>
	<router-view />
</template>

<script>
export default {
	name: "app",
	methods: {
		handleHome() {
			this.$router.push({ path: "/" })
		},

		handleLangCommand(command) {
			this.$router.replace({ name: this.$route.name, params: { lang: command } })
		},
	},
}
</script>

<style lang="scss">
*,
:after,
:before {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

html,
body {
	height: 100%;
}
</style>
