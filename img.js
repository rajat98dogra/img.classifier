let mobilenet;
let video;
let label='test';
let classifier;
let add;
let add2;
let train;
let i=0;

function modelReady() {
	console.log("modelReady")
	
}
function videoReady() {
	console.log("videoReady")
	}

function whiletraining(loss) {
	if (loss==null){console.log("trianing is complete");
	classifier.classify(gotresult);}
	else{console.log(loss);}
}

function gotresult(error, results) {
	if (error){console.log(error);}
	else{//console.log(results);
		 label = results;
		classifier.classify(gotresult);
		}
}


function setup() {
	createCanvas(640,600);

	
	video = createCapture(VIDEO);
	video.hide();
	background(0);
	mobilenet= ml5.featureExtractor('MobileNet',video, modelReady)
	classifier = mobilenet.classification(video, videoReady)

	input = createInput();
	input.position(80,595);
	

	add =createButton('ADDFEATURE');
	add.position(input.x+input.width,650)
	add.mousePressed(function x() {
		console.log(input.value());
	classifier.addImage(input.value());
	});
	


	//add2 =createButton('ADDFEATURE2');
	//add2.mousePressed(function x() {
	//classifier.addImage('not me');
	//});

	train =createButton('train');
	train.mousePressed(function() {
	classifier.train(whiletraining);
	});


}
function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);

  text(label, 50, height - 20);
}
