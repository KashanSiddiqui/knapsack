const available_weight = 20;
let items = [
    {
        value : '23',
        weight : '20'
    },
    {
        value : '23',
        weight : '20'
    },
    {
        value : '23',
        weight : '20'
    },
    {
        value : '23',
        weight : '20'
    },
    {
        value : '23',
        weight : '20'
    }
]

function random_number_for_parent_selection(size) {
    return Math.round((Math.random() * size));
}

const BTS = (length, array) => {
    let random1;
    let random2;
    let parents = [] 
    for(let i=0; i<2; i++){
        do {
             random1 = random_number_for_parent_selection(length);
             random2 = random_number_for_parent_selection(length);
        }
        while(random1 === random2);
        if(random1 > random2) {
            parents[i] = random1;
        }else {
            parents[i] = random2;
        }
    }
    return parents;
}

function random_one_zero() {
    var random = Math.round(Math.random() * 1);
    return random;
}

const initial_population = (limit, original_arr) => {
    let array = []
    console.log(original_arr)
        for (let i = 0; i < limit; i++) {
        sum = 0;
        array[i] = [];
        for (let j = 0; j < limit; j++) {
            array[i][j] = random_one_zero();
            if(array[i][j]){
                console.log(i)
                // sum += original_arr[i].value;
            }
        }
        array[i][limit+1] = sum;
    }
    return array;
}

const mutation = (arr, parent) => {
    for(let i=0; i<arr.length; i++){
        
    }
}

const initial_population_array = initial_population(5);
console.log(initial_population(5, items))
let arr = [] //1D array
// for(var i=0; i<5; i++){
//     arr[i] = BTS(5);
// }
// console.log(arr, );
// const population = (initial_population_size) => { // calculate initial population
//     let array = [];
//     for (let i = 0; i < initial_population_size; i++) {
//         array[i] = [];
//         for (let j = 0; j < gene_count; j++) {
//             switch (j) {
//                 case 0: //x
//                     array[i][j] = random_number_for_x();
//                     break;
//             }
            
//         }
//     }
//     return (array)
// }