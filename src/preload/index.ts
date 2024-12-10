import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI, type ElectronAPI } from '@electron-toolkit/preload'
import type { Props } from '../main/controllers/create-user'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {

  createUser: async (data: Props) => {
    return await ipcRenderer.invoke('createUser', data)
  },
  
  listUsers: async () => {
    return await ipcRenderer.invoke('listUsers')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
