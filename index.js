const NotesModel = require('./notesModel')
const NotesView = require('./notesView')

const notesModel = new NotesModel
const notesView = new NotesView(notesModel)

console.log("The notes app is running")
notesModel.addNote('this is a test note')

notesView.displayNotes();
