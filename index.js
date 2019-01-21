
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');




    // create the second context
    var canvas2 = document.getElementById('tutorial2');
    var ctx2 = canvas2.getContext('2d');


    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
            var dataUrl;
            var img = new Image();
            img.onload = function(){

                //canvas.width = window.innerWidth;;
                //canvas.height = window.innerHeight;
                canvas.width = '600';
                canvas.height = '500';
                ctx.translate(img.width,0)
                ctx.drawImage(img,0,0);
                ctx.scale(-1,1);
                ctx.drawImage(img,0,0);
                ctx.translate(img.width-1, img.height-1);
                ctx.rotate(Math.PI);
                ctx.drawImage(img,img.width,-img.height, img.width, img.height);
                ctx.translate(img.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(img,0,-img.height, img.width, img.height);

                // save the image from the locastorage

                localStorage.setItem( "savedImageData", canvas.toDataURL("image/jpg") );

                // get the image form the local storage

                var strDataURI = localStorage.getItem('savedImageData');
                // call the function from the drawDataUrIOnCanvas by passing the new localstorage data and the second context

                drawDataURIOnCanvas(strDataURI, ctx2);
                
            }
            img.src = event.target.result;
            document.getElementById('onepic').src = img.src;


        }
        reader.readAsDataURL(e.target.files[0]);

        // this function get draw the second canvas
        function drawDataURIOnCanvas(DataURI, context) {

            console.log(localStorage.key("savedImageData"))
            "use strict";
            var img = new Image();
            img.addEventListener("load", function () {

                for (var i=0;i<8;i++){
                    for (var j=0;j<8;j++){
                       //context.drawImage(img,10+i*700, 10+j*500);
                        context.drawImage(img,10+i*350, 10+j*295);

                    }
                }



            });
            img.setAttribute("src", DataURI);


        }


    }



