var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
//agrega esta línea para que reconozca el español
recognition.lang="es-MX";

var Textbox = document.getElementById("textbox");

function start() 
{
    Textbox.innerHTML = "";
    recognition.start();
}

recognition.onresult = function (event) 
{    
    console.log(event);

    var Content = event.results[0][0].transcript;

    console.log(Content);
    Textbox.innerHTML = Content;
    //Primero, añade el código para verificar que se dice “toma una selfie”  en ella llama a la función speak (solo es moverla)
    if ( Content=="Toma mi selfie")
    {
        console.log("tomando selfie ---");
        speak();
    }
    
}

function speak (){
   
    var synth = window.speechSynthesis;

    //Vamos a remplazar speak_data=document.getElementById("textbox").value; para que diga "Toma la selfie en 5 segundos"
    speak_data="Tomando tu Selfie en 5 segundos "

    var utterThis = new SpeechSynthesisUtterance(speak_data); 

    synth.speak(utterThis);

    Webcam.attach(camera);

    //vamos a definir la función set Timeout dentro de la función speak() 

    setTimeout(function()
    {
        take_selfie();
        //llamar a la función save
        save();

    }, 5000);//tiempo en milisegundos

}
//Agregar la variable Camera
camera=document.getElementById("camera");

Webcam.set({
   
    width:360,
    height:250,
    image_format:"png",
    png_quality:90
});


//Agrega la función take_selfie
function take_selfie()
{
    //data_uri se usa para visualizar la imagen.
    Webcam.snap(function(data_uri){

        //Vamos a actualizar el div que hicimos para que contenga la imagen
        document.getElementById("result").innerHTML='<img id="selfie_image" src="'+data_uri+'"/>';
    });
}

//Declaramos la función save
function save()
{
    link=document.getElementById("link");
    //image es la variable en la que almacenaremos la imagen
    image=document.getElementById("selfie_image").src;
    link.href=image
    link.click();
}