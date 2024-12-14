

let img; // 上传的图片
let halftoneImg; // 存储 halftone 效果图片
let finalImage; // 用于显示裁切结果的图像
let cols, rows; // 列和行数
let size = 10; // 单个网格大小
let style = 1; // 默认使用 style1
let applyCustomMask = false; // 是否应用自定义蒙版
let customMaskType = 0; // 当前的蒙版类型（0 = 无蒙版，1 = Custom Mask 1，2 = Custom Mask 2）
let currentColor = [45, 92, 138]; // 默认七边形颜色为蓝色（color1）
let scaleValue = 1; // 图片缩放比例
let xOffset = 0, yOffset = 0, rotationAngle = 0; // 图片的偏移和旋转

let lineX = 0; // 线条的 X 偏移量
let lineY = 0; // 线条的 Y 偏移量
let lineScale = 1; // 线条的缩放比例
let logoY = 0; // 线条的 Y 偏移量
let logoScale = 1; // 线条的缩放比例
let lineRotation = 0; // 线条的旋转角度

const whiteCanvasWidth = 440;
const whiteCanvasHeight = 560;

let scaleSlider, xSlider, ySlider, rotationSlider;

// 存储文本的数组
let texts = [];

var svgls=[]; 


let textContent=""
let textY=0



let textsTY=1

let textlist=[]

let  svgtt=0

// On charge le fichier SVG
function preload(){


  for(let i=0;i<4;i++){

    svgls[i]=loadImage("./img/"+i+".png")

  }

}

function setup() {
  createCanvas(440, 560);

  

}

function gettextContent(v,t){


  textsTY=v


  console.log(v)


  if (typeof t === 'string') {
    textContent=t
} else {

  textlist=t
   
}




}


function imgstyle(i){

  if(i==0){
   
    style = 1;
    if (img) applyHalftoneEffect();
  }


  else{ 

    style = 2;
    if (img) applyHalftoneEffect();

  }



}


function  imgmask(i){

  if(i==0){

    applyCustomMask = false;
    customMaskType = 0;
    if (img) applyHalftoneEffect();
  }
  if(i==1){

    applyCustomMask = true;
    customMaskType = 1;
    if (img) applyHalftoneEffect();
  }
  if(i==2){

    applyCustomMask = true;
    customMaskType = 2;
    if (img) applyHalftoneEffect();
  }



}



let   showlogo=false
let   showline=false
let   showimg=false
let   showtxt=false

function  hideall(i){

  if(i=="logo"){

    showlogo=!showlogo
  }
  if(i=="line"){

    showline=!showline
  }
  if(i=="img"){

    showimg=!showimg
  }
  if(i=="txt"){

    showtxt=!showtxt
  }


}
function draw() {
  clear();

  // textContent=window.parent.document.getElementById("textContent").value

  // console.log(textContent)
  // textY=parseInt(window.parent.document.getElementById("textY").value)
  // lineX=parseInt(window.parent.document.getElementById("linex").value)
  // lineY=parseInt(window.parent.document.getElementById("liney").value)
  logoY=parseInt(window.parent.document.getElementById("logoy").value)
  xOffset=parseInt(window.parent.document.getElementById("xOffset").value)
  yOffset=parseInt(window.parent.document.getElementById("yOffset").value)
  rotationAngle=parseInt(window.parent.document.getElementById("rotationAngle").value)
  scaleValue=parseFloat(window.parent.document.getElementById("scaleValue").value)/10


  if(frameCount%60==0){

    lineScale=sessionStorage.getItem("lineScale")?sessionStorage.getItem("lineScale"):1
    logoScale=sessionStorage.getItem("logoscale")?sessionStorage.getItem("logoscale"):1
    svgtt=sessionStorage.getItem("svgtt")?sessionStorage.getItem("svgtt"):0
  }

  
 

  background(194, 161, 107);


  // 绘制图片下方的线条（先绘制线条）

  push()
  // drawLine();
  pop()

if(showimg){
  push()
  // 如果存在最终裁切后的图像，显示在白色画布中
  if (finalImage) {
    let imgX = width/2+ xOffset;
    let imgY =  height/2+yOffset;

    // 将裁剪结果绘制到白色画布，并应用缩放和旋转
    push();
    translate(imgX, imgY); // 将中心移动到图片偏移的位置
    rotate(radians(rotationAngle));
    scale(scaleValue); // 应用缩放比例
    imageMode(CENTER);
    image(finalImage, 0, 0, whiteCanvasWidth, whiteCanvasHeight);
    pop();
  }

  pop();
}

  if(textsTY==0){

    push()


    textAlign(CENTER)
    textSize(50)
  
    fill(0)
  
    text(textContent,width/2,height-300+textY)
    pop ()
  }
  if(textsTY==1){



    for(let i=0;i<textlist.length;i++){


      if(textlist[i][0]!=""){

      push()
      imageMode(CENTER);
      image(svgls[3],width/2,height-300+textY+60*i,svgls[3].width/4)
  
      // textAlign(CENTER)
      textSize(40)
    
      fill(0)
    
      text(textlist[i][0],width/2-svgls[3].width/8,height-320+textY+i*60)
      textSize(20)
    
      fill(64, 120, 156)
    
      text(textlist[i][1],width/2+svgls[3].width/8-textlist[i][1].length*10,height-320+textY+i*60)
      pop ()
      }

    }

   
  }
  if(textsTY==2){

    push()
    imageMode(CENTER);
    image(svgls[3],width/2,height-300+textY,svgls[3].width/4)

    // textAlign(CENTER)
    textSize(20)
  
    fill(64, 120, 156)
  
    text(textContent,width/2-svgls[3].width/8,height-270+textY)
    pop ()
  }


  if(showlogo){
  push()
  imageMode(CENTER)


  image(svgls[svgtt],width/2,logoY+50,svgls[svgtt].width*logoScale/10,svgls[svgtt].height*logoScale/10)


  pop()
 
  }
}


function drawLine() {
  push();
  translate(width / 2 + lineX, height / 2 + lineY); // 控制线条的位置
  rotate(radians(lineRotation)); // 控制线条的旋转
  scale(lineScale); // 控制线条的缩放

  stroke("#000000");
  strokeWeight(40);
  strokeCap(SQUARE); // 设置线条的端点为直角
  noFill();

  beginShape();
  vertex(-150, 200);
  vertex(-120, -100);
  vertex(-140, -220);
  vertex(-110, -330);
  vertex(50, -360);
  vertex(100, -420);
  vertex(200, -450);
  vertex(300, -500);
  vertex(400, -520);
  vertex(450, -540);
  endShape();

  pop();
}



// 处理上传的文件
function handleFile() {


  file=sessionStorage.getItem("imageSrc");
  if (file.type != 'image') {
    img = loadImage(file, () => {
      resizeImageToFit(); // 等比缩放图像
      applyHalftoneEffect(); // 应用 Halftone 效果
    });
  } else {
    console.log('请上传图片文件！');
  }
}
function imgcolor(i){

  if(i==0){
   
    console.log(888)
    currentColor = [45, 92, 138]; // 蓝色
    if (img) applyHalftoneEffect();
  }


  else{ 

    console.log(888)
    currentColor = [236, 236, 229]; // 浅灰色
    if (img) applyHalftoneEffect();

  }



}
// 等比缩放图像到宽度 900 像素
function resizeImageToFit() {
  let targetWidth = 900; // 目标宽度
  let aspectRatio = img.width / img.height; // 宽高比
  img.resize(targetWidth, targetWidth / aspectRatio); // 等比缩放
}

// 应用 Halftone 效果
function applyHalftoneEffect() {
  if (style === 1) {
    size = 10; // style1 的网格大小
  } else if (style === 2) {
    size = 20; // style2 的网格大小
  }

  cols = ceil(whiteCanvasWidth / size); // 白色画布的宽度除以网格大小
  rows = ceil(whiteCanvasHeight / size); // 白色画布的高度除以网格大小

  // 创建新的图像
  halftoneImg = createGraphics(whiteCanvasWidth, whiteCanvasHeight);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let c = img.get(i * size, j * size); // 获取每个网格的颜色
      let radius;
      if (style === 1) {
        radius = map(brightness(c), 0, 100, size * 2, 0); // style1 半径映射
      } else if (style === 2) {
        radius = map(brightness(c), 0, 100, size * 1.8, 0); // style2 半径映射
      }
      halftoneImg.fill(currentColor[0], currentColor[1], currentColor[2]); // 设置当前颜色
      halftoneImg.noStroke();
      drawRandomPolygon(halftoneImg, size / 2 + i * size, size / 2 + j * size, radius);
    }
  }

  // 将图像保存为 p5.Image
  finalImage = halftoneImg.get();

  // 应用蒙版
  if (applyCustomMask) {
    applyMask();
  }
}

function createControlBars() {
  // Line X Position Slider
  let lineXSlider = createSlider(-300, 300, 0);
  lineXSlider.position(50, height - 140);
  lineXSlider.style('width', '200px');
  lineXSlider.input(() => {
    lineX = lineXSlider.value();
  });

  // Line Y Position Slider
  let lineYSlider = createSlider(-300, 300, 0);
  lineYSlider.position(300, height - 140);
  lineYSlider.style('width', '200px');
  lineYSlider.input(() => {
    lineY = lineYSlider.value();
  });

  // Line Scale Slider
  let lineScaleSlider = createSlider(0.5, 3, 1, 0.01);
  lineScaleSlider.position(550, height - 140);
  lineScaleSlider.style('width', '200px');
  lineScaleSlider.input(() => {
    lineScale = lineScaleSlider.value();
  });

  // Line Rotation Slider
  let lineRotationSlider = createSlider(0, 360, 0);
  lineRotationSlider.position(800, height - 140);
  lineRotationSlider.style('width', '200px');
  lineRotationSlider.input(() => {
    lineRotation = lineRotationSlider.value();
  });
}

// 绘制随机多边形
function drawRandomPolygon(graphics, x, y, radius) {
  let numSides = 7; // 七边形
  let minRadius = radius * 0.4;
  let maxRadius = radius * 0.9;

  graphics.beginShape();
  for (let i = 0; i < numSides; i++) {
    let angle = TWO_PI / numSides * i;
    let r = random(minRadius, maxRadius); // 随机半径
    let xOffset = r * cos(angle);
    let yOffset = r * sin(angle);
    graphics.vertex(x + xOffset, y + yOffset);
  }
  graphics.endShape(CLOSE);
}

function applyMask() {
  let maskGraphics = createGraphics(whiteCanvasWidth, whiteCanvasHeight);
  maskGraphics.fill(255);
  maskGraphics.noStroke();

  if (customMaskType === 1) {
    // Custom Mask 1
    maskGraphics.beginShape();
    maskGraphics.vertex(80.52, 12.67);
    maskGraphics.vertex(116.04, 74.3);
    maskGraphics.vertex(174.13, 126.78);
    maskGraphics.vertex(229.42, 150.93);
    maskGraphics.vertex(285.32, 191.02);
    maskGraphics.vertex(286.79, 255.08);
    maskGraphics.vertex(296.72, 344.87);
    maskGraphics.vertex(319.59, 364.55);
    maskGraphics.vertex(360.47, 435.3);
    maskGraphics.vertex(361.82, 494.18);
    maskGraphics.vertex(349.63, 526.56);
    maskGraphics.vertex(370.27, 558.58);
    maskGraphics.vertex(370.92, 586.96);
    maskGraphics.vertex(350.37, 612.65);
    maskGraphics.vertex(319.24, 613.36);
    maskGraphics.vertex(303.46, 619.37);
    maskGraphics.vertex(304.68, 672.47);
    maskGraphics.vertex(243.98, 711.39);
    maskGraphics.vertex(233.59, 732.64);
    maskGraphics.vertex(234.97, 792.66);
    maskGraphics.vertex(148.01, 794.26);
    maskGraphics.vertex(73.48, 783.21);
    maskGraphics.vertex(14.19, 788.13);
    maskGraphics.vertex(14.09, 14.19);
    maskGraphics.vertex(80.52, 12.67);
    maskGraphics.endShape(CLOSE);
  } else if (customMaskType === 2) {
    // Custom Mask 2
    maskGraphics.beginShape();
    maskGraphics.vertex(83.66, 106.39);
    maskGraphics.vertex(116.31, 153.74);
    maskGraphics.vertex(170.33, 194.24);
    maskGraphics.vertex(222.07, 213.08);
    maskGraphics.vertex(274.18, 244.11);
    maskGraphics.vertex(274.74, 293.08);
    maskGraphics.vertex(282.94, 361.78);
    maskGraphics.vertex(304.21, 376.97);
    maskGraphics.vertex(341.79, 431.33);
    maskGraphics.vertex(342.3, 476.35);
    maskGraphics.vertex(330.42, 501.01);
    maskGraphics.vertex(349.43, 525.63);
    maskGraphics.vertex(349.68, 547.33);
    maskGraphics.vertex(330, 566.82);
    maskGraphics.vertex(300.68, 567.15);
    maskGraphics.vertex(285.75, 571.64);
    maskGraphics.vertex(286.22, 612.24);
    maskGraphics.vertex(228.57, 641.57);
    maskGraphics.vertex(218.52, 657.75);
    maskGraphics.vertex(219.04, 703.64);
    maskGraphics.vertex(137.15, 704.27);
    maskGraphics.vertex(67.13, 695.32);
    maskGraphics.vertex(11.24, 698.68);
    maskGraphics.vertex(21.1, 107.1);
    maskGraphics.vertex(83.66, 106.39);
    maskGraphics.endShape(CLOSE);

    maskGraphics.beginShape();
    maskGraphics.vertex(63.76, 73.71);
    maskGraphics.vertex(63.86, 83.28);
    maskGraphics.vertex(74.09, 98.63);
    maskGraphics.vertex(93.53, 98.41);
    maskGraphics.vertex(119.46, 107.68);
    maskGraphics.vertex(138.81, 121.08);
    maskGraphics.vertex(165.26, 128.8);
    maskGraphics.vertex(192.15, 141.64);
    maskGraphics.vertex(212.66, 138.21);
    maskGraphics.vertex(313.98, 195.44);
    maskGraphics.vertex(323.75, 260.42);
    maskGraphics.vertex(335.47, 272.25);
    maskGraphics.vertex(331.88, 300.36);
    maskGraphics.vertex(354.15, 326.17);
    maskGraphics.vertex(389.24, 333.24);
    maskGraphics.vertex(386.31, 351.57);
    maskGraphics.vertex(412.62, 394.48);
    maskGraphics.vertex(486.3, 392.43);
    maskGraphics.vertex(567.04, 361.82);
    maskGraphics.vertex(566.05, 297.44);
    maskGraphics.vertex(618.76, 259.4);
    maskGraphics.vertex(616.57, 67.41);
    maskGraphics.vertex(63.76, 73.71);
    maskGraphics.endShape(CLOSE);

    maskGraphics.beginShape();
    maskGraphics.vertex(602.44, 492.96);
    maskGraphics.vertex(571.6, 466.61);
    maskGraphics.vertex(543.25, 455.08);
    maskGraphics.vertex(520.49, 465.56);
    maskGraphics.vertex(490.55, 466.63);
    maskGraphics.vertex(443.72, 487.84);
    maskGraphics.vertex(420.39, 500.01);
    maskGraphics.vertex(347.33, 577.46);
    maskGraphics.vertex(337.94, 624.14);
    maskGraphics.vertex(320.58, 641.57);
    maskGraphics.vertex(320.67, 649.47);
    maskGraphics.vertex(298.93, 672.24);
    maskGraphics.vertex(289.67, 702.83);
    maskGraphics.vertex(604.79, 699.24);
    maskGraphics.vertex(602.44, 492.96);
    maskGraphics.endShape(CLOSE);
  }

  // 应用蒙版
  finalImage.mask(maskGraphics);
}

function drawRandomPolygon(graphics, x, y, radius) {
  let numSides = 7; // 七边形
  let minRadius = radius * 0.4;
  let maxRadius = radius * 0.9;

  graphics.beginShape();
  for (let i = 0; i < numSides; i++) {
    let angle = TWO_PI / numSides * i;
    let r = random(minRadius, maxRadius); // 随机半径
    let xOffset = r * cos(angle);
    let yOffset = r * sin(angle);
    graphics.vertex(x + xOffset, y + yOffset);
  }
  graphics.endShape(CLOSE);
}

function createSliders() {
  // 缩放滑块
  scaleSlider = createSlider(0.5, 2, 1, 0.01); // 缩放比例范围：0.5 - 2
  scaleSlider.position(50, height - 100);
  scaleSlider.style('width', '200px');
  scaleSlider.input(() => {
    scaleValue = scaleSlider.value();
  });

  // x 位置控制
  xSlider = createSlider(-300, 300, 0);
  xSlider.position(50, height - 70);
  xSlider.style('width', '200px');
  xSlider.input(() => {
    xOffset = xSlider.value();
  });

  // y 位置控制
  ySlider = createSlider(-300, 300, 0);
  ySlider.position(300, height - 70);
  ySlider.style('width', '200px');
  ySlider.input(() => {
    yOffset = ySlider.value();
  });

  // 旋转角度控制
  rotationSlider = createSlider(0, 360, 0);
  rotationSlider.position(550, height - 70);
  rotationSlider.style('width', '200px');
  rotationSlider.input(() => {
    rotationAngle = rotationSlider.value();
  });
}

// 绘制文本
function drawCustomText(textContent, font, size) {
  textFont(font);
  textSize(size);
  fill(0); // 设置文本颜色为黑色
  // 计算文本的起始位置，使其距离白色画布的边缘 30pt
  let x = (width / 2) - (textWidth(textContent) / 2); // 水平居中
  let y = (height / 2) - (whiteCanvasHeight / 2) + 30 + (size / 2); // 距离白色画布边缘 30pt
  text(textContent, x, y); // 在计算的位置绘制文本
}