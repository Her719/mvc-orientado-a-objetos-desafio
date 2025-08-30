import test from "ava";
import { ContactsController } from "./controllers";
import { ContactsCollection } from "./models";

test("Testeo el constructor del controller", (t) => {
  // test de ejemplo
  t.truthy(true);
});

test("Testeo el método processOptions SIN params", (t) => {
  const model = new ContactsCollection();
  model.dataContact = [
    { id: 21, name: "Yorch" },
    { id: 12, name: "Morch" },
  ];
  const controller = new ContactsController(model);
  const result = controller.processOptions({ action: "get", params: {} });
  t.deepEqual(result, model.dataContact);
});

test("Testeo processOptions con acción 'get' y un id", (t) => {
  const model = new ContactsCollection();
  // Mockeamos load para que no haga nada y no borre los datos
  model.load = () => {};

  model.dataContact = [
    { id: 21, name: "Yorch" },
    { id: 12, name: "Morch" },
  ];

  const controller = new ContactsController(model);
  const result = controller.processOptions({
    action: "get",
    params: { id: 12 },
  });
  t.deepEqual(result, { id: 12, name: "Morch" });
});

test("Testeo processOptions con acción 'save' y un id", (t) => {
  const model = new ContactsCollection();
  const controller = new ContactsController(model);
  const result = controller.processOptions({
    action: "save",
    params: { id: 12, name: "Morch" },
  });
  t.deepEqual(result, { id: 12, name: "Morch" });
});
