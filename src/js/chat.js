"use strict"
const socket = io();


//DOM
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

const displayContainer = document.querySelector(".display-container")

chatInput.addEventListener("keypress", (event)=> {
  if (event.keycode === 13){
    send()
  }
})

function sned(){
  const param = {
    name: nickname.value,
    msg: chatInput.value
  }
  socket.emit("chatting", param);
}

// Event 
sendButton.addEventListener("click", send)



socket.on("chatting", (data)=>{
  // const li = document.createElement("li");
  // li.innerText = `${data.name} - ${data.msg}`;
  // chatList.appendChild(li);
  console.log(data);

  // 초기화
  const {name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();

  displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

// console.log(socket);

function LiModel(name, msg, time){
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = ()=> {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent": "received")
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