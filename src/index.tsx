// import {createRoot} from 'react-dom/client'
// import React from 'react';
// import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import './styles/index.scss'
library.add( fas)
export {default as Button} from './components/Button'
export {default as Menu} from './components/Menu'
export {default as Icon} from './components/Icon'
export {default as Transition} from './components/Transition'
export {default as Upload} from './components/Upload'



// const domNode = document.querySelector('#root') as HTMLElement
// const root = createRoot(domNode)
// root.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>
// )