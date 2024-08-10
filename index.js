const cur1 = document.querySelector('#selection1')
const cur2 = document.querySelector('#selection2')
const image = document.querySelector('#image')
const image2 = document.querySelector('#image2')
const text = cur1.options[cur1.selectedIndex].text;
const text2 = cur2.options[cur2.selectedIndex].text;
const button = document.querySelector('#btn')
const input = document.querySelector('#input')
const msg = document.querySelector('#convert')
const currencyApi = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies'
window.onload = () => {
    inserValues(cur1)
    inserValues(cur2)
};
cur1.addEventListener('change',(e)=>{
    changeFlag(cur1,image)
    const text = cur1.options[cur1.selectedIndex].text;
    const text2 = cur2.options[cur2.selectedIndex].text;
    updateOptions(cur2,text,text2)
    changeFlag(cur1,image)
})
cur2.addEventListener('change',(e)=>{
    changeFlag(cur2,image2)
    const text = cur1.options[cur1.selectedIndex].text;
    const text2 = cur2.options[cur2.selectedIndex].text;
    updateOptions(cur1,text2,text)
})
function changeFlag(select,image){
    const text = select.options[select.selectedIndex].id;
    image.src=`https://flagsapi.com/${text}/flat/64.png`
}

const inserValues=(element)=>{
    for(let i in countryList){
        if(i=='INR' && element.id=='selection2'){
            continue
        }
        if(i=='USD' && element.id=='selection1'){
            continue
        }
        var opt = document.createElement('option');
        opt.value = i;
        opt.id = countryList[i]
        opt.innerText = i;
        element.appendChild(opt);
    }
}

const updateOptions = (element,text,text2)=>{
    element.innerHTML=''
    for(let i in countryList){
        if(i==text){
            continue
        }
        var opt = document.createElement('option');
        opt.value = i;
        opt.id = countryList[i]
        opt.innerText = i;
        if(i==text2){
            opt.selected=true
        }
        element.appendChild(opt);
    }
}

button.addEventListener('click', async () => {
    const value = input.value.trim();
    
    if (value === '') {
        alert('Input cannot be null');
        return;
    }

    const number = parseInt(value);
    if (isNaN(number)) {
        alert('Please enter a valid number');
        return;
    }

    const text = cur1.options[cur1.selectedIndex].text.toLowerCase();
    const text2 = cur2.options[cur2.selectedIndex].text.toLowerCase();
    const URL = `${currencyApi}/${text.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let amount = data[text]
    let rate = amount[text2]
    console.log(amount,text,rate)
   
    let finalAmount = value * rate;
    finalAmount = finalAmount.toFixed(2); 
    msg.innerText = `${value} ${text.toUpperCase()} ≈ ${finalAmount} ${text2.toUpperCase()}`;
    
});
