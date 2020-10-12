const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리
    // 쿠키에서 토큰 가져옴 => 복호화 => 유저 인증

    // 쿠키에서 토큰 찾기
    let token = req.cookies.x_auth;

    //복호화
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true});

        req.token = token;
        req.user = user;
        next();
    });


}

module.exports = { auth };