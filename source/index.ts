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
  const args = process.argv.slice(2);
  const options = parseaParams(args);
  const contactsCollection = new ContactsCollection();
  const contactsController = new ContactsController(contactsCollection);
  const result = contactsController.processOptions(options);
  console.log(result);
}

main();
