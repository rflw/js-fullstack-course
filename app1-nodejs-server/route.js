const routes = {
  '/': 'Mainpage',
  '/about': 'About page',
  NOT_FOUND: 'Page not found'
}

export function getRoute(url) {
  return routes[url] || routes.NOT_FOUND;
}
