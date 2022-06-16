Webcam, set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_gcSzCyIq/model.json', modelLoaded);

function modelLoaded() {
    console.log('Loaded!');
}

function check() {
    img = document, getElementById('captured_image');
    classifier.classify(img, gotResult);

}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        document.getElementById("result_object_name").innerHTML = results[0].label;

        gesture = results[0].label;

        toSpeak = "";

        if (gesture == "Call Me Hand") {
            toSpeak = "Call Me";
            document.getElementById("result_object_gesture_icon").innerHTML = "Call Me Hand";
        }
        else if (gesture == "Heart Hands") {
            toSpeak = "Heart";
            document.getElementById("result_object_gesture_icon").innerHTML = "Heart Hands";
        }
        else if (gesture == "Crossed Fingers") {
            toSpeak = ""Crossed";
            document.getElementById("result_object_gesture_icon").innerHTML = "Crossed Fingers";
        }
        else if (gesture == "Thumbs Up") {
            toSpeak = "Up";
            document.getElementById("result_object_gesture_icon").innerHTML = "Thumbs Up";
        }
        else if (gesture == "Pinched Fingures") {
            toSpeak = "Pinched";
            document.getElementById("result_object_gesture_icon").innerHTML = "Pinched Fingures";
        }
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}