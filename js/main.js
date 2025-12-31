
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
emailjs.init("YOUR_PUBLIC_KEY");

let mediaRecorder;
let audioBlob;

const startBtn = document.getElementById("start-record");
const stopBtn = document.getElementById("stop-record");
const sendBtn = document.getElementById("send-voice");
const audioPreview = document.getElementById("audio-preview");
const statusText = document.getElementById("voice-status");

startBtn.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  const chunks = [];

  mediaRecorder.ondataavailable = e => chunks.push(e.data);
  mediaRecorder.onstop = () => {
    audioBlob = new Blob(chunks, { type: "audio/wav" });
    audioPreview.src = URL.createObjectURL(audioBlob);
    audioPreview.style.display = "block";
    sendBtn.disabled = false;
  };

  mediaRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

sendBtn.onclick = () => {
  const reader = new FileReader();
  reader.readAsDataURL(audioBlob);

  reader.onloadend = () => {
    emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      {
        name: document.getElementById("voice-name").value || "Website Visitor",
        message: reader.result
      }
    ).then(() => {
      statusText.innerText = "✅ Voice message sent successfully!";
      sendBtn.disabled = true;
    }).catch(() => {
      statusText.innerText = "❌ Failed to send. Try again.";
    });
  };
};



