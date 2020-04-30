let Q = require('q');
let fs = require('fs');
function readFile(filename){
    let defer = Q.defer();
    fs.readFile(filename,'utf8',function(err,data){

    })
}