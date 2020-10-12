import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

export default function(SpecificComponent, option, adminRoute = null){
    // option -> null, true, false
    // null => 아무나 출입 가능 페이지
    // trun => 로그인 한 유저만 출입 가능
    // false => 로그인 한 유저는 출입 불가능

    //adminRoute = null <- 이 부분은 안 쓰면 null이 된다는 es6의 문법


    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(auth()).then(response => {
                console.log(response);
                
                if (!response.payload.isAuth){
                    // 로그인 하지 않은 상태
                    if(option){
                        props.history.push('/login')
                    }
                } else{
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    } else{
                        if(option === false){
                            props.history.push('/');
                        }
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}