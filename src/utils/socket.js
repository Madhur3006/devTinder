const socket = require("socket.io");

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

    socket.on("sendMessage", ({firstName, fromUserId, toUserId, text}) => {
      const roomId = [fromUserId, toUserId].sort().join("_"); 
      io.to(roomId).emit("messageReceived", {firstName, text});
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
