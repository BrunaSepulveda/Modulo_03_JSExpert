'use strict'
const { watch, promises: { readFile } } = require('fs');

/*
* como funciona o watch:
    arquivo + callback
    __filename fornece o caminho absoluto do arquivo de código
    __dirname fornece o caminho do diretório do módulo atual

    watch(__filename, async(event, filename) => {
        console.log((await readFile(filename)).toString());
    });
 */

class File {
    watch(event, filename){
        console.log('this', this);
        // lista de argumentos passada pra função
        // console.log('arguments', arguments);
        //slice funciona com array-like ou array 
        console.log('arguments', Array.prototype.slice.call(arguments));
        this.showContent(filename);
    }

    async showContent(filename){
        console.log((await readFile(filename)).toString());
    }
}

const file = new File();
//primeiro argumento é o this, em seguida todos os argumentos que nossa função precisa
// null é o event
// sendo assim ignora a função dentro do show content e usa a que colocamos dentro do call
file.watch.call({ showContent: () => console.log('call executando o log') }, null, __filename)
file.watch.apply({ showContent: () => console.log('apply executando o log') }, [null, __filename])
// watch(__filename, file.watch.bind(file));