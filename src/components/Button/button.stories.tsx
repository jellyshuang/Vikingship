import React from "react";
import {Button} from "./button";
import {ButtonSize, ButtonType} from './button'

import { Meta, StoryObj } from '@storybook/react'

const buttonMeta: Meta<typeof Button> = {
  title: '第四章：Button',
  component: Button,
  tags: ['autodocs'],
}

export default buttonMeta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'button',
    btnType: 'primary'
  }
}

Default.storyName = '默认按钮样式'

export const ButtonWithSize: StoryObj<typeof Button> = {
  args: {
    size: 'lg',
    children: 'button'
  }
}

ButtonWithSize.storyName = '不同类型按钮'

export const ButtonSmall: StoryObj<typeof Button> = {
  args: {
    size: 'sm',
    children: 'button'
  }
}