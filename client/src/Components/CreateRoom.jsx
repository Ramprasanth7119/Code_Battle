import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const GameRoom = () => {
  const [room, setRoom] = useState("");
  const [code, setCode] = useState("# Write your Python code here\n");
  const [testCases, setTestCases] = useState({ input: "" });
  const [myResult, setMyResult] = useState(null);
  const [opponentResult, setOpponentResult] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const [users, setUsers] = useState([]);
  const [joinedRoomName, setJoinedRoomName] = useState("");


  useEffect(() => {
    socket.on("codeResult", (data) => {
      setIsCompiling(false);
      if (data.player === socket.id) {
        setMyResult(data.result);
      } else {
        setOpponentResult(data.result);
      }
    });

    return () => {
      socket.off("codeResult");
    };
  }, []);

  useEffect(() => {
    socket.on("joinedRoom", (room) => {
      setJoinedRoomName(room);
    });
  
    socket.on("leftRoom", (room) => {
      setJoinedRoomName("");
      setUsers([]);
    });
  
    socket.on("roomUsers", (userList) => {
      setUsers(userList);
    });
  
    socket.on("codeResult", (data) => {
      setIsCompiling(false);
      if (data.player === socket.id) {
        setMyResult(data.result);
      } else {
        setOpponentResult(data.result);
      }
    });
  
    return () => {
      socket.off("joinedRoom");
      socket.off("leftRoom");
      socket.off("roomUsers");
      socket.off("codeResult");
    };
  }, []);

  


  const joinRoom = () => {
    if (room) {
      socket.emit("joinRoom", room);
    }
  };

  const submitCode = () => {
    setIsCompiling(true);
    setMyResult(null);
    socket.emit("submitCode", {
      room,
      code,
      language_id: 71, // Python 3
      test_cases: testCases
    });
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setRoom("");
    setMyResult(null);
    setOpponentResult(null);
  };
  

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>🔥 Real-Time Code Battle</h1>

      <div>
        <input
          type="text"
          placeholder="Enter Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>

      {joinedRoomName && (
  <div style={{ marginTop: "10px" }}>
    <p>✅ Joined room: <strong>{joinedRoomName}</strong></p>
    <button onClick={leaveRoom}>🚪 Leave Room</button>

    <h4>🧑‍🤝‍🧑 Users in Room:</h4>
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user === socket.id ? "👉 You" : user}
        </li>
      ))}
    </ul>
  </div>
)}


      <div style={{ marginTop: "15px" }}>
        <textarea
          rows="12"
          cols="60"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here"
        ></textarea>
      </div>

      <div>
        <input
          type="text"
          placeholder="Input for test cases"
          value={testCases.input}
          onChange={(e) =>
            setTestCases({ ...testCases, input: e.target.value })
          }
        />
        <button onClick={submitCode} disabled={!room || isCompiling}>
          {isCompiling ? "Running..." : "Submit Code"}
        </button>
      </div>

      {isCompiling && <p>⏳ Compiling your code...</p>}

      {myResult && (
        <div style={{ marginTop: "20px" }}>
          <h3>🧠 Your Result:</h3>
          <p><strong>Output:</strong> {myResult.stdout || "N/A"}</p>
          {myResult.stderr && (
            <p style={{ color: "red" }}>
              <strong>Error:</strong> {myResult.stderr}
            </p>
          )}
        </div>
      )}

      {opponentResult && (
        <div style={{ marginTop: "20px" }}>
          <h3>👾 Opponent's Result:</h3>
          <p><strong>Output:</strong> {opponentResult.stdout || "N/A"}</p>
          {opponentResult.stderr && (
            <p style={{ color: "red" }}>
              <strong>Error:</strong> {opponentResult.stderr}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GameRoom;
