// import greeting from './db/index.js';

const fs = require('fs/promises');
const { ReturnDocument } = require('mongodb');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = './db/contacts.json';
// до JSON.stringify додати null, 2 , щоб розділиити записи в json, без цього вони в одну строку
const updateContacts = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//так як є SON.parse, то можна не вказувати 'utf-8' в fs.readFile(contactsPath, 'utf-8'), і так буде без буффера
async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}
async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  //потрібно перезаписати весь файл, щоб коректно додати новий контакт

  await updateContacts(contacts);
  return newContact;
}

async function updateContactById(contactId, { name, email, phone }) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  contacts[index] = { contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

//   switch (action) {
//     case 'read':
//       const result = await fs.readFile(filePath, 'utf-8');
//       //щоб не було Buffer використали utf-8 або toString
//       //   const text = result.toString();
//       console.log(result);
//       break;
//     case 'add':
//       const add = await fs.appendFile(filePath, data);
//       break;
//     case 'replace':
//       const replace = await fs.writeFile(filePath, data);
//       break;
//     default:
//       console.log('Unknown action');
//       break;
//   }

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
