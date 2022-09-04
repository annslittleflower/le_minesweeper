import { shuffle } from './../utils/array-helpers'
import GameConfig from './../common/types/gameConfig'
import { cellTypesMap } from './../common/types/cellTypes'

export const buildBoard = (gameConfig: GameConfig) => {
  const bombsArr = Array(gameConfig.bombsNumber).fill(cellTypesMap.bomb)
  const emptyArr = Array(gameConfig.colsNumber * gameConfig.rowsNumber - bombsArr.length).fill(cellTypesMap.empty)
  const board = shuffle(bombsArr.concat(emptyArr))

  const normalizedObject: any = {} // TODO not any

  for (let currentRow = 0; currentRow < gameConfig.rowsNumber; currentRow++) {
    for (let currentCol = 0; currentCol < gameConfig.colsNumber; currentCol++) {
      normalizedObject[`${currentRow},${currentCol}`] = board[currentRow * gameConfig.colsNumber + currentCol]
    }
  }

  return {normalizedObject, board};
}

