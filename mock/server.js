// 1.引入express
let express = require("express")
// 2.引入mockjs的数据
const Mock = require("mockjs")
// 3.引入login返回的data数据
const loginData = require("./common/login.json")
const bmData = require("./common/bm.json")
// 4.实例化express
const app = express()

// 5.编写接口，添加返回值
app.use("/sys/login", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      status: 200,
      msg: "登录成功了嘛",
      loginData
      // data: loginData
    })
  )
})
app.use("/sys/bm", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      // status:200,
      // msg:"登录成功",
      // loginData
      data: bmData
    })
  )
})

app.listen("8090", () => {
  console.log("监听端口", "8090")
})
