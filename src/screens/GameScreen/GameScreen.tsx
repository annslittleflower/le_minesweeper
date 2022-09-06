import { useEffect } from 'react'
import GameConfig from '../../common/types/gameConfig'
import { Cell } from '../../common/components/Cell'
import { useBasicGameProcess } from '../../hooks/basic-game-process'
import styles from './game-screen.module.css'

interface GameScreenProps {
  gameConfigNumbers: GameConfig;
  loseGame: () => void;
  winGame: () => void;
}

export const GameScreen = ({ gameConfigNumbers, loseGame, winGame }: GameScreenProps) => {
  const {colsNumber} = gameConfigNumbers;

  // TODO think about memoizing here
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
    <div className={styles.gridWrapper}>
      <div
        className={styles.gameGrid}
        style={{ 
          gridTemplateColumns: `repeat(${colsNumber}, 3rem)`,
        }}
      >
        {Object.keys(normalizedObject).map(currentIndex => {
          const { cellType, isRevealed, isFlagged, minesNumber } = normalizedObject[currentIndex]
          return (
            <Cell
              key={currentIndex}
              cellIndex={currentIndex}
              cellType={cellType}
              isRevealed={isRevealed}
              isFlagged={isFlagged}
              toggleFlag={() => toggleFlag(currentIndex)}
              revealCell={() => revealCell(currentIndex)}
              minesNumber={minesNumber}
            />
          )
        })}
      </div>
    </div>
  )
}
