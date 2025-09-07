import {Members} from './Member.js';

const members = new Members({
    classname: 'buyer',
    id:{
        istrue:true, //필드 사용 여부
        requeire:true, //필수or선택
        containerClass:'id-container',
        tag:'아이디',
        fieldType:'text',
        fieldName:'user-id',
        maxlength:10
    },
    pass:{
        istrue:true,
        requeire:true,
        containerClass:'pass-container',
        tag:'비밀번호',
        fieldType:'password',
        fieldName:'user-pass',
        maxlength:13
    },
    pass2:{
        istrue:true,
        requeire:true,
        containerClass:'pass2-container',
        tag:'비밀번호 재확인',
        fieldType:'password',
        fieldName:'user-pass2',
        maxlength:13
    },
    name:{
        istrue:true,
        requeire:true,
        containerClass:'userName-container',
        tag:'이름',
        fieldType:'text',
        fieldName:'user-name',
        maxlength:null
    },
    phone:{
        istrue:true,
        requeire:true,
        containerClass:'phone-container',
        tag:'휴대폰 번호',
        fieldType:'number',
        fieldName:'user-phone',
        maxlength:null
    }
 })