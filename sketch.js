//Create variables here
 var dog,happyDog, database, foodS, foodStock,dog1
 this.foodStock=createButton("food stock")
 this.lastfed=createButton("last fed")
function preload()
{
  dog1=loadImage("dogImg.png")
  happyDog=loadImage("dogImg1.png")
	//load images here
}

function setup() {
  createCanvas(500, 500);
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
  
  dog=createSprite(200,200,20,20)
  dog.addImage(dog1)
  database=firebase.database()
  foodStock=database.ref("Food");
  foodStock.on("value",readStock)
}


function draw() {  
background(46,139,87)
fill(255,255,254);
textSize(15);
if (lastfed>=12){
  text("Last Feed:"+ lastfed%12+"PM",350,30)
}else if (lastfed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed:"+lastfed+"AM",350,30)

}
if (keyWentDown(Up_ARROW)){
  writeStock(foodS)
  dog.addImage(happyDog)
  
}
fill("white")
  textSize(20)
text("Food Remaning:"+foodStock,300,300)
fill("white")
  textSize (20)
  text("Note press up arrow",400,400)
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




