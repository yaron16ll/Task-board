// create notes that exist in storage
(function onAddNotesFromStorageLoad() {
  let localStorageNotes = JSON.parse(localStorage.getItem("notes"));
  for (let index = 0; index < localStorageNotes.length; index++) {
    buildNoteOnUi(localStorageNotes[index]);
  }
})();

//the callback to add a note to note board
function onAddNoteClicked() {
  let invaildInputDiv = document.getElementById("invaild_input");
  if (isValidInput()) {
    invaildInputDiv.style.visibility = "hidden";
    let NoteContentObject = createNoteContentObject();

    saveObjectInLocalStorage(NoteContentObject);
    buildNoteOnUi(NoteContentObject);
  } else invaildInputDiv.style.visibility = "visible";
}

// callback resets the Textarea
function onResetMissionClicked() {
  document.getElementById("mission-content").value = "";
}

//check if inputs are valid(boolean function)
function isValidInput() {
  let userMission = document.getElementById("mission-content").value;
  let DateTimevalue = document.getElementById("datetime").value;
  if (userMission != "" && new Date() < new Date(DateTimevalue)) {
    return true;
  }
  else {
    return false;
  }
}

//create an object that contains 4 properties
function createNoteContentObject() {
  let DateTime = new Date(document.getElementById("datetime").value);
  let userMission = document.getElementById("mission-content").value;
  let userDate = DateTime.getDate() + "/" + (DateTime.getMonth() + 1) + "/" + DateTime.getFullYear();
  let userTime = DateTime.getHours() + ":" + DateTime.getMinutes();
  let id = createID()
  return assignObject(userMission, userDate, userTime, id);
}

//assigns all values to one object
function assignObject(userMission, userDate, userTime, id) {
  return (NoteContentObject = {
    missionContent: userMission,
    date: userDate,
    time: userTime,
    id: id
  });
}

//save the note in storage
function saveObjectInLocalStorage(NoteContentObject) {
  let NoteContentArray = getMissonsFromLocalStorage();
  NoteContentArray.push(NoteContentObject);
  localStorage.setItem("notes", JSON.stringify(NoteContentArray));
  console.log(JSON.parse(localStorage.getItem("notes")));
  return NoteContentArray;
}

//gets what exist in local storage if it does
function getMissonsFromLocalStorage() {
  if (localStorage.getItem("notes")) {
    return JSON.parse(localStorage.getItem("notes"));
  } else {
    return [];
  }
}

// the callback that removes the note
function onRemoveNoteClicked(button, note) {
  button.onclick = function () {
    let specificNote = document.getElementById(note.id);
    specificNote.parentNode.removeChild(specificNote);

    let NoteContentArray = JSON.parse(localStorage.getItem("notes"));
    NoteContentArray.forEach((item, index) => {
      if (item.id == note.id) {
        NoteContentArray.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(NoteContentArray));
      }
    });
  };
}

// manages the creation of the all note elements
function buildNoteOnUi(NoteContentObject) {
  let note = createNote(NoteContentObject);
  let button = createXButton();
  let para1 = createMissionContentField(NoteContentObject);
  let para2 = createDateField(NoteContentObject);
  let para3 = createTimeField(NoteContentObject);
  onRemoveNoteClicked(button, note);
  bulidNoteOnNoteBoard(note, para1, para2, para3, button);
}

// creates an id for our objects
function createID() {
  index = localStorage.getItem("taskID");
  if (!index) {
    index = 0;
  }
  index++;
  localStorage.setItem("taskID", index);
  return index;
}

// create the note
function createNote(NoteContentObject) {
  let note = document.createElement("section");
  note.id = NoteContentObject.id;
  note.className = "fade-in";
  return note;
}

// create the X button of the note
function createXButton() {
  let button = document.createElement("button");
  button.className = "close";
  button.innerHTML = '<span class="glyphicon glyphicon-remove"></span> ';
  return button;
}

// create the mission field of the note
function createMissionContentField(noteContent) {
  let para1 = document.createElement("h4");
  para1.innerHTML = noteContent.missionContent;
  return para1;
}

// create the date field of the note
function createDateField(noteContent) {
  let para2 = document.createElement("p");
  para2.innerHTML = noteContent.date;
  return para2;
}

// create the time field of the note
function createTimeField(noteContent) {
  let para3 = document.createElement("p");
  para3.innerHTML = noteContent.time;
  return para3;
}

// display the note on NoteBoard div
function bulidNoteOnNoteBoard(note, para1, para2, para3, button) {
  note.appendChild(button);
  note.appendChild(para1);
  note.appendChild(para2);
  note.appendChild(para3);
  document.getElementById("note_board").appendChild(note);
}
