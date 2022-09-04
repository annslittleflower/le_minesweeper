import { useState } from 'react'
import { FinishGameModal, FinishGameModalProps } from './components/FinishGameModal';
import { StartScreen } from './screens/StartScreen'
import { GameScreen } from './screens/GameScreen';
import GameConfig from './common/types/gameConfig'
import { GAME_STATE_KEYS_TYPE, CURRENT_GAME_STATE_TYPE_MAP } from './common/types/gameStateTypes'


// type GAME_STATE_KEYS_MODAL = keyof Pick<typeof CURRENT_GAME_STATE_TYPE_MAP, 'GAME_IS_LOST' | 'GAME_IS_WON'>
// TODO not string ((((((((
type ModalPropsMapType = {
  [key: string]: Omit<FinishGameModalProps, 'onClose'>
}

const App = () => {
  const [currentGameState, setCurrentGameState] = useState<GAME_STATE_KEYS_TYPE>(CURRENT_GAME_STATE_TYPE_MAP.STARTING as GAME_STATE_KEYS_TYPE)
  const [isGameResultModalOpened, setIsGameResultModalOpened ] = useState(false)
  const [gameConfigNumbers, setGameConfigNumbers] = useState<GameConfig | undefined>(undefined)

  console.log('gameConfigNumbers', gameConfigNumbers)

  const ModalPropsMap: ModalPropsMapType = {
    [CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_LOST] : {
      onActionButtonClick: () => setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.STARTING as GAME_STATE_KEYS_TYPE),
      actionButtonText: 'Try again',
      gameResultText: 'You lost :(',
      blockBackgroundClosing: true
    },
    [CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_WON]: {
      onActionButtonClick: () => setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.STARTING as GAME_STATE_KEYS_TYPE),
      actionButtonText: 'Play again',
      gameResultText: 'You win, congrats!',
      blockBackgroundClosing: true
    }
  }

  const isGameFinished = currentGameState === CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_LOST ||
    currentGameState === CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_WON

  return (
    <div>
      {currentGameState === CURRENT_GAME_STATE_TYPE_MAP.STARTING ? (
        <StartScreen
          setGameConfigNumbers={setGameConfigNumbers}
          startGame={() => setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_ON as GAME_STATE_KEYS_TYPE)}
        />
      ): null}
      {currentGameState === CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_ON  && gameConfigNumbers ? (
        <GameScreen
          gameConfigNumbers={gameConfigNumbers}
          // loseGame
          // winGame
          // setIsGameResultModalOpened(false)
        />
      ): null}

      {isGameResultModalOpened && isGameFinished ? (
        <FinishGameModal
          {...ModalPropsMap[currentGameState]}
          onClose={() => {
            setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.STARTING as GAME_STATE_KEYS_TYPE)
            setIsGameResultModalOpened(false)
          }}
        />
      ) : null}
    </div>
  );
}

export default App;