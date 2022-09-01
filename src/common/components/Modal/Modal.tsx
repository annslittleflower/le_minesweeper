import { useEffect } from 'react';
import { createPortal } from 'react-dom'

import styles from './modal.module.css'

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode
  blockBackgroundClosing?: boolean 
}

export const Modal = ({onClose, children, blockBackgroundClosing = false}: ModalProps) => {
  useEffect(() => {
    document.body.classList.toggle('noscroll', true)
    return () => {
      document.body.classList.toggle('noscroll', false)
    }
  }, [])

  const closeModal = () => {
    console.log('blockBackgroundClosing', blockBackgroundClosing)
    if (!blockBackgroundClosing) {
      onClose()
    }
  }

  return createPortal(
    <div className={styles.modalWrapper} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement
  )
}
