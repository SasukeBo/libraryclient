<template>
  <div class="user-new">
    <p>Add a User</p>

    <el-form :model="form" style="width: 500px" :rules="rules" ref="form">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="Bar Code" prop="barcode">
        <el-input v-model="form.barcode"></el-input>
      </el-form-item>

      <el-form-item label="Member Type" prop="memberType">
        <el-radio-group v-model="form.memberType">
          <el-radio label="Student">Student</el-radio>
          <el-radio label="Staff">Staff</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { xhttp } from '../../util'

export default {
  name: 'BookNew',
  props: {},
  data() {
    return {
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        barcode: [{ required: true, trigger: 'blur' }]
      },
      form: {
        memberType: 'Student',
        name: 'Sarah',
        barcode: '39587985'
      }
    }
  },
  methods: {
    submit() {
      var app = this

      this.$refs['form'].validate(valid => {
        if (valid) {
          xhttp(
            '/users',
            'POST',
            result => {
              app.$router.push({ name: 'user-list' })
            },
            this.form
          )
        }
      })
    }
  }
}
</script>
<style>
.user-new {
  max-width: 1280px;
  margin: auto;
  padding: 64px;
}
</style>
