Webcam.set({
    height: 300, 
    width: 350, 
    image_format: 'png', 
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5_version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_sl95BzE/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");

}

function gotResult(error, result){
    if(error){
        console.log("error");
    }
    else if(result){
        console.log("U GOT YOUR RESULT: CHECK!")
        document.getElementById("result_object_name").innerHTML = result[0].label;
        document.getElementById("result_object_accuracy").innerHTML = result[0].confidence.toFixed(2);
    }
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}