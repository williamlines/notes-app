class NotesView {
  constructor(model, client) {
    this.mainContainerEl = document.querySelector("#main-container");
    this.model = model;
    this.client = client;

    console.log(this.mainContainerEl);

    this.addNoteButtonEl = document.querySelector("#add-note-button");

    this.addNoteButtonEl.addEventListener("click", () => {
      const note = document.querySelector("#note-input").value;
      this.client.createNote(note, () => {
        this.displayError();
      });
      this.addNewNote(note);
    });
  }

  addNewNote(note) {
    this.model.addNote(note);
    this.displayNotes();
    document.querySelector("#note-input").value = "";
  }

  displayNotes() {
    const oldNotes = document.querySelectorAll(".note");

    oldNotes.forEach((note) => {
      note.remove();
    });

    const notes = this.model.getNotes();

    notes.forEach((note) => {
      const newDiv = document.createElement("div");
      newDiv.textContent = note;
      newDiv.className = "note";
      this.mainContainerEl.append(newDiv);
    });
  }

  displayNotesFromApi() {
    this.client.loadNotes(
      (notes) => {
        this.model.setNotes(notes);
        this.displayNotes();
      },
      () => {
        this.displayError();
      }
    );
  }

  displayError() {
    const error = document.querySelector("#error_msg");
    error.textContent = "Oops something went wrong...";
  }

  async emojify2(string) {
    return string;
  }

  async emojify(string) {
    const url = "https://makers-emojify.herokuapp.com/";
    const config = {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "this is fire :fire:" }),
    };


    try {
      console.log(fetch);
      const fetchResponse = await fetch(url, config);
      console.log(fetchResponse);
      const ret = await fetchResponse.json();
      return ret.emojified_text;
      console.log(ret);
      return ret;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = NotesView;
