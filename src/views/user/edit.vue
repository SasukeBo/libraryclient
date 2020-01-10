<template>
  <div class="user-new">
    <p>Edit User</p>

    <el-form :model="form" style="width: 500px" :rules="rules" ref="form">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="Member Type" prop="memberType">
        <el-radio-group v-model="form.memberType">
          <el-radio label="Student">Student</el-radio>
          <el-radio label="Staff">Staff</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="info" @click="$router.go(-1)">Back</el-button>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { xhttp } from '../../util'

export default {
  name: 'BookNew',
  props: {
    id: [String, Number]
  },
  data() {
    return {
      rules: {
        name: [{ required: true, trigger: 'blur' }]
      },
      form: {
        memberType: '',
        name: ''
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      xhttp(`/users/${this.id}`, 'GET', result => {
        this.form.memberType = result.memberType
        this.form.name = result.name
      })
    },
    submit() {
      var app = this

      this.$refs['form'].validate(valid => {
        if (valid) {
          xhttp(
            `/users/${this.id}`,
            'PUT',
            result => {
              app.$router.push({ name: 'user-show', params: { id: this.id } })
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
