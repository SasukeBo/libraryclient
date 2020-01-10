import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'book-list' }
  },
  {
    path: '/books',
    name: 'book-list',
    component: () => import('../views/book/list.vue')
  },
  {
    path: '/book/new',
    name: 'book-new',
    component: () => import('../views/book/new.vue')
  },
  {
    path: '/book/:id',
    name: 'book-show',
    props: true,
    component: () => import('../views/book/show.vue')
  },
  {
    path: '/users',
    name: 'user-list',
    component: () => import('../views/user/list.vue')
  },
  {
    path: '/user/new',
    name: 'user-new',
    component: () => import('../views/user/new.vue')
  },
  {
    path: '/user/:id',
    name: 'user-show',
    props: true,
    redirect: {
      name: 'user-show-book-list'
    },
    component: () => import('../views/user/show/index.vue'),
    children: [
      {
        name: 'user-show-book-list',
        path: 'books',
        props: true,
        component: () => import('../views/user/show/books.vue')
      }
    ]
  },
  {
    path: '/user/:id/edit',
    name: 'user-edit',
    props: true,
    component: () => import('../views/user/edit.vue')
  },
  {
    path: '/user/:id/loan/new',
    name: 'loan-new',
    props: true,
    component: () => import('../views/loan/new.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
