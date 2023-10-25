const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]"); 
const copyMsg = document.querySelector("[data-copymsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".Generate_button");
const allCheckbox  = document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()'

let password = " ";
let passwordLength = 15; 
let checkCount = 0;
handleSlider();

setIndicator("#ccc")
//pass len accd. to slider


function handleSlider() {
   inputSlider.value = passwordLength;
   lengthDisplay.innerText = passwordLength;

   const min = inputSlider.min;
   const max = inputSlider.max;
   inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "% 100%"

}
function setIndicator(color){
   indicator.style.backgroundColor = color;

}

function getRndInteger(min,max){
  return Math.floor(Math.random() * (max - min))+min;
}

function generateRandomNumber(){
   return getRndInteger(0,9);
}
function generateLowerCase(){
   return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower &&(hasSymbol || hasNum)&& passwordLength >= 8){
        setIndicator("#0f0");
    } 
    else if (
        (hasLower || hasUpper)&&(hasNum || hasSymbol)&& passwordLength>=6
    ) {
        setIndicator("#ff0");
    } 
    else {
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText("Failed");
    }
    //copy span visible
    copyMsg.classList.add("acive");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);

}

function shufflePassword(array){
    //fisher yates method
    for(let i = array.length -1 ; i>0 ;i--){
        const j =Math.floor(Math.random() * (i+1));
        const temp =array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str="";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}


allCheckbox.forEach( (checkbox)=> {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;  
    handleSlider();
})

copyBtn.addEventListener('click',()=> {
    if(passwordDisplay.value)
      copyContent();
});

generateBtn.addEventListener('click',() =>{

    if(checkCount <= 0)
    return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";



    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase); 
    

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);
    

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol); 
    
// compulsary addtion 
    for(let i=0;i<funcArr.length;i++){ 
        password+= funcArr[i]();
    }

//remaining pass addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

//shuffle pass
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    calcStrength();
})






 
 
 





 

 
 
