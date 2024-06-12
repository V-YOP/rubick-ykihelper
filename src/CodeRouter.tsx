import React, { useCallback, useEffect, useMemo, useState } from "react"
import App from "./App"
import useSubInput from "./useSubInput"

// feature code to corresponding component
const ROUTERS: Record<string, (ctx: RubickContext) => React.JSX.Element> = {
  'hello': ctx => <App />
}

const NoMatchPage = (ctx: RubickContext) => {
  const [subInput] = useSubInput()
  console.log('me refreshed')
  return (
    <>
      <p>No Router defined for feature code '{ctx.code}'</p>
      <p>code: {ctx.code}</p>
      <p>type: {ctx.type}</p>
      <p>payload: {Array.isArray(ctx.payload) || ctx.payload instanceof Object ? JSON.stringify(ctx.payload) : ctx.payload}</p>
      <p>subInput: {subInput}</p>
    </>
  )
}

export default function CodeRouter() {

  const [ctx, setCtx] = useState<RubickContext>()

  useEffect(() => {
    (async () => {
      setCtx(await window.api.whenReady())
    })()
  }, [])

  const CorrespondingElem = useCallback(() => {
    if (!ctx) {
      return (
        <>
          Loading...
        </>
      )
    }

    const targetRouter = ROUTERS[ctx.code] ?? NoMatchPage

    return targetRouter(ctx)
  }, [ctx])

  return (<>
    <CorrespondingElem />
  </>)
}