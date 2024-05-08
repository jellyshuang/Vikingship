import React, { useRef } from 'react'
import { Meta } from '@storybook/react'
import Form from './form'
import Item from './formItem'
import Input from '../Input'
import Button from '../Button'

const meta: Meta<typeof Form> = {
  title: 'form组件',
  id: 'Form',
  component: Form,
  decorators: [
    (Story) => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta;

export const BasicForm = () => {
  return (
    <Form>
      <Item label='用户名'>
        <Input/>
      </Item>
      <Item label='密码'>
        <Input type='password'/>
      </Item>
      <Item>
        <Input placeholder='no label'/>
      </Item>
      <div className="viking-form-submit-area">
        <Button type='submit' btnType='primary'>登陆</Button>
      </div>
    </Form>
  )
}