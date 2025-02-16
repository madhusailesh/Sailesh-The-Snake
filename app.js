let inputDir={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameOver=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
let board = document.getElementById("board");
let speed = parseInt(prompt("Enter game speed (1 m/s to your choice):", "5")) || 5;
1
let lastPaintTime=0;
let score=0;
let HighScore=localStorage.getItem("HighScore");

if ( HighScore===null) {
  HighScore=0;
  localStorage.setItem("HighScore",JSON.stringify(HighScore));
}
else{
  HighScore = JSON.parse(HighScore);
  HighScoreBox.innerHTML = "High Score: " + HighScore;
}
 
 



let snakeArr=[
  {x:5,y:6}
]
food={x:5,y:8};

 function main(ctime){
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime-lastPaintTime)/1000<1/speed) {
    return;
  }
  lastPaintTime=ctime;
  gameEngine();
 }





 function gameEngine(){

 if (isCollideofsnake(snakeArr)) {
  
gameOver.play();
inputDir={x:0,y:0};
alert("Game Over Press Any Key To Play Again🫡");
snakeArr=[{x:1,y:1}];
score=0;


 }

 function isCollideofsnake(srrr){
  //Khud ko khale
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y) {
      return true;
    }
    
  }

   if (snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr [0].y<=0) {
      return true; 
       
  }
 }
 
//when food is eaten then we regnerate a new food
if (snakeArr[0].y===food.y && snakeArr[0].x===food.x) {
    foodSound.play();
    score+=1;
    if (score>HighScore) {
      
      HighScore=score;
      localStorage.setItem("HighScore",JSON.stringify(HighScore));
      HighScoreBox.innerHTML="HighScore"+HighScore;
    }
    scoreBox.innerHTML="Score: "+score;
    console.log(score);
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
let a=2;
let b=16;
food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random()) }

}


//moving the snake 

for (let i = snakeArr.length-2; i >=0; i--) {
   snakeArr[i+1]={...snakeArr[i]};
  
}
snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;
 
  board.innerHTML="";
  snakeArr.forEach((e,index)=>{

   let snakeElement=document.createElement('div');
   snakeElement.style.gridRowStart=e.y;
   snakeElement.style.gridColumnStart=e.x;
   snakeElement.classList.add('.snake');
   

   if (index===0) {
    snakeElement.classList.add('head');
    }
   else {
    snakeElement.classList.add('snake');
   } 
    
   
   board.appendChild(snakeElement);



  });

  //display the food
  foodElement=document.createElement('div');
   foodElement.style.gridRowStart=food.y;
   foodElement.style.gridColumnStart=food.x;
   foodElement.classList.add('food');
   board.appendChild(foodElement);
  

 }
 window.requestAnimationFrame(main);

 window.addEventListener('keydown',e=>{

  inputDir={x:0,y:1}
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
    console.log("ArrowUp");
    inputDir.x= 0;
    inputDir.y= -1;
    break;
    case "ArrowDown":
    console.log("ArrowDown");
    inputDir.x= 0;
    inputDir.y= 1;
    break;
    case "ArrowLeft":
    console.log("ArrowLeft");
    inputDir.x= -1;
    inputDir.y= 0;
    break;
    case "ArrowRight":
    console.log("ArrowRight");
    inputDir.x= 1;
    inputDir.y= 0;
    break;
    
    default:
      break;
  }
});


//for mobile
let touchStartX = 0, touchStartY = 0;
let touchEndX = 0, touchEndY = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe() {
  let diffX = touchEndX - touchStartX;
  let diffY = touchEndY - touchStartY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Left or Right swipe
    if (diffX > 0) {
      inputDir = { x: 1, y: 0 }; // Right
    } else {
      inputDir = { x: -1, y: 0 }; // Left
    }
  } else {
    // Up or Down swipe
    if (diffY > 0) {
      inputDir = { x: 0, y: 1 }; // Down
    } else {
      inputDir = { x: 0, y: -1 }; // Up
    }
  }

  moveSound.play();
}

