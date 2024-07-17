export const ensureStartingSlash = (path: string) => {
  return /^\//.test(path) ? path : `/${path}`;
}

export const removeExtension = (path: string) => {
  return path.replace(/(index)?(\.(md|html))?$/, '') || '/';
}

import type { Route } from 'vitepress'
export const hashRE = /#.*$/;
export const extRE = /(index)?\.(md|html)$/;
export function normalize(path) {
  return decodeURI(path).replace(hashRE, '').replace(extRE, '');
}
export function isActive(route, path) {
  if (path === undefined) {
    return false;
  }
  const routePath = normalize(`/${route.data.relativePath}`);
  const pagePath = normalize(path);
  return routePath === pagePath;
}

export const isActiveLink = (
  route: Route,
  pathPattern: string,
  match?: boolean
) => {
  if (!match) return isActive(route, pathPattern)
  const regex = new RegExp(pathPattern)

  return regex.test(normalize(`/${route.data.relativePath}`))
}

export const isArray = Array.isArray