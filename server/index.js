const express = require('express');  // express 모듈 가져오는 것
const app = express(); // function을 통해서 새로운 express 앱을 만든다
const port = 5000;  // back server port <- 아무 숫자나 ok
const bodyParser = require('body-parser'); // 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 하는 것
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose');
const { mongoURI } = require('./config/key');

mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false  // 에러 방지
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));



app.get('/', (req, res) => res.send('Hello World! hihi')); // root directory에 오면 hello world가 출력되게 해준다


app.get('/api/hello', (req, res) => {
    res.send("안녕하세요~");
})


// 회원가입
app.post('/api/users/register', (req, res) => {
    // 회원 가입 시 필요한 정보들을 client에서 가져와 데이터 베이스에 넣는다
    const user = new User(req.body);
    //req.body <- 이렇게 쓸 수 있는 이유가 body-parser
    console.log(`req : ${user}`);
    user.save((err, userInfo) => {
        if (err) return res.json({success : false, err});
        
        return res.status(200).json({
            success : true
        });
    });
    // .save() <- mongoDB에서 오는 메소드
    // status(200) <- 성공
});


// log in
app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 찾는다
    User.findOne({email : req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess : false,
                message : "가입된 이메일 주소가 없습니다"
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess : false, message : "비밀번호를 확인하세요"});
            
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err); // status(400) <- error

                // 쿠키에 토큰 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess : true, userId : user._id});
            })
        })
    }) // mongoDB에서 지원하는 메소드 
    // 있으면 비밀번호 확인
    // 맞으면 토큰 생성
});

app.get('/api/users/auth', auth, (req, res) => {
    // auth <- 미들웨어, 리퀘스트 받고 콜백 하기 전에 
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id : req.user._id}, {token : ""}, (err, user) => {
        if(err) return res.json({success : false, err});
        return res.status(200).send({
            success : true
        });
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`)); // port 5000에서 실행되도록 한다



// SSH = Secure Shell