import { useEffect } from 'react'
import GameConfig from '../../common/types/gameConfig'
import { Cell } from '../../common/components/Cell'
import { useBasicGameProcess } from '../../services/basic-game-process'
import { arrayFromNumber } from '../../utils/array-helpers'
import styles from './game-screen.module.css'

interface GameScreenProps {
  gameConfigNumbers: GameConfig;
  loseGame: () => void;
  winGame: () => void;
}

export const GameScreen = ({ gameConfigNumbers, loseGame, winGame }: GameScreenProps) => {
  const {rowsNumber, colsNumber} = gameConfigNumbers;

  const { normalizedObject, hasUserWon, hasUserLost, revealCell, toggleFlag } = useBasicGameProcess(gameConfigNumbers)

  useEffect(() => {
    if (hasUserWon) {
      winGame();
    }
  }, [hasUserWon, winGame])

  useEffect(() => {
    if (hasUserLost) {
      loseGame();
    }
  }, [hasUserLost, loseGame])

  return (
    <div className={styles.overflow}>
      <div className={styles.gameGrid}>
        {arrayFromNumber(rowsNumber).map((r) => (
          <div className={styles.gameRow} key={r}>
            {arrayFromNumber(colsNumber).map((c) => {
              const currentIndex = `${r - 1},${c - 1}`;
              const { cellType, isRevealed, isFlagged, minesNumber } = normalizedObject[currentIndex]
              return (
                <Cell
                  key={c}
                  cellIndex={currentIndex}
                  cellType={cellType}
                  isRevealed={isRevealed}
                  isFlagged={isFlagged}
                  toggleFlag={() => toggleFlag(currentIndex)}
                  revealCell={() => revealCell(currentIndex)}
                  minesNumber={minesNumber}
                />
            )})}
          </div>
        ))}
      </div>
    </div>
  )
}
