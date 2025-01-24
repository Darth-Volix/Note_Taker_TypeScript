# Overview

I am seeking to further my knowledge and tool set for web development. A very common and useful language that many developers use is TypeScript, which adds more tooling and syntax on top of JavaScript in order to maintain consistency in the code and catch errors earlier. Learning TypeScript will enable me to further ensure consistency in my JavaScript code for any project I work on that uses JavaScript, which could possibly save hours of time on debugging code.

The software application written here is an application that allows a user to create, edit, and organize notes into folders. For modularity, the code is split into different classes, each given their own file. For each class, you will see defined properties, constructors, with the presence of methods varying based on what was needed for that class. The Program.ts file contains main(), which is serves as the entry point of the program and contains a user interface that is run in the terminal, allowing the user to interact with the program. Each method has a docstring to give a brief summary of what the method does, and there are explanatory comments throughout the program to assist with clarity and understanding. 

I wrote this particular piece of software to give me a kind of challenge I had never attempted to tackle with JavaScript before, which is to write software using TypeScript/JavaScript that is not meant for a web application and is purely terminal based. It also allowed continued practice with OOP principles and served to further solidify what I had learned about TypeScript. It also meant I ran into problems with TypeScript/JavaScript that I had not had to worry about before, such as retrieving input from the terminal (something that I had to do asynchronously using the readline module from Node.js).

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running and a walkthrough of the code. Focus should be on sharing what you learned about the language syntax.}

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

IDE: Visual Studio Code (version 1.96.4)
Runtime Environment: Node.js (version 23.6.1)

Language: TypeScript (version 5.7.3)
Libraries: readline (module from Node.js)

# Useful Websites

- [Offical TypeScript Website](https://www.typescriptlang.org/)
- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [W3 Schoos TypeScript Tutorial](https://www.w3schools.com/typescript/index.php)
- [Digital Ocean - How To Set Up a New TypeScript Project](https://www.digitalocean.com/community/tutorials/typescript-new-project)
- [Codecademy - Learn TypeScript](https://www.codecademy.com/learn/learn-typescript)

# Future Work

- Allow a user to delete notes from a folder
- Allow a user to move a note to a different folder
- Add functionality allowing a user to export the notes to an excel or text file
- Add functionality allowing a user to import notes from an excel or text file 
- Further abstract the DocumentManager class, finding ways to reduce its size by moving methods into the other classes when and where appropriate.
- In the case of invalid input, ensure what is displayed to a user in the terminal to handle and correct that input is consistent across the whole program (some methods clear the console and redisplay the prompt while others simply display an error and then display the prompt again a couple lines down in the terminal.)
- Connect the program to a database for long-term note storage and easy note retrieval. 