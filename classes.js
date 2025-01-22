"use strict";
// This file contains the interfaces and classes for the Document Manager application
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
exports.DocumentManager = exports.Folder = exports.Note = void 0;
const readline = __importStar(require("readline"));
// Define the Classes
class Note {
    // Constructor
    constructor(noteTitle, noteBody) {
        this.noteDate = new Date();
        this.noteTitle = noteTitle;
        this.noteBody = noteBody;
    }
}
exports.Note = Note;
class Folder {
    // Constructor 
    constructor(folderName) {
        this.folderName = folderName;
        this.notes = [];
    }
}
exports.Folder = Folder;
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
                else if (this.folders.find(folder => folder.folderName === folderName)) {
                    console.log("Folder already exists");
                    folderName = null;
                }
            }
            this.folders.push(new Folder(folderName));
            console.log("Folder created successfully");
        });
    }
    // Create a note
    createNote() {
        return __awaiter(this, void 0, void 0, function* () {
            let noteTitle = null;
            let noteBody = null;
            while (!noteTitle) {
                noteTitle = yield this.askQuestion("Enter a title for your note: ");
                if (noteTitle === null) {
                    console.log("Note title cannot be null");
                }
            }
            while (!noteBody) {
                noteBody = yield this.askQuestion("Enter your note: ");
                if (noteBody === null) {
                    console.log("Note body cannot be null");
                }
            }
            return new Note(noteTitle, noteBody);
        });
    }
    // Display a note to the terminal
    displayNote(note) {
        console.log("------------------------------------------------");
        console.log(`Date: ${note.noteDate}`);
        console.log(`Title: ${note.noteTitle}`);
        console.log(`Body: ${note.noteBody}`);
        console.log("------------------------------------------------");
    }
    // Add a note to a folder
    assignNoteToFolder(note, folderName) {
        const folder = this.folders.find(folder => folder.folderName === folderName);
        if (folder) {
            folder.notes.push(note);
        }
        else {
            console.log("Folder not found or does not exist.");
        }
    }
    // View the contents of a folder
    displayFolderContents(folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield this.searchForFolder();
            if (folder) {
                folder.notes.forEach((Note) => {
                    this.displayNote(Note);
                });
            }
            else {
                console.log("Folder not found or does not exist.");
            }
        });
    }
    // Edit a note
    editNote() {
        return __awaiter(this, void 0, void 0, function* () {
            let noteName = null;
            const folder = yield this.searchForFolder();
            while (!noteName) {
                noteName = yield this.askQuestion("What is the title of the note you would like to edit?: ");
                if (noteName === null || "") {
                    console.log("The title of the note you want to edit cannot be null or empty.");
                }
            }
            const note = folder === null || folder === void 0 ? void 0 : folder.notes.find(note => note.noteTitle === noteName);
            if (!note) {
                console.log("Note does not exist.");
            }
            else {
                console.log("Here are the details of the note: ");
                this.displayNote(note);
                const newNoteBody = yield this.askQuestion("Enter your changes to the body of the note: ");
                note.noteBody = newNoteBody;
                console.log("Note updated successfully.");
            }
        });
    }
    searchForFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            let folderName = null;
            let openOrSearch = null;
            while (!openOrSearch) {
                openOrSearch = yield this.askQuestion("Are you wanting to search for a folder or open a folder? (type 'Search' or 'Open'): ");
                if (openOrSearch.toLowerCase() === 'search') {
                    while (!folderName) {
                        folderName = yield this.askQuestion("What is the name of the folder you are wanting to look for?: ");
                        if (!folderName || folderName.trim() === "") {
                            console.log("The name of the folder you are searching for cannot be null or empty.");
                            folderName = null;
                        }
                        else {
                            const folder = this.folders.find(folder => folder.folderName === folderName);
                            if (folder) {
                                return folder;
                            }
                            else {
                                console.log("Folder not found.");
                                folderName = null;
                            }
                        }
                    }
                }
                else if (openOrSearch.toLowerCase() === 'open') {
                    while (!folderName) {
                        folderName = yield this.askQuestion("What is the name of the folder you are wanting to look for?: ");
                        if (!folderName || folderName.trim() === "") {
                            console.log("The name of the folder you are opening cannot be null or empty.");
                            folderName = null;
                        }
                        else {
                            const folder = this.folders.find(folder => folder.folderName === folderName);
                            if (folder) {
                                return folder;
                            }
                            else {
                                console.log("Folder not found.");
                                folderName = null;
                            }
                        }
                    }
                }
                else {
                    console.log("That is not a valid option, please try again.");
                    openOrSearch = null;
                }
            }
            // Should never be reached
            return null;
        });
    }
}
exports.DocumentManager = DocumentManager;