var pred_1="";
var pred_2="";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
 });
 cam=document.getElementById("camera");
 Webcam.attach( cam );
 function Capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="snap" src='+data_uri+'>';
    });
 }
 console.log("ml5 ver:",ml5.version);
 classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/3ArXWtvyd/model.json",modelLoaded);
 function modelLoaded(){
    console.log("Model Loaded");
 }
 function speak(){
    synthesis=window.speechSynthesis; 
    identifier="The first prediction is "+pred_1; 
    identifier_2="The second prediction is "+pred_2; 
    utter=new SpeechSynthesisUtterance(identifier+identifier_2);
    synthesis.speak(utter);
 }
 function predict (){
   img_st=document.getElementById("snap");
   classifier.classify(img_st,gotResult);
 }
 function gotResult(error,results){
   if (error){
      console.error(error);
   }
   else{
      console.log(results);
      pred_1=results[0].label;
      pred_2=results[1].label;
      document.getElementById("result_emotion_name").innerHTML=pred_1;
      document.getElementById("result_emotion_name2").innerHTML=pred_2;
      speak();
      if (pred_1=="Emotionless"){
         document.getElementById("updateEmoji").innerHTML="&#128528";
      }
      if (pred_1=="Angry"){
         document.getElementById("updateEmoji").innerHTML='&#128548';
      }
      if (pred_1=="Happy"){
         document.getElementById("updateEmoji").innerHTML='&#128512';
      }
      if (pred_1=="Sad"){
         document.getElementById("updateEmoji").innerHTML='&#128532';
      }
      if (pred_1=="Crying"){
         document.getElementById("updateEmoji").innerHTML='&#128546';
      }

      
      if (pred_2=="Emotionless"){
         document.getElementById("updateEmoji_2").innerHTML="&#128528";
      }
      if (pred_2=="Angry"){
         document.getElementById("updateEmoji_2").innerHTML='&#128548';
      }
      if (pred_2=="Happy"){
         document.getElementById("updateEmoji_2").innerHTML='&#128512';
      }
      if (pred_2=="Sad"){
         document.getElementById("updateEmoji_2").innerHTML='&#128532';
      }
      if (pred_2=="Crying"){
         document.getElementById("updateEmoji_2").innerHTML='&#128546';
      }
   }
 }
