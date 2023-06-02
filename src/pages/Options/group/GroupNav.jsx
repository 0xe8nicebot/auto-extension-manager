import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Popconfirm, message } from "antd"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import chromeP from "webext-polyfill-kinda"

import { GroupOptions } from ".../storage/index"
import { GroupNavStyle } from "./GroupNavStyle"
import { AddNewNavItem, checkSelectedGroup } from "./helpers"

function GroupNav({
  groupInfo,
  current,
  onSelectedChanged,
  onGroupItemDeleted
}) {
  // const [selectedGroup, setSelectedGroup] = useState()

  useEffect(() => {
    if (!current || !current.id) {
      selectFirstGroupTab()
    }
  })

  const onGroupTabClick = (e, item) => {
    // setSelectedGroup(item)
    onSelectedChanged?.(item)
  }

  const onAddNewGroupClick = (e) => {
    // setSelectedGroup(AddNewNavItem)
    onSelectedChanged?.(AddNewNavItem)
  }

  const onEditGroupClick = (e, group) => {
    e.stopPropagation()
    message.info(`edit ${group.name}`)
  }

  function selectFirstGroupTab() {
    if (groupInfo && groupInfo[0]) {
      // setSelectedGroup(groupInfo[0])
      onSelectedChanged?.(groupInfo[0])
    } else {
      // setSelectedGroup(AddNewNavItem)
      onSelectedChanged?.(AddNewNavItem)
    }
  }

  const onDeleteGroupClick = async (e, group) => {
    e.stopPropagation()

    await GroupOptions.deleteGroup(group.id)
    if (group.id === current?.id) {
      selectFirstGroupTab()
    }

    onGroupItemDeleted?.(group)

    message.info(`delete ${group.name}`)
  }

  return (
    <GroupNavStyle>
      <ul>
        {groupInfo.map((group) => {
          return (
            <li key={group.id} onClick={(e) => onGroupTabClick(e, group)}>
              <div
                className={classNames([
                  "tab-container",
                  { "selected-group-item": group.id === current?.id }
                ])}>
                <h3>{group.name}</h3>
                <div className="tab-operation">
                  <EditFilled
                    onClick={(e) => onEditGroupClick(e, group)}
                    className="tab-operation-item"
                  />

                  <Popconfirm
                    className="tab-operation-item"
                    title="删除分组"
                    description={`确认删除分组"${group.name}"`}
                    onConfirm={(e) => onDeleteGroupClick(e, group)}
                    onCancel={(e) => e.stopPropagation()}
                    okText="Yes"
                    cancelText="Cancel"
                    onClick={(e) => e.stopPropagation()}>
                    <DeleteFilled />
                  </Popconfirm>
                </div>
              </div>
            </li>
          )
        })}
        <li>
          <div
            className={classNames([
              "tab-container",
              "add-new-group",
              {
                "selected-group-item": checkSelectedGroup(current, "__add__")
              }
            ])}
            onClick={(e) => onAddNewGroupClick(e)}>
            <PlusOutlined />
          </div>
        </li>
      </ul>
    </GroupNavStyle>
  )
}

export default GroupNav