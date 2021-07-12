song="";

leftWristx=0;
leftWristy=0;

rightWristx=0;
rigthWristy=0;

score_leftWrist=0;

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);

    fill('#6f12a1');
    stroke('#6f12a1');


    if(score_rightWrist>0.2){

    circle(rightWristx,rightWristy,20);

    if(rightWristy>0 && rightWristy<=100){

        document.getElementById("speed").innerHTML="Speed=0.5X";
        song.rate(0.5);
    }


    else if(rightWristy>100 && rightWristy<=200){

        document.getElementById("speed").innerHTML="Speed=1X";
        song.rate(1);
    }


    else if(rightWristy>200 && rightWristy<=300){

        document.getElementById("speed").innerHTML="Speed=1.5X";
        song.rate(1.5);
    }

    else if(rightWristy>300 && rightWristy<=400){

        document.getElementById("speed").innerHTML="Speed=2X";
        song.rate(2);
    }

    else if(rightWristy>400 && rightWristy<=500){

        document.getElementById("speed").innerHTML="Speed=2.5X";
        song.rate(2.5);
    }
    }


    if(score_leftWrist>0.2){
    circle(leftWristx,leftWristy,20);

    numberleftwristy=Number(leftWristy);
    remove_decimals=floor(numberleftwristy);

    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);

    }
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        score_leftWrist=results[0].pose.keypoints[9].score;
        score_rightWrist=results[0].pose.keypoints[10].score;

        console.log("score left wrist = "+score_leftWrist+ ", score right wrist = "+score_rightWrist);
        
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("left wrist x= "+leftWristx+", left wrist y= "+leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("right wrist x= "+rightWristx+", right wrist y= "+rightWristy);
    }
}