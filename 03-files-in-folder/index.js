const fs = require('fs');
const path = require('path');

const secretFolderPath = './HTML-builder/03-files-in-folder/secret-folder';

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading folder', err);
    return;
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(secretFolderPath, file.name);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats', err);
          return;
        }

        const fileName = path.parse(file.name).name;

        const fileExtension = path.extname(file.name).slice(1);

        const fileSize = stats.size;

        console.log(`${fileName} - ${fileExtension} - ${fileSize} bytes`);
      });
    }
  });
});
