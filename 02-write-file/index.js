const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

fs.access(path.join(__dirname, 'text.txt'), (error) => {
  if (error) {
    fs.writeFile(path.join(__dirname, 'text.txt'), '', (error) => {
      if (error) throw error;
    });
  }
});

stdout.write('Введите текст для записи в файл\n');

stdin.on('data', (text) => {
  if (text.toString().trim() === 'exit') {
    process.exit();
  }

  fs.appendFile(path.join(__dirname, 'text.txt'), text, (error) => {
    if (error) throw error;
  });
});

process.on('exit', () => {
  stdout.write('Hasta la vista\n');
});

process.on('SIGINT', () => {
  process.exit();
});
