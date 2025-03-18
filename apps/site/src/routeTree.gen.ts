/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MediaRouteImport } from './routes/media/route'
import { Route as AuthRouteImport } from './routes/auth/route'
import { Route as IndexImport } from './routes/index'
import { Route as MediaIndexImport } from './routes/media/index'
import { Route as MediaAddImport } from './routes/media/add'
import { Route as AuthRegisterImport } from './routes/auth/register'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as MediaMediaIdViewImport } from './routes/media/$mediaId/view'
import { Route as MediaMediaIdUpdateImport } from './routes/media/$mediaId/update'

// Create/Update Routes

const MediaRouteRoute = MediaRouteImport.update({
  id: '/media',
  path: '/media',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MediaIndexRoute = MediaIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MediaRouteRoute,
} as any)

const MediaAddRoute = MediaAddImport.update({
  id: '/add',
  path: '/add',
  getParentRoute: () => MediaRouteRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRouteRoute,
} as any)

const MediaMediaIdViewRoute = MediaMediaIdViewImport.update({
  id: '/$mediaId/view',
  path: '/$mediaId/view',
  getParentRoute: () => MediaRouteRoute,
} as any)

const MediaMediaIdUpdateRoute = MediaMediaIdUpdateImport.update({
  id: '/$mediaId/update',
  path: '/$mediaId/update',
  getParentRoute: () => MediaRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/media': {
      id: '/media'
      path: '/media'
      fullPath: '/media'
      preLoaderRoute: typeof MediaRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthRouteImport
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthRouteImport
    }
    '/media/add': {
      id: '/media/add'
      path: '/add'
      fullPath: '/media/add'
      preLoaderRoute: typeof MediaAddImport
      parentRoute: typeof MediaRouteImport
    }
    '/media/': {
      id: '/media/'
      path: '/'
      fullPath: '/media/'
      preLoaderRoute: typeof MediaIndexImport
      parentRoute: typeof MediaRouteImport
    }
    '/media/$mediaId/update': {
      id: '/media/$mediaId/update'
      path: '/$mediaId/update'
      fullPath: '/media/$mediaId/update'
      preLoaderRoute: typeof MediaMediaIdUpdateImport
      parentRoute: typeof MediaRouteImport
    }
    '/media/$mediaId/view': {
      id: '/media/$mediaId/view'
      path: '/$mediaId/view'
      fullPath: '/media/$mediaId/view'
      preLoaderRoute: typeof MediaMediaIdViewImport
      parentRoute: typeof MediaRouteImport
    }
  }
}

// Create and export the route tree

interface AuthRouteRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

interface MediaRouteRouteChildren {
  MediaAddRoute: typeof MediaAddRoute
  MediaIndexRoute: typeof MediaIndexRoute
  MediaMediaIdUpdateRoute: typeof MediaMediaIdUpdateRoute
  MediaMediaIdViewRoute: typeof MediaMediaIdViewRoute
}

const MediaRouteRouteChildren: MediaRouteRouteChildren = {
  MediaAddRoute: MediaAddRoute,
  MediaIndexRoute: MediaIndexRoute,
  MediaMediaIdUpdateRoute: MediaMediaIdUpdateRoute,
  MediaMediaIdViewRoute: MediaMediaIdViewRoute,
}

const MediaRouteRouteWithChildren = MediaRouteRoute._addFileChildren(
  MediaRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteRouteWithChildren
  '/media': typeof MediaRouteRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/media/add': typeof MediaAddRoute
  '/media/': typeof MediaIndexRoute
  '/media/$mediaId/update': typeof MediaMediaIdUpdateRoute
  '/media/$mediaId/view': typeof MediaMediaIdViewRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/media/add': typeof MediaAddRoute
  '/media': typeof MediaIndexRoute
  '/media/$mediaId/update': typeof MediaMediaIdUpdateRoute
  '/media/$mediaId/view': typeof MediaMediaIdViewRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteRouteWithChildren
  '/media': typeof MediaRouteRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/media/add': typeof MediaAddRoute
  '/media/': typeof MediaIndexRoute
  '/media/$mediaId/update': typeof MediaMediaIdUpdateRoute
  '/media/$mediaId/view': typeof MediaMediaIdViewRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/media'
    | '/auth/login'
    | '/auth/register'
    | '/media/add'
    | '/media/'
    | '/media/$mediaId/update'
    | '/media/$mediaId/view'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/auth/login'
    | '/auth/register'
    | '/media/add'
    | '/media'
    | '/media/$mediaId/update'
    | '/media/$mediaId/view'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/media'
    | '/auth/login'
    | '/auth/register'
    | '/media/add'
    | '/media/'
    | '/media/$mediaId/update'
    | '/media/$mediaId/view'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  MediaRouteRoute: typeof MediaRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  MediaRouteRoute: MediaRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth",
        "/media"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth/route.tsx",
      "children": [
        "/auth/login",
        "/auth/register"
      ]
    },
    "/media": {
      "filePath": "media/route.tsx",
      "children": [
        "/media/add",
        "/media/",
        "/media/$mediaId/update",
        "/media/$mediaId/view"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.tsx",
      "parent": "/auth"
    },
    "/auth/register": {
      "filePath": "auth/register.tsx",
      "parent": "/auth"
    },
    "/media/add": {
      "filePath": "media/add.tsx",
      "parent": "/media"
    },
    "/media/": {
      "filePath": "media/index.tsx",
      "parent": "/media"
    },
    "/media/$mediaId/update": {
      "filePath": "media/$mediaId/update.tsx",
      "parent": "/media"
    },
    "/media/$mediaId/view": {
      "filePath": "media/$mediaId/view.tsx",
      "parent": "/media"
    }
  }
}
ROUTE_MANIFEST_END */
