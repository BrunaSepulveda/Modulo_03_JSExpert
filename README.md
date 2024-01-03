## Trabalhando com API de internacionalização
---

### Exemplo
---
fornece comparação de string sensível à línguagem, formatação de números, e formatação de data e hora. O primeiro parâmetro é o idioma escolhida, por padrão é o idioma do sistema. Foram usadas nesse projeto:

* [ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) 
~~~javascript
new Intl.ListFormat(language, { style: "long", type: "conjunction" }).format(this.vehicles)
~~~
* [NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
~~~javascript
new Intl.NumberFormat(language, { style: "unit", unit: "kilometer"}).format(this.kmTraveled)
~~~
* [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
~~~javascript
 new Intl.DateTimeFormat(language, { month: "long", day: '2-digit', year: 'numeric'}).format(mapDate(this.from))
~~~
## Configurações Javascript e Typescript
---
:exclamation: ECMAScript é uma especificação de linguagem, ou seja, ela define os padrões para uma linguagem de programação, e o JavaScript é a implementação desses padrões.--exec node --experimental-json-modules

### Importação de arquivos JSON usando a configuração do type module no package.json
---
A configução `{ "type": "module" }` é o formato para encapsular código

#### Javascript
:exclamation: Todas as soluções abaixo estão na categoria **Estabilidade: 1 - Experimental**

~~~javascript
// node 14LTS deve ser usada a flag na execução do código
 --exec node --experimental-json-modules
//até o node 18LTS
import database from '../database.json' assert { type: 'json' };

//até o node 20LTS
import database from '../database.json' with { type: 'json' };
~~~
####  Typescript
Deve ser usada a opção `"resolveJsonModule": true` na configuração do compilador no arquivo tsconfig.json

~~~typescript
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es2015",
    "strict": true,
    "resolveJsonModule": true
  }
}
~~~
É importante explicar que as configurações **module**, **moduleResolution** e **target** são configurações de output.

* **module**: ele informa ao compilador em qual sintaxe escrever os módulos nos arquivos .js de saída
* **moduleResolution**: isso configura como o compilador tenta encontrar seus módulos (resolvê-los).
* **target**: o código compilado poderá ser executado por navegadores e mecanismos compatíveis a versão do ECMAScript escolhida

### Top-level await
---

#### Javascript
o nível superior await está disponível "sem sinalização" no Node.js desde v14.8

## Referências
---
* [Type no package.json](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/)
* [JSON modules Node](https://nodejs.org/api/esm.html#json-modules)
* [JSON modules Typescript](https://dev.to/luispa/importing-json-modules-in-typescript-2i97)
* [1 - Typescript config](https://medium.com/@tommedema/typescript-confusion-tsconfig-json-module-moduleresolution-target-lib-explained-65db2c44b491)
* [2 - Typescript config](https://stackoverflow.com/questions/55471795/what-is-module-option-in-tsconfig-used-for#:~:text=%22module%22%20in%20tsconfig.,compiled%20to%20Javascript%20(JS).)
* [Top level await](https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/)