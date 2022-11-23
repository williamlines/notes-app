class NotesClient {
  constructor() {}

  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
        .then(data => {
          callback(data)
        });
  }

  createNote(note) {
    const noteData = { content: note };
    console.log(noteData);
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
  }
}

module.exports = NotesClient;
