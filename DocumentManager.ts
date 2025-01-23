// Import the Note and Folder classes
import { Note } from './Note';
import { Folder } from './Folder';

// Import the readline module
import * as readline from 'readline';

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
            } else if (this.folders.find(folder => folder.folderName === folderName || folder.folderName.toLowerCase() === folderName?.toLowerCase())) {
                console.log("\n*** Folder already exists ***\n");
                folderName = null;
            }
        }

        this.folders.push(new Folder(folderName));
        console.log("\n*** Folder created successfully ***\n");
    }

    // Create a note
    async createNote(): Promise<void> {
        let noteTitle: string | null = null;
        let noteBody: string | null = null;

        if (this.folders.length === 0) {
            console.log("*** You must create a folder before creating a note ***\n");
            await this.createFolder();
        }

        while (!noteTitle) {
            noteTitle = await this.askQuestion("Enter a title for your note: ");
            if (noteTitle === null || noteTitle.trim() === "") {
                console.log("\n*** Note title cannot be null ***\n");
            }
        }

        while (!noteBody) {
            noteBody = await this.askQuestion("Enter your note: ");
            if (noteBody === null || noteBody.trim() === "") {
                console.log("Note body cannot be null");
            }
        }

        const note = new Note(noteTitle, noteBody);
        
        console.clear();
        console.log("Note created successfully: ");
        this.displayNote(note);

        if (this.folders.length > 0) {
            let assigned = false;
            while (!assigned) {
                const assign = await this.askQuestion("Would you like to assign this note to a current folder or a new one? (type 'Current' or 'New'): ");
                console.clear();
                if (assign.toLowerCase() === 'current') {
                    let currentFound = false;

                    this.displayFolders();

                    while (!currentFound) {
                        const folderName = await this.askQuestion("Enter the name of the folder you would like to assign the note to: ");
                        if (this.assignNoteToFolder(note, folderName)) {
                            currentFound = true;
                            assigned = true;

                            console.log("\n*** Note assigned successfully. Returning to main menu... ***\n");
                            await new Promise(resolve => setTimeout(resolve, 4000));
                            console.clear();
                        } else {
                            console.log("Please try again.");
                        }
                    }
                } else if (assign.toLowerCase() === 'new') {
                    await this.createFolder();
                    this.displayFolders();

                    let newFound = false;

                    while (!newFound) {
                        const folderName = await this.askQuestion("Enter the name of the folder you would like to assign the note to: ");
                        if (this.assignNoteToFolder(note, folderName)) {
                            newFound = true;
                            assigned = true;

                            console.log("\n*** Note assigned successfully. Returning to main menu... ***\n");
                            await new Promise(resolve => setTimeout(resolve, 4000));
                            console.clear();
                        } else {
                            console.log("Please try again.");
                        }
                    }
                } else {
                    console.log("That is not a valid option, please try again.");
                }
            }
        }
    }

    // Display a note to the terminal
    displayNote(note: Note): void {
        console.log("----------------------------------------------------------------------");
        console.log(`Date: ${note.noteDate}`);
        console.log(`Title: ${note.noteTitle}`);
        console.log(`Body: ${note.noteBody}`);
        console.log("----------------------------------------------------------------------");
    }

    // Add a note to a folder
    assignNoteToFolder(note: Note, folderName: string): boolean {
        const folder = this.searchForFolder(folderName);
        if (folder) {
            folder.notes.push(note);
            console.log("\n*** Note assigned to folder successfully ***\n");
            return true;
        } else {
            console.log("Folder not found or does not exist.");
            return false;
        }
    }

    displayFolders(): void {
        if (this.folders.length === 0) {
            console.log("*** No folders found ***\n");
        } else {
            console.log("Folders: \n");
            this.folders.forEach((folder) => {
                console.log(folder.folderName);
            });
            console.log("\n");
        }
    }

    // View the contents of a folder
    async displayFolderContents(): Promise<void> {
        if (this.folders.length === 0) {
            console.log("*** No folders found ***\n");
            return;
        }

        console.clear();

        this.displayFolders();

        const folder = await this.userSearchForFolder();

        if (folder){

            if (folder.notes.length === 0) {
                console.log("\n*** Folder is empty ***\n");
                console.log("Returning to main menu...");

                await new Promise(resolve => setTimeout(resolve, 4000));
                console.clear();

                return;
            }

            console.log(`\nFolder: ${folder.folderName}\n`);
            folder.notes.forEach((Note) => {
               this.displayNote(Note);
            });
            console.log("\n");
        } else {
            console.log("Folder not found or does not exist.");
        }
    }

    // Edit a note
    async editNote(): Promise<void> {
        let noteName: string | null = null;

        if (this.folders.length === 0) {
            console.log("*** No folders found ***\n");
            return;
        }

        const folder = await this.userSearchForFolder();

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

    // Abstracted code to search for a folder
    searchForFolder(folderName: string): Folder | null { 
        return this.folders.find(folder => folder.folderName === folderName) || null;
    }

    // User code to search for a folder
    async userSearchForFolder(): Promise<Folder | null> {
        let folderName: string | null = null;
    
        while (!folderName) {
            folderName = await this.askQuestion("What is the name of the folder you are wanting to open?: ");
            
            if (!folderName || folderName.trim() === "") {
                console.log("The name of the folder you are opening cannot be null or empty.");
                folderName = null;
            } else {
                const folder = this.searchForFolder(folderName);
                if (folder) {
                    return folder;
                } else {
                    console.log("Folder not found.");
                    folderName = null;
                }
            }
        }
    
        // Should never be reached
        return null;
    }
    
}