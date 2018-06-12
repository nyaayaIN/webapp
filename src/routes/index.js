/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/contact',
      load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },
    {
      path: '/topic/(.*)',
      load: () => import(/* webpackChunkName: 'topic' */ './topic'),
    },
    {
      path: '/category/(.*)',
      load: () => import(/* webpackChunkName: 'category' */ './category'),
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || "Nyaaya - India's Laws Explained"}`;
    route.description = `${route.description ||
      'We provide reliable, practical, and easy to understand information on common legal topics so that people are aware of their rights, how to enforce them, their responsiblities, how they can meet them as well as what actions are illegal and how to seek justice'}`;
    route.imageUrl = `${route.imageUrl || '/logo.png'}`;
    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
