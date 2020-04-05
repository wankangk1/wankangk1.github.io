import axios from "./axios"
const githubApi = "/repos/wankangk1/wankangk1.github.io"
const getIssues = () => {
  let params = {}
  params.page = 1
  params.per_page = 10
  return axios.get(`${githubApi}/issues`, { params })
}
const getIssueDetail = (id) => {
  return axios.get(`${githubApi}/issues/${id}`)
}
export { getIssues,getIssueDetail }
