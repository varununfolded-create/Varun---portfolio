
// Scroll animation
const obs = new IntersectionObserver(entries=>{
 entries.forEach(e=>e.isIntersecting && e.target.classList.add("show"))
},{threshold:0.15});
document.querySelectorAll(".card").forEach(c=>obs.observe(c));

// Dark / Light toggle
document.getElementById("toggle").onclick=()=>{
 document.body.classList.toggle("light");
};
document.addEventListener("DOMContentLoaded", () => {
  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatbotBox = document.getElementById("chatbot-box");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatInput = document.getElementById("chatbot-input");
  const chatMessages = document.getElementById("chatbot-messages");

  if (!chatbotIcon || !chatbotBox) {
    console.error("Chatbot elements not found");
    return;
  }

  chatbotIcon.addEventListener("click", () => {
    chatbotBox.style.display = "flex";
  });

  chatbotClose.addEventListener("click", () => {
    chatbotBox.style.display = "none";
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const userMsg = chatInput.value;
      addMsg(userMsg, "user-msg");
      reply(userMsg.toLowerCase());
      chatInput.value = "";
    }
  });

  function addMsg(text, cls) {
    const div = document.createElement("div");
    div.className = cls;
    div.innerText = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function reply(msg) {
    let res = "Sorry, I didn’t understand.";

    if (msg.includes("skill"))
      res = "Varun works with Python, Machine Learning, and Web Development.";

    else if (msg.includes("project"))
      res = "Projects include OCR System and Terrorist Attack Prediction.";

    else if (msg.includes("resume"))
      res = "Use the Download Resume button on the home page.";

    else if (msg.includes("hi") || msg.includes("hello"))
      res = "Hello 👋 How can I help you?";

    setTimeout(() => addMsg(res, "bot-msg"), 400);
  }
});
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
});


