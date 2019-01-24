
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var dwn = document.getElementById('btndownload');

        dwn.style.visibility="hidden";

    // create the second context
    var canvas2 = document.getElementById('tutorial2');
    var ctx2 = canvas2.getContext('2d');


    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
           // var dataUrl;
            var file;
            var img = new Image();

            img.onload = function(){

                    console.log(this.width);
                    console.log(this.height);
                // validate the image size
                   if(this.width > 200 && this.height > 150){

                       document.getElementById("p1").innerHTML = " Billedet er for stort til at skabe dit design. Det skal være : 200 X 150 px. ";

                       document.getElementById("p2").innerHTML = " Dit billede størrelse er :"+ this.width  + " X " + this.height + "px. ";
                       dwn.style.visibility="hidden";

                   }
                   else{
                       dwn.style.visibility="visible";

                       document.getElementById("p1").innerHTML="";
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

                       // save the image from the localstorage

                       localStorage.setItem( "savedImageData", canvas.toDataURL("image/jpg") );

                       // get the image form the local storage

                       var strDataURI = localStorage.getItem('savedImageData');
                       // call the function from the drawDataUrIOnCanvas by passing the new localstorage data and the second context

                       drawDataURIOnCanvas(strDataURI, ctx2);
                   }


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

  // downlaod Canvas
    dwn.onclick = function(){
        download(canvas2, 'minNytBilled.png');
    }

    function  download(canvas, filename) {
        /// create an "off-screen" anchor tag
        var lnk = document.createElement('a'), e;
        /// the key here is to set the download attribute of the a tag
        lnk.download = filename;
        /// convert canvas content to data-uri for link. When download
        /// attribute is set the content pointed to by link will be
        /// pushed as "download" in HTML5 capable browsers
        lnk.href = canvas.toDataURL("image/png;base64");
        /// create a "fake" click-event to trigger the download
        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false,
                false, 0, null);

            lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
            lnk.fireEvent("onclick");
        }

    }


