// This file contains the interfaces and classes for the Document Manager application

// Import the readline module
import * as readline from 'readline';

// Define the interfaces

interface NoteInterface {
    notetDate: Date;
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
    notetDate: Date;
    noteTitle: string;
    noteBody: string;

    // Constructor
    constructor(noteTitle: string, noteBody: string) {
        this.notetDate = new Date();
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
    displayFolderContents(folderName: string) : void {
        const folder = this.folders.find(folder => folder.folderName === folderName);

        if (folder){
            folder.notes.forEach((Note) => {
                console.log("------------------------------------------------");
                console.log(`Date: ${Note.notetDate}`);
                console.log(`Title: ${Note.noteTitle}`);
                console.log(`Body: ${Note.noteBody}`);
                console.log("------------------------------------------------");
            });
        } else {
            console.log("Folder not found or does not exist.");
        }
    }

    // Edit a note
    async editNote(): Promise<void> {
        let noteName: string | null = null;

        while (!noteName) {
            noteName = await this.askQuestion("What is the title of the note you would like to edit?: ");
            if (noteName === null) {
                console.log("The title of the note you want to edit cannot be null.")
                noteName = null;
            }
        }

    }
}