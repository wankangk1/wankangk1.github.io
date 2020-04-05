import React from "react"
import "./index.less"
import BasicRoute from "../router"
import axios from "../request/axios"
import moment from "moment"
import lodash from "lodash"
window.axios = axios
window.moment = moment
window._=lodash
const Homepage = () => {
  return (
    <div className="my-homepage">
      <BasicRoute />
    </div>
  )
}
export default Homepage
