const NotesClient = require('./notesClient')
const NotesModel = require('./notesModel')
const NotesView = require('./notesView')

const notesModel = new NotesModel
const client = new NotesClient
const notesView = new NotesView(notesModel, client)

// console.log("The notes app is running")
// notesModel.addNote('this is a test note')
// 
// notesView.displayNotes();

notesView.displayNotesFromApi()

