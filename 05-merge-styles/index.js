const fs = require('fs');
const path = require('path');

function buildBundle() {
  
    fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
      if (err) {
        console.log(err);
      }
      fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), { recursive: true, force: true }, (err) => {
    if (err) {
      console.log(err);
    }
      const filesCss = files.filter((file) => path.extname(file) === '.css');
     
      fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
        if (err) {
          console.log(err);
        }
        filesCss.forEach((file) => {
          fs.readFile(path.join(__dirname, 'styles', file), 'utf8', (err, data) => {
            if (err) {
        console.log(err);
            }
            fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
            if (err) {
          console.log(err);
        }
          })
          })
        })
      })
    })
  })
}


buildBundle();