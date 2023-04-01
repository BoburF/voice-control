const WsServer = require("ws")
const {keyboard, Key} = require("@nut-tree/nut-js")

const wss = new WsServer.Server({port: 8080})
wss.on("connection", (ws) => {
    console.log("connection started...")
    ws.on("message", async (message) => {
        const command = message.toString()
        if(command === "new tab"){
            console.log(command)
            await keyboard.pressKey(Key.LeftControl, Key.T)
            await keyboard.releaseKey(Key.LeftControl, Key.T)
        }
    })
})