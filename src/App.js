import React, { useState, useEffect } from 'react'
import './App.css';
import Button from './components/Button'
import Input from './components/Input'
import Checkbox from './components/Checkbox'
import { data } from './constans/label'
import Word from './components/Word'

function App() {

  const [dataWords, setDataWords] = useState(data)
  const [inputValue, setInputValue] = useState('')
  const [filterValue, setFilterValue] = useState([])
  const [isRegister, setCheckbox] = useState(false)

  // useEffect(() => {
  //   // fetch('https://www.mrsoft.by/data.json')
  //   //   .then(result => {
  //   //     debugger
  //   //     return result.json()
  //   //   })
  //   // .then((data) => {
  //   //   console.log('xyi ', data)
  //   // })
  //   // .then(result => console.log(result))
  //   // // .then(response => setResponse(response))
  //   // .catch(err => alert(err))

  // }, [])



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
    if (!number) {
      alert('Enter the number')
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
              return <h1 >{item}</h1>
            }
            return <Word key={filterValue.length - index} word={item} index={index} />
          })
        }
      </div>
    </div>
  );
}

export default App;
