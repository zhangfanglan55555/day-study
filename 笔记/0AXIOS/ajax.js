import ajaxPromise from './ajaxPromise.js';
ajaxPromise.defaults.baseURL = ''
ajaxPromise.get('/list').then(result => {
    console.log(result)
})
ajaxPromise.get('/infor', {
    params: {
        age: '1',
    },
    cache: false
}).then(result => {
    console.log(result)
})
ajaxPromise.post('/add', {
    name: 'xxx',
    age: 9
}, {
    headers: {
        "content-type": "x-www-form-urlencoded"
    }
}).then(result => {
    console.log(result)
})