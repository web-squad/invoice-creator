window.onload = function () {
    var logos = document.getElementsByClassName("logo-to-get");
    addLogoClickListener(logos);
    document.getElementById("upload-logo").addEventListener("click", showGallery);
}

function addLogoClickListener(logos) {
    for (var i = 0; i < logos.length; i++) {
        var logo = logos[i];
        logo.addEventListener("click", getSrc);
    }
}

function getSrc() {
    return this.getAttribute("src");
}


function showGallery() {
    document.getElementById("logo-gallery").style.display = "flex";
    document.getElementById("cover").style.display = "block";
}