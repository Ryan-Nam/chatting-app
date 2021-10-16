const express = require("express");
const app = express();
const path = require("path");

//console.log(__dirname)
// __dirname -> project folder path
// .join -> \ (back slash) (because depends on OS, \ is different)

//서버가 실행되면 실행될 파일 지정
app.use(express.static(path.join(__dirname, "src")));

// 서버 실행을 위해 port 필요
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running ${PORT}`))