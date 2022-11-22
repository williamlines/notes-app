/**
 * @jest-environment jsdom
 */

const fs = require("fs");
require("jest-fetch-mock").enableMocks();
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesClient = require("./notesClient");

describe("notesView", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displayNotes creates notes on the webpage", () => {
    const model = new NotesModel();

    model.addNote("test note 1");
    model.addNote("test note 2");

    const view = new NotesView(model);

    view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);
  });

  it("can add a note on the website using the 'Add note' button", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector("#note-input");
    input.value = "remind me to run bundler";

    const button = document.querySelector("#add-note-button");
    button.click();

    expect(document.querySelector("div.note").textContent).toEqual(
      "remind me to run bundler"
    );
  });

  it("clears old notes before displaying all notes", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote("test note 1");
    model.addNote("test note 2");

    view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);

    view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);
  });

  it("clears the input after a user presses the 'Add note' button", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector("#note-input");
    input.value = "remind me to run bundler";

    const button = document.querySelector("#add-note-button");
    button.click();

    expect(document.querySelector("#note-input").value).toEqual("");
  });

  // TODO !!!!!!
  xit("display notes from API works", () => {
    const model = new NotesModel();

    const client = {
      loadNotes: () => "note",
    };

    fetch.mockResponseOnce(
      JSON.stringify({
        note: "test note",
      })
    );

    const view = new NotesView(model, client);

    view.displayNotesFromApi();

    expect(document.querySelectorAll("div.note").length).toBe(1);
    done();
  });
});
