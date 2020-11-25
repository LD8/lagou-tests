const man = {
  name: 'jscoder',
  age: 22,
}

const proxyHandler = {
  get: function (target, key) {
    target[key] && console.log(`Log property "${key}": "${target[key]}"`)
    return target[key] || console.log(`Property "${key}" does not exist!`)
  },
  set: function (target, key, value) {
    target[key] = value
  },
}

const proxy = new Proxy(man, proxyHandler)

proxy.name
proxy.age
proxy.location
