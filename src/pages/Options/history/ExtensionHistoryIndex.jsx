import React, { useEffect, useState } from "react"

import chromeP from "webext-polyfill-kinda"

import { ManageOptions } from ".../storage"
import { filterExtensions, isExtExtension } from ".../utils/extensionHelper.js"
import Title from "../Title.jsx"
import ExtensionHistory from "./ExtensionHistory.jsx"

const ExtensionManageIndex = () => {
  const [extensions, setExtensions] = useState([])
  const [managementConfig, setManagementConfig] = useState({})

  useEffect(() => {
    chromeP.management.getAll().then((res) => {
      const list = filterExtensions(res, isExtExtension)
      setExtensions(list)
    })

    ManageOptions.get().then((res) => {
      setManagementConfig(res)
    })
  }, [])

  return (
    <div>
      <Title title="历史记录"></Title>
      <ExtensionHistory extensions={extensions} config={managementConfig}></ExtensionHistory>
    </div>
  )
}

export default ExtensionManageIndex