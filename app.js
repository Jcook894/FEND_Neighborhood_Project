
//Opens and closes the nav box.
// TODO: Need to add Knockout to keep js clean.

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("navButton").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("navButton").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}
