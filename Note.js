"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
class Note {
    // Constructor
    constructor(noteTitle, noteBody) {
        this.noteDate = new Date();
        this.noteTitle = noteTitle;
        this.noteBody = noteBody;
    }
}
exports.Note = Note;
