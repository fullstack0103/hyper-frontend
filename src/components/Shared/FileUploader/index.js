import React, { useState } from 'react';
import { Alert } from '../Confirm';
import { 
  FileUploaderContainer, 
  UploadButton,
  UploadIcon
} from './styles';

const FileUploader = (props) => {

  const { label, handleFile, isOnlyIcon, icon } = props;

  const maxFileSize = props?.maxFileSize || 100
  const [alertState, setAlertState] = useState({ open: false, content: null })

  
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
    
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    if (Math.floor(fileUploaded?.size / 1024) > maxFileSize) {
      setAlertState({
        open: true,
        content: `The maximum image size is ${maxFileSize} KB`
      })
      return
    }
    handleFile(fileUploaded);
  };

  return (
    <>
      <FileUploaderContainer>
        {isOnlyIcon ? (
          <UploadIcon onClick={handleClick}>
            {icon}
          </UploadIcon>
        ): (
          <UploadButton onClick={handleClick}>
            {label}
          </UploadButton>
        )}
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{display: 'none'}}
        />
      </FileUploaderContainer>

      <Alert
        width='600px'
        icon={
          <svg fill="none" viewBox="0 0 24 24" style={{ width: '2rem', height: '2rem' }} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title={'Error'}
        content={alertState.content}
        acceptText='ACCEPT'
        open={alertState.open}
        onClose={() => setAlertState({ open: false, content: null })}
        onAccept={() => setAlertState({ open: false, content: null })}
      />
    </>
  )
}

export default FileUploader;