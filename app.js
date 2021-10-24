const express = require("express");
const http = require("http")
const app = express();
const path = require("path");
// express 로 구현한 app을 담아서, express 가 https 를 담아서 실행
const server = http.createServer(app);

// For time
const momnet = require("moment");


const socketIO = require("socket.io")
const io = socketIO(server);

//console.log(__dirname)
// __dirname -> project folder path
// .join -> \ (back slash) (because depends on OS, \ is different)

//서버가 실행되면 실행될 파일 지정
app.use(express.static(path.join(__dirname, "src")));


io.on("connection", (socket) => {
  // console.log("Connection is success")
  socket.on("chatting", (data)=> {
    const {name, msg} = data;
    io.emit("chatting", {
      name,
      msg,
      time: momnet(new Date()).format("h:ss A")
    })
  })
  
  })

//     // from front
//     const {} = data;

//     console.log(data);
//     // server - just send 
//     io.emit("chatting", data)
//   })
// })

// 서버 실행을 위해 port 필요
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server is running ${PORT}`))