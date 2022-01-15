import React, {PureComponent} from 'react';
// PureComponent 는 shouldComponentUpdate를 구현해 놓은것과 같음
// 값이 바뀌면 렌더링
// 그래서 새로운 state를 만들때
// array:[...this.state.array]
// object:{...this.state.object}
// 이런 식으로 기존 array를 토대로 만들어야 하는게 원칙

class Test extends PureComponent {
    state = {
        counter: 0,
        string:'hello',
        number:1,
        boolean:true,
        object:{},
        array:[],
    }

    // // setState 는 렌더링이 다시 일어남
    // shouldComponemtUpdate(nextProps,nextState,nextContext){
    //     // 어떨 때 렌더링이 다시 일어나는지 
    //     if (this.state.counter !== nextState.counter){ // 현재의 카운터와 미래 바뀔 카운터가 다르면 렌더링
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () =>{
        this.setState({});
    }

    render(){
        console.log('렌더링',this.state);
        return (<div>
            <button onClick={this.onClick}>클릭</button>
        </div>)
    }
}

export default Test