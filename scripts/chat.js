document.addEventListener("click", (e) => {
  if (e.target.id === "chatToggle") {
    document.getElementById("chat-box").classList.toggle("hidden");
  }
  if (e.target.id === "closeChat") {
    document.getElementById("chat-box").classList.add("hidden");
  }
});

document.getElementById("chatForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if (!msg) return;

  const chatMessages = document.getElementById("chatMessages");
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = msg;
  chatMessages.appendChild(bubble);
  input.value = "";
});
