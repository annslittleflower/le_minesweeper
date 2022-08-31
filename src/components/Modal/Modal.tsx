import { useEffect } from 'react';
import { createPortal } from 'react-dom'

import styles from './modal.module.css'

interface ModalProps {
  isOpened: boolean;
  onClose?: () => void;
  children: React.ReactNode
}

const Modal = ({isOpened, onClose, children}: ModalProps) => {
  useEffect(() => {
    document.body.classList.toggle('noscroll', isOpened)
    return () => {
      document.body.classList.toggle('noscroll', isOpened)
    }
  }, [isOpened])

  return isOpened ? createPortal(
    <div className={styles.modalWrapper} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement
  ) : null
}

export default Modal
