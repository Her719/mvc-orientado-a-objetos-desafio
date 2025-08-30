import { ContactsCollection } from "./models";

export type ContactsControllerOptions = {
  action?: "get" | "save" | null;
  params: any;
};

class ContactsController {
  contacts: ContactsCollection;
  constructor(contacts: ContactsCollection) {
    this.contacts = contacts;
    this.contacts.load();
  }
  processOptions(options: ContactsControllerOptions) {
    let accion = options.action?.toLowerCase();
    if (accion === "get") {
      if (options.params?.id) {
        return this.contacts.getOneById(Number(options.params.id));
      } else {
        return this.contacts.getAll();
      }
    } else if (accion === "save") {
      if (options.params) {
        this.contacts.addOne(options.params);
        this.contacts.save();
        return options.params;
      } else {
        return null;
      }
    }
  }
}

export { ContactsController };
