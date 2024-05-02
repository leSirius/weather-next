const fs = require('fs');

 
function readDir(folder) {
  fs.readdir(folder, function(err, files) {
    files.forEach(function(file) {
      fs.readFile(folder+'/'+file, 'utf-8', function(err,data){
        console.log(typeof data);
        data = data.replace("currentColor", "white");
        console.log(data);
        fs.writeFile(folder+'/'+file, data, 'utf-8', function (err) {
            if (err) return console.log(err);
         });
      })
    })
  })
}
readDir("icons2");
/*
// 读取文件内容
fs.readFile('example.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
  
    // 修改文件内容
    const modifiedData = data.replace('原来的内容', '新的内容');
  
    // 写回文件
    fs.writeFile('example.txt', modifiedData, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
*/