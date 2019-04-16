var n = 2;
var obj = {
    n: 3,
    fn: (function (n) {
        n *= 2;
        this.n += 2;
        var n = 5;
        return function (m) {
            this.n *= 2
            console.log(m + (++n))
        }
    })(n)

}
var fn = obj.fn;
fn(3);
obj.fn(3);
console.log(n, obj.n)    


function test(){
    setTimeout(function(){
        console.log(1)
    },0)
    new Promise(function(resolve,reject){
        console.log(2);
        for(var i = 0;i<10000;i++){
            if(i===10){
                console.log(10)
            }
            i == 9999 && resolve();
        }
        console.log(3)
    }).then(function(){
        console.log(4)
    })
    console.log(5)
    return 'done';
}
console.log(test())