import React, { useState, useEffect } from "react";

function InputRoom(props) {
  return (
    <div>
      <div className="inputRoomField">
        <label for="room">Room:</label>
        <input
          name="room"
          id="room"
          onChange={(e) =>
            props.roomChangeHandler(e.target.name, e.target.value)
          }
          value={props.room}
        />
        <button className="button">Join Room</button>
      </div>
    </div>
  );
}

export default InputRoom;
