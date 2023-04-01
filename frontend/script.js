const ws = new WebSocket("ws://localhost:8080")
const body = document.querySelector("body")
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const phrases = [
    "new tab",
    "color change"
]

const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${phrases.join(" | ")} ;`;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.addEventListener("result", (event) => {
    let speechResult = event.results[0][0].transcript.toLowerCase();
    console.log(speechResult)
    if(speechResult === "new tab"){
        console.log("new tab")
        ws.send("new tab")
    }
})

recognition.addEventListener("end", () => {

    recognition.start()

})

ws.addEventListener("open", () => {
    const h1 = document.createElement("h1")
    h1.innerHTML = "opened..."
    body.appendChild(h1)
})

recognition.start();