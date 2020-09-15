import React, { useState, useEffect } from "react";
import { split as SplitEditor } from "react-ace";
import AceEditor from "react-ace";
import io from "socket.io-client";
import InputRoom from "./InputRoom";

// importing all mode which are lanuages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-coffee";

// importing all themes for the editor
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-clouds_midnight";

const socket = io("http://localhost:3000");

function Editor() {
  const [code, setCode] = useState("Hello");
  const [room, setRoom] = useState("");
  const [mode, setMode] = useState("javascript");
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("monokai");

  const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "eclipse",
    "twilight",
    "xcode",
    "solarized_dark",
    "solarized_light",
    "terminal",
    "clouds_midnight",
  ];

  const modes = [
    "javascript",
    "java",
    "python",
    "sass",
    "html",
    "css",
    "coffee",
  ];

  const fontSizes = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const handleChange = (text) => {
    setCode(text);
    console.log(code);
  };

  //console.log(window.location.pathname);

  return (
    <div>
      <div>
        <InputRoom />
        <AceEditor
          theme={theme}
          value={code}
          mode={mode}
          fontSize={fontSize}
          onChange={handleChange}
        />
      </div>
      <div>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          {themes.map((themeOption, idx) => (
            <option key={idx.toString()} value={themeOption}>
              {themeOption}
            </option>
          ))}
        </select>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          {modes.map((modeOption, idx) => (
            <option key={idx.toString()} value={modeOption}>
              {modeOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Editor;
