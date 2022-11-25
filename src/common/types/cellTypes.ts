export const CellTypesMap = {
  bomb: '💣',
  empty: 'E',
  flag: '🚩',
} as const

export type EachCellType = typeof CellTypesMap.bomb | typeof CellTypesMap.empty | typeof CellTypesMap.flag