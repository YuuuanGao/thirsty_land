let img;
let sizes = [];
let cols;
let rows;
let size = 10;
let radio;
let selectedNumSides = 4; // 初始为4边形蒙版
let maskGraphics; // 用于存储蒙版图形
let contentGraphics; // 用于存储内容图形
let currentColor=[45, 92, 138]
let textContent=""
let mz=""
let v=true
let bg
function preload(){

  bg=loadImage("./img/3.png")
}

function setup() {
  createCanvas(410, 530);
  cols = floor(width / size); // 确保列数为整数
  rows = floor(height / size); // 确保行数为整数

  // 初始化 sizes 数组
  for (let i = 0; i < cols; i++) {
    sizes[i] = new Array(rows).fill(0); // 初始化每一列为一个数组
  }

  // 初始化蒙版和内容图形的缓冲
  maskGraphics = createGraphics(width, height);
  contentGraphics = createGraphics(width, height);

  // // 创建 Radio 按钮
  // radio = createRadio();
  // for (let i = 4; i <= 11; i++) {
  //   radio.option(`${i}-sided`, i);
  // }
  // radio.position(20, 20);
  // radio.style('width', '100px');
  // radio.selected('4'); // 默认选中4边形
  // radio.input(() => {
  //   redraw(); // 重新绘制
  // });

  noLoop(); // 初始只绘制一次
}


function handleFile() {

  
  file=sessionStorage.getItem("imageSrc");
  if (file.type != 'image') {
    img = loadImage(file, () => {
      // v=true
      redraw()
    });
  } else {
    console.log('请上传图片文件！');
  }
}

function imgcolor(i){

  if(i==0){
   
    console.log(888)
    currentColor = [45, 92, 138]; // 蓝色
    if (img) {
      // v=true
      redraw()
    };
  }


  else{ 

    console.log(888)
    currentColor = [236, 236, 229]; // 浅灰色
    if (img) {
      // v=true
        // 绘制内容图形
        redraw()
    };

  }



}


function polygon(p){

  selectedNumSides=parseInt(p)
  v=true
  redraw()

}



function gettextContent(v,t){


  // textsTY=v


  


  if (typeof t === 'string') {
    textContent=t
    // mz=window.parent.document.getElementById("m1").value

// console.log(textContent)

    // document.getElementById("k1").innerHTML=mz
    document.getElementById("k2").innerHTML=t
    // redraw()
} 




}
function gettextContent1(v,t){


  // textsTY=v


  


  if (typeof t === 'string') {
    // textContent=t
    // mz=window.parent.document.getElementById("m1").value

// console.log(textContent)

    document.getElementById("k1").innerHTML=t
    // document.getElementById("k2").innerHTML=t
    // redraw()
} 




}



let   showlogo=false
let   showline=false
let   showimg=false
let   showtxt=false


let zccc=false

function  hideall(i){

  if(i=="imgti"){

    showlogo=!showlogo
  }
  if(i=="txttn"){



    const element = document.getElementById('k1');

    // 获取计算后的样式
    const styles = window.getComputedStyle(element);
    
    // 获取visibility属性的值
    const visibility = styles.getPropertyValue('visibility');
    
    // 打印visibility属性的值
    console.log(visibility);


    // console.log(document.getElementById("k2").style.visibility,'ppppp')

    if (visibility === 'hidden') {

      
      document.getElementById("k1").style.visibility = 'visible'; // 显示内容

     
      
  } else {

   
    document.getElementById("k1").style.visibility = 'hidden'; // 隐藏内容
    
  }

   
  }
  if(i=="txtbd"){
    const element = document.getElementById('k2');

    // 获取计算后的样式
    const styles = window.getComputedStyle(element);
    
    // 获取visibility属性的值
    const visibility = styles.getPropertyValue('visibility');
    
    // 打印visibility属性的值
    console.log(visibility);


    // console.log(document.getElementById("k2").style.visibility,'ppppp')

    if (visibility === 'hidden') {


      zccc=true
      document.getElementById("k2").style.visibility = 'visible'; // 显示内容

      redraw()
      
  } else {
    zccc=false
    document.getElementById("k2").style.visibility = 'hidden'; // 隐藏内容
    redraw()
     
  }
  }



}
function draw() {
  background(255);
  fill(0)
  ellipse(width/2,30,20,20)

console.log(textContent,'plplp')

  if(img&&showlogo){

    push()


    translate(width*0.15,height*0.13)
  scale(0.7)
  // 绘制内容图形
  drawContent();

  // 绘制随机边长的多边形蒙版
  drawMask(selectedNumSides);

  // 应用蒙版：将内容限制在蒙版内
  applyMask();

pop()
  // v=false
  }




  push()
  // imageMode(CENTER);
  // image(bg,width/2,height-80,bg.width/4)

  push()
  // text c
// console.log(textContent.length)
if(zccc){
  push()

    translate(width/2-177,height-80)
    scale(1)
    strokeWeight(2)
    beginShape();
    vertex(0, 1.9);
    vertex(32, 2.3);
    vertex(95.3, 1);
    vertex(138.3, 3);
    vertex(162.9, 1.5);
    vertex(240.9, 3.2);
    vertex(263.2, 2.4);
    vertex(304.2, 3.5);
    vertex(337.1, 2.3);
    vertex(353.3, 2.4);
    endShape();
    pop ()

}
  pop ()
  pop ()


}

function drawContent() {
  contentGraphics.clear(); // 清除之前的内容
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let c = img.get(i * size, j * size);
      sizes[i][j] = map(brightness(c), 0, 100, size * 1.8, 0);
      contentGraphics.fill(currentColor[0], currentColor[1], currentColor[2]); // 蓝色
      contentGraphics.noStroke();
      drawRandomPolygon(
        contentGraphics,
        size / 2 + i * size,
        size / 2 + j * size,
        sizes[i][j]
      );
    }
  }
}

function drawRandomPolygon(pg, x, y, radius) {
  let numSides = 7; // 固定为7边形
  let minRadius = radius * 0.4;
  let maxRadius = radius * 0.9;

  pg.beginShape();
  for (let i = 0; i < numSides; i++) {
    let angle = TWO_PI / numSides * i;
    let r = random(minRadius, maxRadius);
    let xOffset = r * cos(angle);
    let yOffset = r * sin(angle);
    pg.vertex(x + xOffset, y + yOffset);
  }
  pg.endShape(CLOSE);
}

function drawMask(numSides) {
  maskGraphics.clear(); // 清除之前的蒙版
  maskGraphics.background(0); // 黑色为透明区域
  maskGraphics.fill(255); // 白色为可见区域
  maskGraphics.noStroke();
  maskGraphics.beginShape();

  let centerX = width / 2;
  let centerY = height / 2;
  let baseRadius = 200;

  for (let i = 0; i < numSides; i++) {
    let angle = TWO_PI / numSides * i - HALF_PI; // 顶点朝上
    let radius = random(baseRadius * 0.8, baseRadius * 1.2); // 随机边长
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    maskGraphics.vertex(x, y);
  }
  maskGraphics.endShape(CLOSE);
}

function applyMask() {
  // 从内容缓冲创建图像
  let contentImage = contentGraphics.get();

  // 获取蒙版缓冲作为图像
  let maskImage = maskGraphics.get();

  // 遍历每个像素，应用蒙版逻辑
  contentImage.loadPixels();
  maskImage.loadPixels();

  for (let i = 0; i < contentImage.pixels.length; i += 4) {
    // 如果蒙版像素是黑色（透明区域），将内容像素设为完全透明
    if (maskImage.pixels[i] === 0) {
      contentImage.pixels[i + 3] = 0; // alpha 设置为 0（透明）
    }
  }

  contentImage.updatePixels();

  // 绘制最终结果到画布
  image(contentImage, 0, 0);
}