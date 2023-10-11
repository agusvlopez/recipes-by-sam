//optional chaining
const obj = {
    data: {
        id: 33,
        objs: {
            nombre: "objeto"
        }
    }
}

console.log(obj.datas?.obj?.id);

console.log("PASE!!");