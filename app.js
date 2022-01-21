const Pusher = require("pusher");
const express = require("express");
require('dotenv/config')


const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: process.env.ENCRYPTED,
});

const app = express();

app.get("/testEventBroadcastTrigger", (req, res) => {
  //use channel name and event name (of your choice)
  //everytime this api is called pusher will broadcast an event
  //the client on the other side will be listening
  //use unique username to broadcast to specific channel
  pusher.trigger("moses-channel" + "-username", "moses-event", {
    message: "Broadcasting an event"
  });
  res.send("Event broadcasted successfuly")
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
