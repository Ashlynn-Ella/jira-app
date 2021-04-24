import React from "react";

export const Test = () => {
  const callbackRef = React.useRef(() => alert('init'))
  let callback = callbackRef.current
  console.log(callback)
  return <div>
    <button onClick={() => callbackRef.current = () => alert('update')}>setcallback</button>
    <button onClick={() => callback()}>call callback</button>
  </div>
};

