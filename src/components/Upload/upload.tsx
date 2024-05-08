import React, {ChangeEvent, FC, useRef, useState} from "react";
import axios from "axios";

import Button from '../Button'
import { UploadList } from "./uploadList";
import Dragger from "./dragger";

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: {[key: string]: any};
  name?: string;
  data?: {[key: string]: any};
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {children, action, onProgress, onSuccess, onError, beforeUpload, onChange, defaultFileList, onRemove, name, headers, data, withCredentials, accept, multiple, drag}  = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>( defaultFileList || []);
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj}
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if(fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    if(onRemove) {
      onRemove(file)
    }
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // setFileList([...fileList, _file])
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
        console.log('prtc', percentage);
        
        if (percentage < 100) {
          updateFileList(_file, {percent: percentage, status: 'uploading'})
          _file.status = 'uploading'
          _file.percent = percentage
          if (onProgress) {
            onProgress(percentage, _file)
          }
        }
      }
    }).then(resp => {
      console.log(resp);
      updateFileList(_file, {status: 'success', response: resp.data})
      if (onSuccess) {
        onSuccess(resp.data, file);
      }
      if (onChange) {
        onChange(file);
      }
      
    }).catch(err => {
      console.log(err);
      updateFileList(_file, {status: 'error', error: err})
      if (onError) {
        onError(err, file);
      }
      if (onChange) {
        onChange(file);
      }
      
    })
  }
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if ( result && result instanceof Promise ) {
          result.then(processedFile => {
            post(processedFile);
          })
        } else if (result !== false) {
          post(file);
        }
      }
    })
  }
  console.log(fileList);
  
  return (
    <div className="viking-upload-component">
      <div 
        className="viking-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}
      >
        {
          drag ? 
            <Dragger onFile={(file) => {uploadFiles(file)}}>
              {children}
            </Dragger> :
            children
        }
        <input 
          className="viking-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file" 
          accept={accept}
          multiple={multiple}
      />
      </div>
      {/* <Button
        btnType="primary"
        onClick={handleClick}
      >
        Upload File
      </Button> */}
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload;