import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react"

import { Alert, Checkbox, Radio } from "antd"

import { getLang } from ".../utils/utils"
import EditorCommonStyle from "./CommonStyle"
import Style from "./RuleActionStyle"
import CustomRuleAction from "./ruleActions/CustomRuleAction"

const urlMatchTip = getLang("rule_match_url_tip")

const actionSelections = [
  {
    label: getLang("rule_action_close_when_matched"),
    key: "closeWhenMatched"
  },
  {
    label: getLang("rule_action_open_when_matched"),
    key: "openWhenMatched"
  },
  {
    label: getLang("rule_action_close_only_when_matched"),
    key: "closeOnlyWhenMatched"
  },
  {
    label: getLang("rule_action_open_only_when_matched"),
    key: "openOnlyWhenMatched"
  },
  {
    label: getLang("rule_action_custom"),
    key: "custom"
  }
]

const RuleAction = ({ options, config, pipe }, ref) => {
  useImperativeHandle(ref, () => ({
    // 获取配置
    getActionConfig: () => {
      if (!actionTypeKey) {
        throw Error(getLang("rule_action_no_any_action"))
      }

      const actionConfig = {
        actionType: actionTypeKey,
        reloadAfterEnable: refreshAfterEnable,
        reloadAfterDisable: refreshAfterDisable
      }

      if (actionTypeKey === "custom") {
        actionConfig.custom = customRef.current.getCustomRuleConfig()
      }

      return actionConfig
    }
  }))

  const customRef = useRef()

  const [actionTypeKey, setActionTypeKey] = useState("")
  const [actionTipMessage, setActionTipMessage] = useState("")

  const [refreshAfterEnable, setRefreshAfterEnable] = useState(false)
  const [refreshAfterDisable, setRefreshAfterDisable] = useState(false)

  // 根据配置初始化
  useEffect(() => {
    const actionConfig = config?.action
    if (!actionConfig) {
      return
    }
    setActionTypeKey(actionConfig.actionType)
    setRefreshAfterEnable(actionConfig.reloadAfterEnable ?? false)
    setRefreshAfterDisable(actionConfig.reloadAfterDisable ?? false)
  }, [config])

  useEffect(() => {
    switch (actionTypeKey) {
      case "closeWhenMatched":
        setActionTipMessage(`🛠 ${getLang("rule_action_close_when_match_desc")}`)
        break
      case "openWhenMatched":
        setActionTipMessage(`🛠 ${getLang("rule_action_open_when_matched_desc")}`)
        break
      case "closeOnlyWhenMatched":
        setActionTipMessage(`🛠 ${getLang("rule_action_close_only_when_matched_desc")}`)
        break
      case "openOnlyWhenMatched":
        setActionTipMessage(`🛠 ${getLang("rule_action_open_only_when_matched_desc")}`)
        break
      case "custom":
        setActionTipMessage(`🛠 ${getLang("rule_action_custom_desc")}`)
        break
      default:
        setActionTipMessage(`🛠 ${getLang("rule_action_please_select_action")}`)
    }
  }, [actionTypeKey])

  const handleActionTypeClick = (e) => {
    const key = e.target.value
    setActionTypeKey(key)
  }

  const onFreshAfterOpenChange = (e) => {
    setRefreshAfterEnable(e.target.checked)
  }

  const onFreshAfterCloseChange = (e) => {
    setRefreshAfterDisable(e.target.checked)
  }

  return (
    <EditorCommonStyle>
      <Style>
        <div className="editor-step-header">
          <span className="title">3 {getLang("rule_action_title")}</span>
        </div>

        <Alert
          className="action-tip-url-match"
          message={urlMatchTip}
          type="warning"
          showIcon
          action={
            <a href="https://ext.jgrass.cc/docs/rule" target="_blank" rel="noreferrer">
              {getLang("rule_action_help")}
            </a>
          }
        />

        <Radio.Group onChange={handleActionTypeClick} value={actionTypeKey}>
          {actionSelections.map((item) => {
            return (
              <Radio key={item.key} value={item.key}>
                {item.label}
              </Radio>
            )
          })}
        </Radio.Group>

        <p className="action-tip-match-type">{actionTipMessage}</p>

        {actionTypeKey === "custom" && (
          <CustomRuleAction
            options={options}
            config={config}
            pipe={pipe}
            ref={customRef}></CustomRuleAction>
        )}

        <div className="action-label action-refresh-options">
          <Checkbox checked={refreshAfterEnable} onChange={onFreshAfterOpenChange}>
            {getLang("rule_action_auto_reload_when_enable")}
          </Checkbox>
          <Checkbox checked={refreshAfterDisable} onChange={onFreshAfterCloseChange}>
            {getLang("rule_action_auto_reload_when_disable")}
          </Checkbox>
        </div>
      </Style>
    </EditorCommonStyle>
  )
}

export default memo(forwardRef(RuleAction))

export { actionSelections }
