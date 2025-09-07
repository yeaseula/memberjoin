import {Members} from './Member.js';

const members = new Members({
    classname: 'buyer',
    id:{
        tag:'아이디',
        istrue:true, //필드 사용 여부
        requeire:true, //필수or선택
        maxlength:10
    },
    pass:{
        tag:'비밀번호',
        istrue:true,
        requeire:true,
        maxlength:13
    },
    pass2:{
        tag:'비밀번호 재확인',
        istrue:true,
        requeire:true,
        maxlength:13
    },
    name:{
        tag:'이름',
        istrue:true,
        requeire:true,
        maxlength:null
    },
    phone:{
        tag:'휴대폰 번호',
        istrue:true,
        requeire:true,
        maxlength:4
    }
 })