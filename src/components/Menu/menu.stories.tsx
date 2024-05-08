import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Menu from './index'
import { JSX } from 'react/jsx-runtime'
import { MenuProps } from './menu'

export default {
  title: '第六章：Menu',
  id: 'Menu',
  component: Menu,
  subcomponents: { 'SubMenu': Menu.SubMenu, 'Item': Menu.Item }
} as Meta<typeof Menu>

export const ADefaultMenu: StoryObj<typeof Menu> = (args: JSX.IntrinsicAttributes & MenuProps) => (
  <Menu defaultIndex='0' {...args} >
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.Item disabled>
      disabled
    </Menu.Item> 
    <Menu.SubMenu title="下拉选项">
      <Menu.Item>
        下拉选项一
      </Menu.Item>
      <Menu.Item>
        下拉选项二
      </Menu.Item>    
    </Menu.SubMenu>
  </Menu>
)
ADefaultMenu.storyName = '默认Menu'
export const BClickMenu: StoryObj<typeof Menu> = (args: JSX.IntrinsicAttributes & MenuProps) => (
  <Menu {...args} defaultIndex='0' mode="vertical">
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.SubMenu title="点击下拉选项">
      <Menu.Item>
        下拉选项一
      </Menu.Item>
      <Menu.Item>
        下拉选项二
      </Menu.Item>    
    </Menu.SubMenu>
  </Menu>
)
BClickMenu.storyName = '纵向的 Menu'
export const COpenedMenu:StoryObj<typeof Menu> = (args: JSX.IntrinsicAttributes & MenuProps) => (
  <Menu {...args} defaultIndex='0' mode="vertical" defaultOpenSunMenus={['2']}>
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.SubMenu title="默认展开下拉选项">
      <Menu.Item>
        下拉选项一
      </Menu.Item>
      <Menu.Item>
        下拉选项二
      </Menu.Item>    
    </Menu.SubMenu>
  </Menu>
)
COpenedMenu.storyName = '默认展开的纵向 Menu'