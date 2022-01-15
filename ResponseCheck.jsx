import React,{useState, useRef} from 'react';


const ResponseCheck = () => {

    const [state,setState] = useState('waiting');
    const [message,setMessage] = useState('클릭해서 시작하세요.');
    const [result,setResult] = useState([]);
    
    // 클래스형 컴포넌트에서는 timeout, startTime, endTime 사용 방법이 다름. (ResponseCheckClass.jsx 참조)
    // Hooks에서는 아래처럼 Ref를 사용
    // 보통 Ref는 DOM 에 접근할 때만 사용했었는데 this의 속성들을 Ref로 사용한다
    // 그리고 useRef는 안에 current가 들어가기 때문에 timeout.current 처럼 current 를 붙여준다
    
    // setState 와 useRef의 차이 :
    // setState는 return 부분이 다시 실행되지만 (다시 렌더링되지만)
    // useRef는 return 부분이 다시 실행되지 않음
    const timeOut = useRef();
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if(state==='waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeOut.current = setTimeout(()=>{
                setState('now');
                setMessage('지금 클릭');
                startTime.current=new Date()
            },Math.floor(Math.random()*1000)+2000)
        } else if (state==='ready'){
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색일 때 클릭하세요!');
        } else if (state==='now'){
            endTime.current=new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult)=>{
                return [...prevResult, endTime.current-startTime.current]})
        }
    }

    const onReset = () => {
        setResult([])
    }

    const renderAverage = () => {
        return result.length === 0 
            ? null
            : <>
                <div>평균 시간: {result.reduce((a,c)=>a+c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    }

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheck