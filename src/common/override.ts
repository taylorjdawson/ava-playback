import { Overrider, Request } from '../interfaces'

type Modules = { [p: string]: { request: Request, get: Request } }
const modules: Modules = { http: require('http'), https: require('https') }

export default (overrider: Overrider) =>
  Object.keys(modules).forEach(protocol => {
    const module = modules[protocol]
    const overriddenGet = module.get
    const overriddenRequest = module.request

    module.request = (options, callback) =>
      overrider(protocol, overriddenRequest.bind(module), options, callback)
  })