document.getElementById("form_submit").addEventListener("click",add_user);
let user_data = new Array();
function add_user(){
    let user_Id = document.getElementsByClassName("user_name");
    alert(user_Id);
    let val = user_Id[2].value;
    alert(val);
   user_data.push(val);

console.log(user_data);
}
// console.log(user_data);
