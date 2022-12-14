/**
 * @jest-environment jsdom
 */

const fs = require("fs");
require("jest-fetch-mock") //.enableMocks();
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesClient = require("./notesClient");
const { notEqual } = require("assert");

describe("notesView", () => {
  it("displayNotes creates notes on the webpage", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();

    model.addNote("test note 1");
    model.addNote("test note 2");

    const view = new NotesView(model);

    view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);
  });

  it("can add a note on the website using the 'Add note' button", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

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
    const client = new NotesClient();
    const view = new NotesView(model, client);

    model.addNote("test note 1");
    model.addNote("test note 2");

    view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);

    view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);
  });

  it("clears the input after a user presses the 'Add note' button", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

    const input = document.querySelector("#note-input");
    input.value = "remind me to run bundler";

    const button = document.querySelector("#add-note-button");
    button.click();

    expect(document.querySelector("#note-input").value).toEqual("");
  });

  // TODO !!!!!!
  it("display notes from API works", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();

    // change this
    const clientMock = {
      loadNotes: (callback) => {
        callback(["this is a test note"]);
      },
    };

    const view = new NotesView(model, clientMock);

    view.displayNotesFromApi();

    expect(document.querySelectorAll("div.note").length).toBe(1);
  });

  it("display notes from API works", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const model = new NotesModel();

    const clientMock = {
      loadNotes: (callback) => {
        callback(["this is a test note"]);
      },
    };

    const view = new NotesView(model, clientMock);

    view.displayNotesFromApi();

    expect(document.querySelector("div.note").textContent).toBe("this is a test note");
  });

  it("emojify method can covert a string into emojified version", async () => {
    const model = new NotesModel()
    const client = new NotesClient()
    const view = new NotesView(model, client)

    const string = 'this is fire :fire:'

    expect.assertions(1);
    const data = await view.emojify(string)
    expect(data).toBe("this is fire ????");
  })
});
