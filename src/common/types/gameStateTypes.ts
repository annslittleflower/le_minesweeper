const STARTING = 'STARTING'
const GAME_IS_ON = 'GAME_IS_ON'
const GAME_IS_LOST = 'GAME_IS_LOST'
const GAME_IS_WON = 'GAME_IS_WON'
 
export type GAME_STATE_KEYS_TYPE = keyof typeof CURRENT_GAME_STATE_TYPE_MAP

export const CURRENT_GAME_STATE_TYPE_MAP = {
  STARTING: STARTING,
  GAME_IS_ON: GAME_IS_ON,
  GAME_IS_LOST: GAME_IS_LOST,
  GAME_IS_WON: GAME_IS_WON
}
