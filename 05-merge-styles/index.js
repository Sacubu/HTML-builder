const fs = require('fs');
const path = require('path');

const stylesFolderPath = './HTML-builder/05-merge-styles/styles';
const bundleFilePath = './HTML-builder/05-merge-styles/project-dist/bundle.css';

const isCSSFile = (file) => {
  return file.isFile() && path.extname(file.name) === '.css';
};

fs.readdir(stylesFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading styles folder:', err);
    return;
  }

  const cssFiles = files.filter(isCSSFile);
  const styles = [];

  const readFilePromises = cssFiles.map((file) => {
    const filePath = path.join(stylesFolderPath, file.name);
    return fs.promises.readFile(filePath, 'utf-8');
  });

  Promise.all(readFilePromises)
    .then((fileContents) => {
      styles.push(...fileContents);
      const bundleContent = styles.join('\n');
      return fs.promises.writeFile(bundleFilePath, bundleContent, 'utf-8');
    })
    .then(() => {
      console.log('Bundle file created successfully.');
    })
    .catch((error) => {
      console.error('Error creating bundle file:', error);
    });
});
