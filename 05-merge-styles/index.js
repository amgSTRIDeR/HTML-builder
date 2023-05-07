const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, '/styles'),
  { withFileTypes: true },
  (error, files) => {
    if (error) throw error;
    fs.writeFile(
      path.join(__dirname, '/project-dist', 'bundle.css'),
      '',
      (error) => {
        if (error) throw error;
      }
    );

    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        fs.readFile(
          path.join(__dirname, '/styles', file.name),
          { encoding: 'utf-8' },
          (error, data) => {
            if (error) throw error;

            fs.appendFile(
              path.join(__dirname, '/project-dist', 'bundle.css'),
              data + '\n',
              (error) => {
                if (error) throw error;
              }
            );
          }
        );
      }
    });
    console.log('Стили обновлены');
  }
);
