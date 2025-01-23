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
// Import the readline module
const readline = __importStar(require("readline"));
class DocumentManager {
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
    askQuestion(query) {
        return new Promise(resolve => this.rl.question(query, resolve));
    }
    // Add a folder
    createFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            let folderName = null;
            while (!folderName) {
                folderName = yield this.askQuestion("Enter a name for your folder: ");
                if (folderName === null) {
                    console.log("Folder name cannot be null");
                }
                else if (this.folders.find(folder => folder.folderName === folderName || folder.folderName.toLowerCase() === (folderName === null || folderName === void 0 ? void 0 : folderName.toLowerCase()))) {
                    console.log("\n*** Folder already exists ***\n");
                    folderName = null;
                }
            }
            this.folders.push(new Folder_1.Folder(folderName));
            console.log("\n*** Folder created successfully ***\n");
        });
    }
    // Create a note
    createNote() {
        return __awaiter(this, void 0, void 0, function* () {
            let noteTitle = null;
            let noteBody = null;
            if (this.folders.length === 0) {
                console.log("*** You must create a folder before creating a note ***\n");
                yield this.createFolder();
            }
            while (!noteTitle) {
                noteTitle = yield this.askQuestion("Enter a title for your note: ");
                if (noteTitle === null || noteTitle.trim() === "") {
                    console.log("\n*** Note title cannot be null ***\n");
                }
            }
            while (!noteBody) {
                noteBody = yield this.askQuestion("Enter your note: ");
                if (noteBody === null || noteBody.trim() === "") {
                    console.log("Note body cannot be null");
                }
            }
            const note = new Note_1.Note(noteTitle, noteBody);
            console.clear();
            console.log("Note created successfully: ");
            this.displayNote(note);
            if (this.folders.length > 0) {
                let assigned = false;
                while (!assigned) {
                    const assign = yield this.askQuestion("\nWould you like to assign this note to a current folder or a new one? (type 'Current' or 'New'): ");
                    console.clear();
                    if (assign.toLowerCase() === 'current') {
                        let currentFound = false;
                        this.displayFolders();
                        while (!currentFound) {
                            const folderName = yield this.askQuestion("Enter the name of the folder you would like to assign the note to: ");
                            if (this.assignNoteToFolder(note, folderName)) {
                                currentFound = true;
                                assigned = true;
                                console.log("\n*** Note assigned successfully. Returning to main menu... ***\n");
                                yield new Promise(resolve => setTimeout(resolve, 4000));
                                console.clear();
                            }
                            else {
                                console.log("Please try again.");
                            }
                        }
                    }
                    else if (assign.toLowerCase() === 'new') {
                        yield this.createFolder();
                        this.displayFolders();
                        let newFound = false;
                        while (!newFound) {
                            const folderName = yield this.askQuestion("Enter the name of the folder you would like to assign the note to: ");
                            if (this.assignNoteToFolder(note, folderName)) {
                                newFound = true;
                                assigned = true;
                                console.log("\n*** Note assigned successfully. Returning to main menu... ***\n");
                                yield new Promise(resolve => setTimeout(resolve, 4000));
                                console.clear();
                            }
                            else {
                                console.log("Please try again.");
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
    // Display a note to the terminal
    displayNote(note) {
        console.log("----------------------------------------------------------------------");
        console.log(`Date: ${note.noteDate}`);
        console.log(`Title: ${note.noteTitle}`);
        console.log(`Body: ${note.noteBody}`);
        console.log("----------------------------------------------------------------------");
    }
    // Add a note to a folder
    assignNoteToFolder(note, folderName) {
        const folder = this.searchForFolder(folderName);
        if (folder) {
            folder.notes.push(note);
            return true;
        }
        else {
            console.log("Folder not found or does not exist.");
            return false;
        }
    }
    // Display all folders
    displayFolders() {
        if (this.folders.length === 0) {
            console.log("*** No folders found ***\n");
        }
        else {
            console.log("Folders: \n");
            this.folders.forEach((folder) => {
                console.log(folder.folderName);
            });
            console.log("\n");
        }
    }
    // View the contents of a folder
    displayFolderContents() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.folders.length === 0) {
                console.log("*** No folders found ***\n");
                return;
            }
            this.displayFolders();
            const folder = yield this.userSearchForFolder();
            if (folder) {
                if (folder.notes.length === 0) {
                    console.log("\n*** Folder is empty ***\n");
                    console.log("Returning to main menu...");
                    yield new Promise(resolve => setTimeout(resolve, 4000));
                    console.clear();
                    return;
                }
                console.clear();
                console.log(`Folder: ${folder.folderName}\n`);
                folder.notes.forEach((Note) => {
                    this.displayNote(Note);
                });
                console.log("\n");
            }
            else {
                console.log("Folder not found or does not exist.");
            }
        });
    }
    editNote() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.folders.length === 0) {
                console.log("*** No folders found ***\n");
                return;
            }
            // Clear and display folders once
            console.clear();
            console.log("Available Folders:");
            this.displayFolders();
            const folder = yield this.userSearchForFolder();
            if (!folder) {
                console.log("*** Folder not found ***\n");
                return;
            }
            // Display notes in the folder
            console.clear();
            if (folder.notes.length === 0) {
                console.log("*** No notes found in this folder ***\n");
                return;
            }
            console.log(`Notes in folder '${folder.folderName}':`);
            folder.notes.forEach(note => console.log(`- ${note.noteTitle}`));
            let noteName = null;
            while (!noteName) {
                noteName = yield this.askQuestion("\nWhat is the title of the note you would like to edit?: ");
                if (!noteName.trim()) {
                    console.log("*** Note title cannot be empty ***");
                    noteName = null;
                }
            }
            const note = folder.notes.find(note => note.noteTitle === noteName);
            if (!note) {
                console.log("*** Note not found ***\n");
                return;
            }
            // Display the note details
            console.clear();
            console.log("\nCurrent Note Details:");
            this.displayNote(note);
            // Update the note
            const newNoteBody = yield this.askQuestion("\nEnter your changes to the note body: ");
            note.noteBody = newNoteBody.trim();
            console.log("\n*** Note updated successfully ***");
            yield new Promise(resolve => setTimeout(resolve, 2000));
            console.clear();
        });
    }
    // Abstracted code to search for a folder
    searchForFolder(folderName) {
        return this.folders.find(folder => folder.folderName === folderName) || null;
    }
    // User code to search for a folder
    userSearchForFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            let folderName = null;
            while (!folderName) {
                folderName = yield this.askQuestion("What is the name of the folder you are wanting to open?: ");
                if (!folderName || folderName.trim() === "") {
                    console.log("The name of the folder you are opening cannot be null or empty.");
                    folderName = null;
                }
                else {
                    const folder = this.searchForFolder(folderName);
                    if (folder) {
                        return folder;
                    }
                    else {
                        console.log("Folder not found.");
                        folderName = null;
                    }
                }
            }
            // Should never be reached
            return null;
        });
    }
}
exports.DocumentManager = DocumentManager;
