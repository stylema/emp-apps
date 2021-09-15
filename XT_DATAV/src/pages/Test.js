import React from 'react';
import ReactDOM from 'react-dom';

class Test2Index extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      number:0,
    }
  }
  handleClick=()=>{
    setTimeout(()=>{
      this.setState({ number: 1  })
    })
    this.setState({ number: 2  })
    ReactDOM.flushSync(()=>{
      this.setState({ number: 3  })
    })
    this.setState({ number: 4  })
  }
  render() {
    console.log(this.state.number); // 3,4,1
    return (
      <div>
        <button onClick={ this.handleClick } > 点击 </button>
      </div>
    )
  }
}
export default Test2Index;
