const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // *
const saltRounds = 10; // *
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1, // 똑같은 이메일은 쓰지못하게끔
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    // 관리자 설정 Ex) 1은 관리자,0은 일반유저
    type: Number,
    default: 0,
  },
  image: String, // 유저 이미지
  token: {
    // 유효성 검사
    type: String,
  },
  tokenExp: {
    // token 유효기간 설정
    type: Number,
  },
});
// *
userSchema.pre('save', function ( next ) {
  var user = this; // User모델자체를 가르킴

  // isModified: password가 변경될때
  if (user.isModified('password')) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });

    } else {
    next();
  }
}); 

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 암호화 된 비밀번호화 비교하려면 입력된 비밀번호를 암호화 해야 함
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch)
  });
}
userSchema.methods.generateToken = function(cb){
  let user = this;

  let token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save(function(err, user){
    if(err) return cb(err)
    cb(null, user)
  });
}

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  jwt.verify(token, 'secretToken', function(err, decoded){
    // 유저 아이디로 유저 찾고
    // 클라이언트 토큰, db 토큰 일치 확인
    user.findOne({"_id" : decoded, "token" : token}, function(err, user){
      if(err) return cb(err);
      cb(null, user)
    }) // findOne <- mongoDB 메소드
  });
}

const User = mongoose.model("User", userSchema);

module.exports = { User };