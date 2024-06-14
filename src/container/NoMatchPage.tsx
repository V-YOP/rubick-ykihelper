import { useCallback, useEffect, useRef, useState } from "react"
import useSubInput from "@/useSubInput"
import useDB from "@/useDB"

export default (ctx: RubickContext) => {
    const [subInput] = useSubInput()
    const [savedSubInput, setSavedSubInput] = useState('')
    useEffect(() => {
      window.api.whenOut().then(() => {
        window.rubick.showNotification('me go')
      })
    }, [])
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key !== 'Enter') {
          return
        }
        setSavedSubInput(subInput)
      }
      document.addEventListener('keydown', handler)
      return () => {
        document.removeEventListener('keydown', handler)
      }
    }, [subInput])

    const [todoList, setTodoList] = useDB<string[]>('ykihelper-test-todolist')
    const todoInputRef: React.LegacyRef<HTMLInputElement> = useRef(null)
    const addTodo = useCallback(() => {
      const v = todoInputRef?.current?.value
      if (!v) return
      if (!todoList) {
        setTodoList([v])
      } else {
        setTodoList([v, ...todoList])
      }
      todoInputRef.current.value = ''
    }, [todoList])

    // @ts-ignore
    const payload = Array.isArray(ctx.payload) || ctx.payload instanceof Object ? JSON.stringify(ctx.payload) : ctx.payload
    return (
      <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', width: 'fit-content', maxWidth: '100vw', alignItems: 'flex-start'}}>
          <p>No Router defined for feature code '{ctx.code}'</p>
          <p>code: {ctx.code}</p>
          <p>type: {ctx.type}</p>
          <p>payload: {payload}</p>
          <p>subInput: {subInput}</p>
          <p>press enter to save subInput: {savedSubInput}</p>
          <p>1 + 1 = {window.api.onePlusOne()}</p>
          <button onClick={() => window.rubick.hideMainWindow()}>隐藏主窗口</button>
          <button onClick={() => window.rubick.outPlugin()}>关闭插件（分离窗口时无效）</button>
          <div style={{display: 'flex'}}>
            <button onClick={() => window.api.setDarkMode(true)}>dark</button>
            <button onClick={() => window.api.setDarkMode(false)}>light</button>
          </div>
          <button onClick={() => window.api.detachMe()}>分离窗口（再点击隐藏主窗口试试）</button>
          <button onClick={() => window.rubick.shellBeep()}>beep</button>
          <div style={{display: 'flex'}}>
            <input placeholder="add todo (for db test)" type="text" ref={todoInputRef}/><button onClick={() => addTodo()}>add</button>
          </div>
          {/* 测试一下 useDB 能否更新所有监听 */}
          <TodoList />
        </div>
      </div>
    )
  }

function TodoList() {
  const [todoList] = useDB<string[]>('ykihelper-test-todolist')
  return (
    <ol>
      {todoList && todoList.map(todo => <li>{todo}</li>)}
    </ol>
  )
}