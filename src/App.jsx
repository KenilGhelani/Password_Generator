import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef Hook
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"

    if (charAllowed) str += "~!@#$%^&*()_+`[]{}"

    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)


    }
    // console.log(pass)
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToCLipboard = useCallback(() => {
    passwordRef.current?.select() // --> It Hightlights the password which you want to copy
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  }, [password])

  //It executes when we change its dependencies or load the page (Indicate the pasword in the Text input)
  useEffect(() => {
    PasswordGenerator()
  }, [length, numberAllowed, charAllowed, PasswordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto my-8 py-4 rounded-lg bg-gray-700 text-white px-4 shadow-md text-center font-semibold'>Password Generator
        <div className='flex rounded-lg overflow-hidden'>
          <input
            type="text"
            value={password}
            className='outline-none rounded-s-lg w-full my-4 pl-3 py-1 text-black'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='bg-blue-700 outline-none rounded-e-lg my-4 px-3 py-1 shrink-0 hover:bg-blue-800'
            onClick={copyPasswordToCLipboard}
            >
            Copy</button>
        </div>
        <div className='flex'>
          <div className='flex item-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label className='mr-2 text-orange-600'>Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              className='cursor-pointer'
              onChange={() => { setNumberAllowed((prev) => !prev) }} />
            <label className='mr-2 text-orange-600'>Number</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              className='cursor-pointer'
              onChange={() => { setCharAllowed((prev) => !prev) }} />
            <label className='text-orange-600'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
