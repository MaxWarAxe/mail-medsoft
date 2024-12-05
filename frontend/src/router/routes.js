const routes = [
  {
    path: '/',
    redirect: '/inbox'
  },
  {
    path: '/mail',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/inbox',
        component: ()=> import ('layouts/InboxLayout.vue')
      },
      {
        path: '/draft',
        component: ()=> import ('layouts/DraftLayout.vue')
      },
      {
        path: '/send',
        component: ()=> import ('layouts/SendLayout.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
