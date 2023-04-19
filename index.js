// import greeting from './db/index.js';

const fs = require('fs/promises');

const filePath = './db/data.txt';
const fileOperation = async ({ action, data }) => {
  switch (action) {
    case 'read':
      const result = await fs.readFile(filePath, 'utf-8');
      //щоб не було Buffer використали utf-8 або toString
      //   const text = result.toString();
      console.log(result);
      break;
    case 'add':
      const add = await fs.appendFile(filePath, data);
      break;
    case 'replace':
      const replace = await fs.writeFile(filePath, data);
      break;
    default:
      console.log('Unknown action');
      break;
  }
};
// fileOperation({ action: 'read' });
// fileOperation({ action: 'add', data: '\ngood night' });
// fileOperation({ action: 'replace', data: 'Good Morning' });
// fs.rename(filePath, './quote.txt');
fs.unlink('./quote.txt');
