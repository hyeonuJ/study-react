import React,{useCallback,useEffect,useRef} from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = ({rowIndex,cellIndex,dispatch,cellData}) => {
    

    // 바뀌는게 있는지 체크하는 용도로 useEffect 를 사용할 수 있다
    // 바뀌는 게 있으면 false가 출력, 그 값 때문에 리렌더링된다
    // 성능 최적화 할 때 주로 쓰인다
    const ref = useRef([]);
    useEffect(()=>{
        console.log(rowIndex===ref.current[0],cellIndex===ref.current[1],dispatch===ref.current[2],cellData===ref.current[3])
        ref.current=[rowIndex,cellIndex,dispatch,cellData];
    },[rowIndex,cellIndex,dispatch,cellData])

    const onClickTd = useCallback(()=>{
        console.log(rowIndex,cellIndex);
        if(cellData){ // 한 번 클릭한 셀은 더이상 바뀌지 않음
            return
        }
        dispatch({type:CLICK_CELL, row:rowIndex, cell:cellIndex})
    },[cellData])
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
}

export default Td;