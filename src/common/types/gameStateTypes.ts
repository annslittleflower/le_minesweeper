export const CURRENT_GAME_STATE_TYPE_MAP = {
  STARTING: 'STARTING',
  GAME_IS_ON: 'GAME_IS_ON',
  GAME_IS_LOST: 'GAME_IS_LOST',
  GAME_IS_WON: 'GAME_IS_WON'
} as const

export type GAME_STATE_KEYS_TYPE = keyof typeof CURRENT_GAME_STATE_TYPE_MAP