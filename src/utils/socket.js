const socket = require("socket.io");
const Chat = require("../models/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //Handle events

    socket.on("joinChat", ({ fromUserId, toUserId }) => {
      const roomId = [fromUserId, toUserId].sort().join("_"); // unique ID for each chat/room
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, fromUserId, toUserId, text }) => {
        //save message to the data base

        try {
          const roomId = [fromUserId, toUserId].sort().join("_");
          let chat = await Chat.findOne({
            participants: { $all: [fromUserId, toUserId] }, // to find a chat between two users
          });

          if (!chat) {
            chat = new Chat({
              // if new chat then intialize new chat
              participants: [fromUserId, toUserId],
              messages: [],
            });
          }

          chat.messages.push({
            // if already chat exists then push messages
            senderId: fromUserId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("messageReceived", { firstName, text });
        } catch (error) {
          console.log(error.message);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
