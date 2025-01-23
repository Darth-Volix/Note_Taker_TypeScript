// This file contains the interfaces and classes for the Document Manager application

// Import the readline module
import * as readline from 'readline';

// Define the interfaces

interface NoteInterface {
    noteDate: Date;
    noteTitle: string;
    noteBody: string;
}

interface FolderInterface {
    folderName: string;
    notes: NoteInterface[];
}

// Define the Classes

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

export class DocumentManager {
    // Properties
    folders: Folder[];
    rl: readline.Interface;

    // Constructor
    constructor() {
        this.folders = [];

        // Initialize the readline interface
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Abstract away the readline question functionality
    askQuestion(query: string): Promise<string> {
        return new Promise(resolve => this.rl.question(query, resolve));
    }

    // Add a folder
    async createFolder(): Promise<void> {
        let folderName: string | null = null;

        while (!folderName) {
            folderName = await this.askQuestion("Enter a name for your folder: ");
            if (folderName === null) {
                console.log("Folder name cannot be null");
            } else if (this.folders.find(folder => folder.folderName === folderName)) {
                console.log("Folder already exists");
                folderName = null;
            }
        }

        this.folders.push(new Folder(folderName));
        console.log("Folder created successfully");
    }

    // Create a note
    async createNote(): Promise<Note> {
        let noteTitle: string | null = null;
        let noteBody: string | null = null;

        while (!noteTitle) {
            noteTitle = await this.askQuestion("Enter a title for your note: ");
            if (noteTitle === null) {
                console.log("Note title cannot be null");
            }
        }

        while (!noteBody) {
            noteBody = await this.askQuestion("Enter your note: ");
            if (noteBody === null) {
                console.log("Note body cannot be null");
            }
        }

        return new Note(noteTitle, noteBody);
    }

    // Display a note to the terminal
    displayNote(note: Note): void {
        console.log("------------------------------------------------");
        console.log(`Date: ${note.noteDate}`);
        console.log(`Title: ${note.noteTitle}`);
        console.log(`Body: ${note.noteBody}`);
        console.log("------------------------------------------------");
    }

    // Add a note to a folder
    assignNoteToFolder(note: Note, folderName: string): void {
        const folder = this.folders.find(folder => folder.folderName === folderName);
        if (folder) {
            folder.notes.push(note);
        } else {
            console.log("Folder not found or does not exist.");
        }
    }

    // View the contents of a folder
    async displayFolderContents(folderName: string) : Promise<void> {
        const folder = await this.searchForFolder();

        if (folder){
            folder.notes.forEach((Note) => {
               this.displayNote(Note);
            });
        } else {
            console.log("Folder not found or does not exist.");
        }
    }

    // Edit a note
    async editNote(): Promise<void> {
        let noteName: string | null = null;

        const folder = await this.searchForFolder();

        while (!noteName) {
            noteName = await this.askQuestion("What is the title of the note you would like to edit?: ");
            if (noteName === null || "") {
                console.log("The title of the note you want to edit cannot be null or empty.")
            }
        }
        
       const note = folder?.notes.find(note => note.noteTitle === noteName);

       if (!note) {
        console.log("Note does not exist.")
       } else {
        console.log("Here are the details of the note: ")
        this.displayNote(note);

        const newNoteBody = await this.askQuestion("Enter your changes to the body of the note: ");
        note.noteBody = newNoteBody;
        console.log("Note updated successfully.");
       }
    }

    async searchForFolder(): Promise<Folder | null> {
        let folderName: string | null = null;
        let openOrSearch: string | null = null;

        while (!openOrSearch) {
            openOrSearch = await this.askQuestion("Are you wanting to search for a folder or open a folder? (type 'Search' or 'Open'): ")

            if (openOrSearch.toLowerCase() === 'search') {
                while (!folderName){
                    folderName = await this.askQuestion("What is the name of the folder you are wanting to look for?: ")
                    if (!folderName || folderName.trim() === ""){
                        console.log("The name of the folder you are searching for cannot be null or empty.");
                        folderName = null;
                    } else {
                        const folder = this.folders.find(folder => folder.folderName === folderName);
                        if (folder) {
                            return folder;
                        } else {
                            console.log("Folder not found.");
                            folderName = null;
                        }
                    }
                }
            } else if (openOrSearch.toLowerCase() === 'open'){
                while (!folderName){
                    folderName = await this.askQuestion("What is the name of the folder you are wanting to look for?: ")
                    if (!folderName || folderName.trim() === ""){
                        console.log("The name of the folder you are opening cannot be null or empty.");
                        folderName = null;
                    } else {
                        const folder = this.folders.find(folder => folder.folderName === folderName);
                        if (folder) {
                            return folder;
                        } else {
                            console.log("Folder not found.");
                            folderName = null;
                        }
                    }
                }
            } else {
                console.log("That is not a valid option, please try again.");
                openOrSearch = null;
            }
        }

        // Should never be reached
        return null;
    }
}