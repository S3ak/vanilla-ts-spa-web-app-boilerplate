import socket from "../../services/ws/ws";

const USER_MESSAGE_FIELD_NAME = "js-user-message-field";

const chatForm = window.document.getElementById(
  "js-chat-form"
) as HTMLFormElement | null;

if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(chatForm);
    const currentMessage = formData.get(USER_MESSAGE_FIELD_NAME);

    if (typeof currentMessage === "string") {
      socket.emit("chat message", currentMessage);
    }

    chatForm.reset();
  });
}

export function renderMessage(message: string) {
  const messageContainerEl = document.getElementById("js-messages");
  if (!messageContainerEl) return;

  // Create a new message div
  const messageEl = document.createElement("div");
  messageEl.className = "chat-message";
  messageEl.textContent = message;

  // Append the message to the container
  messageContainerEl.appendChild(messageEl);

  messageContainerEl.scrollTop = messageContainerEl.scrollHeight;
}
