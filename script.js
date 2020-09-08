const button = document.querySelector(".shorten-it");
let orignal = document.querySelector(".long-link");
let short = document.querySelector(".short-link");
let rel = "";

button.addEventListener("click", getLink);
window.addEventListener("load", checkStorage)

function getLink() {
    let link = document.querySelector(".shorten").value;
    let input = document.querySelector(".shorten");
    
    


    if (link!== "") {
        input.classList.remove("empty");
        document.querySelector(".empty-text").style.visibility = "hidden";

        fetch('https://rel.ink/api/links/' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "url": link
            })
        }).then(res => {
            return res.json()
        })
        .then(data => short.innerHTML = "https://rel.ink/" + data.hashid)
        .catch(err => console.log(err))

        rel = short.innerHTML; 
        localStorage.setItem("sLink", rel)
          

        localStorage.setItem("oLink", trimLink(link, 40))
        orignal.innerHTML = trimLink(link, 40);
        document.querySelector(".shorten").value = null;
        document.querySelector(".link-container").style.visibility = "visible";

    } else {
        input.classList.add("empty");
        document.querySelector(".empty-text").style.visibility = "visible";
    }

    function trimLink(link, length) {
        return link.length > length ? 
               link.substring(0, length) + '...' :
               link;
    };
    
}

function checkStorage() {

    if( localStorage.length == 3) {
        short.innerHTML = localStorage.sLink;
        orignal.innerHTML = localStorage.oLink
        document.querySelector(".link-container").style.visibility = "visible";
    }
}


