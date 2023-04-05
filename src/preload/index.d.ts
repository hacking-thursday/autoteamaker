import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      exec: (command: string) => Promise<any>
    }
  }
}
