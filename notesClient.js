class NotesClient {
  constructor() {}

  loadNotes(callback, errorCallback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error(error);
        errorCallback();
      });
  }

  createNote(note, errorCallback) {
    const noteData = { content: note };
    console.log(noteData);
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    }).catch((error) => {
      errorCallback();
    });
  }
}

module.exports = NotesClient;
