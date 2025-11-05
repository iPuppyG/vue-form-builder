<template>
  <el-dialog class="view-member-dialog" :visible.sync="open" width="900px" center>
    <el-form label-position="'top'">
      <el-form-item :label="$t('orgManagement.dialog.edit.orgName')" prop="name"
        :rules="[{ required: true, message: $t('orgManagement.dialog.edit.nameInputPlaceholder'), trigger: 'blur' }]">
        <el-input :placeholder="$t('orgManagement.dialog.edit.nameInputPlaceholder')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('orgManagement.dialog.edit.parentOrg')" prop="pid"></el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "EditDialog",
  props: {
    type: {
      type: String,
      required: true,
      default: "add",
      validator: (value) => {
        const allowedTypes = ["add", "edit", "add-sub"];
        return allowedTypes.includes(value);
      }
    },
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    editRow: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      formData: {
        name: null,
        pid: null,
      },
    }
  },
}
</script>
