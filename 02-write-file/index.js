const fs = require('fs');
const path = require('path');

const { stdout, stdin, exit} = process;
stdout.write('Введите текст\n');
stdin.on('data', data => {
  const string = data;
  if (string.toString().trim() === "exit"){
    console.log('Bye!');
    exit();
  }
  if (string.toString().trim() !== "exit") {
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
  exit();
})


   
 
 






// stream.on('end', () => console.log('End', data));
// stream.on('error', error => console.log('Error', error.message));