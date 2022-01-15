import React, {Component,createRef} from 'react';
import Try from './Try';

class NumberBaseball extends Component{
    state = {
        result:'',
        value:'',
        answer: getNumbers(),
        tries:[],
        // 참고 : 배열에 array.push(2) 입력하면 2가 배열에 추가되는데
        // 리액트에는 push 쓰면 안댐. 리액트가 감지못함 (render 못함)
    }

    shouldComponentUpdate(nextProps,nextState,nextContext){

    }
    // Context란?
    // A -> B -> C -> D -> E -> F -> G 로 props를 넘기고 싶은데
    // A에서 G로 props 를 주고 싶은데 BCDEF 를 거치니 렌더링 될 위험이 있다
    // A에서 G로 바로 전달해 줄 수 있는 방법이 좋다. 이 방법이 context
    // context 를 응용한 게 redux
    // props 의 진화형이 context 

    onSubmitForm = (e) => {
        const {value,tries,answer} = this.state;
        e.preventDefault()
        if (value === answer.join('')){
            this.setState((prevState)=>{
                return {
                    result:'홈런!',
                    tries:[...prevState.tries, {try:value,result:'홈런'}]
                    // 위에 push 관련 때문에
                    // 리액트에서 배열 만들때
                    // tries : []
                    // tries : [...array, 2] 이렇게 해서
                    // 기존 배열을 만들어놓고 거기다가 복붙
                    //★과거의 state로 현재의 state값으로 바꿀 때 prevstate 를 사용하자
                }
            })
            this.inputRef.current.focus();
        } else {
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9){
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`
                })
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value:'',
                    answer:getNumbers(),
                    tries:[]
                })
                this.inputRef.current.focus();
            }else{
                for(let i=0;i<4;i+=1){
                    if(answerArray[i]===answer[i]){
                        strike+=1;
                    } else if (answer.includes(answerArray[i])){
                        ball+=1;
                    }
                }
                this.setState((prevState) =>{
                    return {
                        tries:[...prevState.tries,{try:value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                        value:'',
                    }
                })
                this.inputRef.current.focus();
            }

        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer)
        this.setState({
            value: e.target.value
        })
    }

    fruits=[
        { fruit:'사과',taste:'맛있다'},
        { fruit:'감',taste:'시다'},
        { fruit:'귤',taste:'달다'},
        { fruit:'밤',taste:'떫다'},
        { fruit:'배',taste:'맛다'},
        { fruit:'무',taste:'맛있다'},
        { fruit:'사과',taste:'맛없다'},
    ]

    inputRef;

    onInputRef = createRef();

    render(){
        const {answer,result,value,tries} = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onInputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v,i)=>{
                        return (
                            <Try key={`${i+1}차 시도 :`} tryInfo={v}/>
                        )
                    })}
                    {/* {this.fruits.map((v,i) => {
                        return (
                            <Try key={v.fruit+v.taste} value={v} index={i}/>
                        ) // 설명 : li는 고유한 key값이 있어야 함. 추가로 화살표 함수에선 return 생략가능
                        // 그리고 map(v,i) 에서 i는 인덱스
                        // key 값이 i가 될 수 있지만 성능 최적화 할 때 문제가 생기기 때문에 하지말자
                        // 차라리 {v.fruit + i} 로 key 등록하는게 좋다 (이것도 나쁜방법이긴 함)
                        // 태그 안에 들어있는 onSubmit, value, index
                        // HTML 에서같은 얘들은 attribute 라고 부르고,
                        // 리액트에선 props 라고 부른다
                        // NumberBaseball.jsx 부모 컴포넌트가 자식 컴포넌트인 Try에게 props를 몰려준다
                    })} */}
                </ul>
            </>
        )
    }
}

export default NumberBaseball