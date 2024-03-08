import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [buttonText, setButtonText]=useState('Copy')

  const passwordRef = useRef(null);

  //function to generate password
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "~!@#$%^&*()_{}"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass);

  }, [length, numberAllowed, characterAllowed, setPassword])

  //whenever any change occur it will redirect it.
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])


  //copy function
  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 24)
    window.navigator.clipboard.writeText(password)
    setButtonText('Copied!')
  }, [password])

  return (
    <div className=''>
      <div className='w-full max-w-screen-md mx-auto shadow-md rounded-lg px-10 py-20 my-40 text-slate-200 bg-zinc-950'>
        <h1 className='text-center mt-0 my-6 font-semibold text-3xl text-blue-200'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input type="text"
            value={password}
            placeholder='password'
            className="input input-bordered input-info w-full max-w-xl"
            readOnly
          />
          &nbsp;
          <button onClick={copyPasswordToClipBoard} className="btn btn-info text-white">{buttonText}</button>
        </div>
        <div className='flex flex-wrap text-sm gap-x-20 gap-y-7'>
          
          <div className='flex items-center gap-x-2'>
          <label className='text-white font-sans font-semibold text-lg'>Length:</label> <label className='text-white font-semibold text-lg'>{length} </label>
          <input type="range" min={6} max={25} value={length} className="range range-info" onChange={(e) => setLength(e.target.value)} />

          </div>
          <div className='flex items-center gap-x-2 accent-sky-500 '>
            <input type="checkbox" className="checkbox checkbox-info"  name="" id="numberInput" defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)} />

            <label className='text-white font-sans font-semibold text-lg'>Number</label>
          </div>
          <div className='flex items-center gap-x-2 accent-sky-500'>
            <input type="checkbox" name="" className="checkbox checkbox-info" id="characterInput" defaultChecked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)} />
            <label className='text-white font-sans font-semibold text-lg'>Character</label>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default App
