import Main from '@/layouts/Main.vue';
import Empty from '@/layouts/Empty.vue';
import DashboardPage from '@/pages/DashboardPage.vue';
import PagesListPage from '@/pages/pages/PagesListPage.vue';
import PagesCreatePage from '@/pages/pages/PagesCreatePage.vue';
import PagesUpdatePage from '@/pages/pages/PagesUpdatePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    component: Main,
    meta: { auth: true, title: 'Home' },
    children: [
      {
        path: '/',
        component: DashboardPage,
        meta: { title: 'Главная' },
      },
      {
        path: 'pages',
        component: Empty,
        meta: { title: 'Страницы' },
        redirect: '/pages/list',
        children: [
          {
            path: 'list',
            component: PagesListPage,
            meta: { title: 'Список страниц' },
          },
          {
            path: 'create',
            component: PagesCreatePage,
            meta: { title: 'Добавить страницу' },
          },
          {
            path: 'update/:id',
            component: PagesUpdatePage,
            meta: { title: 'Редактирование страницы' },
          },
        ],
      },
      {
        path: '404',
        component: NotFoundPage,
      },
    ],
  },
  { path: '/login', component: LoginPage, meta: { auth: false } },
  { path: '*', redirect: '/404', meta: { auth: false } },
];

export default routes;
