import level1 from './level1'
import level2 from './level2'
import level3 from './level3'

import { DIRECTION_ENUM, ENTITY_TYPE_ENUM, ENTITY_STATE_ENUM, TILE_TYPE_ENUM } from '../Enum/index'

export interface ITile {
  src: number | null
  type: TILE_TYPE_ENUM | null
}

export interface ILevel {
  mapInfo: Array<Array<ITile>>
  player: IEntity
  enemies: Array<IEntity>
  spikes: Array<ISpikes>
  bursts: Array<IEntity>
  door: IEntity
}

export interface IEntity {
  x: number
  y: number
  direction: DIRECTION_ENUM
  state: ENTITY_STATE_ENUM
  type: ENTITY_TYPE_ENUM
}

export interface ISpikes {
  x: number
  y: number
  type: ENTITY_TYPE_ENUM
  count: number
}

const levels: Record<string, ILevel> = {
  level1,
  level2,
  level3
}

export default levels
