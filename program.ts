import { DocumentManager } from './DocumentManager';

async function main(): Promise<void> {
    let running: boolean = true;
    const documentManager: DocumentManager = new DocumentManager;

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

        let userChoice = await documentManager.askQuestion('Enter a command: ');
        switch (userChoice) {
            case '1':
                console.clear();
                await documentManager.createFolder();
                break;
            case '2':
                console.clear();
                await documentManager.createNote();
                break;
            case '3':
                console.clear();
                documentManager.displayFolders();
                break;
            case '4':
                console.clear();
                await documentManager.displayFolderContents();
                break;
            case '5':
                console.clear();
                await documentManager.editNote();
                break;
            case '6':
                console.log('Goodbye!');
                process.exit();
            default:
                console.log('Invalid command');
                break
        }
    }
}

main();