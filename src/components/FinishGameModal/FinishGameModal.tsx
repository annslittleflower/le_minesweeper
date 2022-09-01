import { Modal, ModalProps } from "../../common/components/Modal"
import styles from "./finish-game-modal.module.css"

export interface FinishGameModalProps extends Omit<ModalProps, 'children'> {
  onActionButtonClick: () => void
  actionButtonText: string
  gameResultText: string
}

export const FinishGameModal = ({ onActionButtonClick, gameResultText, actionButtonText, ...rest } : FinishGameModalProps) => {
  return (
    <Modal {...rest}>
      <div className={styles.actionButtonText}>{gameResultText}</div>
      <button className={styles.actionButton} onClick={onActionButtonClick}>
        {actionButtonText}
      </button>
    </Modal>
  )
}

