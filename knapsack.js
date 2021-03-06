const available_weight = 30;
let items = [
    {
        value : 3,
        weight : 9
    },
    {
        value : 12,
        weight : 6
    },
    {
        value : 4,
        weight : 2
    },
    {
        value : 19,
        weight : 5
    },
    {
        value : 8,
        weight : 8
    },
    {
        value : 9,
        weight : 7
    },
    {
        value : 7,
        weight : 3
    },
    {
        value : 6,
        weight : 1
    }
]

function random_number_between_zero_and_one() {
    var random = (Math.random() * 1);
    console.log(random)
    return random;
}

function random_number_generator_for_mutation(range) {
    var random= Math.round((Math.random() * range));
    // console.log(random)
    return random;
}

const parent_index = (RBS_array, parent) => {
    for (let j = 0; j < RBS_array.length; j++) {
        if(! (parent > RBS_array[j])){
            return j;
        }                
    }
}


function random_number_for_parent_selection(size) {
    return Math.round((Math.random() * size));
}

const crossover = (array, parent1, parent2) => {
    let children_array = [];
    children_array[0] = array[parent1];
    children_array[1] = array[parent2];
    children_array[0][0] = children_array[0][0] + children_array[1][0];
    children_array[1][0] = children_array[0][0] - children_array[1][0];
    children_array[0][0] = children_array[0][0] - children_array[1][0];
    return (children_array)
}

// const BTS = (length, array) => {
//     let random1;
//     let random2;
//     let parents = [] 
//     for(let i=0; i<2; i++){
//         do {
//              random1 = random_number_for_parent_selection(length);
//              random2 = random_number_for_parent_selection(length);
//         }
//         while(random1 === random2);
//         if(random1 > random2) {
//             parents[i] = random1;
//         }else {
//             parents[i] = random2;
//         }
//     }
//     return parents;
// }

function random_one_zero() {
    var random = Math.round(Math.random() * 1);
    return random;
}

const initial_population = (limit, original_arr) => {
    let array = []
    // console.log(original_arr)
        for (let i = 0; i < limit; i++) {
        sum_value = 0;
        sum_weight = 0;
        array[i] = [];
        for (let j = 0; j < limit; j++) {
            array[i][j] = random_one_zero();
            if(array[i][j]){
                sum_value += original_arr[j].value;
                sum_weight += original_arr[j].weight;

            }
        }
        array[i][limit] = sum_value;
        array[i][limit+1]=sum_weight;
        if(sum_weight>available_weight){
            i--;
        }
    }
    return array;
}

const recalculated_fitness_value_function = (children_array, items_arr) => {
    // console.log(children_array, items, "RECALCULATED")
    for (let i = 0; i < children_array.length; i++) {
        sum_value = 0;
        sum_weight = 0;
        // array[i] = [];
        for (let j = 0; j < items_arr.length; j++) {
            // array[i][j] = random_one_zero();
            if(children_array[i][j]){
                sum_value += items_arr[j].value;
                sum_weight += items_arr[j].weight;
            }
        }
        children_array[i][items_arr.length] = sum_value;
        children_array[i][items_arr.length + 1] = sum_weight;
    }
    // console.log(children_array, "children_array")
    return children_array;
}

const children_production_function = (initial_array, RBS_array, items_arr) => {
    let children_array = [];
    recalculated_fitness_value_array = [];
    for (let i = 0; i < initial_array.length / 2; i++) {        
        let parent1 = random_number_between_zero_and_one();
        let parent2 = random_number_between_zero_and_one();
        parent1 = parent_index(RBS_array, parent1)
        parent2 = parent_index(RBS_array, parent2)
        if(parent1 === parent2){
            // console.log(parent1, parent2, "in if")
            i--;
        }else{
        children_array = children_array.concat( recalculated_fitness_value_function(crossover(initial_array, parent1, parent2), items_arr) );
            // console.log(children_array.length, "children_array")
        // recalculated_fitness_value_array = recalculated_fitness_value_array.concat(recalculated_fitness_value_function(children_array, items))
        // console.log(recalculated_fitness_value_array.length);
    }
}
// console.log(children_array.length);
return children_array;
}

    const total_rank_calculator = (array) =>  {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += (i+1);
        }
        return sum;
    } 

    const RBS = (array) => {
        let relative_boundries_array = [];
    let total_rank_value = total_rank_calculator(array);
    relative_boundries_array.push( 1 / total_rank_value );
    // console.log(relative_boundries_array); // special case for 1st array
    for(var i=1; i<array.length; i++){
        let value = (i+1) / total_rank_value;
        // console.log(value, "******** value ************");
         relative_boundries_array[i] = relative_boundries_array[i-1] + value;
    }
    return relative_boundries_array;
    }


    const mutation=(crossovered_array)=>{
        for(let i=0;i<crossovered_array.length;i++){
            if(random_one_zero()){
                let index_to_mutate=random_number_generator_for_mutation(3);
                console.log("mutation on:",index_to_mutate);
                if(crossovered_array[i][index_to_mutate]==1){
                    crossovered_array[i][index_to_mutate]=0;
                }
                else{
                    crossovered_array[i][index_to_mutate]=1;
                }

            }
            else{
                console.log("no mutation")
            }

        }
        return crossovered_array;
        // console.log(crossovered_array.length,"length")
    }

const fittest_of_all_function = (array, weight) => {
    let len = ( array[0].length - 1 );
    array.sort((a, b) => {
        if (a[len] === b[len]) {
            return 0;
        }
        else {
            return (a[len] < b[len]) ? -1 : 1;
        }
    })
    fittest_array = []
    for(let i=0; i < 8; i++){
        fittest_array.push(array[i]);
    }
    return fittest_array;
}



let initial_population_array = initial_population(8, items);
for(let i=0; i<50; i++){
    let RBS_array = RBS( initial_population_array);
    let children_array = children_production_function(initial_population_array, RBS_array, items) 
    let mutated_children_array= recalculated_fitness_value_function(mutation(children_array),items);
    let total_population = initial_population_array.concat(mutated_children_array);
    let fittest_of_all = fittest_of_all_function(total_population, available_weight);
    initial_population_array = fittest_of_all;
    console.log(fittest_of_all, "fittest_of_all")
}

console.log(initial_population_array, "intial");
