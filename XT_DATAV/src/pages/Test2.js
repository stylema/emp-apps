import React,{useEffect, useState} from 'react';
function Test(num){
  console.log(num)
  useEffect(()=>{
    console.log('1111')
  },[])
  return <div>《React 进阶实践指南》</div>
}

export default function Test1Index(){
  const [ isShow , setIsShow  ]= useState(false)
  return <div>
    <button onClick={() => setIsShow(!isShow)} >点击</button>
    {isShow ? <Test num={1} key={1} /> : <Test num={2} key={2} />}
  </div>
}
