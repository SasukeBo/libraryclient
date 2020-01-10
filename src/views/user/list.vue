<template>
  <div class="user-list">
    <div style="max-width: 300px;">
      <el-input v-model="search" placeholder="search user by Name or Bar Code"></el-input>
    </div>

    <el-table
      :data="
        users.filter(
          u =>
            u.name.toLowerCase().includes(this.search.toLowerCase()) ||
            u.barcode.includes(this.search)
        )
      "
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="barcode" label="Bar Code"></el-table-column>
      <el-table-column prop="memberType" label="Member Type"></el-table-column>
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
      <el-table-column min-width="200px">
        <template slot="header">
          <el-button type="primary" @click="addUser()">Add User</el-button>
        </template>

        <template slot-scope="scope">
          <el-button type="info" @click="showUser(scope.row.id)"
            >Details</el-button
          >
          <el-button type="danger" @click="deleteUser(scope.row.id)"
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
  name: 'UserList',
  data() {
    return {
      users: [],
      search: ''
    }
  },
  created() {
    xhttp('/users', 'GET', result => {
      this.users = result
    })
  },
  methods: {
    addUser() {
      this.$router.push({ name: 'user-new' })
    },
    showUser(id) {
      this.$router.push({ name: 'user-show', params: { id } })
    },
    deleteUser(id) {
      xhttp(`/users/${id}`, 'DELETE', result => {
        var index = this.users.findIndex(u => u.id === id)
        this.users.splice(index, 1)
      })
    }
  }
}
</script>
<style>
.user-list {
  max-width: 1280px;
  padding: 16px;
  margin: auto;
}
</style>
