import { CellTypes, CellTypesMap } from './../../types/cellTypes'

import styles from './cell.module.css'

interface CellProps {
  cellType: keyof CellTypes;
  cellIndex: string;
  isRevealed: boolean;
  isFlagged: boolean;
  minesNumber: number;

  revealCell: (cellIndex: string) => void
  toggleFlag: () => void;
}

export const Cell = ({ cellType, cellIndex, isRevealed, isFlagged, minesNumber, revealCell, toggleFlag }: CellProps) => {
  const renderCellContent = () => {

    if (minesNumber) {
      return minesNumber;
    }

    if (isRevealed) {
      return cellType;
    }

    if (isFlagged) {
      return CellTypesMap.flag
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

