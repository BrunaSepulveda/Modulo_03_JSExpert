import database from '../database.json'
import Person from './person.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM= ':q';
const terminal = new TerminalController();
terminal.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
    try {
        const answer = await terminal.question()
        if (answer === STOP_TERM) {
            terminal.closeTerminal();
            console.log('processo finalizado!')
            return;
        }
        const person = Person.generateInstanceFromString(answer)
        console.log(person.formatted(DEFAULT_LANG))
        return mainLoop()
    } catch (error) {
        console.error(error)
        return mainLoop()
    }
}

await mainLoop()