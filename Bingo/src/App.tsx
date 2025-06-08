import { useEffect, useState } from "react";
import "./App.css";
import { BingoModel } from "./model/bingoModel";
import BingoCube from "./components/bingoCube/BingoCube";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [bingoMap, setBingoMap] = useState(BingoModel);

  function changeWord(index: number, newWord: string) {
    const updatedBingoMap = bingoMap.map((word, idx) => {
      if (idx === index) {
        return newWord;
      }
      return word;
    });

    setBingoMap(updatedBingoMap);
  }

  function scramble() {
    const centerIndex = 12;
    const centerWord = bingoMap[centerIndex];

    const others = bingoMap.filter((_, idx) => idx !== centerIndex);

    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [others[i], others[j]] = [others[j], others[i]];
    }

    const scrambled = [
      ...others.slice(0, centerIndex),
      centerWord,
      ...others.slice(centerIndex),
    ];

    setBingoMap(scrambled);
  }

  useEffect(() => {
    console.log("Updated bingoMap:", bingoMap);
  }, [bingoMap]);

  return (
    <div className="cardContainer">
      <h1 className="title">B I N G O</h1>

      <div className="bingoContainer">
        {bingoMap.map((cube, idx) => (
          <BingoCube
            changeWord={(newWord) => changeWord(idx, newWord)}
            key={idx}
            word={cube}
          />
        ))}
      </div>
      <div className="centered">
        <button className="btn-scramble btn" onClick={scramble}>Scramble</button>

        <button className="btn-download btn" onClick={downloadPDF}>Download as PDF</button>
      </div>
    </div>
  );
}

async function downloadPDF() {
  try {
    const cardElement = document.querySelector(".cardContainer") as HTMLElement;

    if (!cardElement) {
      console.error("Bingo card container not found");
      return;
    }

    const canvas = await html2canvas(cardElement, {
      scale: 0.5,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });

    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", -1, 0, 11, 9);
    pdf.save("bingo-card.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
export default App;
