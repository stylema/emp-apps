import React,{useState} from "react";

const Hello=()=>{
  const [count,setCount]=useState(1);
  const handleClick=()=>{
    setCount(count+1)
  }
  return (
    <div>
      这是datav共享出来的组件{count}
      <button onClick={handleClick}>添加</button>
    </div>
  )
}
export default Hello;
