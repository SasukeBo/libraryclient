<template>
  <div class="book-show" v-if="book">
    <h1>Book</h1>

    <div class="details-item">
      <span class="label">Title</span>
      <span class="value">{{ book.title }}</span>
    </div>

    <div class="details-item" v-if="book.Authors">
      <span class="label">Authors: </span>
      <div v-for="a in book.Authors" :key="a.id" class="details-item">
        <span class="value">
          <span class="list"></span>
          {{ a.name }}
        </span>
      </div>
    </div>

    <div class="details-item">
      <span class="label">ISBN</span>
      <span class="value">{{ book.isbn }}</span>
    </div>

    <div class="details-item">
      <span class="label">Created At</span>
      <span class="value">{{ new Date(book.createdAt).toLocaleString() }}</span>
    </div>

    <div class="details-item">
      <span class="label">UpdatedAt At</span>
      <span class="value">{{ new Date(book.updatedAt).toLocaleString() }}</span>
    </div>

    <el-button
      type="danger"
      @click="deleteBook()"
      icon="el-icon-delete"
      style="margin-top: 64px;"
      >Delete</el-button
    >
  </div>
</template>
<script>
import { xhttp } from '../../util'

export default {
  name: 'BookShow',
  props: {
    id: [Number, String]
  },
  data() {
    return {
      book: {}
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: function(val) {
        if (val) {
          this.getBook(val)
        }
      }
    }
  },
  methods: {
    getBook(id) {
      xhttp(`/books/${id}?allEntities=true`, 'GET', result => {
        this.book = result
      })
    },
    deleteBook() {
      xhttp(`/books/${this.id}`, 'DELETE', result => {
        this.$router.push({ name: 'book-list' })
      })
    }
  }
}
</script>
<style>
.book-show {
  max-width: 900px;
  margin: auto;
  padding: 32px;
  padding-top: 64px;
}

.book-show .details-item {
  padding: 8px 0;
}

.book-show .details-item .label {
  font-weight: bold;
  color: #666;
}

.book-show .details-item .value {
  padding-left: 16px;
}

.book-show .details-item .list {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #000;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
