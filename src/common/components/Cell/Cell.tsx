import { CellTypes, cellTypesMap } from './../../types/cellTypes'

import styles from './cell.module.css'

interface CellProps {
  cellType: keyof CellTypes;
  cellIndex: string;
  isRevealed: boolean;
  isFlagged: boolean;

  revealCell: (cellIndex: string) => void
  toggleFlag: () => void;
}

export const Cell = ({ cellType, cellIndex, isRevealed, isFlagged, revealCell, toggleFlag }: CellProps) => {
  const renderCellContent = () => {
    if (isRevealed) {
      return cellType;
    }

    if (isFlagged) {
      return cellTypesMap.flag
    }
  }
  return (
    <div
      className={styles.cell}
      onClick={() => revealCell(cellIndex)}
      onContextMenu={(e) => {
        e.preventDefault();
        toggleFlag()
      }}
    >
      {renderCellContent()}
    </div>
  )
}
