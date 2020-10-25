# Task Board SPA

Managing your tasks using HTML, JS & CSS.

### Main Page:

![mainPage](./mainPage.png)

### Mobile View:

![mobile](./mobile.png)

### On-Screen Error Examples:

![error1](./error.png)

 





# Description:

First div (id="mission_board") contains:a Form element(TextArea element(id:"mission content"),Datetime-local(date,time)-an already pattern),and 2 Buttons elements(Reset,Add).
Second div(id:"invaild_input") is shown when the user types invalid inputs(empty mission,wrong time and date).
Third div (id:"note_board")is the note container.

The user types values the boolean function,"isValidInput",checks(using "If" conditions,Date object) if they're valid or not.
If they are valid a note is created ("Section" element) by pressing the "Add" button(Callback function:"onAddNoteClicked"),and all the values(mission content,time date,id) are created as an object("createNoteContentObject" function).
The object is stored in an array("NoteContentArray") in the local storage of the web page(using JSON's methtods("Parse","Stringify")for converting a string to an object and vice versa).

The object is passed to a function("buildNoteOnUi"),there the note is built on UI.
"BuildNoteOnUi" function is splited up into many other functions that create the note(using Dom methods:"appendChild","createElement")).
A function from "buildNoteOnUi" function that removes a note from UI and storage is "onRemoveNoteClicked"(callback).
The function's using Annonymous function and Dom methods("removeChild","getElementById") to remove from Ui and from the stroage I used a "Foreach" method that calls an arrow function for
 each element in the array("NoteContentArray"),in order,and checkes if the element id("NoteContentArray" element) equals to the created note's id.
If it does the item is removed from the array("splice" method) and the array is saved in the storage.
The function "onAddNotesFromStorageLoad"(callback) adds notes from the storage using "For" loop,(JSON,storage methods),and "buildNoteOnUi" function.


