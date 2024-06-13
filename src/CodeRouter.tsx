import React, { useCallback, useEffect, useState } from "react"
import LoadingPage from "@/container/LoadingPage"
import NoMatchPage from "@/container/NoMatchPage"

// feature code到相应元素
const ROUTERS: Record<string, (ctx: RubickContext) => React.JSX.Element> = {
  // 'hello': _ => <App />,
  
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

  return CorrespondingElem()
}