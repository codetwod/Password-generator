const inputSlider = document.querySelector("[data-len-slider]");
const passwordLen = document.querySelector("#pass_len");
const passDisplay = document.querySelector("[dataPasswordDisplay]");
const copymsg = document.querySelector("[data-copymsg]");
const copybtn = document.querySelector(".copy-btn");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const nums = document.querySelector("#nums");
const symbols = document.querySelector("#symbols");
const indicator = document.querySelector("[dindicator]");
const genrator = document.querySelector("#genrator");
const allCheck = document.querySelectorAll("input[type=checkbox]");
const symbolStr = '!@#%^&*()[]{}:;<>.,`~/-+';
let password = "";
let passLen = 10;
let checkboxer = 0;
handleSlider();
setIndicator("#ccc");
function handleSlider() {
    inputSlider.value = passLen;
    passwordLen.innerText = passLen;
}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function genrateRandomNo() {
    return getRandomInt(0, 9);
}
function genrateLower() {
    return String.fromCharCode((getRandomInt(97, 123)));
}
function genrateUpper() {
    return String.fromCharCode((getRandomInt(65, 91)));
}
function genrateSymbol() {
    return symbolStr[getRandomInt(0, symbolStr.length)];
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (nums.checked) hasNum = true;
    if (symbols.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passLen >= 8) {
        setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passLen >= 6
    ) {
        setIndicator("#ff0");
    } else {    
        setIndicator("#f00");
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passDisplay.value);
  
            copymsg.innerText = "Copied";
            copymsg.color='#170629';    
    }
    catch(e) {
        copymsg.innerText = "failed";
    }
    copymsg.classList.add("active");
    setTimeout(() => {
        copymsg.classList.remove("active");
    }, 2000);
}



inputSlider.addEventListener('input', (e) => {
    passLen = e.target.value;
    handleSlider();
})

copybtn.addEventListener('click', () => {
    if (passDisplay.value)
        copyContent();
})


function handleCheckBoxChange() {
    checkboxer = 0;
    allCheck.forEach((checkbox) => {
        if (checkbox.checked)
            checkboxer++;
    })
    //edge case
    if (checkboxer > passLen) {
        passLen = checkboxer;
        handleSlider();
    } 
}
allCheck.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

genrator.addEventListener('click', () => {
    if(checkboxer<=0)
    return ;
    else if(passLen<checkboxer)
    {passLen=checkboxer;
    handleSlider();}

    password="";
    let funcarr = [];
    if (uppercase.checked)
        funcarr.push(genrateUpper);
    if (lowercase.checked)
        funcarr.push(genrateLower);
    if (nums.checked)
        funcarr.push(genrateRandomNo);
    if (symbols.checked)
        funcarr.push(genrateSymbol);

    for (let i = 0; i < funcarr.length; i++)
        password += funcarr[i]();

    for (let i = 0; i < passLen - funcarr.length; i++) {
        let randii = getRandomInt(0, funcarr.length);
        password += funcarr[randii]();
    }
    password = shufflePass(Array.from(password));
    passDisplay.value = password;  
    passDisplay.setAttribute("style","color:#FFE53D;");
    calcStrength(); 
})

function shufflePass(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
  }
  