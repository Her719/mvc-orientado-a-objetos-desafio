import { ContactsController, ContactsControllerOptions } from "./controllers";
import { ContactsCollection } from "./models";
import minimist from "minimist";

//ejemplo para correr la app en terminal:
// pnpm run start --action=get --params='{"id":1}'

function parseaParams(argv): ContactsControllerOptions {
  const resultado = minimist(argv);
  const action = resultado["action"];
  const params = resultado["params"] ? JSON.parse(resultado["params"]) : null;

  return {
    action,
    params,
  };
}

function main() {
  const args = process.argv.slice(2); // Obtenemos los argumentos de la línea de comandos
  const options = parseaParams(args); // Parseamos los parámetros
  const contactsCollection = new ContactsCollection(); // Creamos la colección
  const contactsController = new ContactsController(contactsCollection); // Creamos el controlador
  const result = contactsController.processOptions(options); // Procesamos las opciones
  console.log(result); // Imprimimos el resultado en la terminal
}

main();
