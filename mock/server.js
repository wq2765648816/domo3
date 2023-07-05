let express = require("express")
let Mock = require("mockjs")
const loginData = require("./common/login.json")
const app = express()

app.use("/sys/login", (req, res) => {
  res.json(
    Mock.mock({
      status: 200,
      loginData
    })
  )
})
app.listen("8090", () => {
  console.log("监听端口 8090")
})
