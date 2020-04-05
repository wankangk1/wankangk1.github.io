import React from "react"
import styles from "./index.less"
import JSONTree from "react-json-tree"
import theme from "./theme"

const TestResult = props => {
  debugger
  return (
    <div className={styles.testResult}>
      <div className={styles.inner}>
        {props.result ? (
          <JSONTree
            data={props.result}
            theme={theme}
            shouldExpandNode={() => {
              return true
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default TestResult
