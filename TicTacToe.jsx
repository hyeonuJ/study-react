import React,{useCallback,useReducer,useEffect} from 'react';
import Table from './Table'
// Td까지 전달해야 할 데이터가 많은데 이걸 다루려면 보통 contextAPI 를 쓰는데
// 여기서는 state 개수를 줄이는 useReducer 를 한번 써본다
// state 가 점점 늘어나면 관리가 힘들고 넘겨줄 때도 힘들기 때문에 useReducer를 사용하면 하나의 state와 setState 로 통일할 수 있다.

const initialState={
    winner:'',
    turn:'O',
    tableData:[['','',''],['','',''],['','','']],
    recentCell:[-1,-1]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME'

const reducer=(state,action) =>{
    switch(action.type){
        case SET_WINNER:{
            // state.winner = action.winner; 이렇게 하면 안됨!!!
            // 리액트에서는 불변성을 지켜주자
            // 기존 state 를 직접 바꾸는 게 아니라 새로운 state 를 만들어서 바뀌는 부분만 바꿔주는게 국룰 
            return {
                ...state,
                winner:action.winner,
            }
        }
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row]=[...tableData[action.row]]
            tableData[action.row][action.cell]=state.turn;
            return {
                ...state,
                tableData,
                recentCell:[action.row,action.cell]
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn:state.turn === 'O'? 'X':'O'
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn:'O',
                tableData:[['','',''],['','',''],['','','']],
                recentCell:[-1,-1]
            }
        }
        default:
            return state;
    }
}

const TicTacToe = () =>{
    //useReducer에는 첫번째에 reducer를 넣어두고, 두번째인자에 initialState, 세번째 인자에 지연 초기화를 넣어준다(거의 안쓴다 이거 복잡할때 주로 사용)
    const [state, dispatch] = useReducer(reducer,initialState)
    const { tableData, turn, winner, recentCell } = state

    // const [winner,setWinner] = useState('')
    // const [turn, setTurn] = useState('O');
    // const [tableData,setTableData] = useState([['','',''],['','',''],['','','']])
    
    const onClickTable = useCallback(()=>{
        // dispatch 안에 들어가는 {} 은 액션이라고 부름
        // 액션 객체 안에 아래처럼 적어주면된다. 액션을 dispatch 하는걸 실행한다 이렇게 보면 된다
        // 이 액션만 있다고 해서 자동으로 state가 바뀌진 않는다
        // 이 액션을 해석해서 state를 직접 바꿔주는 역할을 하는 게 필요하다
        // 그게 바로 위에 있는 reducer 이다
        dispatch({type:SET_WINNER, winner:''})
    },[])

    // useEffect 는 처음 실행할 때도 실행되는것에 유의
    useEffect(()=>{
        const [row,cell] = recentCell
        if(row<0){
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true
        }
        console.log(win,row,cell,tableData,turn)
        if (win){ // 승리시
            dispatch({type:SET_WINNER, winner:turn})
            dispatch({type:RESET_GAME})
        } else { // 무승부검사
            let all = true;
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell){
                        all=false;
                    }
                })
            })
            if(all){
                dispatch({type:RESET_GAME});
            } else{
                dispatch({type:CHANGE_TURN});
            }
        }
    },[recentCell])
    
    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe;