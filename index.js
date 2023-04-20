const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const contacts = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case 'getOne':
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;

    case 'add':
      const newContact = await contacts.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;

    case 'update':
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      console.log(updateContact);
      break;

    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// invokeAction({ action: 'list' });
// invokeAction({ action: 'getOne', id: 'rsKkOQUi80UsgVPCcLZZW' });
// invokeAction({
//   action: 'add',
//   name: 'White Black',
//   email: 'test3@test.com',
//   phone: '000 666 55 55',
// });
// // invokeAction({
//   action: 'update',
//   id: 'ZCXZrHqmxlMP6cSmK9jLX',
//   name: 'agent 008',
//   email: 'test8@test.com',
//   phone: '000 777 88 77',
// });
// invokeAction({
//   action: 'remove',
//   id: 'ABMQis-qv-xZnO0joaDWJ',
// });

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
