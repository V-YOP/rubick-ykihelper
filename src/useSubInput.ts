import { generateUUID } from "@/util";
import { useEffect, useReducer } from "react";

let subInput = ''
const subInputListeners: Record<string, () => void> = {}
;(async () => {
    await window.api.whenReady()
    console.log('subInput setup')
    window.rubick.setSubInput(v => {
        subInput = v.text
        Object.values(subInputListeners).forEach(x => x())
    })
})();

export default function useSubInput(): [subInput: string, setSubInput: (newValue: string) => void] {
    const [, refresh] = useReducer(x => x + 1, 0)
    useEffect(() => {
        const id = generateUUID()
        subInputListeners[id] = () => {
            refresh()
        }
        return () => {
            delete subInputListeners[id] 
        }
    }, [])
    return [subInput, window.rubick.setSubInputValue]
}

