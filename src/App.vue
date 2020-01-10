<template>
  <div id="app">
    <div class="header">
      <el-select
        v-model="value"
        style="margin-right: 32px; width: 300px"
        filterable
        remote
        reserve-keyword
        placeholder="search a book by title or author"
        popper-class="search-book"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in searchResults"
          :key="item.id"
          :value="item.id"
          :label="item.title"
        >
          <router-link
            :to="{ name: 'book-show', params: { id: item.id } }"
            class="book-link"
          >
            <span class="link-name">{{ item.title }}</span>
            <span style="padding-left: 8px" v-if="item.author"
              >({{ item.author }})</span
            >
          </router-link>
        </el-option>
      </el-select>

      <el-menu
        :defalut-active="defaultActive"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="book-list">
          <router-link :to="{ name: 'book-list' }">Book List</router-link>
        </el-menu-item>
        <el-menu-item index="user-list">
          <router-link :to="{ name: 'user-list' }">User List</router-link>
        </el-menu-item>
      </el-menu>
    </div>

    <router-view />
  </div>
</template>
<script>
import { xhttp } from './util'

export default {
  name: 'App',
  data() {
    return {
      searchResults: [],
      loading: false,
      value: '',
      authors: []
    }
  },
  computed: {
    defaultActive() {
      return this.$route.name
    }
  },
  methods: {
    remoteMethod(search) {
      if (search) {
        xhttp(`/search?type=book&title=${search}`, 'GET', result => {
          this.searchResults = this.searchResults.concat(result)
        })
        xhttp(`/search?type=author&name=${search}`, 'GET', result => {
          result.forEach(r => {
            xhttp(`/authors/${r.id}?allEntities=true`, 'GET', result => {
              result.Books.forEach(b => {
                var index = this.searchResults.findIndex(s => s.id === b.id)
                if (index < 0) {
                  this.searchResults.push({
                    ...b,
                    author: r.name
                  })
                }
              })
            })
          })
        })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-menu-item  {
  padding: 0;
}

.el-menu-item a {
  text-decoration: none;
  display: inline-block;
  padding: 0 20px;
}

#app .header {
  display: flex;
  height: 60px;
  background: rgb(84, 92, 100);
  align-items: center;
  padding: 0 32px;
}

.search-book .el-select-dropdown__item {
  transition: all 0.3s ease;
}

.search-book .el-select-dropdown__item:hover {
  background: rgba(0, 0, 0, 0.1);
}

.search-book .book-link {
  display: flex;
  text-decoration: none;
  color: #333;
}

.search-book .book-link .link-name {
  margin-right: auto;
  font-weight: bold;
}

.search-book .link-type {
  color: #666;
  padding-left: 16px;
  text-align: left;
}
</style>
