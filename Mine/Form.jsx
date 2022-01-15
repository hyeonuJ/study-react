import React,{useState,useCallback,useContext,memo} from 'react';
import { TableContext,START_GAME } from './MineSearch';

const Form = memo(() =>{
    const [row,setRow] = useState(10)
    const [cell,setCell] = useState(10)
    const [mine,setMine] = useState(20)
    const {dispatch} = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value)
    },[])

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value)
    },[])

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value)
    },[])


    // context API 를 적용할건데
    // dispatch를 props로 받아서 dispatch 하는 방법 말고 다른 방법을 쓴다
    const onClickBtn = useCallback(()=>{
        dispatch({type:START_GAME,row,cell,mine})
    },[row,cell,mine])
    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow}/>
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell}/>
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine}/>
            <button onClick={onClickBtn}>시작</button>
        </div>
    )
})

export default Form;