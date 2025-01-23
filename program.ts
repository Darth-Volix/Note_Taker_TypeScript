import { DocumentManager } from './DocumentManager';

async function main(): Promise<void> {
    let running: boolean = true;
    const documentManager: DocumentManager = new DocumentManager();

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
        console.clear();

        switch (userChoice) {
            case '1':
                await documentManager.createFolder();
                break;
            case '2':
                await documentManager.createNote();
                break;
            case '3':
                documentManager.displayFolders();
                break;
            case '4':
                await documentManager.displayFolderContents();
                break;
            case '5':
                await documentManager.editNote();
                break;
            case '6':
                console.log('Goodbye!');
                process.exit();
            default:
                console.log('*** Invalid command ***\n');
                break;
        }

        // Small pause before redisplaying menu
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

main();