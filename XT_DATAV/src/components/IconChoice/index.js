import React,{useState, useEffect} from 'react';
import { Modal, Button } from 'antd';
import IconPage from "../../IconPage";

const IconChoice = ({value,onChange})=>{
  const [visible, setVisible]=useState(false);
  const [icon,setIcon]=useState(value);
  useEffect(()=>{
    setIcon(value);
  },[value])
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleChange=(icon)=>{
    console.log('icon---===',icon);
    var n = String.fromCharCode(icon);
    setIcon(n);
    onChange(n)
  }
  return (
    <>
      <span className="icon iconfont" onClick={showModal}>{icon}</span>
      <Modal title="Basic Modal" style={{ top: 20 }} width={1000} visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <IconPage onChange={handleChange}/>
      </Modal>
      </>
  )
}

export default IconChoice;
