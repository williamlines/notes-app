class NotesClient {
  constructor() {}

  async loadNotes(callback) {
    const response = await fetch("http://localhost:3000/notes");
    const resJson = await response.json();
    callback(resJson);
  }
}

module.exports = NotesClient;
