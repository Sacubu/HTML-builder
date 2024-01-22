const fs = require('fs');
const path = require('path');

const sourceFolderPath = './HTML-builder/04-copy-directory/files';
const destinationFolderPath = './HTML-builder/04-copy-directory/files-copy';

async function copyDir(source, destination) {
  try {
    await fs.promises.access(destination, fs.constants.F_OK).catch(() => {
      return fs.promises.mkdir(destination);
    });

    const files = await fs.promises.readdir(source, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(source, file.name);
      const destinationPath = path.join(destination, file.name);

      if (file.isFile()) {
        await fs.promises.copyFile(sourcePath, destinationPath);
      } else if (file.isDirectory()) {
        await copyDir(sourcePath, destinationPath);
      }
    }
  } catch (error) {
    console.error('Error copying directory:', error);
  }
}

copyDir(sourceFolderPath, destinationFolderPath);
