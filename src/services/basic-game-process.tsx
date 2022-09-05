import { useState, useMemo } from 'react'
import { shuffle } from '../utils/array-helpers'
import GameConfig from '../common/types/gameConfig'
import { cellTypesMap, CellTypes } from '../common/types/cellTypes'

interface NormalizedObject {
  [key: string] : {
    cellType: keyof CellTypes,
    isRevealed: boolean,
    isFlagged: boolean,
    minesNumber: number
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
          isFlagged: false,
          minesNumber: 0
        }
      }
    }

    console.log('HINT:', board)

    return tempNormalizedObject
  }, [gameConfig])



  const [normalizedObject, setNormalizedObject] = useState<NormalizedObject>(tempNormalizedObject)
  const [hasUserWon, setHasUserWon] = useState(false)
  const [hasUserLost, setHasUserLost] = useState(false)

  const revealAll = () => {
    Object.keys(normalizedObject).forEach((k) => normalizedObject[k].isRevealed = true)
    setNormalizedObject({...normalizedObject})
  }

  const revealCell = (cellIndex: string) => {
    const { isFlagged, isRevealed, cellType } = normalizedObject[cellIndex]

    if (isFlagged || isRevealed) return;

    if (cellType === cellTypesMap.bomb) {
      setHasUserLost(true)
      revealAll()
      return;
    }

    normalizedObject[cellIndex].isRevealed = true

    let minesNumber = 0;

    const [rowCoord, colCoord] = cellIndex.split(',').map(i => +i)

    for (let r=Math.max(rowCoord - 1, 0); r<=Math.min(rowCoord + 1, gameConfig.rowsNumber - 1); r++) {
      for(let c=Math.max(colCoord - 1, 0); c<=Math.min(colCoord + 1, gameConfig.colsNumber - 1); c++) {
        if (normalizedObject[`${r},${c}`].cellType === cellTypesMap.bomb) {
          minesNumber++;
        }
      }
    }

    if (minesNumber === 0) {
      for (let r=Math.max(rowCoord - 1, 0); r<=Math.min(rowCoord + 1, gameConfig.rowsNumber - 1); r++) {
        for(let c=Math.max(colCoord - 1, 0); c<=Math.min(colCoord + 1, gameConfig.colsNumber - 1); c++) {
          if (normalizedObject[`${r},${c}`].cellType === cellTypesMap.empty) {
            revealCell(`${r},${c}`)
          }
        }
      }
    }

    normalizedObject[cellIndex].minesNumber = minesNumber 

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

