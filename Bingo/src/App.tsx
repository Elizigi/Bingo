import { useState } from 'react'
import './App.css'
import { BingoModel } from './model/bingoModel'
import  BingoCube  from './components/bingoCube/BingoCube'

function App() {
  const [bingoMap, SetBingoMap] = useState(BingoModel)

 function changeWord(index:number,newWord:string)
  {
  const updatedBingoMap = bingoMap.map((word, idx) => {
    if (idx === index) {
      return newWord;
    }
    return word;
  });

  SetBingoMap(updatedBingoMap);
  }

  return (
    <div className='bingoContainer'>
    {bingoMap.map((cube,idx)=>(
      <BingoCube changeWord={(newWord) => changeWord(idx, newWord)} key={idx} word={cube}  />
    ))}
    </div>
  )
}

export default App
