import { useState, useEffect, useMemo } from 'react'
import { shuffle } from '../utils/array-helpers'
import GameConfig from '../common/types/gameConfig'
import { cellTypesMap, CellTypes } from '../common/types/cellTypes'

interface NormalizedObject {
  [key: string] : {
    cellType: keyof CellTypes,
    isRevealed: boolean,
    isFlagged: boolean
  }
}

export const useBasicGameProcess = (gameConfig: GameConfig) => {
  const tempNormalizedObject = useMemo(() => {
    const bombsArr = Array(gameConfig.bombsNumber).fill(cellTypesMap.bomb)
    const emptyArr = Array(gameConfig.colsNumber * gameConfig.rowsNumber - bombsArr.length).fill(cellTypesMap.empty)
    const board = shuffle(bombsArr.concat(emptyArr)) as string[]
    const tempNormalizedObject: NormalizedObject = {}
    
    for (let currentRow = 0; currentRow < gameConfig.rowsNumber; currentRow++) {
      for (let currentCol = 0; currentCol < gameConfig.colsNumber; currentCol++) {
        tempNormalizedObject[`${currentRow},${currentCol}`] = {
          cellType: board[currentRow * gameConfig.colsNumber + currentCol] as keyof CellTypes,
          isRevealed: false,
          isFlagged: false
        }
      }
    }

    console.log('board', board)

    return tempNormalizedObject
  }, [gameConfig])



  const [normalizedObject, setNormalizedObject] = useState<NormalizedObject>(tempNormalizedObject)
  const [hasUserWon, setHasUserWon] = useState(false)
  const [hasUserLost, setHasUserLost] = useState(false)

  const revealAll = () => {
    Object.keys(normalizedObject).forEach((k) => normalizedObject[k].isRevealed = true)
    setNormalizedObject({...normalizedObject})
  }

  console.log('normalizedObject', normalizedObject)

  const revealCell = (cellIndex: string) => {
    const { isFlagged, isRevealed, cellType } = normalizedObject[cellIndex]

    if (isFlagged || isRevealed) return;

    if (cellType === cellTypesMap.bomb) {
      setHasUserLost(true)
      revealAll()
      return;
    }

    normalizedObject[cellIndex].isRevealed = true

    let mineNumber = 0;

    const [rowCoord, colCoord] = cellIndex.split(',')

    // for (let i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
    //   for(let j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
    //     if (grid.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
    //   }
    // }

    setNormalizedObject({...normalizedObject})

    checkIfUserWon()
  }

  const checkIfUserWon = () => {
    const { bombsNumber } = gameConfig
    let numberOfFlagsInBombCells = 0;
    let numberOfEmptyAndRevealedCells = 0;

    Object.keys(normalizedObject).forEach((k) => {
      const { isFlagged, isRevealed, cellType } = normalizedObject[k]

      if (isFlagged && cellType === cellTypesMap.bomb) {
        numberOfFlagsInBombCells++;
      }

      if (isRevealed && cellType === cellTypesMap.empty) {
        numberOfEmptyAndRevealedCells++
      }
    })

    const isNumberOfFlagsIsEqualToNumberOfBombs = numberOfFlagsInBombCells === bombsNumber;
    const isNumberOfEmptyAndRevealedCellsEqualToAllEmptyCells =
      numberOfEmptyAndRevealedCells === (gameConfig.colsNumber * gameConfig.rowsNumber - gameConfig.bombsNumber)

    if (isNumberOfFlagsIsEqualToNumberOfBombs && isNumberOfEmptyAndRevealedCellsEqualToAllEmptyCells) {
      setHasUserWon(true)
    }
    
  }

  const toggleFlag = (cellIndex: string) => {
    const isFlagged = normalizedObject[cellIndex].isFlagged
    const isRevealed = normalizedObject[cellIndex].isRevealed

    if (isRevealed) return;

    normalizedObject[cellIndex].isFlagged = !isFlagged

    setNormalizedObject({...normalizedObject})

    checkIfUserWon()

    return normalizedObject[cellIndex].cellType
  }

  return { normalizedObject, hasUserWon, hasUserLost, setNormalizedObject, revealCell, toggleFlag, revealAll };
}

