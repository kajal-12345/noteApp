let user = document.getElementById('userName');
document.getElementById('reg').addEventListener('click',register);
document.getElementById('log').addEventListener('click',login);
localStorage.setItem("current_user","");
function register(e){
    e.preventDefault();
    let is_user_Present = false;
  for(let i = 0 ; i < localStorage.length ; i++){
    if(JSON.stringify(user.value) === localStorage.key(i)){
      alert("alert user already present");
      is_user_Present = true;
    }
  }
  if(!is_user_Present){
localStorage.setItem(user.value,"");
  }
}

function login(e){
    e.preventDefault();
    let is_valid_id = false;
    for(let i = 0 ; i < localStorage.length ; i++){
        if(user.value === localStorage.key(i)){
            localStorage.setItem("current_user",JSON.stringify(localStorage.key(i)));
            alert("login sucessful!");
            is_valid_id = true;
            // show_Note();
            window.location.href = "./index.html";
        }
    }
    if(!is_valid_id){
        alert("invalid user name");
    }
}
