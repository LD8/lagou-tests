/**
 * Publish-Subscribe Mode
 * 【发布-订阅】模式模拟
 *
 * 【例】
 * const bus = new Vue()
 *
 * 订阅事件
 * bus.$on('foo', () => { console.log('foo1') })
 * bus.$on('foo', () => { console.log('foo2') })
 * bus.$on('bar', () => { console.log('bar') })
 *
 * 发布事件
 * bus.$emit('foo')
 * bus.$emit('bar')
 *
 */

// 1. 定义【数据中心】作为【发布者】
function DataHub() {}

DataHub.prototype.notify = function (url, callback) {
  callback(url)
}

// 2. 定义【下载管家】作为【事件通道】
function DownloadManager() {
  // events 由多个【事件名称】：【Array<处理函数>】的键值对组成
  // 发布时：在 events 中找到事件，并循环调用数组中所有的处理函数
  this.events = {
    // 【事件名称】:【Array<处理函数>】
  }
  this.uId = -1
}

// 订阅事件: .$on('foo', () => { ... })
DownloadManager.prototype.subscribe = function (eventType, handler) {
  // 使用用户传入的【事件名称】获取【Array<处理函数>】，如果获取不到创建新 Array
  if (!this.events[eventType]) {
    this.events[eventType] = []
  }
  const taskId = (++this.uId).toString()
  this.events[eventType].push({ taskId, handler })

  return taskId
}

// 发布事件： .$emit('foo')
DownloadManager.prototype.publish = function (eventType, url) {
  if (!this.events[eventType]) {
    return false
  }
  const subscribers = this.events[eventType]
  // subscribers.forEach(({ taskId, handler }) => handler(eventType, taskId, url))
  for (let i = 0; i < subscribers.length; i++) {
    const { handler, taskId } = subscribers[i]
    handler(eventType, taskId, url)
  }
}

/**
 * 使用
 */

// 3. 创建一个【数据中心】
const dataHub = new DataHub()

// 4. 创建一个【下载管家】即【事件通道】
const downloadManager = new DownloadManager()

// 5. 创建一个【下载器】
// const dataDownloader = (eventType, taskId, url) => {
//   console.log(`Task id: ${taskId}, event ${eventType}, load data from ${url}`)
// }

// 6. 注册事件：用户开始请求数据
const downloadTask1 = downloadManager.subscribe('dataReady', (eventType, taskId, url) => {
  console.log(`Task id: ${taskId}, event ${eventType}, load data from ${url}`)
})

const downloadTask2 = downloadManager.subscribe('dataReady', (eventType, taskId, url) => {
  console.log(`Task id: ${taskId}, event ${eventType}, load data from ${url}`)
})

// 7. 发布：数据打包完成
dataHub.notify('http://somedomain.path', (url) => {
  downloadManager.publish('dataReady', url)
})
