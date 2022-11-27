const express = require('express')
const admin = require('firebase-admin');
const serviceAccount = require("C:\\Users\\denik\\MintJS\\key\\nonfungaistea-firebase-adminsdk-u9lkc-37d800cb2f.json");

const { execFile } = require('node:child_process');
const app = express()
const port = 3000
const pathToCmd = 'C:\\Users\\denik'
let cmdToken = 'spl-token'
let args = 'create-token'
let cmdMint = null;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nonfungaistea-default-rtdb.firebaseio.com"
});

var db=admin.database();
var userRef=db.ref("users");

userRef.once('value',function(snap){
  console.log(`read from database= ${JSON.stringify(snap.val(),null,2)}`)
});


app.listen(port, () => {
  console.log(`Minter app listening on port ${port}`)
})

function mintit() {
  if (cmdMint == null) {
    cmdMint = execFile(cmdToken, [args], { cwd: pathToCmd }, (error, stdout, stderr) => {
      console.log(`Error=> ...............................\r\n${error}\r\n^^^^^^^^^^^^^^^^^^^^^^^`)
      console.log('stdOut= ', stdout)
      console.log('stdErr= ', stderr)
      let token = stdout.split(' ')[2]
      console.log(`token= ${token}`)
      cmdMint = null
    });
  }
  else
    console.log("pass for a while")
}
setInterval(mintit, 3000)



app.get('/version', (req, res) => {
  res.send('Minter version:001')
})
// cmdMint.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// cmdMint.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// cmdMint.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });
// cmdMint.on('error', (err) => {
//   console.error('Failed to start subprocess.');
// });