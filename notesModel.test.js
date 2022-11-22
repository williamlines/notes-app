const NotesModel = require("./notesModel");

describe("class: NotesModel", () => {
  beforeEach(() => {
    this.notesModel = new NotesModel();
  });
  describe("getNotes", () => {
    it("initial will get an empty array", () => {
      expect(this.notesModel.getNotes()).toEqual([]);
    });
  });
  describe("addNotes", () => {
    it("can add a note", () => {
      this.notesModel.addNote("perform a test");
      expect(this.notesModel.getNotes()).toEqual(["perform a test"]);
    });
    it("can add multiple notes", () => {
      this.notesModel.addNote("perform test 1");
      this.notesModel.addNote("perform test 2");
      expect(this.notesModel.getNotes()).toEqual([
        "perform test 1",
        "perform test 2",
      ]);
    });
  });
  describe("reset", () => {
    it("resets the notes app", () => {
      this.notesModel.addNote("perform test 1");
      this.notesModel.addNote("perform test 2");
      expect(this.notesModel.getNotes()).toEqual([
        "perform test 1",
        "perform test 2",
      ]);
      this.notesModel.reset()
      expect(this.notesModel.getNotes()).toEqual([])
    });
  });
  it("setNotes", () => {
    this.notesModel.setNotes(['note 1', 'note 2'])
    expect(this.notesModel.getNotes()).toEqual(["note 1", "note 2"]);
  })
});
