const $ = (node) => document.querySelector(node)

export class Members {
    constructor ({classname,id,pass,pass2,name,phone}) {
        this.classname = classname;
        this.id = id;
        this.pass = pass;
        this.pass2 = pass2;
        this.name = name;
        this.phone = phone;
        this.init()
    }

    init(){
        const type = this.classname;
        //console.log(this.id) //obj
        const {
            tag:idTagName,istrue:idIstrue,requeire:idReq,maxlength:idMax
        } = this.id;
        const {
            tag:passTagName,istrue:passIstrue,requeire:passReq,maxlength:passMax
        } = this.pass;
        const {
            tag:pass2TagName,istrue:pass2Istrue,requeire:pass2Req,maxlength:pass2Max
        } = this.pass2;
        const {
            tag:nameTag,istrue:nameIstrue,requeire:nameReq,maxlength:nameMax
        } = this.name;
        const {
            tag:phoneTag,istrue:phoneIstrue,requeire:phoneReq,maxlength:phoneMax
        } = this.phone;
        //console.log(istrue)
        //console.log(idIstrue)

        if(idIstrue) {
            this.field('id-container','아이디','text','user-id')
        }
        if(passIstrue) {
            this.field('pass-container','비밀번호','password','user-pass')
        }
        if(pass2Istrue) {
            this.field('pass2-container','비밀번호 확인','password','user-pass2')
        }
        if(nameIstrue) {
            this.field('name-container','이름','text','user-name')
        }
        if(phoneIstrue) {
            this.phonefield('phone-container','휴대폰번호','number','user-phone')
        }

    }

    field(divName,tagName,inputType,inputName){
        const bodys = document.querySelector('.buyer-box form');
        const div = document.createElement('div');
        div.classList.add(divName);
        const inputTag = document.createElement('p');
        inputTag.textContent=tagName

        const inputBox = document.createElement('div')
        const input = document.createElement('input')
        input.setAttribute('type',inputType)
        input.setAttribute('name',inputName)

        div.append(inputTag)
        inputBox.append(input)

        bodys.append(div)
        bodys.append(inputBox)
    }
    phonefield(divName,tagName,inputType,inputName){
        const form = document.querySelector('.buyer-box form');
        const divs = document.createElement('div');
        divs.classList.add(divName);

        //필드이름
        const inputTag = document.createElement('p');
        inputTag.textContent=tagName

        const inputBox = document.createElement('div')

        //셀렉트박스
        const select = document.createElement('select')
        select.setAttribute('name',inputName)
        const options = ["010", "011", "019", "016"];

        options.forEach(num => {
            const option = document.createElement('option');
            option.value = num; // form 전송될 값
            option.textContent = num;  // 화면에 보이는 값
            select.appendChild(option);
        });

        const phone1 = document.createElement('input');
        phone1.setAttribute('type',inputType)
        phone1.setAttribute('name','user-phone1')
        const phone2 = document.createElement('input');
        phone2.setAttribute('type',inputType)
        phone2.setAttribute('name','user-phone2')

        inputBox.appendChild(select);
        inputBox.appendChild(phone1)
        inputBox.appendChild(phone2)

        divs.append(inputTag)
        divs.append(inputBox)

        form.append(divs)
    }
}