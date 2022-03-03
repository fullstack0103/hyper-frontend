import React, { useEffect } from 'react'
import { Popup } from './Popup'
import {
  PopupDialog,
  PopupActions,
  ModalHeaderContainer,
  ModalBody,
  PopupContent
} from './styles'

import GradientButton from '../GradientButton'
import { useTheme } from 'styled-components'

const ConfirmUI = (props) => {
  const {
    title,
    icon,
    children,
    content,
    onAccept,
    onCancel,
    onClose,
    acceptText,
    cancelText
  } = props

  const handleKeyDown = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      onClose && onClose()
    }
  }

  useEffect(() => {
    if (props.open) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [props.open])

  return (
    <PopupDialog className='popup-dialog' width={props.width}>
      <>
        <ModalHeaderContainer>
          <div className="modal-title">
            {icon && (
              <div className="modal-title-icon">
                {icon}
              </div>
            )}
            <div className="modal-title-text">
              {title}
            </div>
          </div>
          <div className="modal-close" onClick={onClose}>
            <svg width="11" height="11" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M.833 10.323a.653.653 0 00.301-.164l4.043-4.043 4.044 4.043a.61.61 0 00.294.164.723.723 0 00.342 0 .627.627 0 00.3-.17.626.626 0 00.171-.302.723.723 0 000-.341.609.609 0 00-.164-.294L6.121 5.173l4.043-4.044a.609.609 0 00.164-.294.738.738 0 000-.345.586.586 0 00-.17-.298.626.626 0 00-.305-.17.722.722 0 00-.342 0 .608.608 0 00-.29.163L5.177 4.23 1.134.185a.652.652 0 00-.3-.164A.753.753 0 00.49.018a.581.581 0 00-.3.174.652.652 0 00-.164.301.722.722 0 000 .342.609.609 0 00.164.294l4.043 4.044L.19 9.216a.634.634 0 00-.168.294.708.708 0 00-.003.345.586.586 0 00.17.297.627.627 0 00.301.171.723.723 0 00.342 0z" fill="#fff"></path></svg>          
          </div>
        </ModalHeaderContainer>
        <ModalBody>
          <PopupContent>
            {content && typeof content === 'string' && content}
            {children}
          </PopupContent>
          {(onCancel || onAccept || onClose) && (
            <PopupActions>
              {onCancel && (
                <GradientButton
                  label={cancelText || 'Cancel'}
                  handleClick={() => onCancel()}
                />
              )}
              {onAccept && (
                <GradientButton
                  label={acceptText || 'Accept'}
                  handleClick={() => onAccept()}
                />
              )}
            </PopupActions>)}
          </ModalBody>
        </>
    </PopupDialog>
  )
}

export const Confirm = (props) => {
  const popupProps = {
    ...props,
    UIComponent: ConfirmUI
  }

  const theme = useTheme()

  return (
    <>
      {
        theme && <Popup {...popupProps} />
      }
    </>
  )
}

export const Alert = Confirm
