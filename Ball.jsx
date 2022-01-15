import React, {memo,PureComponent} from 'react';

const Ball = memo(({number}) =>{
    let background;
    if (number<=10){
        background = 'red';
    } else if (number<=20){
        background = 'orange';
    } else if (number<=30){
        background = 'yellow';
    } else if (number<=40){
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{background}}>{number}</div>
    )
})

// 컴포넌트를 다른 컴포넌트로 감싸는 걸 하이어오더 라고 부른다
// (고위 컴포넌트)

// class Ball extends PureComponent {
//     render() {
//         const {number} = this.props;
//         let background;
//         if (number<=10){
//             background = 'red';
//         } else if (number<=20){
//             background = 'orange';
//         } else if (number<=30){
//             background = 'yellow';
//         } else if (number<=40){
//             background = 'blue';
//         } else {
//             background = 'green';
//         }
//         return (
//             <div classNmae="ball" style={{background}}>{number}</div>
//         )
//     }
// }

export default Ball