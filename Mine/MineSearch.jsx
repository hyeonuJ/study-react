import React,{useReducer,createContext,useMemo, useEffect} from 'react';
import Form from './Form';
import Table from './Table'

export const CODE = {
    MINE:-7,
    NORMAL:-1,
    QUESTION:-2,
    FLAG:-3,
    QUESTION_MINE:-4,
    FLAG_MINE:-5,
    CLICKED_MINE:-6,
    OPENED:0, // 0 이상이면 다 opened
}

export const TableContext = createContext({
    // 초기값을 넣어줘야 하는데 의미가 없으니 모양만 맞춰준다
    tableData:[],
    dispatch:()=>{},
    result:'',
    halted:true,
})

const plantMine = (row,cell,mine) => {
    console.log(row,cell,mine);
    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i;
    })
    const shuffle = [];
    while(candidate.length>row*cell-mine){
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i =0 ;i<row;i++){
        const rowData =[];
        data.push(rowData);
        for(let j=0;j<cell;j++){
            rowData.push(CODE.NORMAL);
        }
    }
    for (let k = 0 ; k<shuffle.length ; k++){
        const ver = Math.floor(shuffle[k]/cell)
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE
    }
    console.log(data)
    return data
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICKED_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const initialState = {
    tableData:[],
    timer:0,
    result:'',
    halted:true,
    openedCount:0,
    timer:0,
    data:{
        row:0,
        cell:0,
        mine:0,
    },
}

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME :
            return {
                ...state,
                openedCount:0,
                tableData:plantMine(action.row,action.cell,action.mine),
                halted:false,
                timer:0,
                data:{
                    row:action.row,
                    cell:action.cell,
                    mine:action.mine,
                },
            }
        case OPEN_CELL : {
            const tableData=[...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]];
            // 불변성을 지키기 위해 클릭한 칸만 새로 객체를 만들어 줬는데
            // 재귀함수를 쓰면 어떤 칸이 불변성이 안지켜질지 모르기 때문에 forEach로 모든 칸들을 새로 만들어준다
            tableData.forEach((row,i)=>{tableData[i]=[...row]}) 

            // tableData[action.row][action.cell] = CODE.OPENED;
            const checked = []
            let openedCount = 0;
            const checkArround = (row,cell) =>{
                if ([CODE.OPENED,CODE.FLAG_MINE,CODE.FLAG,CODE.QUESTION_MINE,CODE.QUESTION].includes(tableData[row][cell])){
                    return;
                } // 닫힌 칸만 열기
                if (row<0 || row>=tableData.length || cell<0 || cell>=tableData[0].length){
                    return
                } // 상하좌우 칸이 아닌 경우 
                if (checked.includes(row+','+cell)){
                    return;
                } else {
                    checked.push(row+','+cell);
                } // 한 번 연칸은 무시
                let around = [ // 칸 옆줄
                    tableData[row][cell-1],tableData[row][cell+1],
                ]
                if (tableData[row-1]){ // 윗줄이 없는 경우
                    around = around.concat([
                        tableData[row-1][cell-1],
                        tableData[row-1][cell],
                        tableData[row-1][cell+1],
                    ])
                }
                if (tableData[row+1]){ // 아랫줄이 없는 경우
                    around = around.concat([
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1]
                    ])
                }
                const count = around.filter((v)=>[CODE.MINE,CODE.FLAG_MINE,CODE.QUESTION_MINE].includes(v)).length
                console.log(around,count)
                if (count === 0){
                    if (row>-1){
                        const near = [];
                        if (row-1>-1){
                            near.push([row-1,cell-1])
                            near.push([row-1,cell]);
                            near.push([row-1,cell+1])
                        }
                        near.push([row,cell-1])
                        near.push([row,cell+1])
                        if(row+1<tableData.length){
                            near.push([row+1,cell-1])
                            near.push([row+1,cell])
                            near.push([row+1,cell+1])
                        }
                        near.forEach((n)=>{
                            if(tableData[n[0]][n[1]] !== CODE.OPENED){
                                checkArround(n[0],n[1])
                            }
                        })
                    }
                }
                if (tableData[row][cell] === CODE.NORMAL){ // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount +=1
                }
                tableData[row][cell] = count
            }
            checkArround(action.row,action.cell);
            let halted = false;
            let result = '';
            console.log(state.openedCount,openedCount)
            if (state.data.row*state.data.cell-state.data.mine === state.openedCount + openedCount){
                halted = true;
                result = `${state.timer}초 만에 승리하셨습니다!`;
            }
            return {
                ...state,
                tableData,
                openedCount:state.openedCount + openedCount,
                halted,
                result,
            }
        }
        case CLICKED_MINE:{
            const tableData=[...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted:true,
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            tableData[action.row][action.cell] = CODE.FLAG_MINE;
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer:state.timer+1,
            }
        }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state,dispatch] = useReducer(reducer,initialState)
    const {tableData,halted,timer,result} = state;
    // Context에 useMemo로 객체를 저장해서 {value}로 대입하는 이유 :
    // (contextAPI가 성능 최적화 하기 어렵다)
    // 아래 TableContext.Provider value에 그냥 {tableData:state.tableData,dispatch} 만 넣으면
    // 리렌더링 할때마다 객체가 새로 생겨서 객체가 새로 생기지 않게 useMemo를 이용한다
    const value = useMemo(()=>({tableData,halted,dispatch}),[tableData,halted])

    useEffect(()=>{
        let timer;
        if (halted===false){
            timer = setInterval(()=>{
                dispatch({type:INCREMENT_TIMER});
            },1000)
        }
        return ()=>{
            clearInterval(timer);
        }
    },[halted])

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>
    )
};

export default MineSearch;;