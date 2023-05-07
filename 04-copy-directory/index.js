const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, '/files-copy'), { recursive: true }, (error) => {
  if (error) throw error;
});

fs.readdir(
  path.join(__dirname, '/files'),
  { withFileTypes: true },
  (error, files) => {
    if (error) throw error;
    files.forEach((file) => {
      fs.readFile(path.join(__dirname, '/files-copy', file.name), (error) => {
        if (error) {
          console.log(`скопирован: ${file.name}`);
        } else {
          console.log(`обновлен: ${file.name}`);
        }
      });

      fs.copyFile(
        path.join(__dirname, '/files', file.name),
        path.join(__dirname, '/files-copy', file.name),
        (error) => {
          if (error) throw error;
        }
      );
    });
  }
);

fs.readdir(
  path.join(__dirname, '/files-copy'),
  { withFileTypes: true },
  (error, files) => {
    if (error) throw error;
    files.forEach((file) => {
      fs.readFile(path.join(__dirname, '/files', file.name), (error) => {
        if (error) {
          fs.unlink(path.join(__dirname, '/files-copy', file.name), (error) => {
            if (error) throw error;
            console.log(`удален: ${file.name} `);
          });
        }
      });
    });
  }
);
