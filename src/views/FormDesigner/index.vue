<template>
  <fm-making-form
    ref="makingForm"
    preview
    save
    :basic-fields="['input', 'textarea', 'number', 'radio', 'checkbox', 'date', 'select']"
    :advance-fields="['editor']"
  >
    <template slot="action" />
  </fm-making-form>
</template>

<script>
import FmMakingForm from './components/Container'

export default {
  name: 'FormDesigner',
  components: {
    FmMakingForm
  }
}
</script>
