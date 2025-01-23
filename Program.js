"use strict";
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
const DocumentManager_1 = require("./DocumentManager");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let running = true;
        const documentManager = new DocumentManager_1.DocumentManager();
        console.clear();
        console.log('Welcome to your Notes App!\n');
        while (running) {
            console.log('Commands:');
            console.log('       1. Create a Folder');
            console.log('       2. Create a Note');
            console.log('       3. Display Folders');
            console.log('       4. Display Folder Contents');
            console.log('       5. Edit a note');
            console.log('       6. Exit\n');
            let userChoice = yield documentManager.askQuestion('Enter a command: ');
            console.clear();
            switch (userChoice) {
                case '1':
                    yield documentManager.createFolder();
                    break;
                case '2':
                    yield documentManager.createNote();
                    break;
                case '3':
                    documentManager.displayFolders();
                    break;
                case '4':
                    yield documentManager.displayFolderContents();
                    break;
                case '5':
                    yield documentManager.editNote();
                    break;
                case '6':
                    console.log('Goodbye!');
                    process.exit();
                default:
                    console.log('Invalid command');
                    break;
            }
            // Small pause before redisplaying menu
            yield new Promise(resolve => setTimeout(resolve, 100));
        }
    });
}
main();
