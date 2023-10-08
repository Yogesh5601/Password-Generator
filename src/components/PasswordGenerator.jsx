import React, { useState } from "react";
import { upperCaseletters, lowerCaseletters, numbers, special,mix } from "./data";
import "./passwordGenerator.css";
import Modal from "./Modal";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(12);
  const [isUppercase, setUppercase] = useState(false);
  const [isLowercase, setLowercase] = useState(false);
  const [isNumbers, setNumbers] = useState(false);
  const [isSymbols, setSymbols] = useState(false);
   const [isMix, setMix] = useState(true);
  const [modal, setModal] = useState({
    title: "",
    show: "",
    message: "",
  });

  const increaseCounter = (event) => {
    event.preventDefault();
    if (counter < 20) {
      setCounter((prevcounter) => prevcounter + 1);
    }
  };

  const decreaseCounter = (event) => {
    event.preventDefault();
    if (counter > 8) {
      setCounter((prevcounter) => prevcounter - 1);
    }
  };

  const generatePassword = (event) => {
    event.preventDefault();
    let _password = "";
    for (let i = 0; i < counter; i++) {
      _password += getRamdom();
    }
    setPassword(_password);
  };

  const getRamdom = () => {
    const chars = [];
    if (isUppercase) {
      chars.push(
        upperCaseletters[Math.floor(Math.random() * upperCaseletters.length)]
      );
    }
    if (isLowercase) {
      chars.push(
        lowerCaseletters[Math.floor(Math.random() * lowerCaseletters.length)]
      );
    }
    if (isSymbols) {
      chars.push(special[Math.floor(Math.random() * special.length)]);
    }
    if (isNumbers) {
      chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
     if (isMix) {
       chars.push(mix[Math.floor(Math.random() * mix.length)]);
     }
    if (chars.length === 0) return;
    return chars[Math.floor(Math.random() * chars.length)];
  };
  const createCopy = () => {
    const textAreaEl = document.createElement("textarea");
    textAreaEl.innerText = password;
    document.body.appendChild(textAreaEl);
    textAreaEl.select();
    document.execCommand("copy");
    textAreaEl.remove();
  };

  const copyPasswordHandler = (e) => {
    e.preventDefault();
    if (password.trim().length === 0) {
      setModal({
        title: "Error",
        msg: "nothing to copy",
        show: true,
      });
    } else {
      setModal({
        title: "Success",
        msg: "Password copied successfully",
        password: { password },
        show: true,
      });
    }
    createCopy();
  };

  const closeModalHandler = () => {
    setModal({ ...modal, show: false });
  };
  return (
    <>
      {modal.show && (
        <Modal
          onClose={closeModalHandler}
          title={modal.title}
          msg={modal.msg}
          password={password}
        />
      )}
      <div className="container">
      
        <div className="password_generator">
          <div className="generator">
            <h2 className="generator_title">Password Generator</h2>
            <h4 className="generator_password">{password}</h4>
          </div>
          <form action="" className="generator_form">
            <div className="genetator_form.controls">
              <div className="genetator_checkbox">
                <label htmlFor="Uppercase">Uppercase</label>
                <input
                  onChange={(e) => setUppercase(e.target.checked)}
                  checked={isUppercase}
                  type="checkbox"
                  id="Uppercase"
                  name="Uppercase"
                />
              </div>
              <div className="genetator_checkbox">
                <label htmlFor="Lowercase">Lowercase</label>
                <input
                  onChange={(e) => setLowercase(e.target.checked)}
                  checked={isLowercase}
                  type="checkbox"
                  id="Lowercase"
                  name="Lowercase"
                />
              </div>
              <div className="genetator_checkbox">
                <label htmlFor="Symbols">Symbols</label>
                <input
                  onChange={(e) => setSymbols(e.target.checked)}
                  checked={isSymbols}
                  type="checkbox"
                  id="Symbols"
                  name="Symbols"
                />
              </div>
              <div className="genetator_checkbox">
                <label htmlFor="Numbers">Numbers</label>
                <input
                  onChange={(e) => setNumbers(e.target.checked)}
                  checked={isNumbers}
                  type="checkbox"
                  id="Numbers"
                  name="Numbers"
                />
              </div>
              <div className="genetator_checkbox">
                <label htmlFor="Mix">Mix</label>
                <input
                  onChange={(e) => setMix(e.target.checked)}
                  checked={isMix}
                  type="checkbox"
                  id="Mix"
                  name="Mix"
                />
              </div>
              <div className="generator_length">
                <h4 className="generator_length_title">Password Length</h4>
                <div className="generator_length_counter">
                  <button onClick={decreaseCounter}>-</button>
                  <span>{counter}</span>
                  <button onClick={increaseCounter}>+</button>
                </div>
              </div>
              <div className="generator_form_action">
                <button className="generate-btn" onClick={generatePassword}>
                  Generate Password
                </button>
                <button onClick={copyPasswordHandler} className="copy-btn">
                  Copy Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;
