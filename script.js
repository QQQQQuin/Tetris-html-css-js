const board = document.getElementById("board");
const pause = document.getElementById("pause");
const left = document.getElementById("left");
const right = document.getElementById("right");
const r_counter = document.getElementById("r_counter");
const r_clockwise = document.getElementById("r_clockwise");

const a = new Array(21).fill().map(() => new Array(10).fill(0));
a.push(new Array(10).fill(9));
// I, J, L, O, S, T, Z
// const tetrominoes = 

board.style.fontFamily = "monospace";

console.log("2D array filled with zero's is:");
console.log(a);

// save the falling one to an array?
let fallingPiece = [];
let interval = 750;

let gameRunning = true;

function deepCopyArray(arr) {
    return arr.map(row => Array.isArray(row) ? [...row] : row);
}

function dropRandom(){
    let i = Math.floor(Math.random() * 7)+1;
    i = 5;
    console.log(i);
    // I, J, L, O, S, T, Z
    if(i==1){
        a[0][3] = 1;
        a[0][4] = 1;
        a[0][5] = 1;
        a[0][6] = 1;

        fallingPiece = [[0, 3], [0, 4], [0, 5], [0, 6], 0]

        // (0,3) (0,4) (0,5) (0,6) to fallingPiece? fallingPiece[4] for rotation
    }
    else if(i==2){
        a[0][3] = 2;
        a[1][3] = 2;
        a[1][4] = 2;
        a[1][5] = 2;

        fallingPiece = [[0,3],[1,3],[1,4],[1,5], 0];
    }
    else if(i==3){
        a[0][5] = 3;
        a[1][3] = 3;
        a[1][4] = 3;
        a[1][5] = 3;

        fallingPiece = [[0,5],[1,3],[1,4],[1,5], 0];
    }
    else if(i==4){
        a[0][4] = 4;
        a[0][5] = 4;
        a[1][4] = 4;
        a[1][5] = 4;

        fallingPiece = [[0,4],[0,5],[1,4],[1,5], 0];
    }
    else if(i==5){
        a[0][4] = 5;
        a[0][5] = 5;
        a[1][3] = 5;
        a[1][4] = 5;

        fallingPiece = [[0,4],[0,5],[1,3],[1,4], 0];
    }
    else if(i==6){
        a[0][4] = 6;
        a[1][3] = 6;
        a[1][4] = 6;
        a[1][5] = 6;

        fallingPiece = [[0,4],[1,3],[1,4],[1,5], 0];
    }
    else if(i==7){
        a[0][3] = 7;
        a[0][4] = 7;
        a[1][4] = 7;
        a[1][5] = 7;

        fallingPiece = [[0,3],[0,4],[1,4],[1,5], 0];
    }
}

function display(){
    let s = ``;
    let i = 0;
    a.forEach(row => {
        row.forEach(element => {
            if (element == 0) {
                s += `   `; // 3 spaces for each 0
            } else {
                s += `[${element}]`;
            }
        });
        s += ` ${i++}<br>`; // Add <br> for line break
    });
    s += `[-][-][-][-][-][-][-][-][-][-]<br>`;
    board.innerHTML = s;
}

function arrayIncludes(arr1, arr2) {
    // console.log(arr1);
    // console.log(arr2);
    for(let i=0;i<4;i++){
        if(arr1[i][0]==arr2[0] && arr1[i][1]==arr2[1]){
            return true;
        }
    }

    return false;
}

function checkCanFall(){
    for(let i=0;i<4;i++){
        if(a[fallingPiece[i][0]+1][fallingPiece[i][1]] != 0){
            if(!arrayIncludes(fallingPiece, [fallingPiece[i][0]+1, fallingPiece[i][1]])){
                // console.log("2");
                return false;
            }
        }
    }
    return true;
}

function checkCanGoLeft(){
    for(let i=0;i<4;i++){
        if(fallingPiece[i][1]-1<0){
            return false
        }
        if(a[fallingPiece[i][0]][fallingPiece[i][1]-1] != 0){
            if(!arrayIncludes(fallingPiece, [fallingPiece[i][0], fallingPiece[i][1]-1])){
                // console.log("2");
                return false;
            }
        }
    }
    return true;
}

function checkCanGoRight(){
    for(let i=0;i<4;i++){
        if(fallingPiece[i][1]+1>9){
            return false
        }
        if(a[fallingPiece[i][0]][fallingPiece[i][1]+1] != 0){
            if(!arrayIncludes(fallingPiece, [fallingPiece[i][0], fallingPiece[i][1]+1])){
                // console.log("2");
                return false;
            }
        }
    }
    return true;
}

function fall(){
    if(checkCanFall()){
        let type = a[fallingPiece[0][0]][fallingPiece[0][1]];
        // Clear current position in `a`
        for (let i = 0; i < 4; i++) {
            let [row, col] = fallingPiece[i];
            a[row][col] = 0; // Clear the old position
        }

        // Move `fallingPiece` down and update `a`
        for (let i = 0; i < 4; i++) {
            fallingPiece[i][0] += 1; // Move down
            let [newRow, newCol] = fallingPiece[i];
            a[newRow][newCol] = type; // Update new position in `a`
        }
    }
}

function update(){
    if(!checkCanFall()){
        dropRandom();
    }
    fall();
    display();
    if(gameRunning == true){
        setTimeout(update, interval);
    }
}


display();
dropRandom();
console.log(deepCopyArray(fallingPiece));
display();
console.log(deepCopyArray(fallingPiece));
update();

pause.addEventListener("click",() => {
    gameRunning = !gameRunning;
    if(gameRunning){
        update();
    }
    console.log(gameRunning);
})
left.addEventListener("click",() => {
    if(checkCanGoLeft()){
        let type = a[fallingPiece[0][0]][fallingPiece[0][1]];
        // Clear current position in `a`
        for (let i = 0; i < 4; i++) {
            let [row, col] = fallingPiece[i];
            a[row][col] = 0; // Clear the old position
        }

        // Move `fallingPiece` down and update `a`
        for (let i = 0; i < 4; i++) {
            fallingPiece[i][1] -= 1; // Move left
            let [newRow, newCol] = fallingPiece[i];
            a[newRow][newCol] = type; // Update new position in `a`
        }
    }
    display();
})
right.addEventListener("click",() => {
    if(checkCanGoRight()){
        let type = a[fallingPiece[0][0]][fallingPiece[0][1]];
        // Clear current position in `a`
        for (let i = 0; i < 4; i++) {
            let [row, col] = fallingPiece[i];
            a[row][col] = 0; // Clear the old position
        }

        // Move `fallingPiece` down and update `a`
        for (let i = 0; i < 4; i++) {
            fallingPiece[i][1] += 1; // Move right
            let [newRow, newCol] = fallingPiece[i];
            a[newRow][newCol] = type; // Update new position in `a`
        }
    }
    display();
})


function checkCanRClockwise(){
    let type = a[fallingPiece[0][0]][fallingPiece[0][1]];
    let rotationState = fallingPiece[4];

    if(type == 1){
        if(rotationState==0){
            if(fallingPiece[0][0]-2 >= 0){
                if(a[fallingPiece[0][0] - 2][fallingPiece[0][1] + 2]==0 && a[fallingPiece[0][0] - 1][fallingPiece[0][1] + 2]==0 && a[fallingPiece[0][0] + 1][fallingPiece[0][1] + 2]==0){
                    fallingPiece[4] = 1;
                    a[fallingPiece[0][0] - 2][fallingPiece[0][1] + 2]=1;
                    a[fallingPiece[0][0] - 1][fallingPiece[0][1] + 2]=1;
                    a[fallingPiece[0][0] + 1][fallingPiece[0][1] + 2]=1;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] -= 2;
                    fallingPiece[0][1] += 2;
                    

                   fallingPiece[1][0] -= 1;
                    fallingPiece[1][1] += 1;

                    fallingPiece[3][0] += 1;
                    fallingPiece[3][1] -= 1;
                }
            }
        }
        else if(rotationState==1){
            
if(fallingPiece[0][1] - 2 >= 0 && fallingPiece[0][1] + 1 < 10){
                if(a[fallingPiece[0][0] + 2][fallingPiece[0][1] - 2]==0 && a[fallingPiece[0][0] + 2][fallingPiece[0][1] - 1]==0 && a[fallingPiece[0][0] + 2][fallingPiece[0][1] + 1]==0){
                    fallingPiece[4] = 0;
                    a[fallingPiece[0][0] + 2][fallingPiece[0][1] - 2]=1;
                    a[fallingPiece[0][0] + 2][fallingPiece[0][1] - 1]=1;
                    a[fallingPiece[0][0] + 2][fallingPiece[0][1] + 1]=1;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] += 2;
                    fallingPiece[0][1] -= 2;
                    

                   fallingPiece[1][0] += 1;
                    fallingPiece[1][1] -= 1;

                    fallingPiece[3][0] -= 1;
                    fallingPiece[3][1] += 1;
                }
            }
        }
    }
    else if(type == 2){
        if(rotationState==0){
            if(fallingPiece[0][1]+2 <= 21){
                if(a[fallingPiece[0][0]][fallingPiece[0][1] + 2]==0 && a[fallingPiece[0][0]][fallingPiece[0][1] + 1]==0 && a[fallingPiece[0][0] + 2][fallingPiece[0][1] + 1]==0){
                    fallingPiece[4] = 1;
                    a[fallingPiece[0][0]][fallingPiece[0][1] + 2]=2;
                    a[fallingPiece[0][0]][fallingPiece[0][1] + 1]=2;
                    a[fallingPiece[0][0] + 2][fallingPiece[0][1] + 1]=2;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] += 0;
                    fallingPiece[0][1] += 2;
                    

                    fallingPiece[1][0] -= 1;
                    fallingPiece[1][1] += 1;

                    fallingPiece[3][0] += 1;
                    fallingPiece[3][1] -= 1;
                }
            }
        }
        else if(rotationState==1){
            if(fallingPiece[0][1] - 2 >= 0){
                if(a[fallingPiece[0][0] + 1][fallingPiece[0][1] - 2]==0 && a[fallingPiece[0][0] + 1][fallingPiece[0][1]]==0 && a[fallingPiece[0][0] + 2][fallingPiece[0][1]]==0){
                    fallingPiece[4] = 2;
                    a[fallingPiece[0][0] + 1][fallingPiece[0][1] - 2]=2;
                    a[fallingPiece[0][0] + 1][fallingPiece[0][1]]=2;
                    a[fallingPiece[0][0] + 2][fallingPiece[0][1]]=2;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] += 2;
                    fallingPiece[0][1] -= 0;

                    fallingPiece[1][0] += 1;
                    fallingPiece[1][1] += 1;

                    fallingPiece[3][0] -= 1;
                    fallingPiece[3][1] -= 1;
                }
            }
        }
        else if(rotationState==2){
            if(fallingPiece[0][0] - 2 >= 0){
                if(a[fallingPiece[0][0]][fallingPiece[0][1] - 2]==0 && a[fallingPiece[0][0]][fallingPiece[0][1] - 1]==0 && a[fallingPiece[0][0] - 2][fallingPiece[0][1] - 1]==0){
                    fallingPiece[4] = 3;
                    a[fallingPiece[0][0]][fallingPiece[0][1] - 2]=2;
                    a[fallingPiece[0][0]][fallingPiece[0][1] - 1]=2;
                    a[fallingPiece[0][0] - 2][fallingPiece[0][1] - 1]=2;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] += 0;
                    fallingPiece[0][1] -= 2;

                    fallingPiece[1][0] += 1;
                    fallingPiece[1][1] -= 1;

                    fallingPiece[3][0] -= 1;
                    fallingPiece[3][1] += 1;
                }
            }
        }
        else if(rotationState==3){
            if(fallingPiece[0][1] + 2 <= 9){
                if(a[fallingPiece[0][0] - 2][fallingPiece[0][1]]==0 && a[fallingPiece[0][0] - 1][fallingPiece[0][1]]==0 && a[fallingPiece[0][0] - 1][fallingPiece[0][1] + 2]==0){
                    fallingPiece[4] = 0;
                    a[fallingPiece[0][0] - 2][fallingPiece[0][1]]=2;
                    a[fallingPiece[0][0] - 1][fallingPiece[0][1]]=2;
                    a[fallingPiece[0][0] - 1][fallingPiece[0][1] + 2]=2;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] -= 2;
                    fallingPiece[0][1] -= 0;

                    fallingPiece[1][0] -= 1;
                    fallingPiece[1][1] -= 1;

                    fallingPiece[3][0] += 1;
                    fallingPiece[3][1] += 1;
                }
            }
        }
    }
    
    else if(type == 3){
        if(rotationState==0){
            if(fallingPiece[0][1]+2 <= 21){
                if(a[fallingPiece[0][0] + 2][fallingPiece[0][1]]==0 && a[fallingPiece[0][0] + 2][fallingPiece[0][1] - 1]==0 && a[fallingPiece[0][0]][fallingPiece[0][1] - 1]==0){
                    fallingPiece[4] = 1;
                    a[fallingPiece[0][0] + 2][fallingPiece[0][1]]=3;
                    a[fallingPiece[0][0] + 2][fallingPiece[0][1] - 1]=3;
                    a[fallingPiece[0][0]][fallingPiece[0][1] - 1]=3;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] += 2;
                    fallingPiece[0][1] += 0;
                    

                    fallingPiece[1][0] -= 1;
                    fallingPiece[1][1] += 1;

                    fallingPiece[3][0] += 1;
                    fallingPiece[3][1] -= 1;
                }
            }
        }
        else if(rotationState==1){
            if(fallingPiece[0][1] - 2 >= 0){
                if(a[fallingPiece[0][0]][fallingPiece[0][1] - 2]==0 && a[fallingPiece[0][0] - 1][fallingPiece[0][1] - 2]==0 && a[fallingPiece[0][0] - 1][fallingPiece[0][1]]==0){
                    fallingPiece[4] = 2;
                    a[fallingPiece[0][0]][fallingPiece[0][1] - 2]=3;
                    a[fallingPiece[0][0] - 1][fallingPiece[0][1] - 2]=3;
                    a[fallingPiece[0][0] - 1][fallingPiece[0][1]]=3;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] += 0;
                    fallingPiece[0][1] -= 2;

                    fallingPiece[1][0] += 1;
                    fallingPiece[1][1] += 1;

                    fallingPiece[3][0] -= 1;
                    fallingPiece[3][1] -= 1;
                }
            }
        }
        else if(rotationState==2){
            if(fallingPiece[0][0] - 2 >= 0){
                if(a[fallingPiece[0][0] - 2][fallingPiece[0][1]]==0 && a[fallingPiece[0][0] - 2][fallingPiece[0][1] + 1]==0 && a[fallingPiece[0][0]][fallingPiece[0][1] + 1]==0){
                    fallingPiece[4] = 3;
                    a[fallingPiece[0][0] - 2][fallingPiece[0][1]]=3;
                    a[fallingPiece[0][0] - 2][fallingPiece[0][1] + 1]=3;
                    a[fallingPiece[0][0]][fallingPiece[0][1] + 1]=3;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] -= 2;
                    fallingPiece[0][1] -= 0;

                    fallingPiece[1][0] += 1;
                    fallingPiece[1][1] -= 1;

                    fallingPiece[3][0] -= 1;
                    fallingPiece[3][1] += 1;
                }
            }
        }
        else if(rotationState==3){
            if(fallingPiece[0][1] + 2 <= 9){
                if(a[fallingPiece[0][0]][fallingPiece[0][1] + 2]==0 && a[fallingPiece[0][0] + 1][fallingPiece[0][1] + 2]==0 && a[fallingPiece[0][0] + 1][fallingPiece[0][1]]==0){
                    fallingPiece[4] = 0;
                    a[fallingPiece[0][0]][fallingPiece[0][1] + 2]=3;
                    a[fallingPiece[0][0] + 1][fallingPiece[0][1] + 2]=3;
                    a[fallingPiece[0][0] + 1][fallingPiece[0][1]]=3;
                    
                    
                    a[fallingPiece[0][0]][fallingPiece[0][1]]=0;
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] -= 0;
                    fallingPiece[0][1] += 2;

                    fallingPiece[1][0] -= 1;
                    fallingPiece[1][1] -= 1;

                    fallingPiece[3][0] += 1;
                    fallingPiece[3][1] += 1;
                }
            }
        }
    }
    
    else if(type == 5){
        if(rotationState==0){
            if(fallingPiece[0][0] - 1 >=0){
                if(a[fallingPiece[0][0] + 1][fallingPiece[0][1] + 1]==0 && a[fallingPiece[0][0] - 1][fallingPiece[0][1]]==0){
                    fallingPiece[4] = 1;
                    a[fallingPiece[0][0] + 1][fallingPiece[0][1] + 1]=5;
                    a[fallingPiece[0][0] - 1][fallingPiece[0][1]]=5;
                    
                    a[fallingPiece[2][0]][fallingPiece[2][1]]=0;
                    a[fallingPiece[3][0]][fallingPiece[3][1]]=0;

                    fallingPiece[0][0] += 0;
                    fallingPiece[0][1] += 1;
                    

                    fallingPiece[1][0] += 1;
                    fallingPiece[1][1] += 0;
                    
                    fallingPiece[2][0] -= 2;
                    fallingPiece[2][1] += 1;

                    fallingPiece[3][0] -= 1;
                    fallingPiece[3][1] -= 0;
                }
            }
        }
        else if(rotationState==1){
            if(fallingPiece[0][1] - 2 >= 0){
                if(a[fallingPiece[0][0] + 1][fallingPiece[0][1] - 1]==0 && a[fallingPiece[0][0] + 1][fallingPiece[0][1] - 2]==0){
                    fallingPiece[4] = 0;
                    a[fallingPiece[0][0] + 1][fallingPiece[0][1] - 1]=5;
                    a[fallingPiece[0][0] + 1][fallingPiece[0][1] - 2]=5;
                    
                    a[fallingPiece[1][0]][fallingPiece[1][1]]=0;
                    a[fallingPiece[2][0]][fallingPiece[2][1]]=0;

                    fallingPiece[0][0] += 0;
                    fallingPiece[0][1] -= 1;

                    fallingPiece[1][0] -= 1;
                    fallingPiece[1][1] += 0;
                    
                    fallingPiece[2][0] += 2;
                    fallingPiece[2][1] -= 1;

                    fallingPiece[3][0] += 1;
                    fallingPiece[3][1] -= 0;
                }
            }
        }
    }
}



r_clockwise.addEventListener("click",() => {
    checkCanRClockwise();
    display();
})
