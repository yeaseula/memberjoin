import {Members} from './Member.js';

const members = new Members({
    classname: '구매회원가입',
    id:{
        istrue:true, //필드 사용 여부
        requeire:true //필수or선택
    },
    pass:{
        istrue:true,
        requeire:true
    },
    pass2:{
        istrue:true,
        requeire:true
    },
    name:{
        istrue:true,
        requeire:true
    },
    phone:{
        istrue:true,
        requeire:true
    }
 })