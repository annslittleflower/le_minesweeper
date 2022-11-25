import { useState } from 'react'
import { FinishGameModal, FinishGameModalProps } from './components/FinishGameModal';
import { Button } from './common/components/Button';
import { StartScreen } from './screens/StartScreen'
import { GameScreen } from './screens/GameScreen';
import GameConfig from './common/types/gameConfig'
import { GAME_STATE_KEYS_TYPE, CURRENT_GAME_STATE_TYPE_MAP } from './common/types/gameStateTypes'

type ModalPropsMapType = {
  // [key in keyof typeof CURRENT_GAME_STATE_TYPE_MAP]: Omit<FinishGameModalProps, 'onClose'>
  [key in typeof CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_LOST | typeof CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_WON]: Omit<FinishGameModalProps, 'onClose'>
}

const App = () => {
  const [currentGameState, setCurrentGameState] = useState<GAME_STATE_KEYS_TYPE>(CURRENT_GAME_STATE_TYPE_MAP.STARTING)
  const [isGameResultModalOpened, setIsGameResultModalOpened ] = useState(false)
  const [gameConfigNumbers, setGameConfigNumbers] = useState<GameConfig | undefined>(undefined)
  const [seeResult, setSeeResult] = useState(false)

  const ModalPropsMap: ModalPropsMapType = {
    [CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_LOST] : {
      onActionButtonClick: () => setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.STARTING),
      actionButtonText: 'Try again',
      gameResultText: 'You lost :(',
    },
    [CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_WON]: {
      onActionButtonClick: () => setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.STARTING),
      actionButtonText: 'Play again',
      gameResultText: 'You win, congrats!',
    }
  }

  const isGameOver = currentGameState === CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_LOST ||
    currentGameState === CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_WON

  return (
    <div>
      {currentGameState === CURRENT_GAME_STATE_TYPE_MAP.STARTING ? (
        <StartScreen
          setGameConfigNumbers={setGameConfigNumbers}
          startGame={() => setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_ON)}
        />
      ): null}
      {currentGameState !== CURRENT_GAME_STATE_TYPE_MAP.STARTING  && gameConfigNumbers ? (
        <GameScreen
          gameConfigNumbers={gameConfigNumbers}
          loseGame={() => {
            setIsGameResultModalOpened(true)
            setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_LOST)}
          }
          winGame={() => {
            setIsGameResultModalOpened(true)
            setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_WON)}
          }
        />
      ): null}
      {isGameResultModalOpened && !seeResult && isGameOver ? (
        <FinishGameModal
          {...ModalPropsMap[currentGameState]}
          onClose={() => {
            setSeeResult(true)
            setIsGameResultModalOpened(false)
          }}
        />
      ) : null}

      {seeResult ? (
        <Button
          onClick={() => {
            setSeeResult(false)
            setCurrentGameState(CURRENT_GAME_STATE_TYPE_MAP.STARTING)
          }}
        >
          Play again
        </Button>
      ): null}
    </div>
  );
}

export default App;
