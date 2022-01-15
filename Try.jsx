import React, {PureComponent,memo,useState} from 'react';

// 클래스형에서는 PureComponent, shouldComponentUpdate 를 이용해서 선택 렌더링
class Try extends PureComponent {
    // // 부모로 받은 props를 바꾸고 싶을 때는 props를 state 로 먼저 만든 뒤에 state로 바꾼다!! 아래처럼!
    // // 안그러면 부모의 props 도 영향을 줌
    // state = {
    //     result:this.props.result,
    //     try:this.props.try,
    // }
    render() {
        const {tryInfo} = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}

// 함수형에서는 memo 이용
// const Try = memo(({tryInfo})=>{
//     // // 부모로 받은 props를 바꾸고 싶을 때는 props를 state 로 먼저 만든 뒤에 state로 바꾼다!! 아래처럼!
//     // // 안그러면 부모의 props 도 영향을 줌
//     // const [result,setResult] = useState(tryInfo.result);

//     // const onClick= () => {
//     //     setResult('1');
//     // }
//     return(
//         <li>
//             <div>{tryInfo.try}</div>
//             <div onclick={onClick}>{tryInfo.result}</div>
//         </li>
//     )
// })

export default Try