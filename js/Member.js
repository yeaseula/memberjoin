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
        const {istrue:idIstrue } = this.id;
        //console.log(istrue)
        //console.log(idIstrue)

        if(idIstrue) {
            this.idcontents('id-container','아이디','text')
        }

    }

    idcontents(divName,inputName,inputType){
        const bodys = document.querySelector('.container');
        const divs = document.createElement('div');
        divs.classList.add(divName);
        const inputTag = document.createElement('p');
        inputTag.textContent=inputName
        const input = document.createElement('input')
        input.setAttribute('type',inputType)

        divs.append(inputTag)
        divs.append(input)

        bodys.append(divs)
    }
}