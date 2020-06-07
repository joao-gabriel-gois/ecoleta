import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUpload: (file: File) => void 
}

const Dropzone = () => {
  const [ selectedFileUrl, setSelectedFileUrl ] = useState<string>('');
   
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);
    
    setSelectedFileUrl(fileUrl);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      accept:'image/*'
   })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      
      {// nested ifs
        // if
        selectedFileUrl ?
          <img src={selectedFileUrl} alt="Point Thumbnail" />
        : //else
          (
            isDragActive ? // if (inside previous else)
            <p>
              <FiUpload />
              Arraste a imagem do estabelecimento aqui... 
            </p> :// else
            <p>
              <FiUpload />
              Clique e selecione a imagem do estabelecimento ou arraste e jogue e aqui
            </p>
          )
      }
    </div>
  )
}

export default Dropzone;
