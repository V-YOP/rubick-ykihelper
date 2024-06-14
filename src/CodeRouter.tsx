import React, { useCallback, useEffect, useState } from "react"
import LoadingPage from "@/container/LoadingPage"
import NoMatchPage from "@/container/NoMatchPage"
import Commander from "@/container/Commander"
import Setting from "@/container/Setting"
import useSubInput from "@/useSubInput"

// feature code到相应元素
const ROUTERS: Record<string, (ctx: RubickContext) => React.JSX.Element> = {
  // 'hello': _ => <App />,
  commander: ctx => <Commander ctx={ctx} />,
  setting: ctx => <Setting ctx={ctx} />
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
      return LoadingPage()
    }
    const targetRouter = ROUTERS[ctx.code] ?? NoMatchPage
    return targetRouter(ctx)
  }, [ctx])

  return (
    <>
      {window.isMock ? <MockSubInput />: undefined}
      <CorrespondingElem />
    </>
  )
}

function MockSubInput() {
  const [subInput, setSubInput] = useSubInput()
  return (
    <div>
      <input placeholder="mock subinput" type="text" value={subInput} onChange={e => setSubInput(e.target.value)}/>
    </div>
  )
}