const fs = require('fs');
const path =require('path')

const { stdout, stdin, exit } = process;
stdout.write('Введите текст\n');
stdin.on('data', data => {
  const string = data.toString().trim();
  if (string === "exit"){
    console.log('Bye!');
    process.exit();
  }
  if (string !== "exit") {
    fs.appendFile(
      path.join(__dirname, 'test.txt'),
      string,
      (err) => {
        if (err) throw err;
      }
    );
  }
  
});

process.on('SIGINT', () => {
  console.log('Bye!');
  process.exit(0);
  
})






// stream.on('end', () => console.log('End', data));
// stream.on('error', error => console.log('Error', error.message));