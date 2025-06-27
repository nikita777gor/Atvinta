export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('@/views/Home.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import ('@/views/NotFound.vue'),
  }
] as const;
