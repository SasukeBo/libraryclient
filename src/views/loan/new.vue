<template>
  <div class="loan-new">
    <p>Create a Loan for {{ this.user.name }}</p>

    <el-form :model="form" style="width: 500px" :rules="rules" ref="form">
      <el-form-item label="Book" prop="bookID">
        <el-select
          style="width: 100%;"
          v-model="form.bookID"
          filterable
          placeholder="Select a Book"
        >
          <el-option
            v-for="item in books"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Due Date" prop="dueDate">
        <el-date-picker
          style="width: 100%;"
          v-model="form.dueDate"
          type="date"
          placeholder="Select Date"
        >
        </el-date-picker>
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
  name: 'LoanNew',
  props: ['id'],
  data() {
    return {
      rules: {
        bookID: [{ required: true, trigger: 'blur' }],
        dueDate: [{ required: true, trigger: 'blur' }]
      },
      form: {
        bookID: undefined,
        dueDate: ''
      },
      books: [],
      user: {}
    }
  },
  created() {
    xhttp('/books', 'GET', result => {
      this.books = result
    })
    xhttp(`/users/${this.id}`, 'GET', result => {
      this.user = result
    })
  },
  methods: {
    submit() {
      var app = this

      this.$refs['form'].validate(valid => {
        if (valid) {
          xhttp(
            `/users/${this.id}/loans/${this.form.bookID}`,
            'POST',
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
.loan-new {
  max-width: 1280px;
  margin: auto;
  padding: 64px;
}
</style>
