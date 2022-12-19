import { createInterface } from 'readline'
import { userParams } from './settings.js';
import { validateArgsLength, validateUsernameParam } from './validations.js'
import { getMessage } from "./utils.js";

function main({ directory, username }) {
    userParams.username = username;
    userParams.currentPath = directory;

    console.log(getMessage('welcome', userParams.username));
    console.log(getMessage('currentPath', userParams.currentPath));

    const readLine = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // readLine.on('line', (line) => {
    //     parseOperation(line.split(' '));
    // })

    process.on('exit', () => {
        readLine.close();
        console.log(getMessage('exit', userParams.username));
    })


}

function init() {
    const [key, value] = process.argv.slice(2)[0].split('=');

    try {
        validateArgsLength(process.argv.length);
        validateUsernameParam(key, value);
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}

init();