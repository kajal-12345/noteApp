// document.getElementById("save_button").addEventListener("click", addUser);
let user_id = document.getElementById("userName");
let note_obj = {};
let note_arr = [];
let preNotes = [];
let user;
function addUser() {
  alert(`${user_id.value} in user`);
  
  localStorage.setItem(user_id.value,JSON.stringify(note_arr))
    }
function add_Note() {
  let key = document.getElementById("note_title");
  let value = document.getElementById("note_body");
  note_obj.title = key.value;
  note_obj.text = value.value;
  preNotes = JSON.parse(localStorage.getItem("note"));
  if (!(key.value || value.value)) {
    alert("please add some note");
  } else {
    if (preNotes) {
      preNotes.unshift(note_obj);
    } else {
      note_arr.unshift(note_obj);
    }
    localStorage.setItem("note", JSON.stringify(preNotes || note_arr));
    key.value = "";
    value.value = "";
    show_Note();
    location.reload();
  }
}

function show_Note() {
  let stored_notes = [];
  stored_notes = JSON.parse(localStorage.getItem("note"));
  let html = "";
  stored_notes.forEach((element, index) => {
    html += `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">
              ${element.text}
            </p>
            <button id="${index}" class="delete_btn" onclick="ondelete(${index})">Delete </button>
            <button id="${index}" class="delete_btn" onclick="onedit(${index})">Edit </button>
          </div>
      </div>`;
  });
  let note_ele = document.getElementById("card_container");
  if (stored_notes.length != 0) {
    note_ele.innerHTML = html;
  } else {
    note_ele.innerHTML = "";
  }
}
window.onload = () => {
  show_Note();
};
function ondelete(index) {
  let notes = JSON.parse(localStorage.getItem("note"));
  notes.splice(index, 1);
  localStorage.setItem("note" + id, JSON.stringify(notes));
  console.log("delete notes");
  location.reload();
  show_Note();
}
function load() {
  window.onload = show_Note();
  document.getElementById("search_box").value = "";
}
// location.reload
document.getElementById("search_box").addEventListener("keyup", search_Note);
document.getElementById("search_button").addEventListener("click", load);

function search_Note() {
  let html = "";
  let notes = JSON.parse(localStorage.getItem("note"));

  let search_val = document.getElementById("search_box").value.toLowerCase();

  let result = notes.filter((element) => {
    return element.title.toLowerCase().includes(search_val);
  });
  if (result.length === 0) {
    alert("search not matched");
  }
  result.map((element, index) => {
    html += `<div class="card">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">
          ${element.text}
        </p>
        <button id="${index}" class="delete_btn" onclick="ondelete(${index})">Delete </button>
        <button id="${index}" class="delete_btn" onclick="onedit(${index})">Edit </button>
      </div>
      </div>`;
  });
  document.getElementById("card_container").innerHTML = html;
}
let notes = JSON.parse(localStorage.getItem("note"));

function onedit(note_index) {
  let html = "";
  let res = notes.filter((element, index) => {
    if (index == note_index) {
      return element;
    }
  });
  res.map((element) => {
    html = `<div class="card">
    <div class="card-body">
      <input type="text" id="title" class="card-title" value = "${element.title}">
      <input type="text" id="text" class="card-text" value="${element.text}"> 
      <button id="${note_index}" class="delete_btn btn" onclick="ondelete(${note_index})">Delete </button>
      <button id="${note_index}" class="delete_btn  btn" onclick="onsave(${note_index})">save </button>
    </div>
    </div>`;
  });
  document.getElementById("card_container").innerHTML = html;
}
function onsave(index) {
  notes[index].title = document.getElementById("title").value;
  notes[index].text = document.getElementById("text").value;
  localStorage.setItem("note", JSON.stringify(notes));
  let html = "";
  html = `<div class="card">
      <div class="card-body">
        <h5 class="card-title">${notes[index].title}</h5>
        <p class="card-text">
          ${notes[index].text}
        </p>
        <button id="${index}" class="delete_btn" onclick="ondelete(${index})">Delete </button>
        <button id="${index}" class="delete_btn" onclick="onedit(${index})">Edit </button>
      </div>
      </div>`;
  document.getElementById("card_container").innerHTML = html;
  location.reload();
  show_Note();
}
