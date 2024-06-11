import { useEffect, useReducer, useState } from "react";

let subInput = ''
const subInputListeners: Record<string, () => void> = {}
;(async () => {
    await window.api.whenReady()
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

function generateUUID(): string {
    // 生成随机数的辅助函数
    function randomHexDigit(): string {
        const hexDigits = "0123456789abcdef";
        return hexDigits[Math.floor(Math.random() * 16)];
    }

    // 生成符合UUID v4规范的字符串
    let uuid = "";
    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid += "-";
        } else if (i === 14) {
            uuid += "4"; // UUID版本
        } else if (i === 19) {
            uuid += (parseInt(randomHexDigit(), 16) & 0x3 | 0x8).toString(16); // UUID变种
        } else {
            uuid += randomHexDigit();
        }
    }

    return uuid;
}

// 示例用法
const newUUID = generateUUID();
console.log(`Generated UUID: ${newUUID}`);
