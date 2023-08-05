export default function auth({ next, router }) {
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      return router.push({ path: '/login' });
    }
    return next();
  }
  