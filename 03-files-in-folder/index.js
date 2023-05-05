const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) {
    console.log(err);
    return
  } else {
      files.forEach(file => {
      fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        if (err) {
          console.log(err);
          return
        }
        if (stats.isFile()) {
          const name = path.basename(file, path.extname(file));
          const extname = path.extname(file);
          const size = stats.size;
          console.log( `${name} - ${extname} - ${size/1000}kb`)
        }
      })
    })
  
  }
});
