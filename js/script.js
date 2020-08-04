let msgerImage = [];


let counter = -1;

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :(",
];

// Icons made by Freepik from www.flaticon.com
const BOT_NAME = "Victor";
const PERSON_NAME = "Sajjad";

function ExecuteForm(event) {
  event.preventDefault();
  const msgText = msgerInput.value;

  appendMessage(PERSON_NAME, "right", msgText);
  msgerInput.value = "";

  botResponse();
}

msgerForm.addEventListener("submit", ExecuteForm);

document.getElementById("btnSubmit").addEventListener('click', ExecuteForm);

function checkImageExists() {
  if (msgerImage) return `<img src='${msgerImage[counter]}'/>`;
  return '';
}

function GenrateModal() {
  return `
     <div id="modalselect" class="modal">
      <div class="modal-content">
      <img src='${msgerImage[counter]}'/>
      </div>
    </div>
  `;

}


function HandleModal() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {
    opacity: .3
  });
  console.log(instances);
}

function appendMessage(name, side, text) {
  //   Simple solution for small apps
  counter += 1;
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-bubble">
      ${checkImageExists()}
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
         <div class="detail-handler">
         <div class="msg-info-time">
         ${formatDate(new Date())}
         </div>
         ${checkImageExists() && "<a onclick={HandleModal()} class='modal-trigger mymodal id='modal-container' href='#modalselect'><img class='imageicon' src='./assets/images/picture.png'/></a>"}
         ${GenrateModal()}
         </div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  document.querySelector(".selectedImage").classList.add('d-none');

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;
  counter--;

  setTimeout(() => {
    appendMessage(BOT_NAME, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Buttons Event
const leftProfileBtn = document.getElementById("left_profile");
const sidebarLeftExit = document.querySelector(".sidebar_left_exit");
const leftProfile = document.getElementById("section1");
const rightProfile = document.getElementById("section3");
const sidebarRightExit = document.querySelector(".sidebar_right_exit");
const rightProfileBtn = document.getElementById("right_profile");
leftProfileBtn.addEventListener("click", () => {
  leftProfile.classList.remove("sidebar_left_down");
  leftProfile.classList.add("sidebar_show");
});

sidebarLeftExit.addEventListener("click", () => {
  leftProfile.classList.remove("sidebar_show");
  leftProfile.classList.add("sidebar_left_down");
});

rightProfileBtn.addEventListener("click", () => {
  rightProfile.classList.remove("sidebar_right_down");
  rightProfile.classList.add("sidebar_show");
});

sidebarRightExit.addEventListener("click", () => {
  rightProfile.classList.remove("sidebar_show");
  rightProfile.classList.add("sidebar_right_down");
});



const attach = document.getElementById('attach')
const imageBox = document.querySelector('.image_box');
attach.addEventListener('click', () => {
  imageBox.classList.toggle("showBox")
})


function selectImageHandler(event) {
  msgerImage.push(event.srcElement.src);
  document.querySelector(".selectedImage").classList.remove('d-none');
  document.getElementById("selectedImage").setAttribute("src", msgerImage[counter + 1]);
  document.getElementById("attach").click();
}