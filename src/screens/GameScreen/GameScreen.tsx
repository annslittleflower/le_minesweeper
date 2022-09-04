import GameConfig from '../../common/types/gameConfig'
import { Cell } from '../../common/components/Cell'
import { buildBoard } from '../../services/basic-game-process'
import { arrayFromNumber } from '../../utils/array-helpers'
import styles from './game-screen.module.css'

interface GameScreenProps {
  gameConfigNumbers: GameConfig;
}

export const GameScreen = ({ gameConfigNumbers }: GameScreenProps) => {
  console.log('gameConfigNumbers', gameConfigNumbers)
  const {rowsNumber, colsNumber} = gameConfigNumbers;

  const { normalizedObject, board } = buildBoard(gameConfigNumbers)
  console.log('board', board)

  return (
    <div className={styles.overflow}>
      <div className={styles.gameGrid}>
        {arrayFromNumber(rowsNumber).map((r) => (
          <div className={styles.gameRow} key={r}>
            {arrayFromNumber(colsNumber).map((c) => (
              <Cell
                key={c}
                displayState={normalizedObject[`${r - 1},${c - 1}`]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
