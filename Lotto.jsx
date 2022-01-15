import React,{Component,useState,useRef,useEffect,useMemo,useCallback} from 'react';
import Ball from './Ball';

// useMemo : 복잡한 함수 결과값을 기억
// useCallback : 함수 자체를 기억
// useRef : 일반 값을 기억

function getWinNumbers(){
    const candidate = Array(45).fill().map((v,i)=>i+1);
    const shuffle = [];
    while (candidate.length>0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0])
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(()=>getWinNumbers(),[])
    // 위의 useMemo 없이 아래처럼 하면 getWinNumbers가 7번 실행됨!
    //// const [winNumbers,setWinNumbers] = useState(getWinNumbers());
    // 함수형컴포넌트는 class컴포넌트와 달리 render하는 범위가 더 넓기 때문(전체를 렌더링)!
    // 두번째 인자(배열)의 값이 변하기 전까지 값을 기억해준다!
    // useCallback과 헷갈리지 않도록 주의!
    const [winNumbers,setWinNumbers] = useState(lottoNumbers);
    const [winBalls,setWinBalls] = useState([]);
    const [bonus,setBonus] = useState(null);
    const [redo,setRedo] = useState(false);
    const timeouts = useRef([]);

    // 그리고 ~~문 안에 const [] = useState() 이런거 쓰지말자
    // 변수선언 순서는 지켜져야 한다

    useEffect(()=>{
        for(let i=0;i<winNumbers.length-1;i++){
            console.log('useEffect');
            timeouts.current[i] = setTimeout(()=>{
                setWinBalls((prevBalls)=>[...prevBalls,winNumbers[i]])
            },(i+1)*1000);
        }
        timeouts.current[6]=setTimeout(()=>{
            setBonus(winNumbers[6]),
            setRedo(true)
        },7000)
        return () =>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v)
            })
        }
    },[timeouts.current]) // 빈 배열이면 componentDidMount 와 동일
    // 빈 배열 아니면 (요소가 있으면) componentDidMount , componentDidUpdate 와 동일

    // 함수 자체를 기억해준다  
    // 함수 컴포넌트가 재실행되도 함수 onClickRedo 를 기억해줘서 함수 컴포넌트가 재실행되도
    // onClcikRedo 가 새로 생성되지 않는다.
    // 비용이 큰 함수의 경우 useCallback 을 쓰자
    // 함수 선언할때마다 useCallback으로 감싸는게 좋은가? -> 반은맞고 반은틀림
    // 궁금하면 console.log(winNumbers) 를 넣어보자 
    // ★★ 자식 컴포넌트에 함수를 물려줄 때는 useCallback 을 꼭 해주자!!!!!!
    // ★ useCallback이 없으면 매번 새로운 함수가 생성되는데
    // ★ 자식 컴포넌트에 props로 새로운 함수가 전달되면 자식 컴포넌트는
    // ★ 부모 컴포넌트가 매번 새로운 props를 주네? 라고 새로 렌더링을 해버린다.
    const onClickRedo=useCallback(()=>{
        console.log(winNumbers),
        setWinNumbers(getWinNumbers()),
        setWinBalls([])
        setBonus(null),
        setRedo(false),
        timeouts.current=[]
    },[winNumbers])

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v)=><Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    )
}

export default Lotto;