import { Boundaries } from './Boundaries'
import { Circle } from './Circle'
import { Line } from './Line'
import { Rgba } from './Rgba'

export class Scene {
  private readonly _poolCircle: Circle[]
  private readonly _poolLine: Line[]
  private _activeLineLastIndex: number

  get poolCircle (): Readonly<Circle[]> {
    return this._poolCircle
  }

  get poolLine (): Readonly<Line[]> {
    return this._poolLine
  }

  get activeLineLastIndex (): number {
    return this._activeLineLastIndex
  }

  constructor (poolCircle: Circle[], templateLine: Line = Line.CreateDefault()) {
    this._poolCircle = poolCircle
    this._poolLine = []
    this._activeLineLastIndex = 0

    for (let i = 0; i < poolCircle.length * poolCircle.length; i++) {
      this._poolLine.push(templateLine.copy())
    }
  }

  addLine (startX: number, startY: number, endX: number, endY: number, alphaChanel: number): void {
    const line: Line = this._poolLine[this._activeLineLastIndex]

    line.resetPositions(startX, startY, endX, endY)
    line.rgba.a = alphaChanel

    this._activeLineLastIndex = this._activeLineLastIndex + 1
  }

  clearPoolLine (): void {
    this._activeLineLastIndex = 0
  }

  static Generate (circleCount: number, boundaries: Boundaries): Scene {
    const circlePool: Circle[] = []
    const randomInRange = (min: number, max: number): number => Math.random() * (max - min + 1) + min
    const randomDirection = (): number => Math.round(Math.random()) * -2 + 1

    for (let i = 0; i < circleCount; i++) {
      circlePool.push(
        new Circle(
          randomInRange(boundaries.startX, boundaries.endX),
          randomInRange(boundaries.startY, boundaries.endY),
          4,
          randomInRange(0.1, 0.5) * randomDirection(),
          randomInRange(0.1, 0.5) * randomDirection(),
          new Rgba(0, 0, 0, 1)
        )
      )
    }

    return new Scene(circlePool)
  }
}
