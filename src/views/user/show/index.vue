<template>
  <div class="user-show" v-if="user">
    <h1>User</h1>

    <div class="details-item">
      <span class="label">Name</span>
      <span class="value">{{ user.name }}</span>
    </div>

    <div class="details-item">
      <span class="label">Barcode</span>
      <span class="value">{{ user.barcode }}</span>
    </div>

    <div class="details-item">
      <span class="label">Member Type</span>
      <span class="value">{{ user.memberType }}</span>
    </div>

    <div class="details-item">
      <span class="label">Created At</span>
      <span class="value">{{ new Date(user.createdAt).toLocaleString() }}</span>
    </div>

    <div class="details-item">
      <span class="label">UpdatedAt At</span>
      <span class="value">{{ new Date(user.updatedAt).toLocaleString() }}</span>
    </div>

    <div class="operations">
      <el-button type="primary" icon="el-icon-edit" @click="editUser(id)">Edit</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteUser()">Delete</el-button>
    </div>

    <router-view/>
  </div>
</template>
<script>
import { xhttp } from '../../../util'

export default {
  name: 'UserShow',
  props: {
    id: [Number, String]
  },
  data() {
    return {
      user: {}
    }
  },
  watch: {
    id: {
      immediate: true,
      handler: function(val) {
        if (val) {
          this.getUser(val)
        }
      }
    }
  },
  methods: {
    getUser(id) {
      xhttp(`/users/${id}?allEntities=true`, 'GET', result => {
        this.user = result
      })
    },
    editUser(id) {
      this.$router.push({ name: 'user-edit', params: { id } })
    },
    deleteUser() {
      xhttp(`/users/${this.id}`, 'DELETE', result => {
        this.$router.push({ name: 'user-list' })
      })
    }
  }
}
</script>
<style>
.user-show {
  max-width: 900px;
  margin: auto;
  padding: 32px;
  padding-top: 64px;
  position: relative;
}

.user-show .details-item {
  padding: 8px 0;
}

.user-show .details-item .label {
  font-weight: bold;
  color: #666;
}

.user-show .details-item .value {
  padding-left: 16px;
}

.user-show .details-item .list {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #000;
  vertical-align: middle;
  margin-right: 8px;
}

.user-show .operations {
  position: absolute;
  top: 64px;
  right: 32px;
}

</style>
