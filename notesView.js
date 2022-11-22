class NotesView {
  constructor(model, client) {
    this.mainContainerEl = document.querySelector("#main-container");
    this.model = model;
    this.client = client;

    console.log(this.mainContainerEl);

    this.addNoteButtonEl = document.querySelector("#add-note-button");

    this.addNoteButtonEl.addEventListener("click", () => {
      this.model.addNote(document.querySelector("#note-input").value);
      this.displayNotes();
      document.querySelector("#note-input").value = "";
    });
  }

  displayNotes() {
    const oldNotes = document.querySelectorAll(".note");

    oldNotes.forEach((note) => {
      note.remove();
    });

    const notes = this.model.getNotes();
    
    notes.forEach(note => {
      const newDiv = document.createElement("div");
      newDiv.textContent = note;
      newDiv.className = "note";
      this.mainContainerEl.append(newDiv);
    });
  }

  displayNotesFromApi() {
    this.client.loadNotes(notes => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
  }
}

module.exports = NotesView;
