class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }

    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }

    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }

    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }

    swap(indexOne, indexTwo) {
        [this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
    }

    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }

    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }

    remove() {
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.compare(this.parent(index), this.heap[index]) < 0) {
            const parentIndex = this.getParentIndex(index);
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && this.compare(this.rightChild(index), this.leftChild(index)) > 0) {
                largerChildIndex = this.getRightChildIndex(index);
            }
            if (this.compare(this.heap[index], this.heap[largerChildIndex]) > 0) {
                break;
            }
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }

    compare(a, b) {
        const priorityA = a[0];
        const priorityB = b[0];
        
        return priorityB - priorityA;
    }
}

var fgLevelOne = L.tileLayer('maps/fountainGateMap/Level1/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 4,
    continuousWorld: false,
    noWrap:true,
});
var fgLevelTwo = L.tileLayer('maps/fountainGateMap/Level2/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 4,
    continuousWorld: false,
    noWrap:true,
});

var map = L.map('map',{
    layers: [fgLevelTwo,fgLevelOne]
}).setView([0,0],3);

var allLevels = {
    "Ground Floor": fgLevelOne,
    "Level 1": fgLevelTwo
};

var layerControl = L.control.layers(allLevels).addTo(map);

var marker = L.marker([0,0], {
    draggable: true,
}).addTo(map);

marker.bindPopup('<b> Location </b>');

marker.on('dragend', function(e){
    marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
});

const storesGraph = {
    'switch_lifestyle': ['the_pancake_parlour', 'fountain_gate_hotel', 'kinn_thai_restaurant', 'fountain_gate_hotel_entrance'],
    'the_pancake_parlour': ['switch_lifestyle', 'the_sporting_globe','grilld'],
    'grilld': ['the_pancake_parlour', 'san_churro', 'nandos', 'cinema_elevator', 'dumplings_plus'],
    'cinema_elevator': ['grilld', 'nandos', 'schnitz', 'dumplings_plus'],
    'fountain_gate_hotel': ['kinn_thai_restaurant', 'switch_lifestyle', 'fountain_gate_hotel_entrance'],
    'kinn_thai_restaurant': ['fountain_gate_hotel', 'the_sporting_globe', 'the_pancake_parlour'],
    'the_sporting_globe': ['kinn_thai_restaurant', 'san_churro', 'the_pancake_parlour'],
    'san_churro': ['the_sporting_globe', 'nandos', 'grilld'],
    'nandos': ['san_churro', 'schnitz', 'cinema_elevator', 'grilld'],
    'schnitz': ['nandos', 'cinema_elevator', 'gami_chicken_and_beer'],
    'dumplings_plus': ['surf_dive_n_ski', 'gami_chicken_and_beer', 'grilld', 'cinema_elevator'],
    'surf_dive_n_ski': ['dumplings_plus', 'foot_locker', 'foot_locker_elevator'],
    'gami_chicken_and_beer': ['schnitz', 'guzman_y_gomez'],
    'foot_locker_elevator': ['foot_locker', 'surf_dive_n_ski'],
    'foot_locker': ['foot_locer_elevator', 'surf_dive_n_ski'],
    'fountain_gate_hotel_entrance' : ['fountain_gate_hotel', 'switch_lifestyle']

}

const storeLocations = {
    'switch_lifestyle': [-41.53688, -71.367188],
    'the_pancake_parlour': [-36.9059, -67.148438],
    'grilld': [-31.275755, -62.666016],
    'cinema_elevator': [-28.943518, -54.84375],
    'fountain_gate_hotel': [-48.953061, -59.765625],
    'kinn_thai_restaurant': [-44.619865, -55.195313],
    'the_sporting_globe': [-41.272971, -53.789063],
    'san_churro': [-37.186731, -53.4375],
    'nandos': [-33.455948, -51.328125],
    'schnitz': [-28.635155, -49.21875],
    'dumplings_plus': [-23.259514, -59.765625],
    'surf_dive_n_ski': [-18.327441, -57.65625],
    'gami_chicken_and_beer': [-23.885572, -47.460937],
    'foot_locker_elevator': [-5.600358, -73.300781],
    'foot_locker': [-10.64932, -54.492187],
    'fountain_gate_hotel_entrance': [-48.241524, -67.324219]
}

const storeEntrances = ['fountain_gate_hotel_entrance'];

const groundFloor = ['switch_lifestyle',
'the_pancake_parlour',
'grilld',
'cinema_elevator',
'fountain_gate_hotel',
'kinn_thai_restaurant',
'the_sporting_globe',
'san_churro',
'nandos',
'schnitz',
'dumplings_plus',
'surf_dive_n_ski',
'gami_chicken_and_beer',
'foot_locker_elevator',
'foot_locker',
'fountain_gate_hotel_entrance']

const elevators = ['cinema_elevator'];

function allPermutations(nodes){
    if (nodes.length == 0){
        return [];
    }
    else if (nodes.length == 1){
        return [nodes];
    }
    else {
        let possiblePaths = []

        for (let i = 0; i < nodes.length; i++){
            
            let permutationChange = nodes.slice(0,i).concat(nodes.slice(i+1));
            let all = allPermutations(permutationChange);
            
            for (let p in all){
                possiblePaths.push([nodes[i]].concat(all[p]));
            }
        
        }
        return possiblePaths;
    }
}

function dijkstra(storesGraph, start_node, end_node){

    let visited = {};
    let dist_to = {};

    let pq = new PriorityQueue();

    for (node in storesGraph){
        dist_to[node] = Infinity;
    }

    dist_to[start_node] = 0;

    for (neighbour in storesGraph[start_node]){
        pq.add([1, storesGraph[start_node][neighbour]]);
    }

    while (pq.peek() != null){
        let element = pq.remove();
        let current_dist_to = element[0];
        let current_node = element[1];

        if (current_node in visited){
            continue;
        }

        dist_to[current_node] = current_dist_to;
        
        for (neighbour in storesGraph[current_node]){
            pq.add([dist_to[current_node]+1,storesGraph[current_node][neighbour]]);
        }

        visited[current_node] = true;
    }
    return dist_to[end_node];
}

function aStar(storesGraph, start_node, end_node, first, state) {
    let open = [start_node];
    
    let close = [];

    let g = {};
    g[start_node] = 0;

    let parents = {};
    parents[start_node] = start_node;

    while (open.length > 0) {
        let current = null;

        for (let i = 0; i < open.length; i++) {

            let node = open[i];

            if (current == null || g[node] + dijkstra(storesGraph, node, state[state.length - 1]) < g[current] + dijkstra(storesGraph, current, state[state.length - 1])) {
                current = node;
            }
        }

        if (current == null) {
            return null;
        }

        if (current == end_node) {
            let path = [];
            let distance = 0;

            while (parents[current] != current) {
                path.push(current);
                distance += 1;
                current = parents[current];
            }

            if (first == true) {
                path.push(start_node);
            }

            path.reverse();

            return [distance, path];
        }
        
        for (let i = 0; i < storesGraph[current].length; i++) {
            let neighbour = storesGraph[current][i];
            
            
            if (!open.includes(neighbour) && !close.includes(neighbour)) {

                open.push(neighbour);
                parents[neighbour] = current;
                g[neighbour] = g[current] + 1;

            } 

            else {

                if (g[neighbour] > g[current] + 1) {

                    g[neighbour] = g[current] + 1;
                    parents[neighbour] = current;

                    if (close.includes(neighbour)) {
                        const index = close.indexOf(neighbour);
                        if (index > -1) {
                            close.splice(index, 1);
                        }

                        open.push(neighbour);
                    }
                }
            }
        }

        close.push(current);
        const index = open.indexOf(current);
        if (index > -1) {
            open.splice(index, 1);
        }
    }

    return null;
}

function score(storesGraph, storeEntrances, state){
    let total = 0;
    let totalPath = [];
    let pq = new PriorityQueue();

    if (state.length == 1){

        for (entrance in storeEntrances){

            pq.add([aStar(storesGraph, storeEntrances[entrance], state[0], true, state)[0], aStar(storesGraph, storeEntrances[entrance], state[0], true, state)[1]]);
       
        }
        return pq.peek();
    }
    else {
        for (entrance in storeEntrances){
            pq.add([aStar(storesGraph, storeEntrances[entrance], state[0], true, state)[0], aStar(storesGraph, storeEntrances[entrance], state[0], true, state)[1]]);
        }

        total += pq.peek()[0];
        totalPath += (Array.from(pq.peek()[1]));

        for(let i = 0; i < state.length-1; i++){

            total += aStar(storesGraph, state[i], state[i+1], false, state)[0];
            totalPath += "," + (Array.from(aStar(storesGraph, state[i], state[i+1], false, state)[1]));
        }
    }

    return [total, totalPath];
}

function swap(state){

    let subroute_a = Math.floor(Math.random() * (state.length + 1));
    let subroute_b = Math.floor(Math.random() * (state.length + 1));

    let subroute = state.slice(Math.min(subroute_a, subroute_b), Math.max(subroute_a, subroute_b));

    state.splice(Math.min(subroute_a, subroute_b), Math.max(subroute_a, subroute_b) - Math.min(subroute_a, subroute_b));

    let insert_pos = Math.floor(Math.random() * (state.length + 1));

    for (let i = 0; i < subroute.length; i++) {

        state.splice(insert_pos + i, 0, subroute[i]);

    }

    return state;
}

function simulatedAnnealing(storesGraph, storeEntrances, initialState){
    let temperature = 1.0;
    let alpha = 0.99;
    let minTemp = 0.01;

    let currentState = initialState;
    console.log(currentState);
    let currentScore = score(storesGraph, storeEntrances,currentState)[0];
    let currentOverallPath = score(storesGraph, storeEntrances,currentState)[1];

    while (temperature > minTemp){
        let newState = swap(currentState);

        newScore = score(storesGraph, storeEntrances, newState)[0];
        newOverallPath = score(storesGraph, storeEntrances, newState)[1];

        if (newScore > currentScore){
            currentScore = newScore;
            currentState = newState;
            currentOverallPath = newOverallPath;
        }
        else{
            let acceptance_probability = Math.exp((newScore - currentScore) / temperature);

            if (Math.random()>acceptance_probability){
                currentScore = newScore;
                currentState = newState;
                currentOverallPath = newOverallPath;
            }
        
        temperature = temperature *alpha;
        }
    }
    return currentOverallPath;
}


function calculateShortestPath(storesGraph, storeEntrances, storesToVisit){
    if (storesToVisit.length > 5){
        return simulatedAnnealing(storesGraph, storeEntrances, storesToVisit);
    }
    else{
        let permutations = allPermutations(storesToVisit);
        let pq = new PriorityQueue();
        let epq = new PriorityQueue();
        let fpq = new PriorityQueue();

        for (p in permutations){
            let total = 0;
            let totalPath = [];


            if (permutations[p].length == 1){
                for (entrance in storeEntrances){

 
                    epq.add([aStar(storesGraph, storeEntrances[entrance], permutations[p][0], true, permutations[p])[0], aStar(storesGraph, storeEntrances[entrance], permutations[p][0], true, permutations[p])[1]]);

                }
                return epq.peek();
            }

            else{
                for (entrance in storeEntrances){
 
                    fpq.add([aStar(storesGraph, storeEntrances[entrance], permutations[p][0], true, permutations[p])[0], aStar(storesGraph, storeEntrances[entrance], permutations[p][0], true, permutations[p])[1]]);
                }
                
                total = fpq.peek()[0];
                totalPath = (Array.from(fpq.peek()[1]));
        
                for(let i = 0; i < permutations[p].length-1; i++){
        
                    total += aStar(storesGraph, permutations[p][i], permutations[p][i+1], false, permutations[p])[0];
                    totalPath += "," + (Array.from(aStar(storesGraph, permutations[p][i], permutations[p][i+1], false, permutations[p])[1]));
                }
            }
            pq.add([total, totalPath]);
        }
        return pq.peek()[1];
    }
}

var path = calculateShortestPath(storesGraph, storeEntrances, ['the_pancake_parlour', 'cinema_elevator', 'foot_locker']).split(',');

console.log(path);

function displayShortestPath(path, storeLocations, groundFloor, elevators, storesToVisit, floor, position){

    for (let i = position; i < path.length; i++){
        console.log(path[i]);
        console.log(path);
        if (storesToVisit.includes(path[i])){
            var marker = L.marker(storeLocations[path[i]]).addTo(map);
            marker.bindPopup('<b>' + path[i] +'</b>');
        }

        if (elevators.includes(path[i+1])){
            var line = L.polygon([storeLocations[path[i]],storeLocations[path[i+1]]]).addTo(map);
            var elevator = L.marker(storeLocations[path[i+1]]).addTo(map);

            var finalPosition = i;
            break;
        }

        if(groundFloor.includes(path[i])){
            fgLevelOne.bringToFront();
            floor = true;
        }
        else{
            fgLevelTwo.bringToFront();
            floor = false;
        }

        var line = L.polygon([storeLocations[path[i]],storeLocations[path[i+1]]]).addTo(map);
    }

    elevator.on('click', function(e){
        displayShortestPath(path, storeLocations, groundFloor, elevators, storesToVisit, floor, finalPosition+1);
    });
}

displayShortestPath(path, storeLocations, groundFloor, elevators, ['the_pancake_parlour', 'cinema_elevator', 'foot_locker'], null, 0);

