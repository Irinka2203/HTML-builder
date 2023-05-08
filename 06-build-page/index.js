const fs = require('fs');
const path = require('path');

const readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data)
    })
  })
};

const writeFale = async (filePath, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) reject(err);
      else resolve();
    })
  })
}

const createHtml = async () => {
  try {
    const templateContent = await readFile(path.join(__dirname, 'template.html'));
    const componentFiles = await fs.promises.readdir(path.join(__dirname, 'components'));
    let indexContent = templateContent;
    for (const componentFile of componentFiles) {
      const componentContent = await readFile(path.join(__dirname, 'components', componentFile));
      const splitIndex = indexContent.indexOf(`{{${path.basename(componentFile, '.html')}}}`);
      if (splitIndex !== 1) {
        indexContent = indexContent.slice(0, splitIndex) + componentContent + indexContent.slice(splitIndex + `{{${path.basename(componentFile, '.html')}}}`.length);
      }
    }
    await writeFale(path.join(__dirname, 'project-dist', 'index.html'), indexContent);
  }
  catch (err) {
    console.log(err);
  }
};

function createCss() {
  fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) {
      console.log(err);
    }
    const filesCss = files.filter((file) => path.extname(file) === '.css');
      fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
        if (err) {
        console.log(err);
      }
        filesCss.forEach((file) => {
          fs.readFile(path.join(__dirname, 'styles', file), 'utf8', (err, data) => {
            if (err) {
            console.log(err);
          }
          fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
            if (err) {
            console.log(err);
            }
          })
        })
      })
    })
  })
};

const baseFolder = path.join(__dirname, 'assets');
const newFolder = path.join(__dirname, 'project-dist', 'assets');

function copiAssets(baseFolder, newFolder) {
  fs.rm(newFolder, { recursive: true, force: true }, (err) => {
    if (err) {
      console.log(err);
    }
  })
  fs.mkdir(newFolder, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        }
    fs.readdir(baseFolder, { recursive: true}, (err, files) => {
      if (err) {
      console.log(err);
      }
    
      files.forEach(file => {
        const baseFile = path.join(baseFolder, file);
        const newFile = path.join(newFolder, file);
        fs.stat(baseFile, (err, stats) => {
          if (err) {
            console.log(err);
          }
          if (stats.isDirectory()) {
            copiAssets(baseFile, newFile, (err) => {
              if (err) {
                console.log(err);
                }
              })
            }
          else {
            fs.copyFile(baseFile, newFile, (err) => {
              if (err) {
                console.log(err);
              }
            })
          }
        })
      })
    })
  })
}

function createProject() {
  fs.readdir(path.join(__dirname), { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
    fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, (err) => {
      if (err) {
        console.log(err);
      }
      fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        }
        copiAssets(baseFolder, newFolder);
        createCss();
        createHtml();
      })
    })
  })
}
createProject()
