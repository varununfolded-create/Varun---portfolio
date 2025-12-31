
// Scroll animation
const obs = new IntersectionObserver(entries=>{
 entries.forEach(e=>e.isIntersecting && e.target.classList.add("show"))
},{threshold:0.15});
document.querySelectorAll(".card").forEach(c=>obs.observe(c));

// Dark / Light toggle
document.getElementById("toggle").onclick=()=>{
 document.body.classList.toggle("light");
};
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotClose = document.getElementById("chatbot-close");
const chatInput = document.getElementById("chatbot-input");
const chatMessages = document.getElementById("chatbot-messages");

chatbotIcon.onclick = () => {
  chatbotBox.style.display = "flex";
};

chatbotClose.onclick = () => {
  chatbotBox.style.display = "none";
};

chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    const userText = chatInput.value;
    addMessage(userText, "user-msg");
    respond(userText.toLowerCase());
    chatInput.value = "";
  }
});

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = className;
  div.innerText = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function respond(msg) {
  let reply = "Sorry, I didn't get that.";

  if (msg.includes("skill"))
    reply = "Varun works with Python, Machine Learning, and Web Development.";

  else if (msg.includes("project"))
    reply = "Projects include OCR System and Terrorist Attack Prediction.";

  else if (msg.includes("resume"))
    reply = "Click the Download Resume button on the home page.";

  else if (msg.includes("contact"))
    reply = "You can contact Varun via LinkedIn or email from the Contact section.";

  else if (msg.includes("hello") || msg.includes("hi"))
    reply = "Hello 👋 How can I help you today?";

  setTimeout(() => addMessage(reply, "bot-msg"), 500);
}

