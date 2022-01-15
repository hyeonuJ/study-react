import React, {Component} from 'react';

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

//라이프사이클
// counstructor -> render -> ref -> componentDidMount
// -> (state,props 바뀔때 -> shouldComponentUpdate(가 true이면) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
class RSP extends Component {
    state = {
        result:'',
        imgCoord:'0',
        score:0,
    }

    interval;

    changeHand=()=>{
        // ★주의★ 비동기 함수가 외부의 변수를 참조하면 클로저 문제 발생!!
        // 따라서 const {imgCoord} = this.state 는 setInterval 내부에 넣어준다
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위){
            console.log(imgCoord)
            this.setState({
                imgCoord:rspCoords.가위,
            })
        } else if (imgCoord === rspCoords.가위){
            this.setState({
                imgCoord:rspCoords.보,
            })
        } else if (imgCoord === rspCoords.보){
            this.setState({
                imgCoord:rspCoords.바위,
            })
        }
    }

    // 컴포넌트가 첫 렌더링된 후 실행된다.
    // 리렌더링이 일어날 때는 실행 x
    componentDidMount(){ // 컴포넌트가 첫 렌더링 된 후, 여기에 비동기 요청을 많이 한다.
        // ★주의★ 비동기 함수가 외부의 변수를 참조하면 클로저 문제 발생!!
        // 따라서 const {imgCoord} = this.state 는 setInterval 내부에 넣어준다
        this.interval = setInterval(this.changeHand,100);
    }

    // 리렌더링 후
    componentDidUpdate(){

    }

    // 컴포넌트가 제거되기 직전 실행된다.
    componentWillUnmount(){ // 컴포넌트가 제거되기 직전, 여기에 비동기 요청 정리를 많이 한다.
        clearInterval(this.interval)
    }
    
    computerChoice=(asdf)=>{
        if(asdf==='0') return 0
        else if(asdf==='-142px') return 1
        else return -1
    }

    onClickBtn=(choice)=>()=>{
        clearInterval(this.interval)
        const {imgCoord}=this.state
        const myScore = scores[choice];
        const cpuScore = scores[this.computerChoice(imgCoord)]
        const diff = myScore - cpuScore;
        if (diff === 0){
            this.setState({
                result:'비겼습니다!'
            })
        } else if ([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return {
                    result:'이겼습니다!',
                    score:prevState.score+1,
                }
            })
        } else {
            this.setState((prevState)=>{
                return {
                    result:'졌습니다!',
                    score:prevState.score-1,
                }
            })
        }
        setTimeout( () =>{
            this.interval = setInterval(this.changeHand,100);
        },1000)
    }

    render () {
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}

export default RSP;