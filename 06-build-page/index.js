const fs = require('fs');
const path = require('path');

function copyFiles(dirname) {
  fs.readdir(
    path.join(__dirname, dirname),
    { withFileTypes: true },
    (error, files) => {
      if (error) throw error;
      files.forEach((file) => {
        if (file.isFile()) {
          fs.copyFile(
            path.join(__dirname, dirname, file.name),
            path.join(__dirname, `/project-dist/${dirname}`, file.name),
            (error) => {
              if (error) throw error;
            }
          );
        } else if (file.isDirectory()) {
          fs.mkdir(
            path.join(__dirname, `/project-dist/${dirname}`, file.name),
            { recursive: true },
            (error) => {
              if (error) throw error;
              copyFiles(`${dirname}/${file.name}`);
            }
          );
        }
      });
    }
  );
}

fs.mkdir(
  path.join(__dirname, '/project-dist'),
  { recursive: true },
  (error) => {
    if (error) throw error;
  }
);

fs.readFile(path.join(__dirname, '/template.html'), (error, data) => {
  if (error) throw error;
  let htmlData = data.toString();
  fs.readdir(
    path.join(__dirname, '/components'),
    { withFileTypes: true },
    (error, files) => {
      if (error) throw error;
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.html') {
          fs.readFile(
            path.join(__dirname, '/components', file.name),
            { encoding: 'utf-8' },
            (error, data) => {
              if (error) throw error;
              htmlData = htmlData.replace(
                `{{${path.basename(file.name, '.html')}}}`,
                data
              );
              fs.writeFile(
                path.join(__dirname, '/project-dist', 'index.html'),
                htmlData,
                (error) => {
                  if (error) throw error;
                }
              );
            }
          );
        }
      });
    }
  );
});

fs.readdir(
  path.join(__dirname, '/styles'),
  { withFileTypes: true },
  (error, files) => {
    if (error) throw error;
    fs.writeFile(
      path.join(__dirname, '/project-dist', 'style.css'),
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
              path.join(__dirname, '/project-dist', 'style.css'),
              data + '\n',
              (error) => {
                if (error) throw error;
              }
            );
          }
        );
      }
    });
  }
);

copyFiles('assets');
