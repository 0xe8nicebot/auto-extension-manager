import React, { memo, useEffect, useRef, useState } from "react"

import { DeleteOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons"
import { Space } from "antd"
import classNames from "classnames"

import { getIcon } from ".../utils/extensionHelper.js"
import { isStringEmpty } from ".../utils/utils.js"
import { ExtensionGridItemStyle } from "./ExtensionGridItemStyle"

const ExtensionGridItem = memo(({ item, options }) => {
  const existOptionPage = !isStringEmpty(item.optionsUrl)
  const existHomePage = !isStringEmpty(item.homepageUrl)

  const [itemEnable, setItemEnable] = useState(item.enabled)

  const [isMouseEnter, setIsMouseEnter] = useState(false)

  const [isMenuOnRight, setIsMenuOnRight] = useState(true)
  const containerRef = useRef(null)
  const menuRef = useRef(null)

  const checkMenuPosition = () => {
    const containerRect = containerRef.current.getBoundingClientRect()
    const menuRect = menuRef.current.getBoundingClientRect()
    const rightSpace = window.innerWidth - containerRect.right

    if (rightSpace < menuRect.width) {
      setIsMenuOnRight(false)
    } else {
      setIsMenuOnRight(true)
    }
  }

  useEffect(() => {
    checkMenuPosition()
  }, [isMouseEnter])

  const handleMouseEnter = () => {
    setIsMouseEnter(true)
  }

  const handleMouseLeave = () => {
    setIsMouseEnter(false)
  }

  /**
   * 打开扩展设置页面
   */
  const handleSettingButtonClick = (e, item) => {
    if (existOptionPage) {
      chrome.tabs.create({ url: item.optionsUrl })
    }
  }

  /**
   * 打开扩展主页
   */
  const handleHomeButtonClick = (e, item) => {
    if (existHomePage) {
      chrome.tabs.create({ url: item.homepageUrl })
    }
  }

  /**
   * 删除扩展
   */
  const handleDeleteButtonClick = (e, item) => {
    chrome.management.uninstall(item.id)
    setIsMouseEnter(false)
  }

  const onItemClick = () => {
    if (itemEnable) {
      chrome.management.setEnabled(item.id, false)
      setItemEnable(false)
    } else {
      chrome.management.setEnabled(item.id, true)
      setItemEnable(true)
    }
  }

  return (
    <ExtensionGridItemStyle
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div
        className={classNames(["grid-display-item", { "grid-item-disable": !itemEnable }])}
        onClick={onItemClick}>
        <img src={getIcon(item, 48)} alt="icon" />
        <span className="grid-display-item-title">{getExtItemDisplayName(item)}</span>
      </div>
      <div
        className={classNames([
          "operation-menu",
          {
            "menu-right": isMenuOnRight,
            "menu-left": !isMenuOnRight,
            "menu-on": isMouseEnter
          }
        ])}
        ref={menuRef}>
        <h3 className="operation-menu-title">{item.name}</h3>
        <div className="operation-menu-items">
          <Space
            className={classNames({
              "operation-menu-item-disabled": !existOptionPage,
              "operation-menu-item": existOptionPage
            })}
            onClick={(e) => handleSettingButtonClick(e, item)}>
            <SettingOutlined />
          </Space>

          <Space className="operation-menu-item" onClick={(e) => handleDeleteButtonClick(e, item)}>
            <DeleteOutlined />
          </Space>

          <Space
            className={classNames({
              "operation-menu-item-disabled": !existHomePage,
              "operation-menu-item": existHomePage
            })}
            onClick={(e) => handleHomeButtonClick(e, item)}>
            <HomeOutlined />
          </Space>
        </div>
      </div>
    </ExtensionGridItemStyle>
  )
})

export default ExtensionGridItem

function getExtItemDisplayName(item) {
  try {
    if (item.__attach__?.alias) {
      return item.__attach__.alias
    }

    if (item.name.indexOf("-") > 0) {
      return item.name.split("-")[0].trim()
    }

    if (item.name.indexOf(":") > 0) {
      return item.name.split(":")[0].trim()
    }

    if (item.name.indexOf("：") > 0) {
      return item.name.split("：")[0].trim()
    }

    return item.name.trim()
  } catch (error) {
    console.error("尝试中扩展数据中获取短名称失败", item, error)
    return item.name
  }
}
