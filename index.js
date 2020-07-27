const main_nums = ["صفر","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة","احدى عشر","اتنى عشر","ثلاثة عشر","اربعة عشر","خمسة عشر","ستة عشر","سبعة عشر","ثمانية عشر","تسعة عشر","عشرون",];
const units = ["مئة", "ألف", "مليون", "مليار"];
let readGroup = (number = "") => {
  let A = "";
  let B = "";
  const Ind = number[number.length - 1];
  const tens = number[number.length - 2];
  if (Ind + tens != "00") {
      console.log(tens);
    if (number.length == 1 || tens==0) {
      A = main_nums[Ind];
    }
    if (number.length >= 2 && tens!=0) {
      if (number[number.length - 2] + number[number.length - 1] <= 29) {
        if(tens=="2" && Ind !== "0"){
            A = `${main_nums[Ind]} و ${main_nums[20]}`;
        }else{
            A = main_nums[number[number.length - 2] + number[number.length - 1]];
        }
      } else {
        if (Ind == "0" && tens != "0") {
          A = `${main_nums[number[number.length - 2]].slice(
            0,
            main_nums[number[number.length - 2]].length - 1
          )}ون`;
        } else if (Ind == "0" && tens == "0") {
          A = "";
        } else if(tens !=2){
          A = `${main_nums[Ind]} و ${main_nums[tens].slice(
            0,
            main_nums[number[number.length - 2]].length - 1
          )}ون `;
        }
      }
    }
  }
  if (number.length == 3) {
    if (number[0] == "1") {
      B = ` ${units[0]}`;
    }
    if ((number[0] == "2")) {
      B = `${units[0].slice(0, units.length - 2)}تان `;
    }
    if (number[0] > 2) {
      B = `${main_nums[number[0]].slice(0, main_nums[number[0]].length - 1)}${
        units[0]
      }  `;
    }
  }
  if (B && A) {
    return `${B} و ${A}`;
  }
  if(B){
      return B;
  }
  return A;
};
let checknumber=(numbers)=>{
if(numbers){
    let isNumber=true;
const nums=["0","1","2","3","4","5","6","7","8","9","10"];
[...numbers].forEach((number,index)=>{
if(!nums.includes(number)){
    isNumber = false;
}else{
    isNumber== true;
}
})
return isNumber;
}
return false;
}
const readthousands=(number)=>{
    switch(number.length){
        case 4 :
            if(number[0]==1){
                return`ألف و  ${readGroup(number.slice(1,number.length))}`
            }
            if(number[0]==2){
                return` الفان و ${readGroup(number.slice(1,number.length))}`
            }
            return`${main_nums[number[0]]} آلالف و ${readGroup(number.slice(1,number.length))}`
            case 5:
            case 6:
            if(number!=="000000"){
                return`${readGroup(number.slice(0,number.length-3))} ألفاً و ${readGroup(number.slice(number.length-3))}`
            }
            return"";
    }
}
const readmillions=(number)=>{
    switch(number.length){
        case 7 :
        if(number[0]==1){
            return`${units[2]} و ${readthousands(number.slice(1))}  `
        }
        if(number[0]==2){
            return` ${units[2]}ان و ${readthousands(number.slice(1))}`
        }
        return`${main_nums[number[0]]} ملايين و ${readthousands(number.slice(1))}`
        case 8:
        case 9:
        if(number!=="000000000"){
            return`${readGroup(number.slice(0,number.length-6))}  ${units[2]}اً و ${readthousands(number.slice(number.length-6))}`
        }
        return "";
    }
}
const readbillions=(number)=>{
    switch(number.length){
        case 10 :
        if(number[0]==1){
            return`${units[3]} و ${readmillions(number.slice(1))}  `
        }
        if(number[0]==2){
            return` ${units[3]}اً و ${readmillions(number.slice(1))}`
        }
        return`${main_nums[number[0]]} ${units[3]} و  ${readmillions(number.slice(1))}`
        case 11:
        case 12:
        if(number!==""){
            return`${readGroup(number.slice(0,number.length-9))}  ${units[3]}اً و ${readmillions(number.slice(number.length-9))}`
        }
        return "";
    }
}
let numberToString = (number = "") => {
if(checknumber(number)){
    switch (number.length){
        case 1 :
        case 2 :
        case 3 :
        return readGroup(number);
        case 4 :
        case 5:
        case 6:
        return readthousands(number);
        case 7:
        case 8:
        case 9:
        return readmillions(number);
        case 10:
        case 11:
        case 12:
        return readbillions(number);
        default:
        return "error1"
}
}else{
    return "error2"
}
};
const form = document.querySelector("#number");
const result = document.getElementById("result");
const curr = document.getElementById("curr");
const btn = document.getElementById("btn");
const copy = document.getElementById("copy");
const getnumber=()=> {
    let res = numberToString(form.value);
    if(res=="error1"){
        res="الرقم المدخل أكبر من مئات المليارات"
    }else if (res=="error2"){
        res="الرجاء إدخال الرقم"
    }else{
        let con =numberToString(form.value);
        if(res[res.length-2]==="و"){
        con=res.slice(0,res.length-2)
        }
        res= `فقط ${con} ${document.getElementById(curr.value).innerHTML} لا غير`;
    }
    result.innerHTML = res;
  }
form.addEventListener("change",getnumber);
btn.addEventListener("click",getnumber);
copy.addEventListener("click",()=> {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.value = result.innerHTML;
      input.focus();
      input.select();
      const isSuccessful = document.execCommand('copy');
      input.style.display="none";
      if (!isSuccessful) {
        console.error('Failed to copy text.');
      }
});