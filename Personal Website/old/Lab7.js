
var px = [];
var py = [];
var vx = [];
var vy = [];
var fishCr = [];
var fishCg = [];
var fishCb = [];
var fishSc = [];
var px2 = [];
var py2 = [];
var sc = [];
var rot = [];
var numPads;
var numFish;

function setup()
{
   createCanvas(width,height);
   numFish = 17;
   numPads = 7;
   for (var i=0; i <numFish; i++) {
   px[i] = random(width);
   py[i] = random(height);
   vx[i] = random(-3, 3);
   vy[i] = random(-3, 3);
   fishCr[i] = random(0, 255);
   fishCg[i] = random(0, 255);
   fishCb[i] = random(0, 255);
   fishSc[i] = random(1,1.3);
   //fill arrays for background
   //var i = 0;
   }

   for (var j=0; j <numPads; j++)
   {

      px2[j] = random(width);
      py2[j] = random(height);
      sc[j] = random(5,7);
      rot[j] = random(0,2*PI);
   }
}

function getDistance(x0,y0,x1,y1)
{
   return sqrt(pow(x0-x1,2) + pow(y0-y1,2));
}
function getImpLine(x,y,x0,y0,x1,y1)
{
   return (y0-y1)*x + (x1-x0)*y + x0*y1 - x1*y0;
}

function drawBackground()
{
   //var i = 0;
   for(y = 0; y <= height; y+=10)
   {
      for(x = 0; x <= width; x+=10)
      {
         d = getDistance(x,height,x,y);

         if(getImpLine(x,y,0,height,width,height) < 0)
         {
            push();
            noStroke();
            fill(0,random(140,170)+d/10,150);
         
            ellipse(x+random(-20,20),y+random(-10,10),30);
            pop();
            //var i++;
         }

      }

   }
}

function drawFish(px,py,sc,vy,vx)
{
   push();
   translate(px,py);
   rotate(3*PI/2);
   rotate(atan2(vy, vx)+PI/2);
   scale(sc);
   noStroke();
   ellipse(25,10,5,5);
   ellipse(25,-10,5,5);
   ellipse(0,0,60,30);
   triangle(-20,0,-40,-7,-40,7);
   triangle(0,22,0,-22,20,0);
   fill(0);
   ellipse(25,10,5,5);
   ellipse(25,-10,5,5);
   pop();
}

function drawPad(px2,py2,rot,sc)
{
   push();
   noStroke();
   translate(px2,py2);
   rotate(rot);
   scale(sc);
   fill(0,255,0);
   ellipse(0,0,20,20);
   fill("pink");
   ellipse(3,-3,7,7);
   ellipse(3,3,7,7);
   ellipse(6,0,7,7);
   ellipse(0,0,7,7);
   fill("yellow");
   ellipse(3,0,5,5)
   //erase();
   //triangle(0,0,12,0,5,12);
   //noErase();
   pop();
}

function draw()
{
   //background(12, 34, 56);
   drawBackground();
   for (var i=0; i < numFish; i++) {
   //draw the ball
   fill(fishCr[i], fishCg[i], fishCb[i]);
   drawFish(px[i], py[i], fishSc[i],vy[i],vx[i]);
   //update position based on velocity
   px[i] += vx[i];
   py[i] += vy[i];

   if (px[i] >= width || px[i] <= 0) 
      vx[i] = -vx[i];

   if (py[i] <= 0 || py[i] >= height) 
      vy[i] = -vy[i];
   }
   for (var j=0; j < numPads; j++)
   {
      drawPad(px2[j],py2[j],rot[j],sc[j]);
   }

}