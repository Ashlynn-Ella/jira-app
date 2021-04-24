import { useEffect, useState } from "react"

const test = () => {
  let num = 0
  const effect = () => {
    num += 1
    const message = `现在的num值${num}`
    return function unmount(){
      console.log(num)
      console.log(message)
    }
  }
  return effect
}

const add = test()
const unmount = add()
add()
add()
add()
unmount()

export const Test = () => {
  const [num, setNum] = useState(0)
  const add = () => setNum(num + 1)
  useEffect(() => {
    return () => {
      // console.log(num)
    }
  }, [])
  return <div>
    <button onClick={() => add()}>点击</button>
    {num}
  </div>
}