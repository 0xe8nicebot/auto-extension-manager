declare namespace config {
  export interface IScene {
    /**
     * 场景ID
     */
    id: string
    name: string
  }

  export interface IGroup {
    name: string
    desc: string
    id: string
    extensions: string[]
  }

  export interface IManagement {
    extensions: IExtensionAttachInfo[]
  }

  export interface IExtensionAttachInfo {
    extId: string
    alias: string
    remark: string
    update_time: number
  }
}
