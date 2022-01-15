import React,{useRef,useEffect,useMemo,memo} from 'react';
import Td from './Td';

const Tr= memo( ({rowData,rowIndex,dispatch})=>{
    return (
        <tr>
            {Array(rowData.length).fill().map((td,i)=>(
            // useMemo 는 컴포넌트도 기억할 수 있다!
            // 이렇게 기억을 하면 바뀌지가 않는다 (최적화가 된다?)
            // 칸에 들어있는 내용물만 바뀌었을때만 렌더링
            // 강사 曰 memo를 적용해도 리렌더링이된다? useMemo가 최후의 수단으로 쓰인다
            // memo나 useMemo 둘 중 하나를 쓰자
            useMemo(
                    () => <Td key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]}>{''}</Td>,
                    [rowData[i]]
                )
            ))}
        </tr>
    )
})

export default Tr;