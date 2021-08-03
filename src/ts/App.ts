import { Boundaries } from './Boundaries'
import { Renderer } from './Renderer'
import { Scene } from './Scene'
import { SceneUpdateSystem } from './SceneUpdateSystem'

export class App {
  private readonly _canvas: HTMLCanvasElement
  private readonly _ctx: CanvasRenderingContext2D
  private _sceneUpdateSystem: SceneUpdateSystem
  private _renderer: Renderer
  private _isPaused: boolean

  constructor (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this._canvas = canvas
    this._ctx = ctx
    this._isPaused = true
  }

  resize (): void {
    this._sceneUpdateSystem.resetBoundaries(Boundaries.GenerateFromCanvas(this._canvas))
    this._renderer.resetBoundaries(Boundaries.GenerateFromCanvas(this._canvas))

    this._renderer.draw()
  }

  init (circleCount: number = 100): void {
    const boundaries = Boundaries.GenerateFromCanvas(this._canvas)
    const scene: Scene = Scene.Generate(circleCount, boundaries)

    this._sceneUpdateSystem = new SceneUpdateSystem(boundaries, scene)
    this._renderer = new Renderer(this._ctx, boundaries, scene)
  }

  run (): void {
    this._isPaused = false

    const anime = (): void => {
      if (this._isPaused) {
        return
      }

      this._sceneUpdateSystem.update()
      this._renderer.draw()

      requestAnimationFrame(anime)
    }

    anime()
  }

  pause (): void {
    this._isPaused = true
  }
}
