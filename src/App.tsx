import { useState } from 'react'
import { FinishGameModal, FinishGameModalProps } from './components/FinishGameModal';
import { StartScreen } from './screens/StartScreen'
import GameConfig from './common/types/gameConfig'

const STARTING = 'STARTING'
const GAME_IS_ON = 'GAME_IS_ON'
const GAME_IS_LOST = 'GAME_IS_LOST'
const GAME_IS_WON = 'GAME_IS_WON'
 
type GAME_STATE_KEYS_TYPE = keyof typeof CURRENT_GAME_STATE_TYPE_MAP

const CURRENT_GAME_STATE_TYPE_MAP = {
  STARTING: STARTING,
  GAME_IS_ON: GAME_IS_ON,
  GAME_IS_LOST: GAME_IS_LOST,
  GAME_IS_WON: GAME_IS_WON
}

// type GAME_STATE_KEYS_MODAL = keyof Pick<typeof CURRENT_GAME_STATE_TYPE_MAP, 'GAME_IS_LOST' | 'GAME_IS_WON'>
// TODO not string
type ModalPropsMapType = {
  [key: string]: Omit<FinishGameModalProps, 'onClose'>
}

const ModalPropsMap: ModalPropsMapType = {
  [CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_LOST] : {
    onActionButtonClick: () => console.log('restart game'),
    actionButtonText: 'Try again',
    gameResultText: 'You lost :(',
    blockBackgroundClosing: true
  },
  [CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_WON]: {
    onActionButtonClick: () => console.log('restart game'),
    actionButtonText: 'Try again',
    gameResultText: 'You lost :(',
    blockBackgroundClosing: true
  }
}

const App = () => {
  const [currentGameState, setCurrentGameState] = useState<GAME_STATE_KEYS_TYPE>(CURRENT_GAME_STATE_TYPE_MAP.STARTING as GAME_STATE_KEYS_TYPE)
  const [isGameResultModalOpened, setIsGameResultModalOpened ] = useState(false)
  const [gameConfigNumbers, setGameConfigNumbers] = useState<GameConfig | undefined>(undefined)

  console.log('gameConfigNumbers', gameConfigNumbers)

  return (
    <div>
      {/* <button onClick={() => setIsGameResultModalOpened(true)}>OPEN ME</button> */}

      {currentGameState === CURRENT_GAME_STATE_TYPE_MAP.STARTING ? (
        <StartScreen setGameConfigNumbers={setGameConfigNumbers} />
      ): null}

      {isGameResultModalOpened && (
        currentGameState === CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_LOST ||
        currentGameState === CURRENT_GAME_STATE_TYPE_MAP.GAME_IS_WON) ? (
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
