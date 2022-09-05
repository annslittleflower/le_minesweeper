import { useId, useState } from 'react'
import styles from './start-screen.module.css'
import GameConfig from '../../common/types/gameConfig'
import { Button } from '../../common/components/Button'

const MIN_ROWS = 5;
const MIN_COLS = 5;
const MIN_BOMBS = 2;


const GAME_CONFIG_LOCALSTORAGE_KEY = 'GAME_CONFIG';

interface StartScreenProps {
  setGameConfigNumbers: React.Dispatch<React.SetStateAction<GameConfig | undefined>>
  startGame: () => void;
}

const initialConfig = {
  rowsNumber: MIN_ROWS,
  colsNumber: MIN_COLS,
  bombsNumber: MIN_BOMBS
}

const savedConfig = localStorage.getItem(GAME_CONFIG_LOCALSTORAGE_KEY)
const parsedConfig = savedConfig ? JSON.parse(savedConfig) : initialConfig 

export const StartScreen = ({ setGameConfigNumbers, startGame }: StartScreenProps) => {
  const idForForm = useId()
  const [rowsNumber, setRowsNumber] = useState(parsedConfig.rowsNumber)
  const [colsNumber, setColsNumber] = useState(parsedConfig.colsNumber)
  const [bombsNumber, setBombsNumber] = useState(parsedConfig.bombsNumber)
  const [formHasErrors, setFormHasErrors] = useState(false)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config: GameConfig = {
      rowsNumber,
      colsNumber,
      bombsNumber
    }

    localStorage.setItem(GAME_CONFIG_LOCALSTORAGE_KEY, JSON.stringify(config))
    setGameConfigNumbers(config)
    startGame()
  }

  return (
    <div className={styles.screen}>
      <h2 className={styles.hello}>Welcome to the Le Minesweeper!</h2>
      <p className={styles.enterText}>Please enter number of rows, columns and bombs below</p>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <label
          className={styles.label}
          htmlFor={idForForm + '-rows'}
        >
          Enter number of rows
        </label>
        <input
          className={styles.input}
          type="number"
          id={idForForm + '-rows'}
          min={MIN_ROWS}
          required={true}
          value={rowsNumber}
          onChange={({target}) => setRowsNumber(target.valueAsNumber || MIN_ROWS)}
        />
        <label
          className={styles.label}
          htmlFor={idForForm + '-columns'}
        >
          Enter number of columns
        </label>
        <input
          className={styles.input}
          type="number"
          id={idForForm + '-columns'}
          min={MIN_COLS}
          required={true}
          value={colsNumber}
          onChange={({target}) => setColsNumber(target.valueAsNumber || MIN_COLS)}
        />
        <label
          className={styles.label}
          htmlFor={idForForm + '-bombs'}
        >
          Enter number of bombs
        </label>
        <input
          className={styles.input}
          type="number"
          id={idForForm + '-bombs'}
          min={MIN_BOMBS}
          required={true}
          value={bombsNumber}
          onChange={({target}) => {
            const {valueAsNumber} = target;
            setBombsNumber(target.valueAsNumber || MIN_BOMBS)

            if (valueAsNumber > (rowsNumber * colsNumber) - 1) {
              setFormHasErrors(true)
              return;
            }

            setFormHasErrors(false)
          }}
        />
        {formHasErrors ? <p className={styles.errorText}>Number of bombs should be less than (cols*rows) - 1</p> : null}
        <Button disabled={formHasErrors} type="submit">PLAY !!!</Button>
      </form>
    </div>
  )
}
