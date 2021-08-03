import { App } from './App'

const canvas = document.querySelector('canvas')
const canvasCtx = canvas?.getContext('2d')

if (canvas === undefined || canvas === null) {
  throw new Error("can't get canvas")
}

if (canvasCtx === undefined || canvasCtx === null) {
  throw new Error("can't get canvas context")
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const app: App = new App(canvas, canvasCtx)
let isPaused: boolean = true

window.onclick = () => {
  if (isPaused) {
    isPaused = false
    app.resize()
    app.run()
  } else {
    isPaused = true
    app.pause()
  }
}

window.onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  app.resize()
}

app.init()
app.run()

isPaused = false

export {}
