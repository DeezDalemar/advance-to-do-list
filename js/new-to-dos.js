let id = 0;

window.onload = init;

function init() {
   const urlParams = new URLSearchParams(location.search);

   if (urlParams.has("userid") === true) {
      id = urlParams.get("userid");
    }
    
    console.log(id);
}