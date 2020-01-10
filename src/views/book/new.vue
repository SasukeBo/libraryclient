<template>
  <div class="book-new">
    <p>Add a Book</p>

    <el-form :model="form" style="width: 500px" :rules="rules" ref="form">
      <el-form-item label="Title" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="Author" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="ISBN" prop="isbn">
        <el-input v-model="form.isbn"></el-input>
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
  props: {},
  data() {
    return {
      rules: {
        title: [{ required: true, trigger: 'blur' }],
        name: [{ required: true, trigger: 'blur' }],
        isbn: [{ required: true, trigger: 'blur' }]
      },
      form: {
        title: '',
        name: '',
        isbn: ''
      }
    }
  },
  methods: {
    submit() {
      var app = this

      this.$refs['form'].validate(valid => {
        if (valid) {
          xhttp(
            '/books',
            'POST',
            result => {
              xhttp(
                `/books/${result.id}/authors`,
                'POST',
                () => {
                  app.$router.push({ name: 'book-list' })
                },
                app.form
              )
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
.book-new {
  max-width: 1280px;
  margin: auto;
  padding: 64px;
}
</style>
