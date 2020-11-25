/**
 * 按顺序写出控制台打印结果（2020 碧桂园）
 */

var User = {
  count: 1,
  action: {
    getCount: function () {
      return this.count
    },
  },
}

var getCount = User.action.getCount // 得到匿名函数 function(){return this.count}

setTimeout(() => {
  console.log('result 1', User.action.getCount())
})

console.log('result 2', getCount())


// result 2 undefined
// result 1 undefined