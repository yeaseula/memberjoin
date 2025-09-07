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
        //console.log(this.id) //obj
        [this.id,this.pass,this.pass2,this.name,this.phone].forEach((ele)=>{
            //console.log(ele)
            const {
                istrue,
                requeire,
                containerClass,
                tag,
                fieldType,
                fieldName,
                maxlength
            } = ele;

            if(ele !== this.phone) {
                if(istrue) {
                    this.field(containerClass,tag,fieldType,fieldName,maxlength)
                }
            } else {
                if(istrue) {
                    this.phonefield(containerClass,tag,fieldType,fieldName,maxlength)
                }
            }
        })
    }

    field(divName,tagName,inputType,inputName,maxlength){
        const form = document.querySelector(`.${this.classname}-box form`);
        const WholeContainer = document.createElement('div');
        WholeContainer.classList.add(divName); //ex.id-container
        const inputTag = document.createElement('p');
        inputTag.textContent=tagName

        const inputBox = document.createElement('div')
        const input = document.createElement('input')
        input.setAttribute('type',inputType)
        input.setAttribute('name',inputName)
        input.setAttribute('maxlength',maxlength)

        WholeContainer.append(inputTag)
        inputBox.append(input)
        WholeContainer.append(inputBox)

        form.append(WholeContainer)

        //html 구조입니다
        //<div class="id-container">
        // <p>아이디</p>
        // <div>
        //      <input type="text" name="user-id" maxlength="10">
        // </div>
        //</div>
    }
    phonefield(divName,tagName,inputType,inputName){
        const form = document.querySelector('.buyer-box form');
        const WholeContainer = document.createElement('div');
        WholeContainer.classList.add(divName);

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
        //중간,마지막 번호 필드
        const phone1 = document.createElement('input');
        phone1.setAttribute('type',inputType)
        phone1.setAttribute('name','user-phone1')
        const phone2 = document.createElement('input');
        phone2.setAttribute('type',inputType)
        phone2.setAttribute('name','user-phone2')

        inputBox.appendChild(select);
        inputBox.appendChild(phone1)
        inputBox.appendChild(phone2)

        WholeContainer.append(inputTag)
        WholeContainer.append(inputBox)

        form.append(WholeContainer)

        //html 구조입니다
        //<div class="phone-container">
        // <p>휴대폰 번호</p>
        // <div>
        // <select name="user-phone">
        //  <option value="010">010</option>
        //  <option value="011">011</option>
        //  <option value="019">019</option>
        //  <option value="016">016</option>
        // </select>
        // <input type="number" name="user-phone1">
        // <input type="number" name="user-phone2">
        //  </div>
        // </div>
    }
}