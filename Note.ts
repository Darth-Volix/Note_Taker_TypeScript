export interface NoteInterface {
    noteDate: Date;
    noteTitle: string;
    noteBody: string;
}

export class Note implements NoteInterface {
    // Properties
    noteDate: Date;
    noteTitle: string;
    noteBody: string;

    // Constructor
    constructor(noteTitle: string, noteBody: string) {
        this.noteDate = new Date();
        this.noteTitle = noteTitle;
        this.noteBody = noteBody;
    }
}