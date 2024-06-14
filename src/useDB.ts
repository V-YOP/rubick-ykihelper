import { generateUUID } from "@/util"
import { useCallback, useEffect, useMemo, useState } from "react"

const idToListeners: Record<string, Record<string, () => void>> = {}

type DBDoc = NonNullable<ReturnType<Window['rubick']['db']['get']>>

window.api.whenReady().then(() => {
  // id 为发生变化的数据库的id，uuid为触发变化者的标识符，触发变化者不能刷新，不然就无限循环了
  window.electron.ipcRenderer.on('ykihelper-dbrefresh', (e, {id}: {id: string, uuid: string}) => {
    console.log('refresh!')
    const listeners = idToListeners[id] ?? {}
    for (const [, refresher] of Object.entries(listeners)) {
      refresher()
    }
  })
})

// TODO 更新时广播到所有渲染进程
// TODO 性能优化...?每次更新都会让每个渲染进程的每个使用该钩子的地方都请求一次数据库
export default function useDB<T>(id: string): [data: T | null, setData: (newData: T) => boolean] {
  // x 用于强迫刷新
  const [x, refresh] = useState(0)
  const [dataState, setDataState] = useState<DBDoc | null>(null)
  // uuid 用于唯一标识自己的 refresh
  const uuid = useMemo(generateUUID, [id])

  useEffect(() => {
    idToListeners[id] ??= {}
    idToListeners[id][uuid] = () => refresh(x=>x+1)
    return () => {
      delete idToListeners[id][uuid]
    }
  }, [id, uuid])

  useEffect(() => {
    const dbData = window.rubick.db.get(id)
    setDataState(dbData)
  }, [id, x])

  const setData = useCallback((newData: T) => {
    let res: boolean
    if (dataState == null) {
      res = window.rubick.db.put({_id: id, data: newData}).ok ?? false
    } else {
      const newDBData = {...dataState, data: newData}
      res = window.rubick.db.put(newDBData).ok ?? false
    }
    // 如果更新成功了，刷所有（包括自己），否则只刷自己
    if (res) {
      // Object.values(idToListeners[id]).forEach(f=>f()) （这是刷本进程的所有，已无意义）
      // 要求主进程广播该事件
      window.electron.ipcRenderer.send('ykihelper-dbchange', {id})
    } else {
      idToListeners[id][uuid]()
    }
    return res
  }, [dataState])

  return [dataState?.data as T, setData]
}