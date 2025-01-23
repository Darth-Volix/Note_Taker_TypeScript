import { DocumentManager } from './DocumentManager';

async function main(): Promise<void> {
    let running: boolean = true;
    const documentManager: DocumentManager = new DocumentManager;

    console.log('\nWelcome to your Notes App!\n');

    while (running) {
        console.log('Commands:');
        console.log('       1. Create a Folder');
        console.log('       2. Create a Note');
        console.log('       4. Display Folders');
        console.log('       5. Edit a note');
        console.log('       6. Exit\n');

        let userChoice = await documentManager.askQuestion('Enter a command: ');
        switch (userChoice) {
            case '1':
                await documentManager.createFolder();
                break;
            case '2':
                await documentManager.createNote();
                break;
            case '4':
                documentManager.displayFolders();
                break;
            case '5':
                await documentManager.editNote();
                break;
            case '6':
                console.log('Goodbye!');
                running = false;
                break;
            default:
                console.log('Invalid command');
                break
        }
    }
}

main();