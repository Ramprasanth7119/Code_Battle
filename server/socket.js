module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
  
      socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
      });
  
      socket.on("code_change", ({ roomId, code }) => {
        socket.to(roomId).emit("receive_code", code);
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  };
  