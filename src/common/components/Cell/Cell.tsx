import styles from './cell.module.css'

interface CellProps {
  displayState: string; // TODO rename, use typings
}

export const Cell = ({ displayState }: CellProps) => {
  return (
    <div className={styles.cell}>
      {displayState}
    </div>
  )
}

