import { NoteInterface, Note } from './Note';

interface FolderInterface {
    folderName: string;
    notes: NoteInterface[];
}

export class Folder implements FolderInterface{
    // Properties
    folderName: string;
    notes: Note[];

    // Constructor 
    constructor(folderName: string) {
        this.folderName = folderName;
        this.notes = [];
    }
}