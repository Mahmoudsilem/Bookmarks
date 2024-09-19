var sitNameInput = document.getElementById("sitNameInput");
var sitUrlInput = document.getElementById("sitUrlInput");

var sitsLinks = JSON.parse(localStorage.getItem("sitsLinks")) || [];

// declaring regex variables
var regexName;
var regexUrl;

if(sitsLinks){
    displayUrls();
}

// to add url function that accept array as a parameter
function add(arr){
    arr.push({
        sitName: sitNameInput.value,
        siteUrl: sitUrlInput.value
    })
    localStorage.setItem("sitsLinks", JSON.stringify(sitsLinks));
    displayUrls();
    clear();
}

// to display urls
function displayUrls(){
    var toBeDisplayedConent = "";
    for (let i = 0; i < sitsLinks.length; i++) {
        toBeDisplayedConent +=
        `
                <tbody>
                    <tr>
                        <th scope="row">${i+1}</th>
                        <td>${sitsLinks[i].sitName}</td>
                        <td><a target="_blank" href="https://${sitsLinks[i].siteUrl}"><button onclick="" class="btn btn-visit"><i class="fa-solid fa-eye"></i> visit</button></a></td>
                        <td><button onclick="deleteLink(sitsLinks, ${i})" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Delete</button></td>
                    </tr>
                </tbody>
        `
    }
    document.getElementById("toBeDisplayedConent").innerHTML = toBeDisplayedConent;    
}

//clearing input
function clear(){
    sitNameInput.value = null;
    sitUrlInput.value = null;
    sitNameInput.classList.remove("is-valid");
    sitUrlInput.classList.remove("is-valid");
}

//deleting Url
function deleteLink(arr,index){
    var oldArr = arr;
    oldArr.splice(index,1);
    localStorage.setItem("sitsLinks", JSON.stringify(oldArr));
    displayUrls();
}

//validation
regexName = /^([A-Z]|[a-z]|\d){3,}$/;
regexUrl = /^((www.)|(WWW.))([a-z]|[A-Z]|\d)*(\.com|\.net|\.org)/;
// parameters ==> redex exprtion, Input to be tested 
function validate(regex ,inputToBeTested){
    if(regex.test(inputToBeTested.value)){
        inputToBeTested.classList.add("is-valid");
        inputToBeTested.classList.remove("is-invalid");
    }else{
        inputToBeTested.classList.add("is-invalid");
        inputToBeTested.classList.remove("is-valid");
    }    
}


function btnToggle(){
    if(regexName.test(sitNameInput.value) && regexUrl.test(sitUrlInput.value)){
        document.getElementById("submitUrl").classList.add("d-inline-block");
        document.getElementById("submitUrl").classList.remove("d-none");
        document.getElementById("alertBtn").classList.add("d-none");
        document.getElementById("alertBtn").classList.remove("d-inline-block");
    }else{
        document.getElementById("submitUrl").classList.remove("d-inline-block");
        document.getElementById("submitUrl").classList.add("d-none");
        document.getElementById("alertBtn").classList.remove("d-none");
        document.getElementById("alertBtn").classList.add("d-inline-block");
    }
}