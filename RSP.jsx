import React, {Component,useState,useRef,useEffect} from 'react';


//                      result, imgCoord, score
// componentDidMount
// componentDidUpdate
// componentWillUnmount 

// 클래스는 세로로 , hooks에선 가로로.. 설명하기 으렵다

// 아래처럼 클래스에선 한번에 처리를 했다면
// hooks에서는 배열에 넣은 값을 useEffect로 따로따로 처리하는 식이다.

// componentDidMount(){
//     this.setState({
//         imgCoord:3,
//         score:1,
//         result:2,
//     })
// }

// useEffect(()=>{
//     setImgCoord();
//     setScore();
// },[imgCoord,score])
// useEffect(()=>{
//     setResult()
// },[result]);


const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위:1,
    바위:0,
    보:-1,
}


const RSP = () => {
    const [result,setResult] = useState('')
    const [imgCoord,setImgCoord] = useState('0')
    const [score,setScore] = useState(0)
    const interval = useRef()
        
    const computerChoice=(asdf)=>{
        return Object.entries(rspCoords).find(function(v){
            return v[1] === imgCoord;
        })[0]
    }


    // useEffect는 useState처럼 함수형 컴포넌트에 적어준다
    // 배열을 끝에 넣어준다
    useEffect(()=>{ // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님) 
        interval.current = setInterval(changeHand,100);
        return () => { // componentWillUnmount 역할
            clearInterval(interval.current)
        }
    },[imgCoord])
    // 이 두번째 인수인 배열은 클로저 문제를 해결해 줄 수 있음
    // 인수 배열 (첫번째 인수?)에 변하는 값을 넣어준다
    // imgCoord 가 바뀔 때마다 useEffect가 계속 실행이 된다
    // 빈 배열만 넣으면 '난 어떤 값이 변하든 신경 안쓰겠다' 이 의미 (componentDidMount)
    // 배열에 imgCoord, score 등등 넣으면 이 변수가 변할때 실행 (componentDidUpdate)
    // 배열에는 꼭 useEffect를 다시 실행할 값만 넣을것!

    const changeHand = () => {
        if (imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위)
        } else if (imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보)
        } else if (imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위)
        }
    }
    const onClickBtn=(choice)=>()=>{
        clearInterval(interval.current)
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)]
        const diff = myScore - cpuScore;
        if (diff === 0){
            setResult('비겼습니다!')
        } else if ([-1,2].includes(diff)){
            setResult('이겼습니다!')
            setScore((prevScore)=>prevScore+1)
        } else {
            setResult('졌습니다!')
            setScore((prevScore)=>prevScore-1)
        }
        setTimeout( () =>{
            interval.current = setInterval(changeHand,100);
        },1000)
    }


    return (
        <>
            <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )
}


export default RSP