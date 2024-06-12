import { useEffect, useState } from 'react'
import useSubInput from './useSubInput'

function letItGo() {
  window.rubick.setSubInputValue('hello')
}

function App() {
  const [count, setCount] = useState(0)
  const [subInput] = useSubInput()
  useEffect(() => {
    console.log('sub', subInput)
  })
  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          subInput: {subInput}
        </p>
        <button onClick={letItGo}>
           setInputTo 'hello'
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
