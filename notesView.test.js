/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesView = require("./notesView");
const NotesModel = require('./notesModel')

describe("notesView", () => {
  // We can use the beforeEach() hook
  // to set the jest `document` HTML before each test
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displayNotes creates notes on the webpage", () => {
    // 1. Arrange - instantiate our View class
    const model = new NotesModel;
    
    // 2. Act - call any method that modifies the page
    // this method `displayTitle` would dynamically
    // set a <h1> title on the page with the given content
    model.addNote('test note 1')
    model.addNote('test note 2')
    
    const view = new NotesView(model);
    
    view.displayNotes()

    // 3. Assert - we assert the page contains what it should.
    // Usually, you will use `.querySelector` (and friends)
    // here, and assert the text content, the number of elements,
    // or other things that make sense for your test.
    expect(document.querySelectorAll("div.note").length).toBe(2);
  });
});
