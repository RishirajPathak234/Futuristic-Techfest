const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const botResponses = {
  greeting: [
    "Hello! Welcome to TechFest 2025. How can I assist you today?",
    "Hi there! I'm your TechFest virtual assistant. What information do you need?",
  ],
  schedule:
    "Futuristic Tech Fest 2025 runs from May 15-18. We have keynotes at 10 AM each day, workshops from 1-5 PM, and demo showcases in the evenings from 7-9 PM.",
  location:
    "Futuristic Tech Fest 2025 is being held at the Innovation Convention Center, 2025 Future Avenue, Techville.",
  speakers:
    "Our keynote speakers include Dr. Eliza Quantum (AI Ethics), Ray Chen (Quantum Computing), Maria Rodriguez (Biotech Innovation), and Alex Novak (Sustainable Technology).",
  tickets:
    "Tickets are available on our website. Early bird pricing ends April 1st. Regular tickets are 499/-, VIP passes are 1200/-, and student tickets are 299/- with valid ID.",
  workshops:
    "We have workshops on AI Development, Quantum Programming, Biotech Ethics, AR/VR Design, and Sustainable Engineering. All workshops require pre-registration.",
  default:
    "I don't have information about that yet. Please check our website or ask me about schedule, location, speakers, tickets, or workshops.",
};

const patterns = {
  greeting: /\b(hi|hello|hey|greetings|howdy|how|are|you)\b/i,
  schedule: /\b(schedule|timing|when|dates|hours|program|agenda)\b/i,
  location: /\b(where|location|place|venue|address|directions)\b/i,
  speakers: /\b(speaker|keynote|presenter|talk|speaking|who|experts)\b/i,
  tickets: /\b(ticket|pass|admission|cost|price|fee|how much)\b/i,
  workshops: /\b(workshop|session|class|training|learn|hands-on)\b/i,
};

function detectIntent(message) {
  for (const [intent, pattern] of Object.entries(patterns)) {
    if (pattern.test(message)) {
      return intent;
    }
  }
  return "default";
}

function addMessage(message, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(isUser ? "user-message" : "bot-message");
  messageDiv.innerText = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("typing-indicator");
  typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
  typingDiv.id = "typing-indicator";
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function processUserInput() {
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, true);
  userInput.value = "";

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();

    const intent = detectIntent(message);
    let response;

    if (intent === "greeting") {
      response =
        botResponses.greeting[
          Math.floor(Math.random() * botResponses.greeting.length)
        ];
    } else {
      response = botResponses[intent];
    }

    addMessage(response);

    if (intent === "tickets" || intent === "workshops") {
      showNotification(
        `${
          intent.charAt(0).toUpperCase() + intent.slice(1)
        } information updated!`
      );
    }
  }, 1000 + Math.random() * 1000);
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerText = message;
  document.querySelector(".container").appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

sendBtn.addEventListener("click", processUserInput);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    processUserInput();
  }
});

setTimeout(() => {
  addMessage(
    "Hello! I'm your TechFest 2025 virtual assistant. How can I help you today?"
  );
  showNotification("Assistant is ready!");
}, 500);
