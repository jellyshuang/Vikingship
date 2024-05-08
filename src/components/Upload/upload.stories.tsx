import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Upload, UploadProps} from './upload'
import Icon from "../Icon";

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true;
}


const meta: Meta<typeof Upload> = {
  component: Upload,
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Primary: Story = {
  args: {
    action: "https://jsonplaceholder.typicode.com/posts",
    onChange: action('changed'),
    beforeUpload: checkFileSize,
    onRemove: action('removed'),
    name: 'filename',
    data: {'key': 'value'},
    headers: {'X-Powered-By': 'vikingship'},
    accept: '.jpg',
    multiple: true,
    drag: true,
    children: (<>
          <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击或者拖动到此区域进行上传</p>
    </>)
  },
};