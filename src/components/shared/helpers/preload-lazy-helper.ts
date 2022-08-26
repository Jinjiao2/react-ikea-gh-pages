import { ComponentType, lazy, LazyExoticComponent } from 'react'

export type PreloadFactory<T = any> = () => Promise<{
  default: ComponentType<T>
}>

export type PreloadLazyExoticComponent<T = any> = LazyExoticComponent<
  ComponentType<T>
> & {
  preload: PreloadFactory
}

export const isComponentPreloadable = (
  component: PreloadLazyExoticComponent | ComponentType,
): component is PreloadLazyExoticComponent => {
  return !!(component as PreloadLazyExoticComponent).preload
}

function dynamicImportCatcher<T = any>(importFn: PreloadFactory<T>) {
  return new Promise<{ default: ComponentType<T> }>((resolve, reject) => {
    importFn()
      .then(resolve)
      .catch((error: string) => {
        // There is two cases when ChunkLoadError happens.
        // 1. User cancelled all requests and import throws the error
        // 2. User has outdated cache
        // For the second case we reload the full page with force flag true.
        // It will help us to avoid excessive Sentry logs with ChunkLoadError
        if (/ChunkLoadError/.test(error)) {
          // This localStorage parameters used to avoid recursive reloading if the server is down
          if (!localStorage.getItem('chunkErrorPageReloaded')) {
            localStorage.setItem('chunkErrorPageReloaded', 'true')
            window.location.reload(true)
          }
        } else {
          reject(error)
        }
      })
  })
}

export function preloadLazy<T = any>(factory: PreloadFactory<T>) {
  const Component = lazy(() =>
    dynamicImportCatcher<T>(factory),
  ) as PreloadLazyExoticComponent<T>
  Component.preload = () => dynamicImportCatcher<T>(factory)
  return Component
}
