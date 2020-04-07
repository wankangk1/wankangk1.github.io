import axios from "./axios"
const githubApi = "/repos/wankangk1/wankangk1.github.io"
const getIssues = () => {
  return axios.get(`${githubApi}/issues`)
}
const getIssueDetail = (id) => {
  return axios.get(`${githubApi}/issues/${id}`)
}
export {getIssues, getIssueDetail}
