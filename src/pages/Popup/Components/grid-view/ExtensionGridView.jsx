import React, { memo, useEffect, useState } from "react"

import classNames from "classnames"
import { styled } from "styled-components"

import { appendAdditionInfo, sortExtension } from ".../utils/extensionHelper"
import ExtensionGridItem from "./ExtensionGridItem"

const ExtensionGrid = memo(({ extensions, options, isShowBottomDivider }) => {
  const [items1, setItems1] = useState([])
  const [items2, setItems2] = useState([])

  useEffect(() => {
    const list = appendAdditionInfo(extensions, options)
    const list1 = list.filter((i) => i.enabled)
    const list2 = list.filter((i) => !i.enabled)
    setItems1(sortExtension(list1))
    setItems2(sortExtension(list2))
  }, [extensions, options])

  return (
    <Style>
      <ul>
        {items1.map((item) => {
          return (
            <li key={item.id} className="grid-item-enable">
              <ExtensionGridItem item={item} options={options}></ExtensionGridItem>
            </li>
          )
        })}
        {new Array(10).fill("").map((_, index) => (
          <i key={index}></i>
        ))}
      </ul>
      {items1.length > 0 && items2.length > 0 && <div className="divider"></div>}
      <ul>
        {items2.map((item) => {
          return (
            <li key={item.id} className="grid-item-disable">
              <ExtensionGridItem item={item} options={options}></ExtensionGridItem>
            </li>
          )
        })}
        {new Array(10).fill("").map((_, index) => (
          <i key={index}></i>
        ))}
      </ul>
      {isShowBottomDivider && <div className="divider"></div>}
    </Style>
  )
})

export default ExtensionGrid

const imgSize = "46px"
const imgMargin = "16px"

const Style = styled.div`
  ul {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;

    li {
      width: ${imgSize};
      height: ${imgSize};

      margin: 16px ${imgMargin};
    }

    i {
      width: ${imgSize};
      margin: 0px ${imgMargin};
    }
  }

  .divider {
    height: 1px;
    background-color: #ccc;
    margin: 0px 10px 0px 10px;
  }
`
