import React, { useState, useEffect } from 'react'
import './App.css';
import Button from './components/button/Button'
import Input from './components/input/Input'
import Checkbox from './components/checkbox/Checkbox'
import Word from './components/word/Word'
import { getData } from './service/service'

function App() {
  const [dataWords, setDataWords] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [filterValue, setFilterValue] = useState([])
  const [isRegister, setCheckbox] = useState(false)

  useEffect(() => {
    (async () => {
      const data = await getData()
      setDataWords(data)
    })()
  }, [])

  const onChange = value => {
    setInputValue(value)
  }

  const onChangeCheckbox = value => {
    setCheckbox(value)
  }

  const getEmptyResult = arr => {
    if (arr.length === 0) {
      return arr.push('no matches')
    }
    return
  }

  const filterNumber = () => {
    const number = +inputValue
    if (!number || number < 0) {
      alert('Please enter a number greater than zero')
      setInputValue('')
      setFilterValue([])
      return
    }

    const wordsArr = dataWords.filter(word => {
      return word.length > number
    })
    getEmptyResult(wordsArr)
    setFilterValue(wordsArr)
  }

  const filterSubstring = () => {
    const wordsLowerCase = dataWords.map(item => item.toLocaleLowerCase())
    const valueInputLowerCase = inputValue.trim().toLocaleLowerCase()
    let newDataWords

    if (!inputValue) {
      alert('Enter the string')
      return
    }

    if (!isRegister) {
      newDataWords = wordsLowerCase.filter(item => {
        return item.includes(valueInputLowerCase)
      })
    } else {
      newDataWords = dataWords.filter(item => {
        return item.includes(inputValue.trim())
      })
    }

    getEmptyResult(newDataWords)
    setFilterValue(newDataWords)
  }

  return (
    <div className='app-wrapper'>
      <div className='wrapper'>
        <Input inputValue={inputValue} onChange={value => onChange(value)} />
        <Button onChange={filterNumber} title={'filter number'} />
        <Button onChange={filterSubstring} title={'filter substring'} />
        <Checkbox title={'case sensitivity'} onChangeCheckbox={value => onChangeCheckbox(value)} />
      </div>
      <div className='content'>
        {
          filterValue.map((item, index, arr) => {
            if (arr.length === 1) {
              return <h1 key={filterValue.length - index}>{item}</h1>
            }
            return <Word key={filterValue.length - index} word={item} index={index} />
          })
        }
      </div>
    </div>
  );
}

export default App;
