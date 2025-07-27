import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/es/style.css'

import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'


createApp(App).use(VxeUI).use(VxeUITable).mount('#app')
