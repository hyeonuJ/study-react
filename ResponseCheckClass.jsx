import React, {Component} from 'react';

class ResponseCheck extends Component {
    state = {
        state:'waiting',
        message: '클릭해서 시작하세요.',
        result:[],
    }

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const {state,message,result} = this.state;
        if (state === 'waiting'){
            this.setState({
                state:'ready',
                message:'초록색이 되면 클릭하세요.',
            })
            this.timeout = setTimeout(()=>{
                this.setState({
                    state:'now',
                    message:'지금 클릭',
                })
                this.startTime=new Date();
            },Math.floor(Math.random()*1000)+2000)
        } else if (state==='ready'){
            clearTimeout(this.timeout);
            this.setState({
                state:'waiting',
                message:'너무 성급하시군요! 초록색일 때 클릭하세요!',
            })
        } else if (state==='now'){
            this.endTime=new Date();
            this.setState((prevState)=>{
                return {
                    state:'waiting',
                    message:'클릭해서 시작하세요.',
                    result:[...prevState.result, this.endTime-this.startTime],
                }
            })
        }
    }

    onReset = () => {
        this.setState({
            result:[]
        })
    }

    renderAverage = () => {
        return (
            <>
                {this.state.result.length === 0
                    ? null
                    : <>
                        <div>평균 시간: {this.state.result.reduce((a,c) => (a+c))/this.state.result.length}ms </div>
                        <button onClick={this.onReset}>리셋</button>
                    </>
                }
                {/* 
                아래처럼 보호연산자 써도 가능
                {this.state.result.length !== 0
                && <div>평균 시간: {this.state.result.reduce((a,c) => (a+c))/this.state.result.length}ms</div>
                } */}
            </>
        )
    }

    render(){
        return (
            <>
                <div
                    id="screen"
                    className={this.state.state}
                    onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

export default ResponseCheck