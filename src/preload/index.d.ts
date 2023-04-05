import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      exec: (command: string) => Promise<any>;
      execSpawn: (command: string, args?: string[]) => Promise<Uint8Array>;
    }
  }
}
