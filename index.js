// init
var jobs = document.getElementsByClassName("job")

document.getElementById("menuLanguage").addEventListener("click",toggleLanguage)
document.getElementById("menuEdit").addEventListener("click",toggleEdit)
document.getElementById("menuReset").addEventListener("click",()=>{resetStorage(false)})
Array.from(jobs).forEach((job) => {
    if(job.id != ""){
        job.addEventListener("click", jobClick)
    }
})

resetStorage(true)

// lib

function jobClick(e){
    if(localStorage.getItem("editMode")=="true"){
        let job = findParentByType(e,"job")
        if(findParentByType(e,"details")){
            toggleDetails(job)
        } else {
            if (isHidden(job)){
                enableJob(job)
            } else {
                disableJob(job)
            }
        }
        updateDOM()
        console.log(job)
    }
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

function resetStorage(init = false){
    if(!init){
        console.log("reset")
        localStorage.clear();
        sessionStorage.clear();
    }
    localStorage.setItem("editMode",false)
    if (localStorage.getItem("language") != "icelandic" && localStorage.getItem("language") != "english"){
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

function toggleDetails(job){
    if(sessionStorage.getItem(job.id+"-details")=="true"){
        disableDetails(job)
    } else {
        enableDetails(job)
    }
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
    updateDOM()
}

function updateDOM(){
    // Language toggle
    if(localStorage.getItem("language") == "icelandic"){
        Array.from(document.getElementsByClassName("english")).forEach((e) => {
            console.log(e)
            e.style.display="none"
        })
        Array.from(document.getElementsByClassName("icelandic")).forEach((e) => {
            e.style.display=""
        })
    } else {
        Array.from(document.getElementsByClassName("icelandic")).forEach((e) => {
            e.style.display="none"
        })
        Array.from(document.getElementsByClassName("english")).forEach((e) => {
            e.style.display=""
        })
    }
    for (const [key, value] of Object.entries(sessionStorage)) {
        // Detail toggle
        if(key.includes("-details")){
            let job = document.getElementById(key.split("-details")[0])
            Array.from(job.children).forEach((child) => {
                    if(child.className.includes("details")){
                        if(
                            value == "true" && (
                                (localStorage.getItem("language") == "icelandic") && child.className.includes("icelandic") ||
                                (localStorage.getItem("language") == "english") && child.className.includes("english")
                                )
                            ){
                            console.log(child)
                            child.style.display=""
                            child.style.opacity="1"
                        } else {
                            console.log(child)
                            if(
                                localStorage.getItem("editMode")=="true" && (
                                    (localStorage.getItem("language") == "icelandic") && child.className.includes("icelandic") ||
                                    (localStorage.getItem("language") == "english") && child.className.includes("english")
                                )
                            ){
                                child.style.display=""
                                child.style.opacity="0.5"
                            } else {
                                child.style.display="none"
                            }
                        }
                    }
            })
        // Job toggle
        } else if(key.includes("job-")){
            let job = document.getElementById(key)
            if(localStorage.getItem("editMode")=="true"){
                Array.from(job.children).forEach(() => {
                    job.style.display = ""
                    if(value == "false"){
                        job.style.opacity = "0.5"
                    } else {
                        job.style.opacity = "1"
                    }
                })
            } else {
                Array.from(job.children).forEach(() => {
                    if(value == "false"){
                        job.style.display = "none"
                    } else {
                        job.style.display = ""
                        job.style.opacity = "1"
                    }
                })
            }
        }
    }
    
}

function toggleEdit(){
    if (localStorage.getItem("editMode")=="true"){
        localStorage.setItem("editMode",false)
        document.getElementById("menuEdit").innerHTML="Edit"
    } else {
        localStorage.setItem("editMode",true)
        document.getElementById("menuEdit").innerHTML="Edit Off"
    }
    updateDOM()
}

console.log(jobs)
console.log(sessionStorage)