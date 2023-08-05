import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '../views/AboutView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

// Middleware
import authGuard from '../middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middleware: authGuard
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue,
      meta: {
        middleware: authGuard
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const context = { to, from, next, router };
    return middleware[0]({ ...context, nextMiddleware: middlewarePipeLine(context, middleware, 1) });
  }

  return next();
});

function middlewarePipeLine(context, middleware, index) {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) return context.next;
  return (...parameters) => {
    context.next(...parameters);
    const nextMidd = middlewarePipeLine(context, middleware, index + 1);
    nextMiddleware({ ...context, next: nextMidd });
  };
}

export default router
