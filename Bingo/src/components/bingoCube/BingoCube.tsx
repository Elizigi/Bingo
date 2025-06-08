import {  type FC } from "react";
import styles from "./bingoCubeStyle.module.scss";
import { array } from "../../model/bingoModel";

interface BingoCubeProps {
  word: string;
  changeWord:(newWord:string)=>void;
}

const BingoCube: FC<BingoCubeProps> = ({ word,changeWord }) => {
  const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
   changeWord(e.currentTarget.innerText)
  };
  console.log(array)
  return (
    <div className={styles.bingoCube}>
      <h1
        className={styles.innerText}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
      >
        {word}
      </h1>
    </div>
  );
};

export default BingoCube;
