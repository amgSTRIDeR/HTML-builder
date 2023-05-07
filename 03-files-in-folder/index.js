const path = require('path');
const fs = require('fs');

fs.readdir(
  path.join(__dirname, '/secret-folder'),
  { withFileTypes: true },
  (error, files) => {
    if (error) throw error;

    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(
          path.join(__dirname, `/secret-folder/${file.name}`),
          (error, stats) => {
            if (error) throw error;
            console.log(
              `${file.name.slice(0, -path.extname(file.name).length)} - ${path
                .extname(file.name)
                .slice(1)} - ${(stats.size / 1024).toFixed(3)}kb`
            );
          }
        );
      }
    });
  }
);
