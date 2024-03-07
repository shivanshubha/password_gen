// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [length, setLength] = useState(4);
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef(null);

  const genertorPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }

    if (character) {
      str += "!@#$%^&*+=-_`";
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, character, number, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useeffect

  useEffect(() => {
    genertorPassword();
  }, [length, character, number, genertorPassword]);

  return (
    <>
      <h2 className="heading">Generate Random Password</h2>
      <div className="conatiner">
        <div className="container-child">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="password"
            ref={passwordRef}
          />
        </div>
        <div className="copy">
          <h2 onClick={copyPasswordToClipboard()}>copy</h2>
        </div>
      </div>

      <div className="length">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
      </div>
      <div className="length-heading">
        <label>Length:{length}</label>
      </div>

      <div className="length1">
        <input
          className="bignow"
          type="checkbox"
          defaultChecked={number}
          onChange={() => {
            setNumber((prev) => !prev);
          }}
        />
        &nbsp;
        <label> Number</label>
      </div>

      <div className="length1">
        <input
          type="checkbox"
          defaultChecked={character}
          onChange={() => {
            setCharacter((prev) => !prev);
          }}
        />

        <label> &nbsp;Characters</label>
      </div>
    </>
  );
};

export default App;
