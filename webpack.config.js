const path = require('path');
// path라고 node에서 쉽게 조작하자고 준다.
// 그냥 path 부분은 외우자
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// 이걸 플러그인에 넣는다
// 빌드할

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', //실서비스 : production
    devtool: 'eval', // 빠르게 하겠다는 뜻
    resolve:{
        extensions: ['.js','.jsx']
    }, //jsx,jx,css 등등 파일을 자동으로 불러옴. 아래 entry에 더이상 ./client.jsx 를 입력안하고 ./client 만 입력해도 ㄱㅊ
    
    //여기가 가장 중요
    entry:{
        app:['./client.jsx'],
    },//입력

    // 엔트리에 있는 파일을 읽고 모듈을 적용하고 output 으로 뺀다.
    module: {
        rules:[{
            test:/\.jsx?/, //정규표현식. 양이 많으므로 따로 공부하자. 규칙을 적용할 파일들, js파일과 jsx파일에 이 룰을 적용시킨다. 적용표현식은 따로 공부하자
            loader: 'babel-loader', // js, jsx 파일에 babel을 적용하겠다.
            options: { // 바벨의 옵션
                // package.json 에 있는 preset 넣어주면 됨
                presets:[
                    ['@babel/preset-env',{
                    targets:{
                        browsers: ['> 5% in KR','last 2 chrome versions'],
                        // 한국에서 5%이상의 점유율 가진 버전만 , 현재 크롬이 70버전이면 68부터만 적용
                    },
                    debug: true,
                }],
                '@babel/preset-react'],
                plugins:[
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel', // 바벨 로더에 플러그인을 넣어준다.
                    // 이렇게 하면 바벨 로더가 최신 문법을 옛날 자바스크립트로 바꿀 때 핫 리로딩 기능까지 추가해 준다.
                ],
            }
        }]
    },
    plugins: [
        new RefreshWebpackPlugin()
        // 빌드 할 때마다 실행 
    ],
    output:{
        path:path.join(__dirname, 'dist'),
        filename: 'app.js',
        // path.join 하면 경로를 알아서 합쳐줌
        // __dirname 은 현재 파일 경로를 말함. 거기에 들어있는 dist 를 말함
        publicPath:'/dist/',
    },//출력
    //데브서버
    // webpack.config.js 에 적어둔 대로 빌드의 결과물을 돌린 다음에 dist 폴더에 결과물을 메모리로 저장해 둔다.
    // 그래서 이제 index.html 을 실행하면 결과물을 제공해 준다.
    // 그리고 데브서버는 핫 리로딩이라는 기능이 있다.
    // 핫 리로딩은 소스코드에 변경점을 감지하여 그에 따라 결과물을 수정해 준다.
    devServer:{
        devMiddleware: { publicPath: '/dist'}, // publicPath 옵션이 devMiddleware 객체 안으로 들어감
        static:{directory: path.resolve(__dirname)}, // 끝말잇기 폴더 내 정적 파일들의 경로
        hot:true
    },
}