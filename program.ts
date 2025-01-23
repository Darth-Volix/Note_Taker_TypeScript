import { DocumentManager } from './classes';

function main() {
    const documentManager = new DocumentManager;

    console.log('\nWelcome to your Notes App!\n');
    console.log('Commands:');
    console.log('       1. Create a folder');
    console.log('       2. Create a note');
    console.log('       4. Display folder contents');
    console.log('       5. Edit a note');
    console.log('       6. Exit\n');

    documentManager.askQuestion('Enter a command: ')
        .then((command) => {
            switch (command) {
                case '1':
                    documentManager.createFolder();
                    break;
                case '2':
                    documentManager.createNote()
                        .then((note) => {
                            documentManager.displayNote(note);
                        });
                    break;
                case '3':
                    documentManager.assignNoteToFolder();
                    break;
                case '4':
                    documentManager.displayFolderContents();
                    break;
                case '5':
                    documentManager.editNote();
                    break;
                case '6':
                    console.log('Goodbye!');
                    break;
                default:
                    console.log('Invalid command');
                    break;
            }
        });

}

main();