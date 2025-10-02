// init
var jobs = document.getElementsByClassName("job")

document.getElementById("menuLanguage").addEventListener("click",toggleLanguage)
document.getElementById("menuPrint").addEventListener("click",printPDF)
document.getElementById("menuReset").addEventListener("click",resetStorage)
Array.from(jobs).forEach((job) => {
    if(job.id != ""){
        job.addEventListener("click", jobClick)
    }
})

resetStorage(true)

// lib

function jobClick(e){
    let job = findParentByType(e,"job")
    if(findParentByType(e,"details")){
        console.log("is detail")
        disableDetails(job)
    } else {
        console.log("is title/place")
        if (isHidden(job)){
            enableJob(job)
        } else {
            disableJob(job)
        }
    }
    updateDOM()
    console.log(job)
};

function isHidden(e){
    let vis = sessionStorage.getItem(e.id)
    if(vis == "true"){ // JS returns bool from storage as string
        return false
    } else
    {
        return true
    }
};

function resetStorage(init = true){

    if(init){
        localStorage.setItem("language", "english")
    } else {
        sessionStorage.clear();
    }

    if(localStorage.getItem("language") !="english" && localStorage.getItem("language") != "icelandic"){
        localStorage.setItem("language", "english")
    }

    Array.from(jobs).forEach((job) => {
        if(job.id != ""){
            enableJob(job)
        }
    })
    updateDOM()
}

function findParentByType(e,type){
    var isType = false
    var eParent = e.srcElement.parentNode
    var i = 0 // loop failsafe

    while(isType == false && i < 5){
        console.log(eParent.className)
        if (eParent.className.includes(type)){
            isType = true;
            return eParent
        }
        else {
            eParent = eParent.parentNode
        }
        i++
    }
    return false
}

function enableJob(job){
    sessionStorage.setItem(job.id, true)
    enableDetails(job)
}

function disableJob(job){
    sessionStorage.setItem(job.id, false)
}

function enableDetails(job){
    sessionStorage.setItem(job.id+"-details", true)
}

function disableDetails(job){
    sessionStorage.setItem(job.id+"-details", false)
}

function toggleLanguage(){
    if(localStorage.getItem("language") == "english"){
        localStorage.setItem("language", "icelandic")
        document.getElementById("menuLanguage").innerHTML="EN"
    } else {
        localStorage.setItem("language", "english")
        document.getElementById("menuLanguage").innerHTML="IS"
    }
    console.log(localStorage.getItem("language"))
}

function updateDOM(){
    for (const [key, value] of Object.entries(sessionStorage)) {
        if(key.includes("-details")){
            let job = document.getElementById(key.split("-details")[0])
            Array.from(job.children).forEach((child) => {
                if(child.className.includes("details")){
                    if(value == "false"){
                        child.style.display="none"
                    } else {
                        child.style.display=""
                    }
                }
            })
        } else if(key.includes("job-")){
            let job = document.getElementById(key)
            Array.from(job.children).forEach((child) => {
                if(value == "false"){
                    job.style.opacity = "0.5"
                } else {
                    job.style.opacity = "1"
                }
            })
        }
    }
}

function printPDF(){
    console.log("PRINTPDF")
}

console.log(jobs)
console.log(sessionStorage)