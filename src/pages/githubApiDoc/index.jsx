import React from "react"
import {Collapse} from "antd"
import JSONResult from "../../components/JSONResult"
export default props => {
  return (
    <Collapse accordion>
      <Collapse.Panel header="This is Collapse.panel header 1" key="1">
        <JSONResult
          result={{
            array: [1, 2, 3],
            bool: true,
            object: {
              foo: "bar"
            }
          }}
        />
      </Collapse.Panel>
      <Collapse.Panel header="This is Collapse.panel header 2" key="2">
        <p>{}</p>
      </Collapse.Panel>
      <Collapse.Panel header="This is Collapse.panel header 3" key="3">
        <p>{}</p>
      </Collapse.Panel>
    </Collapse>
  )
}
