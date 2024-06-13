import { useEffect, useState } from "react"
import useSubInput from "../useSubInput"


export default (ctx: RubickContext) => {
    const [subInput] = useSubInput()
    const [savedSubInput, setSavedSubInput] = useState('')
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
        </div>
      </div>
    )
  }