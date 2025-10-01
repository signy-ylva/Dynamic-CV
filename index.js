var jobs = document.getElementsByClassName("job")

console.log(jobs)

function jobClick(e){
    var isJob = false
    var eParent = e.srcElement.parentNode
    var i = 0 // loop failsafe

    while(isJob == false && i < 5){
        if (eParent.className == "job"){
            isJob = true;
        }
        else (
            eParent = eParent.parentNode
        )
        i++
    }
    if (!isHidden(eParent)){

    }
    console.log(eParent)
};

function isHidden(e){
    return (e.offsetParent === null)
};

Array.from(jobs).forEach((job) => {
    if(job.id != ""){
        console.log(job)
        sessionStorage.setItem(job.id,true)
        job.addEventListener("click",jobClick)
    }
})

console.log(sessionStorage)