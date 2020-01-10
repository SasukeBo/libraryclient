<template>
  <div class="book-list">
    <h1>User Loans</h1>
    <el-table :data="loans">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column label="Due Date">
        <template slot-scope="scope">
          {{ new Date(scope.row.dueDate).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-button
            @click="$router.push({ name: 'loan-new', params: { id } })"
            type="primary"
            >Create a Loan</el-button
          >
        </template>

        <template slot-scope="scope">
          <el-button type="info" @click="showBook(scope.row.id)"
            >See Book</el-button
          >
          <el-button type="danger" @click="deleteLoan(scope.row.id)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { xhttp } from '../../../util'

export default {
  name: 'UserBookList',
  props: ['id'],
  data() {
    return {
      loans: []
    }
  },
  created() {
    xhttp(`/users/${this.id}/loans`, 'GET', result => {
      var loans = []
      result.forEach(r => {
        xhttp(`/books/${r.BookId}`, 'GET', result => {
          loans.push({
            ...result,
            id: r.id,
            dueDate: r.dueDate
          })
        })
      })

      this.loans = loans
    })
  },
  methods: {
    showBook(id) {
      this.$router.push({ name: 'book-show', params: { id } })
    },
    deleteLoan(id) {
      xhttp(`/loans/${id}`, 'DELETE', result => {
        var index = this.loans.findIndex(l => l.id === id)
        this.loans.splice(index, 1)
      })
    }
  }
}
</script>
<style>
.user-show .book-list {
  margin-top: 32px;
}
</style>
