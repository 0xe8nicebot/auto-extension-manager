import styled from "styled-components"

export const SettingStyle = styled.div`
  .container {
    width: 600px;

    background: linear-gradient(to right, #337ab7aa, #fff);

    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .setting-item {
    display: flex;
    align-items: center;
    margin: 5px 10px;
    padding: 5px 0 8px 0;

    border-bottom: 1px solid #eee6;

    span {
      flex: 1 1 auto;
      font-size: 14px;
    }
  }

  .setting-width {
    display: none;
  }

  .import-export-container {
    margin-top: 20px;
    & > button {
      margin-right: 10px;
    }
  }
`
