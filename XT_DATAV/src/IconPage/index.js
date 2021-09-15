import React from 'react';
import ICONFONT_JSON from '../assets/fonts/iconfont.json';
import './styles.css';

const IconPage = ({onChange})=>{
  console.log(ICONFONT_JSON)
  const handleClickIcon=(icon)=>{
    console.log(icon);
    onChange&&onChange(icon);
  }
  return (
    <div className="content unicode">
      <ul className="icon_lists dib-box">
        {
          ICONFONT_JSON.glyphs.map((item,index)=>{
            const icon = `0x${item.unicode}`
            var n = String.fromCharCode(icon);
            //&#xe6eb;
            return (
              <li className="dib" key={index} onClick={()=>handleClickIcon(`0x${item.unicode}`)}>
                <span className="icon iconfont">{n}</span>
                <div className="name">{item.name}</div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default IconPage;
