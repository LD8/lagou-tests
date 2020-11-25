function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}
function red() {
  console.log('red')
}

// 方法1 --------------------------
const convert = (light, time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      light()
      resolve()
    }, time)
  })

const flashGreen = () => convert(green, 1000)
const flashYellow = () => convert(yellow, 2000)
const flashRed = () => convert(red, 3000)

;(function flash() {
  return Promise.resolve().then(flashGreen).then(flashYellow).then(flashRed).then(flash)
})()

// 差不多的方法2 --------------------------
// const flash = (light, time) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       light()
//       resolve()
//     }, time)
//   })

// const restart = () => {
//   Promise.resolve()
//     .then(() => flash(green, 1000))
//     .then(() => flash(yellow, 2000))
//     .then(() => flash(red, 3000))
//     .then(() => restart())
// }

// restart()
