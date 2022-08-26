import { APP_PORTS, AppPortKey } from './ports'

export const LOCAL_HOST_NAME = 'local.ikea.apple.com'
/**
 * This function generates according environment map of remotes for webpack 5 usage
 * https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes
 * @returns Map of remotes
 */
export const getRemotes = () => {
  const keys = Object.keys(APP_PORTS) as AppPortKey[]

  return keys.reduce((acc, key) => {
    const port = APP_PORTS[key]

    // sample `project_resources@https://local.dataplatform.apple.com:3005/remoteEntry.js`
    acc[key] = `${key}@https://${LOCAL_HOST_NAME}:${port}/remoteEntry.js`

    return acc
  }, {} as Record<AppPortKey, string>)
}
