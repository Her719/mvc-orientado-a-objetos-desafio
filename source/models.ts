// este import existe solo para que tsc lo tome y lo copie a /build
import "./contacts.json";
import { readFileSync, writeFileSync } from "fs";

// si no estuviera este import typescript no se da cuenta que lo necesitamos
// ya que para escribir o leer al archivo usamos la libreria "jsonfile"

class Contact {
  id: number = 0;
  name: string = "";
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class ContactsCollection {
  dataContact: Contact[] = [];
  constructor() {}
  //carga la info desde contacts.json y la guarde en dataContact
  load() {
    try {
      const path = require("path");
      const filePath = path.resolve(__dirname, "../source/contacts.json");
      const contactosAPArsear = readFileSync(filePath, "utf-8");

      // const contactosAPArsear = readFileSync(
      //   __dirname + "/contacts.json",
      //   "utf-8"
      // );
      this.dataContact = JSON.parse(contactosAPArsear);
      return this.dataContact;
    } catch (error) {
      return console.log("Error al cargar contactos:", error);
    }
  }
  //retorna la collection completa
  getAll() {
    return this.dataContact;
  }
  //agrega un contacto a la lista
  addOne(contact: Contact) {
    this.dataContact.push(contact);
  }
  // guarda todo el objeto interno en el archivo contacts.json
  save() {
    try {
      const currentDataJSON = JSON.stringify(this.dataContact, null, 2);
      const filePath = __dirname + "/contacts.json";
      const fileDataJSON = readFileSync(filePath, "utf-8");
      //Si hay cambios que agregar en contacts.json se ejecuta el IF
      if (currentDataJSON !== fileDataJSON) {
        writeFileSync(filePath, currentDataJSON, "utf-8");
        return "Archivo guardado";
      } else {
        return "No hubo cambios, no se guardó el archivo";
      }
    } catch (error) {
      return console.error("Error al guardar:", error);
    }
  }
  // devuelve los contactos por id
  getOneById(id: number): Contact | undefined {
    const idContact = this.dataContact.find((i) => i.id === Number(id));

    if (idContact) {
      return idContact;
    } else {
      console.log(`El contacto con id ${id} no existe.`);
      return undefined;
    }
  }
}

export { ContactsCollection };
