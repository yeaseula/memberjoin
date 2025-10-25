
import { Members } from './Member.js';
import { isRequired, isValidPass, isValidId, validateUsername, validateSellerNumber, ispassid, ispassUserNum } from './validation.js';
import  MiniAlert from '../alert/MiniAlert.js'

const $ = (node) => document.querySelector(node); // 작성 편의 및 가독성 위해 유틸함수 생성
const tab = $('.tab-list');
const targetInput = $('input[name="user-type-field"]');

// 상태관리 객체 (userType별로 관리)
const joinState = {
    userType: targetInput.value || 'buyer',
    isIdChecked: false,
    isPassMatch: false,
    isAllField: false,
    isAgree: false,
    isSellerNumber: false,
};

// 모든 필드의 값을 가져오는 함수
function getFormFields(userType) {
    const box = $(`.${userType}-box`);
    return {
        form: box.querySelector('form'),
        id: $(`input[name="${userType}-user-id"]`),
        pass: $(`input[name="${userType}-user-pass"]`),
        pass2: $(`input[name="${userType}-user-pass2"]`),
        name: $(`input[name="${userType}-user-name"]`),
        phoneM: $(`input[name="${userType}-user-phoneM"]`),
        phoneL: $(`input[name="${userType}-user-phoneL"]`),
        phoneRes: $(`input[name="${userType}-user-phoneRes"]`),
        agreement: $(`input[name="agreement"]`),
        idValueChk: box.querySelector('.id-value-check'),
        sellerNum: $(`input[name="${userType}-user-sellerNum"]`),
        sellerName: $(`input[name="${userType}-user-sellerName"]`),
        sellerValueChk: $('.seller-value-check')
    };
}

tab.addEventListener('click', (e) => {
    e.preventDefault();
    const li = document.querySelectorAll('li');
    const targetli = e.target.closest('li');
    const targetdata = targetli.dataset.target;
    const targetContainer = $(`.${targetdata}-box`);
    const Container = document.querySelectorAll('.container');

    li.forEach((ele) => ele.classList.remove('active'));
    targetli.classList.add('active');
    Container.forEach((ele) => ele.classList.remove('on'));
    targetContainer.classList.add('on');

    // 상태 및 입력값 초기화
    targetInput.value = targetdata;
    joinState.userType = targetdata;
    joinState.isIdChecked = false;
    joinState.isPassMatch = false;
    joinState.isAllField = false;
    joinState.isAgree = false;
    joinState.isSellerNumber = false;

    // 모든 input/select 초기화
    document.querySelectorAll('input').forEach((input) => (input.value = ''));
    document.querySelectorAll('input[type="checkbox"]').forEach((input) => (input.checked = false))
    document.querySelectorAll('select').forEach((select) => (select.value = '010'));

    // 이벤트 재바인딩 및 유효성 검사
    validationAll(targetdata);
    bindJoinBtnActiveEvents(targetdata);
    isJoinBtnActive();
    phoneNumberJoin();
    getFormFieldsArray(targetdata);
});

const buyer = new Members({
    classname: 'buyer',
    id:{
        istrue:true, //필드 사용 여부
        requeire:true, //필수or선택
        containerClass:'buyer-id-container',
        tag:'아이디',
        fieldType:'text',
        fieldName:'buyer-user-id',
        maxlength:10
    },
    pass:{
        istrue:true,
        requeire:true,
        containerClass:'buyer-pass-container',
        tag:'비밀번호',
        fieldType:'password',
        fieldName:'buyer-user-pass',
        maxlength:13
    },
    pass2:{
        istrue:true,
        requeire:true,
        containerClass:'buyer-pass2-container',
        tag:'비밀번호 재확인',
        fieldType:'password',
        fieldName:'buyer-user-pass2',
        maxlength:13
    },
    name:{
        istrue:true,
        requeire:true,
        containerClass:'buyer-userName-container',
        tag:'이름',
        fieldType:'text',
        fieldName:'buyer-user-name',
        maxlength:null
    },
    phone:{
        istrue:true,
        requeire:true,
        containerClass:'buyer-phone-container',
        tag:'휴대폰 번호',
        fieldType:'number',
        fieldName:'buyer-user-phone',
        maxlength:4
    }
})

const seller = new Members({
    classname: 'seller',
    id:{
        istrue:true, //필드 사용 여부
        requeire:true, //필수or선택
        containerClass:'seller-id-container',
        tag:'아이디',
        fieldType:'text',
        fieldName:'seller-user-id',
        maxlength:10
    },
    pass:{
        istrue:true,
        requeire:true,
        containerClass:'seller-pass-container',
        tag:'비밀번호',
        fieldType:'password',
        fieldName:'seller-user-pass',
        maxlength:13
    },
    pass2:{
        istrue:true,
        requeire:true,
        containerClass:'seller-pass2-container',
        tag:'비밀번호 재확인',
        fieldType:'password',
        fieldName:'seller-user-pass2',
        maxlength:13
    },
    name:{
        istrue:true,
        requeire:true,
        containerClass:'seller-userName-container',
        tag:'이름',
        fieldType:'text',
        fieldName:'seller-user-name',
        maxlength:null
    },
    phone:{
        istrue:true,
        requeire:true,
        containerClass:'seller-phone-container',
        tag:'휴대폰 번호',
        fieldType:'number',
        fieldName:'seller-user-phone',
        maxlength:4
    },
    sellerNum:{
        istrue:true,
        requeire:true,
        containerClass:'sellernumber-container',
        tag:'사업자 등록번호',
        fieldType:'number',
        fieldName:'seller-user-sellerNum',
        maxlength:10
    },
    sellerName: {
        istrue:true,
        requeire:true,
        containerClass:'sellername-container',
        tag:'스토어 이름',
        fieldType:'text',
        fieldName:'seller-user-sellerName',
        maxlength:null
    }
})

function getFormFieldsArray(userType) {
    const fields = getFormFields(userType);
    const defaultKey = fields.form.querySelectorAll('input')
    let allArray = []
    defaultKey.forEach((ele)=>{
        allArray.push(ele)
    })
    console.log(allArray)
    allArray.forEach((field,idx)=>{
        field.addEventListener("focus",(e)=>{

            allArray.forEach(()=>{warningClear()});
            const index = allArray.indexOf(e.target);

            for(let i=0; i<index; i++) {
                if(allArray[i].value.trim() === '' && allArray[i].getAttribute('required')) {
                    const parantDiv = allArray[i].closest('div');
                    const target = parantDiv.querySelector('.empty-warning');

                    if(!target) {
                        const message = allArray[i].name == `${userType}-user-phoneM` ? '번호를 입력해주세요.' : '필수정보입니다.'
                        warningMessage(parantDiv,message)
                    }
                } else {

                }
            }
        })
        field.addEventListener('input',()=>{
            const parantDiv = field.closest('div');
            const target = parantDiv.querySelector('.empty-warning');
            if(target) {
                target.remove();
            }
        })
    })
}

//경고메시지
function warningMessage(parantDiv,message){
    const p = document.createElement('p')
    p.classList.add('warning-text','empty-warning');
    p.textContent=message;
    parantDiv.append(p)
}
function warningClear(){
    const target = document.querySelectorAll('.empty-warning')
    target.forEach((ele)=>{
        ele.remove()
    })
}

getFormFieldsArray(joinState.userType)

$('.join-btn').setAttribute('disabled',true)//회원가입버튼

// 버튼 활성화 함수 (상태 기반)
function updateJoinBtnState() {
    const { userType, isIdChecked, isPassMatch, isAllField, isAgree, isSellerNumber } = joinState;
    if(userType == 'buyer') {
        const canJoin = isIdChecked && isPassMatch && isAllField && isAgree;
        $('.join-btn').disabled = !canJoin;
    } else {
        const canJoin = isIdChecked && isPassMatch && isAllField && isAgree && isSellerNumber;
        $('.join-btn').disabled = !canJoin;
    }
}

//input[type="number"] maxlangth
const numberTypeInput = document.querySelectorAll('input[type="number"]')

numberTypeInput.forEach(input=>{
    input.addEventListener('input',limitLength)
})

function limitLength(e){
    const maxLength = e.target.getAttribute('maxlength')
    if(e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
    }
}

// 휴대폰번호 필드 조립 함수 (userType별 동적 바인딩)
function phoneNumberJoin() {
    const userType = joinState.userType;
    const phoneArr = ['010', '', ''];
    const resultPhone = $(`input[name="${userType}-user-phoneRes"]`);
    $(`select[name="${userType}-user-phone"]`).onchange = (e) => {
        phoneArr[0] = e.currentTarget.value;
        resultPhone.value = phoneArr.join('');
    };
    $(`input[name="${userType}-user-phoneM"]`).oninput = (e) => {
        phoneArr[1] = e.currentTarget.value;
        resultPhone.value = phoneArr.join('');
    };
    $(`input[name="${userType}-user-phoneL"]`).oninput = (e) => {
        phoneArr[2] = e.currentTarget.value;
        resultPhone.value = phoneArr.join('');
    };
}

phoneNumberJoin()

function removeClasses(selectors, classes) {
    document.querySelectorAll(selectors).forEach(el => {
        el.classList.remove(...classes);
    });
}


// 유효성 검사 및 이벤트 바인딩 통합
function validationAll(userType) {
    const fields = getFormFields(userType);
    // id 입력 시
    fields.id.addEventListener('input',(e)=>{
        const usernameField = $(`.${userType}-id-container`);
        $('.id-warning')?.remove(); //경고메시지 있을경우 삭제
        usernameField.querySelector('input').classList.remove('warning')
        //인증 후 id를 바꿀 경우 인증버튼 재활성화 및 idCheck상태 false 반환
        fields.idValueChk.removeAttribute('disabled');
        joinState.isIdChecked = false;
        updateJoinBtnState();
    })
    // id focus 를 잃었을 때 유효성검사 실시
    fields.id.addEventListener('blur',(e)=>{
        const username = fields.id.value;
        const usernameField = $(`.${userType}-id-container`);
        if(username == '') return; //포커스를 잃었지만 value가 없으면 경고문이 없어도 됨
        if(!isValidId(username)) {
            $('.id-warning')?.remove();
            const p = document.createElement('p')
            p.classList.add('warning-text','id-warning')
            p.textContent = '20자 이내의 영문 소문자,대문자,숫자만 사용 가능합니다.';
            usernameField.append(p);
            usernameField.querySelector('input').classList.add('warning')
        } else {
            $('.id-warning')?.remove();
            usernameField.querySelector('input').classList.remove('warning');
        }
    })
    // 아이디 인증 버튼 클릭
    fields.idValueChk.addEventListener('click', (e) => {
        e.preventDefault();
        const username = fields.id.value;
        if(!isValidId(username)) { //유효성검사 실패했을 시 경고문구 삽입
            const usernameField = $(`.${userType}-id-container`);
            $('.id-warning')?.remove();
            const p = document.createElement('p')
            p.classList.add('warning-text','id-warning')
            p.textContent = '20자 이내의 영문 소문자,대문자,숫자만 사용 가능합니다.';
            usernameField.append(p);
            usernameField.querySelector('input').classList.add('warning')
            updateJoinBtnState();
        } else {
            validateUsername(username, userType);
            setTimeout(() => {
                joinState.isIdChecked = ispassid.ispass;
                if(joinState.isIdChecked) {
                    removeClasses(`input[name="${userType}-user-id"]`,['warning'])
                    fields.idValueChk.setAttribute('disabled',true) // 인증 성공 후 버튼 비활성화
                } else {
                    fields.id.classList.add('warning')
                }
                updateJoinBtnState();
            }, 500);
        }
    });
    // 비밀번호 입력 시 유효성 검사
    fields.pass.addEventListener('blur', (e) => {
        const password = fields.pass.value;
        if(password == '') return;
        if (isValidPass(e.currentTarget.value)) {
            e.currentTarget.closest('div').classList.add('ischecked');
            $('.pass-warning')?.remove();
            e.currentTarget.classList.remove('warning');
        } else {
            e.currentTarget.closest('div').classList.remove('ischecked');
            $('.pass-warning')?.remove()
            const p = document.createElement('p');
            p.classList.add('warning-text', 'pass-warning');
            p.textContent = '8자 이상,영문 대 소문자,숫자,특수문자를 사용하세요.';
            e.currentTarget.closest('div').append(p);
            e.currentTarget.classList.add('warning'); //필드 border
        }
        //비밀번호 입력 후 재수정 시
        if(fields.pass2.value !== '') {
            fields.pass2.value = ''; // 재확인 필드는 비우고
            // 재확인 체크는 해제하고
            document.querySelector(`input[name="${userType}-user-pass2"]`).closest('div').classList.remove('ischecked');
            // 재확인 필드 경고 보더를 해제
            $(`input[name="${userType}-user-pass2"]`).classList.remove('warning')
        }
        joinState.isPassMatch = false;
        updateJoinBtnState();
    });
    // 비밀번호 재확인 입력 시 일치 검사
    fields.pass2.addEventListener('input', (e) => {
        const passwordValue = fields.pass.value;
        const reCheckValue = e.currentTarget.value;
        if (passwordValue === reCheckValue && isValidPass(passwordValue)) {
            e.currentTarget.closest('div').classList.add('ischecked');
            e.currentTarget.classList.remove('warning');
            $('.pass-warning')?.remove();
            joinState.isPassMatch = true;
        } else {
            if (!$('.pass-warning')) {
                const p = document.createElement('p');
                p.classList.add('warning-text', 'pass-warning');
                p.textContent = '비밀번호가 일치하지 않습니다';
                e.currentTarget.closest('div').append(p);
            }
            e.currentTarget.closest('div').classList.remove('ischecked');
            e.currentTarget.classList.add('warning');
            joinState.isPassMatch = false;
        }
        updateJoinBtnState();
    });
    if(userType == 'seller') {
        // 사업자 등록번호 인증 입력 시 (재입력 포함)
        fields.sellerNum.addEventListener('input', (e) => {
            $('.seller-number-warning')?.remove();
            joinState.isSellerNumber = false;
            updateJoinBtnState();
        })
        // 사업자 등록번호 인증
        fields.sellerValueChk.addEventListener('click',(e) => {
            e.preventDefault();
            const sellerNumber = fields.sellerNum.value;
            validateSellerNumber(sellerNumber);
            setTimeout(() => {
                joinState.isSellerNumber = ispassUserNum.ispass;
                updateJoinBtnState();
            }, 900);
        })
    }

    // 필수 입력값 모두 채워졌는지 검사
    fields.form.querySelectorAll('input[required]').forEach((input) => {
        input.addEventListener('input', () => {
            joinState.isAllField = Array.from(fields.form.querySelectorAll('input[required]')).every(
                (el) => el.value.trim() !== ''
            );
            updateJoinBtnState();
        });
    });
    // 약관 동의 체크
    fields.agreement?.addEventListener('change', () => {
        joinState.isAgree = !!fields.agreement.checked;
        updateJoinBtnState();
    });
}
validationAll(joinState.userType);

// 버튼 활성화 상태 갱신
function isJoinBtnActive() {
    updateJoinBtnState();
}


// 이벤트 바인딩 함수 (탭 전환 시마다 재바인딩)
function bindJoinBtnActiveEvents(userType) {
    const fields = getFormFields(userType);
    const form = fields.form;
    const warning = form.querySelectorAll('.warning-text')
    const check = form.querySelectorAll('.ischecked')
    //필드 하단 모든 경고문구 삭제
    warning.forEach((text)=> {
        text.remove()
    })

    //input 필드 warning border css 해제
    removeClasses('input',['warning'])

    //중복확인 버튼 disabled 해제
    fields.idValueChk.removeAttribute('disabled');

    //check icon 해제
    fields.pass.closest('div').classList.remove('ischecked');
    fields.pass2.closest('div').classList.remove('ischecked');

    // 필수 입력값
    fields.form.querySelectorAll('input[required]').forEach((input) => {
        input.addEventListener('input', isJoinBtnActive);
    });
    // 약관 동의
    fields.agreement?.addEventListener('change', isJoinBtnActive);
    // 비밀번호 재확인
    fields.pass2?.addEventListener('input', isJoinBtnActive);
}
bindJoinBtnActiveEvents(joinState.userType);
isJoinBtnActive();


$('.join-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const userType = joinState.userType;
    const fields = getFormFields(userType);
    const username = fields.id.value;
    const password = fields.pass.value;
    const phoneRes = fields.phoneRes.value;
    const name = fields.name.value;

    if(userType == 'buyer') {
        buyerSignup(username,password,name,phoneRes)
    } else {
        const sellerNumber = fields.sellerNum.value;
        const sellerName = fields.sellerName.value;
        sellerSignup(username,password,name,phoneRes,sellerNumber,sellerName)
    }
});

async function buyerSignup (username,password,name,phoneRes) {
    try {
        const res = await fetch("https://api.wenivops.co.kr/services/open-market/accounts/buyer/signup/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                name: name,
                phone_number: phoneRes
            })
        })
        const data = await res.json();
        console.log("구매회원 회원가입 성공!💚:", data);
        const alert = new MiniAlert({
            title:'회원가입 완료 모달',
            message:'회원가입이 완료되었습니다!<br> 로그인 하러 갈까요?',
            buttons : [],
            link:['예'],
            linkHref:['./login.html'],
            closeBackdrop : true,
            customContent : null,
        })
    } catch (err) {
        console.error("구매회원 회원가입 에러 발생🥲",err)
    }
}

async function sellerSignup (username,password,name,phoneRes,sellerNumber,sellerName) {
    try {
        const res = await fetch("https://api.wenivops.co.kr/services/open-market/accounts/seller/signup/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                name: name,
                phone_number: phoneRes,
                company_registration_number: sellerNumber,
                store_name: sellerName
            })
        })
        const data = await res.json();
        console.log("판매회원 회원가입 성공!💚:", data)
        const alert = new MiniAlert({
            title:'회원가입 완료 모달',
            message:'회원가입이 완료되었습니다!<br> 로그인 하러 갈까요?',
            buttons : [],
            link:['예'],
            linkHref:['./login.html'],
            closeBackdrop : true,
            customContent : null,
        })
    } catch (err) {
        console.error("판매회원 회원가입 에러 발생🥲",err)
    }
}