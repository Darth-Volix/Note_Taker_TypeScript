"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentManager = void 0;
// Import the Note and Folder classes
const Note_1 = require("./Note");
const Folder_1 = require("./Folder");
// Import the readline module to handle user input
const readline = __importStar(require("readline"));
class DocumentManager {
    // Constructor 
    constructor() {
        this.folders = [];
        // Create a readline interface for user input and output
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    /**
     * Prompts the user with a query and returns their input as a promise.
     * @param query - The question to ask the user.
     * @returns A promise that resolves to the user's input.
     */
    askQuestion(query) {
        return new Promise(resolve => this.rl.question(query, resolve));
    }
    /**
     * Creates a new folder by prompting the user for a unique folder name.
     * Ensures that the folder name is valid and not a duplicate.
     */
    createFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            let folderName = null;
            // Loop until a valid folder name is provided
            while (!folderName) {
                folderName = yield this.askQuestion("Enter a name for your folder: ");
                // Validate folder name
                if (folderName === null || folderName.trim() === "") {
                    console.log("\n*** Folder name cannot be null ***\n");
                }
                else if (this.folders.find(folder => folder.folderName === folderName ||
                    folder.folderName.toLowerCase() === (folderName === null || folderName === void 0 ? void 0 : folderName.toLowerCase()))) {
                    console.log("\n*** Folder already exists ***\n");
                    folderName = null;
                }
            }
            // Add the new folder to the folders array
            this.folders.push(new Folder_1.Folder(folderName));
            console.log("\n*** Folder created successfully ***\n");
            console.log("Please Wait...");
            // Pause briefly and clear the console
            yield new Promise(resolve => setTimeout(resolve, 2000));
            console.clear();
        });
    }
    /**
     * Creates a new note by prompting the user for a title and body.
     * Ensures a folder exists before assigning the note to a folder.
     */
    createNote() {
        return __awaiter(this, void 0, void 0, function* () {
            let noteTitle = null;
            let noteBody = null;
            // Ensure at least one folder exists before creating a note
            if (this.folders.length === 0) {
                console.log("*** You must create a folder before creating a note ***\n");
                yield this.createFolder();
            }
            // Prompt user for note title
            while (!noteTitle) {
                noteTitle = yield this.askQuestion("Enter a title for your note: ");
                if (noteTitle === null || noteTitle.trim() === "") {
                    console.log("\n*** Note title cannot be null ***\n");
                }
            }
            // Prompt user for note body
            while (!noteBody) {
                noteBody = yield this.askQuestion("Enter your note: ");
                if (noteBody === null || noteBody.trim() === "") {
                    console.log("\n*** Note body cannot be null ***\n");
                }
            }
            // Create the note and display it
            const note = new Note_1.Note(noteTitle, noteBody);
            console.clear();
            console.log("Note created successfully: ");
            this.displayNote(note);
            // Assign the note to a folder
            if (this.folders.length > 0) {
                let assigned = false;
                while (!assigned) {
                    const assign = yield this.askQuestion("\nWould you like to assign this note to a current folder or a new one? (type 'Current' or 'New'): ");
                    console.clear();
                    if (assign.toLowerCase() === 'current') {
                        let currentFound = false;
                        // Prompt user to select an existing folder
                        while (!currentFound) {
                            this.displayFolders();
                            const folderName = yield this.askQuestion("Enter the name of the folder you would like to assign the note to: ");
                            if (this.assignNoteToFolder(note, folderName)) {
                                currentFound = true;
                                assigned = true;
                                console.log("\n*** Note assigned successfully ***");
                                console.log("\nReturning to main menu...");
                                yield new Promise(resolve => setTimeout(resolve, 2000));
                                console.clear();
                            }
                            else {
                                console.log("\n*** Folder Not Found. Please try again ***\n");
                                yield new Promise(resolve => setTimeout(resolve, 2000));
                                console.clear();
                            }
                        }
                    }
                    else if (assign.toLowerCase() === 'new') {
                        // Create a new folder and assign the note to it
                        yield this.createFolder();
                        let newFound = false;
                        while (!newFound) {
                            this.displayFolders();
                            const folderName = yield this.askQuestion("Enter the name of the folder you would like to assign the note to: ");
                            if (this.assignNoteToFolder(note, folderName)) {
                                newFound = true;
                                assigned = true;
                                console.log("\n*** Note assigned successfully ***");
                                console.log("\nReturning to main menu...");
                                yield new Promise(resolve => setTimeout(resolve, 2000));
                                console.clear();
                            }
                            else {
                                console.log("*** Folder Not Found. Please try again ***\n");
                                yield new Promise(resolve => setTimeout(resolve, 2000));
                                console.clear();
                            }
                        }
                    }
                    else {
                        console.log("That is not a valid option, please try again.");
                    }
                }
            }
        });
    }
    /**
     * Displays the details of a note, including the date, title, and body.
     * @param note - The note to display.
     */
    displayNote(note) {
        console.log("----------------------------------------------------------------------");
        console.log(`Date: ${note.noteDate}`);
        console.log(`Title: ${note.noteTitle}`);
        console.log(`Body: ${note.noteBody}`);
        console.log("----------------------------------------------------------------------");
    }
    /**
     * Assigns a note to a folder by the given folder name.
     * @param note - The note to assign.
     * @param folderName - The name of the folder to assign the note to.
     * @returns True if the folder is found and the note is assigned; otherwise, false.
     */
    assignNoteToFolder(note, folderName) {
        const folder = this.searchForFolder(folderName);
        if (folder) {
            folder.notes.push(note);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Displays all folders and their names.
     * If no folders exist, informs the user.
     */
    displayFolders() {
        if (this.folders.length === 0) {
            console.log("*** No folders found ***\n");
        }
        else {
            console.log("Folders: \n");
            this.folders.forEach((folder) => {
                console.log(`- ${folder.folderName}`);
            });
            console.log("\n");
        }
    }
    /**
     * Displays the contents of a selected folder, including its notes.
     * If the folder is empty, informs the user and returns to the main menu.
     */
    displayFolderContents() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.folders.length === 0) {
                console.log("*** No folders found ***\n");
                return;
            }
            // Show all available folders
            this.displayFolders();
            const folder = yield this.userSearchForFolder();
            if (folder) {
                if (folder.notes.length === 0) {
                    console.log("\n*** Folder is empty ***");
                    console.log("\nReturning to main menu...");
                    yield new Promise(resolve => setTimeout(resolve, 2000));
                    console.clear();
                    return;
                }
                // Display the folder's notes
                console.clear();
                console.log(`Folder: ${folder.folderName}\n`);
                folder.notes.forEach((note) => {
                    this.displayNote(note);
                });
                console.log("\n");
            }
            else {
                console.log("\n*** Folder not found or does not exist ***\n");
            }
        });
    }
    /**
     * Allows the user to edit an existing note in a selected folder.
     * Prompts the user to select a folder, choose a note, and update its body content.
     * Provides feedback if no folders or notes are found.
     */
    editNote() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Check if there are any folders available
            if (this.folders.length === 0) {
                console.log("*** No folders found ***\n");
                return;
            }
            // Clear the console and display the list of folders
            console.clear();
            this.displayFolders();
            // Prompt the user to select a folder
            const folder = yield this.userSearchForFolder();
            if (!folder) {
                console.log("*** Folder not found ***\n");
                return;
            }
            // Clear the console and display notes in the selected folder
            console.clear();
            if (folder.notes.length === 0) {
                console.log("*** No notes found in this folder ***\n");
                return;
            }
            console.log(`Notes in folder '${folder.folderName}':\n`);
            folder.notes.forEach(note => console.log(`- ${note.noteTitle}`));
            let note = null;
            let noteName = null;
            // Loop to ensure a valid note is selected
            while (!note) {
                noteName = yield this.askQuestion("\nWhat is the title of the note you would like to edit?: ");
                if (!noteName.trim()) {
                    console.log("\n*** Note title cannot be empty ***");
                    yield new Promise(resolve => setTimeout(resolve, 2000));
                    console.clear();
                    console.log(`Notes in folder '${folder.folderName}':`);
                    folder.notes.forEach(note => console.log(`- ${note.noteTitle}`));
                }
                else {
                    note = (_a = folder.notes.find(note => note.noteTitle === noteName)) !== null && _a !== void 0 ? _a : null;
                    if (!note) {
                        console.log("\n*** Note not found ***\n");
                        yield new Promise(resolve => setTimeout(resolve, 2000));
                        console.clear();
                        console.log(`Notes in folder '${folder.folderName}':`);
                        folder.notes.forEach(note => console.log(`- ${note.noteTitle}`));
                    }
                }
            }
            // Clear the console and display the current note details
            console.clear();
            console.log("Current Note Details:");
            this.displayNote(note);
            // Prompt the user to update the note body
            const newNoteBody = yield this.askQuestion("\nEnter your changes to the note body: ");
            note.noteBody = newNoteBody.trim();
            // Confirm successful update and return to the main menu
            console.log("\n*** Note updated successfully ***");
            console.log("\nReturning to main menu...");
            yield new Promise(resolve => setTimeout(resolve, 2000));
            console.clear();
        });
    }
    /**
     * Searches for a folder in the `folders` array by its name.
     *
     * @param folderName - The name of the folder to search for.
     * @returns The matching Folder object, or null if not found.
     */
    searchForFolder(folderName) {
        return this.folders.find(folder => folder.folderName === folderName) || null;
    }
    /**
     * Prompts the user to search for a folder by entering its name.
     * Provides feedback and retries until a valid folder is found or the user cancels.
     *
     * @returns The selected Folder object, or null if not found.
     */
    userSearchForFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            let folderName = null;
            // Loop to ensure a valid folder is selected
            while (!folderName) {
                // Clear the console at the start of each loop iteration
                console.clear();
                // Display available folders for better user context
                this.displayFolders();
                // Ask the user for the folder name
                folderName = yield this.askQuestion("What is the name of the folder you are wanting to open?: ");
                if (!folderName || folderName.trim() === "") {
                    console.log("\n*** Invalid input. Please try again! ***\n");
                    folderName = null; // Reset folderName to repeat the loop
                    yield new Promise(resolve => setTimeout(resolve, 2000)); // Pause briefly to show the error message
                }
                else {
                    const folder = this.searchForFolder(folderName.trim());
                    if (folder) {
                        return folder; // Folder found, exit the function
                    }
                    else {
                        console.log("\n*** Folder not found. Please try again! ***\n");
                        folderName = null; // Reset folderName to repeat the loop
                        yield new Promise(resolve => setTimeout(resolve, 2000)); // Pause briefly to show the error message
                    }
                }
            }
            // Should never be reached, but it's a safeguard
            return null;
        });
    }
}
exports.DocumentManager = DocumentManager;
