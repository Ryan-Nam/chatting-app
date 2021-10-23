"use strict"
const socket = io();


//DOM
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

// Event 
sendButton.addEventListener("click", ()=>{
  // make it as object
  const param = {
    name: nickname.value,
    msg: chatInput.value
  }
  socket.emit("chatting", param);
})



socket.on("chatting", (data)=>{
  // const li = document.createElement("li");
  // li.innerText = `${data.name} - ${data.msg}`;
  // chatList.appendChild(li);
  // console.log(data);

  // 초기화
  const {name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();
})

// console.log(socket);

function LiModel(name, msg, time){
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = ()=> {
    const li = document.createElement("li");
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img class="image" src="https://placeimg.com/50/50/any" alt="any">
  </span>
  <span class="message">${this.msg}</span>
          <span class="time">${this.time}</span>`;
          li.innerHTML = dom;
          chatList.appendChild(li);
  }

}