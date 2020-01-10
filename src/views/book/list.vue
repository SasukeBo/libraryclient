<template>
  <div class="book-list">
    <el-table :data="books">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="isbn" label="ISBN"></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column label="Created At">
        <template slot-scope="scope">
          {{ new Date(scope.row.createdAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="Updated At">
        <template slot-scope="scope">
          {{ new Date(scope.row.updatedAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-button type="primary" @click="addBook()">Add Book</el-button>
        </template>

        <template slot-scope="scope">
          <el-button type="info" @click="showBook(scope.row.id)"
            >Details</el-button
          >
          <el-button type="danger" @click="deleteBook(scope.row.id)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { xhttp } from '../../util'

export default {
  name: 'BookList',
  data() {
    return {
      books: []
    }
  },
  created() {
    xhttp('/books?allEntities=true', 'GET', result => {
      this.books = result
    })
  },
  methods: {
    addBook() {
      this.$router.push({ name: 'book-new' })
    },
    showBook(id) {
      this.$router.push({ name: 'book-show', params: { id } })
    },
    deleteBook(id) {
      xhttp(`/books/${id}`, 'DELETE', result => {
        var index = this.books.findIndex(b => b.id === id)
        this.books.splice(index, 1)
      })
    }
  }
}
</script>
<style>
.book-list {
  max-width: 1280px;
  padding: 16px;
  margin: auto;
}
</style>
