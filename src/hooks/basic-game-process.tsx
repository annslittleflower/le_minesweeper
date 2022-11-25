import { useState, useMemo } from 'react'
import { shuffle } from '../utils/array-helpers'
import GameConfig from '../common/types/gameConfig'
import { CellTypesMap,} from '../common/types/cellTypes'
interface NormalizedObject {
  [key: string] : {
    cellType: typeof CellTypesMap.bomb | typeof CellTypesMap.empty | typeof CellTypesMap.flag | number, // google this one
    isRevealed: boolean,
    isFlagged: boolean,
    minesNumber: number
  }
}

export const useBasicGameProcess = (gameConfig: GameConfig) => {
  const tempNormalizedObject = useMemo(() => {
    const bombsArr: typeof CellTypesMap.bomb[] = Array(gameConfig.bombsNumber).fill(CellTypesMap.bomb)
    const emptyArr: typeof CellTypesMap.empty[]  = Array(gameConfig.colsNumber * gameConfig.rowsNumber - bombsArr.length).fill(CellTypesMap.empty)
    const board: (typeof CellTypesMap.empty | typeof CellTypesMap.bomb)[] = shuffle([...bombsArr, ...emptyArr])
    const tempNormalizedObject: NormalizedObject = {}
    
    for (let currentRow = 0; currentRow < gameConfig.rowsNumber; currentRow++) {
      for (let currentCol = 0; currentCol < gameConfig.colsNumber; currentCol++) {
        tempNormalizedObject[`${currentRow},${currentCol}`] = {
          cellType: board[currentRow * gameConfig.colsNumber + currentCol],
          isRevealed: false,
          isFlagged: false,
          minesNumber: 0
        }
      }
    }

    console.log('BOARD:', board)

    return tempNormalizedObject
  }, [gameConfig])



  const [normalizedObject, setNormalizedObject] = useState<NormalizedObject>(tempNormalizedObject)
  const [hasUserWon, setHasUserWon] = useState(false)
  const [hasUserLost, setHasUserLost] = useState(false)

  const revealAll = () => {
    Object.keys(normalizedObject).forEach((k) => normalizedObject[k].isRevealed = true)
    setNormalizedObject({...normalizedObject})
  }

  const checkIfUserWon = () => {
    const { bombsNumber } = gameConfig
    let numberOfFlagsInBombCells = 0;
    let numberOfEmptyAndRevealedCells = 0;

    Object.keys(normalizedObject).forEach((k) => {
      const { isFlagged, isRevealed, cellType } = normalizedObject[k]

      if (isFlagged && cellType === CellTypesMap.bomb) {
        numberOfFlagsInBombCells++;
      }

      if (isRevealed && cellType === CellTypesMap.empty) {
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

  const revealCell = (cellIndex: string) => {
    const { isFlagged, isRevealed, cellType } = normalizedObject[cellIndex]

    if (isFlagged || isRevealed) return;

    if (cellType === CellTypesMap.bomb) {
      setHasUserLost(true)
      revealAll()
      return;
    }

    normalizedObject[cellIndex].isRevealed = true

    let minesNumber = 0;

    const [rowCoord, colCoord] = cellIndex.split(',').map(i => +i)

    for (let r=Math.max(rowCoord - 1, 0); r<=Math.min(rowCoord + 1, gameConfig.rowsNumber - 1); r++) {
      for(let c=Math.max(colCoord - 1, 0); c<=Math.min(colCoord + 1, gameConfig.colsNumber - 1); c++) {
        if (normalizedObject[`${r},${c}`].cellType === CellTypesMap.bomb) {
          minesNumber++;
        }
      }
    }

    if (minesNumber === 0) {
      for (let r=Math.max(rowCoord - 1, 0); r<=Math.min(rowCoord + 1, gameConfig.rowsNumber - 1); r++) {
        for(let c=Math.max(colCoord - 1, 0); c<=Math.min(colCoord + 1, gameConfig.colsNumber - 1); c++) {
          if (normalizedObject[`${r},${c}`].cellType === CellTypesMap.empty) {
            revealCell(`${r},${c}`)
          }
        }
      }
    }

    normalizedObject[cellIndex].minesNumber = minesNumber 

    setNormalizedObject({...normalizedObject})

    checkIfUserWon()
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

