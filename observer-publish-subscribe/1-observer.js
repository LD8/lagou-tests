/**
 * Observer Mode
 * 【观察者】模式模拟
 */

// 1. 定义一个【下载任务】 DownloadTask 类，作为【观察者】
function DownloadTask(id) {
  // 任务 id
  this.id = id
  // 任务是否下载完成
  this.downloaded = false
  // 任务下载地址
  this.url = null
}

// 挂载原型方法 finish: 下载完成时调用
DownloadTask.prototype.finish = function (url) {
  // this 在这里指向 DownloadTask 原型
  // 标记该下载任务下载完成
  this.downloaded = true
  // 将传入的 url 记录为下载地址
  this.url = url
  console.log(this.id, url)
}

// 2. 再定义一个【下载任务清单】 DownloadTaskList 类，管理多个【下载任务】
function DownloadTaskList() {
  // 定义默认空数组用于存储多个【下载任务】DownloadTask
  this.downloadTaskList = []
}

// 挂载原型方法 getCount：获取正在下载的任务数量
DownloadTaskList.prototype.getCount = function () {
  return this.downloadTaskList.length
}

// 挂载原型方法 get：获取指定的【下载任务】
DownloadTaskList.prototype.get = function (index) {
  return this.downloadTaskList[index]
}

// 挂载原型方法 add：添加【下载任务】到列表中
DownloadTaskList.prototype.add = function (task) {
  return this.downloadTaskList.push(task)
}

// 挂载原型方法 remove：删除【下载任务】
DownloadTaskList.prototype.remove = function (task) {
  this.downloadTaskList = this.downloadTaskList.filter((t) => t !== task)
}

// 3. 定义一个【数据中心】 DataHub 作为【被观察目标】
function DataHub() {
  // 创建一个【下载任务列表】实例，可以使用它原型上挂载的所有方法
  this.downloadTasks = new DownloadTaskList()
}

// 挂载原型方法 addTask：添加【下载任务】
DataHub.prototype.addTask = function (task) {
  this.downloadTasks.add(task)
}

// 挂载原型方法 removeTask：删除【下载任务】
DataHub.prototype.removeTask = function (task) {
  this.downloadTasks.remove(task)
}

// 挂载原型方法 notify：调用【下载任务列表】中所有的【下载任务】的 finish 方法，标志任务完成
DataHub.prototype.notify = function (url) {
  this.downloadTasks.downloadTaskList.forEach((task) => task.finish(url))
}

/**
 * 使用
 */

//  4. 创建一个数据中心
const dataHub = new DataHub()

// 5. 用户创建【下载任务】
const downloadTask1 = new DownloadTask(1)
const downloadTask2 = new DownloadTask(2)

// 必须手动添加【下载任务】到【数据中心】即【下载任务列表】中
dataHub.addTask(downloadTask2)
dataHub.addTask(downloadTask1)

// 6. 当前数据下载完成，通知数据打包完成了
dataHub.notify('http://somedomain.path')