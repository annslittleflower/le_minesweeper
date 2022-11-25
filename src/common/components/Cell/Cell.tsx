import { memo } from 'react';
import { CellTypesMap, EachCellType } from './../../types/cellTypes'

import styles from './cell.module.css'

interface CellProps {
  cellType: EachCellType | number;
  cellIndex: string;
  isRevealed: boolean;
  isFlagged: boolean;
  minesNumber: number;

  revealCell: (cellIndex: string) => void
  toggleFlag: (cellIndex: string) => void;
}

const CellComponent = ({ cellType, cellIndex, isRevealed, isFlagged, minesNumber, revealCell, toggleFlag }: CellProps) => {
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

  console.log('CELL IS RENDERING')

  return (
    <div
      className={styles.cell}
      data-cellindex={cellIndex}
      onClick={(e) => revealCell(e.currentTarget.dataset.cellindex as string)}
      onContextMenu={(e) => {
        e.preventDefault();
        toggleFlag(e.currentTarget.dataset.cellindex as string)
      }}
    >
      {renderCellContent()}
    </div>
  )
}

// wanna prevent ALL cell rendering on EACH click

const areEqual = (prevProps: CellProps, nextProps: CellProps) => {
  if (
    prevProps.isFlagged === nextProps.isFlagged &&
    prevProps.minesNumber === nextProps.minesNumber &&
    prevProps.isRevealed === nextProps.isRevealed
  ) return true

  return false

  /*

    FROM documentation here https://reactjs.org/docs/react-api.html#reactmemo

    "return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false"

    so if this 3 dependencies did not change - we dont render Cell component,
    and should not see CELL IS RENDERING in console

    if one if them changes - we render Cell component and see message in console

  */
}

export const Cell = memo(CellComponent, areEqual)
