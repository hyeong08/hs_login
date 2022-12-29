const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(express.json())

const users = [
    {name: "김형섭", id: "hyeongsup", password: "1234"},
    {name: "주민석", id: "minseok", password: "asdf"},
    {name: "이설인", id: "seolin", password: "qwer"},
    {name: "유희선", id: "heesun", password: "zxcv"},
    {name: "한동주", id: "dongjoo", password: "tyui"},
]

app.get('/login', (req,res) => {
    const id = req.query.id
    const password = req.query.password
    const user = users.find(user => user.id === id)
    console.log(user)

    if (!user) {
        return res.send("아이디를 찾지 못하였습니다")
    }

    if (user.password !== password) {
        return res.send("비밀번호를 확인해주세요")
    }

    res.cookie('user-id', user.id)
    res.send("로그인")
})

app.get('/logout', (req,res) => {

    res.clearCookie("user-id")
    res.send("로그아웃")
})

app.get('/register', (req,res) =>{
    const id = req.query.id
    const password = req.query.password
    const name = req.query.name

    const user = users.find(user => user.id === id)
    if (user) {
        return res.send("중복아이디입니다")
    }

    users.push({id, password, name})
    console.log(users)
    res.send("회원가입")
})

app.get('/users', (req,res) => {
    const id = req.cookies["user-id"]
    if (!id) {
        return res.send("로그인부터 해주세요")        
    }
    const user = users.find(user => user.id === id)
    if (!user) {
        return res.send("회원 정보가 잘못되었습니다")
    }
    res.send(user)
})

app.listen(3000, () => {
    console.log("서버 실행")
})