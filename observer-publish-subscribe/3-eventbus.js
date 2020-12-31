// let list = [
//   { id: '1', productName: 'abc', productCode: '123' },
//   { id: '2', productName: 'def', productCode: '456.12' },
//   { id: '3', productName: 'abc', productCode: '123' },
//   { id: '4', productName: 'ghi', productCode: '789' },
//   { id: '5', productName: 'abc', productCode: '123' },
// ]

// const mapPName = new Map(list.map(({ id, productName }) => [productName, id]))
// const mapPCode = new Map(list.map(({ id, productCode }) => [id, Number(productCode)]))
// list = []
// for (const [productName, id] of mapPName) {
//   list.push({ id, productName, productCode: mapPCode.get(id) })
// }
// console.log(list)

// class EventBus {
//   constructor() {
//     this.callbacks = {}
//   }
//   $on(name, fn) {
//     this.callbacks[name] = this.callbacks[name] || []
//     this.callbacks[name].push(fn)
//   }
//   $emit(name, ...args) {
//     if (this.callbacks[name]) {
//       //存在遍历所有callback
//       this.callbacks[name].forEach((cb) => cb(...args))
//     }
//   }
// }

// const eb = new EventBus()
// const ff = (n) => {
//   return () => console.log(`event1-${n}`)
// }
// eb.$on('event1', () => console.log(`event1-123`))
// eb.$on('event1', () => console.log(`event1-345`))
// eb.$on('event1', () => console.log(`event1-567`))
// eb.$emit('event1')

function EBus() {
  this.callbacks = {}
}

EBus.prototype.$on = function (name, fn) {
  this.callbacks[name] = this.callbacks[name] || []
  this.callbacks[name].push(fn)
}

EBus.prototype.$emit = function (name, ...args) {
  this.callbacks[name] && this.callbacks[name].forEach((cb) => cb(...args))
}

const eBus = new EBus()

eBus.$on('event1', () => console.log(`event1-123`))
eBus.$on('event1', () => console.log(`event1-345`))
eBus.$on('event1', () => console.log(`event1-567`))
eBus.$emit('event1')
