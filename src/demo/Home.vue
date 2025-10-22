<template>
	<fm-making-form
		ref="makingForm"
		preview
		save
		:basic-fields="['input', 'textarea', 'radio', 'checkbox', 'date', 'select']"
		:advance-fields="['editor']"
	>
		<template slot="action"></template>
	</fm-making-form>
</template>
