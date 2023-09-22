let myArray = [3];
let valueToRemove = 3;

myArray = myArray.filter(item => item !== valueToRemove);

console.log(myArray);