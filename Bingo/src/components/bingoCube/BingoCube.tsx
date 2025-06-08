import React, { useEffect, useState, type FC } from "react";
import styles from "./bingoCubeStyle.module.scss";

interface BingoCubeProps {
  word: string;
  changeWord: (newWord: string) => void;
}

const BingoCube: FC<BingoCubeProps> = ({ word, changeWord }) => {
  const [text, setText] = useState(word); 

  const [isEdit, setIsEdit] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newText = e.currentTarget.innerText.trim();
    setIsEdit(false);

    if (newText === "") return;

    setText(newText);

    changeWord(newText);
  };
useEffect(() => {
  setText(word);
}, [word]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newText = e.currentTarget.value;
    if (newText === "") return setText("-");
    setText(newText);
    changeWord(newText);
  }

  return (
    <div className={styles.bingoCube}>
      {isEdit ? (
        <input
        className={styles.inputText}
          type="text"
          value={text}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
        />
      ) : (
        <button className={styles.btnText} onClick={() => setIsEdit(true)}>
          {text}
        </button>
      )}
    </div>
  );
};

export default BingoCube;
