function sum(){
    let total = null,arr= Array.prototype.slice.call(arguments);
    for(let i = 0;i<arr.length;i++){
        let item =arr[i];
        item = parseFloat(item)
        !isNaN(item)?total+=item:null;  
    }
    return total;
}
console.log(sum(1,2,3,4,5));
function sum(){
    let total = null;
    for(var i =0;i<Array.prototype.slice.call(arguments).length;i++){
        let item = parseFloat(arguments[i]);
        !isNaN(item)?total+=item:null;
    }
    return total;
}