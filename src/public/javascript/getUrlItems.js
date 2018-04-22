
var id = sessionStorage.getItem("userID");
function logOut(elem) {
  sessionStorage.removeItem("userID");
  sessionStorage.removeItem("SessionID");
  window.location.href = "/logout";
  }
var id = sessionStorage.getItem("userID");
function home() {
    window.location.href = "/homepage/?id=" + sessionStorage.getItem("userID");
  }
