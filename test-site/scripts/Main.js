const myImage = document.querySelector("img");

myImage.onclick = function () {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/Robot.png") {
    myImage.setAttribute("src", "images/firefoxicon2.png");
  } else {
    myImage.setAttribute("src", "images/Robot.png");
    }
}

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Mozilla is cool, ${myName}`;
        }   
}

myButton.onclick = function () {
    setUserName();
}
