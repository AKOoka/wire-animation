import { App } from './App'
import { IAppUserConfig } from './IAppConfig'

const canvas = document.querySelector('canvas')

if (canvas === undefined || canvas === null) {
  throw new Error("can't get canvas")
}

const canvasCtx = canvas.getContext('2d')

if (canvasCtx === undefined || canvasCtx === null) {
  throw new Error("can't get canvas context")
}

const appConfig: IAppUserConfig = {
  circleCount: 75,
  circleColor: { r: 247, g: 129, b: 102 },
  circleConnectionMaxDistance: 200,
  circleConnectionColor: { r: 181, g: 132, b: 121 }
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const app: App = new App(canvas, canvasCtx, appConfig)
let isPaused: boolean = true

window.onclick = () => {
  if (isPaused) {
    isPaused = false
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
