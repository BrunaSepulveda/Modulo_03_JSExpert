# Trabalhando com 'this'

## Exemplo
```javascript
'use strict'
const { watch, promises: { readFile } } = require('fs');

class File {
    watch(event, filename){
        this.showContent(filename);
    }

    async showContent(filename){
        console.log((await readFile(filename)).toString());
    }
}

const file = new File();
watch(__filename, file.watch);
```
Dessa forma, ele ignora o 'this' da classe File e
herda o this do watch.
O valor de 'this' depende de onde a função é executada, ou seja, terá um valor dependendo do contexto em que a função de callback será chamada. Em vez de ter o valor que tinha onde a 
função chamada foi definida. Isso é chamado de runtime-binding.

## Soluções

### padrão 'self' :
 Ao declarar uma nova variável chamada 'self' e atribuir a ela o valor de 'this', você obtém o comportamento desejado.
```javascript
const self = this;
self.showContent(filename);
```
### usando arrow function :
```javascript
watch(__filename,(event, filename) => file.watch(event, filename));
```
### usando bind :
Podemos especificar explicitamente o que queremos 'this' seja. Usando o método bind(), podemos definir o valor 'this' e ter certeza de que ele permanecerá assim durante sua execução, não importa como ou onde a função for chamada ou passada. Isso porque o bind retorna o this do contexto escolhido.
```javascript
watch(__filename, file.watch.bind(file));
```
## Apply e Call
São dois métodos que substituem o objeto que seria recebido pela função e retorna esse novo 'this' com os argumentos para dentro da função. Sendo a principal diferença é que o apply recebe os argumentos em array;

### Exemplos
```javascript
Array.prototype.slice.call({0:null,1:'bruna',length:2});
//[null, 'bruna']

const file = new File();
file.watch.call({ showContent: () => console.log('call executando o log') }, null, __filename)
//call executando o log
file.watch.apply({ showContent: () => console.log('apply executando o log') }, [null, __filename])
//apply executando o log

const obj1 = { firstName: "First_name", lastName: "Last_name" }; 
const obj2 = { firstName: "Sachin", lastName: "Tendulkar" }; 
function printName() { 
    console.log(this.firstName + " " + this.lastName); 
} 
printName.call(obj2);
//'Sachin Tendulkar'
```
## Referências
- [LogRocket](https://blog.logrocket.com/access-correct-this-inside-callback-javascript/)
- [Medium](https://betterprogramming.pub/access-this-inside-a-javascript-callback-function-ea07e791dfcb)
- [GeeksForGeeks](https://www.geeksforgeeks.org/explain-call-and-apply-methods-in-javascript/?ref=header_search)
- **Módulo 03 do curso Javascript Expert** - Erick Wendel