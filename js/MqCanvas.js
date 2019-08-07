var MqCanvas = {
    Vars: {
        canvas:''
    },
    Init: function () {
        MqCanvas.Vars.canvas = new fabric.Canvas('canvasMq');
        fabric.Object.prototype.set({
            transparentCorners: true,
            cornerColor: '#22A7F0',
            borderColor: '#22A7F0',
            cornerSize: 12,
            padding: 5
        });
        var baseUrl = window.location.origin;
        MqCanvas.AddBackground(baseUrl+'/Content/scooter.jpg');
        MqCanvas.AddLogo(baseUrl+'/Content/logot.jpg');
        MqCanvas.AddText('Tap and Type');
    },
    Events: function () {
        // display/hide text controls
        //MqCanvas.Vars.canvas.on('object:selected', function(e) {
        //   if (e.target.type === 'i-text') {
        //      document.getElementById('textControls').hidden = false;
        //   }
        //});
        //MqCanvas.Vars.canvas.on('before:selection:cleared', function(e) {
        //   if (e.target.type === 'i-text') {
        //      document.getElementById('textControls').hidden = true;
        //   }
        //});
        document.getElementById('canvasLogoImg').addEventListener("change", function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (f) {
                var data = f.target.result;
                MqCanvas.AddLogo(data);
            };
            reader.readAsDataURL(file);
        });
        document.getElementById('canvasBackgroundImg').addEventListener("change", function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (f) {
                var data = f.target.result;
                MqCanvas.AddBackground(data);
            };
            reader.readAsDataURL(file);
        });
        $('#activeDeleteBtn').click(function () {
            MqCanvas.DeleteActiveElement();
        });
        $('#addTextBtn').click(function () {
            MqCanvas.AddText('Tap and Type');
        });
        $('#exportBtn').click(function () {
            console.log($(this));
            MqCanvas.ExportTemplate();
        });
        //download
        var imageSaver = document.getElementById('lnkDownload');
        imageSaver.addEventListener('click', saveImage, false);

        function saveImage(e) {
            console.log(e);
            this.href = MqCanvas.Vars.canvas.toDataURL({
                format: 'png',
                quality: 0.8
            });
            this.download = 'custom.png'
        }
        //download
        //TextEditor
        document.getElementById('text-color').onchange = function () {
            MqCanvas.Vars.canvas.getActiveObject().set('fill', this.value);
            MqCanvas.Vars.canvas.renderAll();
        };
        document.getElementById('text-bg-color').onchange = function () {
            MqCanvas.Vars.canvas.getActiveObject().set('textBackgroundColor', this.value);
            MqCanvas.Vars.canvas.renderAll();
        };
        document.getElementById('text-stroke-color').onchange = function () {
            MqCanvas.Vars.canvas.getActiveObject().set('stroke', this.value);
            MqCanvas.Vars.canvas.renderAll();
        };
        document.getElementById('text-stroke-width').onchange = function () {
            MqCanvas.Vars.canvas.getActiveObject().set('strokeWidth', this.value);
            MqCanvas.Vars.canvas.renderAll();
        };
        document.getElementById('font-family').onchange = function () {
            MqCanvas.Vars.canvas.getActiveObject().set('fontFamily', this.value);
            MqCanvas.Vars.canvas.renderAll();
        };
        document.getElementById('text-font-size').onchange = function () {
            MqCanvas.Vars.canvas.getActiveObject().set('fontSize', this.value);
            MqCanvas.Vars.canvas.renderAll();
        };
        /*   needToWork  
        document.getElementById('text-line-height').onchange = function () {
            MqCanvas.Vars.canvas.getActiveObject().setLineHeight(this.value);
            MqCanvas.Vars.canvas.renderAll();
        };
        document.getElementById('text-align').onchange = function () {
            MqCanvas.Vars.canvas.getActiveObject().setTextAlign(this.value);
            MqCanvas.Vars.canvas.renderAll();
        };*/
        radios5 = document.getElementsByName("fonttype");
        for (var i = 0, max = radios5.length; i < max; i++) {
            radios5[i].onclick = function () {

                if (document.getElementById(this.id).checked == true) {
                    if (this.id == "text-cmd-bold") {
                        MqCanvas.Vars.canvas.getActiveObject().set("fontWeight", "bold");
                    }
                    if (this.id == "text-cmd-italic") {
                        MqCanvas.Vars.canvas.getActiveObject().set("fontStyle", "italic");
                    }
                    if (this.id == "text-cmd-underline") {
                        MqCanvas.Vars.canvas.getActiveObject().set("underline", "underline");
                    }
                    if (this.id == "text-cmd-linethrough") {
                        MqCanvas.Vars.canvas.getActiveObject().set("linethrough", "line-through");
                    }
                    if (this.id == "text-cmd-overline") {
                        MqCanvas.Vars.canvas.getActiveObject().set("overline", "overline");
                    }
                } else {
                    if (this.id == "text-cmd-bold") {
                        MqCanvas.Vars.canvas.getActiveObject().set("fontWeight", "");
                    }
                    if (this.id == "text-cmd-italic") {
                        MqCanvas.Vars.canvas.getActiveObject().set("fontStyle", "");
                    }
                    if (this.id == "text-cmd-underline") {
                        MqCanvas.Vars.canvas.getActiveObject().set("underline", "");
                    }
                    if (this.id == "text-cmd-linethrough") {
                        MqCanvas.Vars.canvas.getActiveObject().set("linethrough", "");
                    }
                    if (this.id == "text-cmd-overline") {
                        MqCanvas.Vars.canvas.getActiveObject().set("overline", "");
                    }
                }
                MqCanvas.Vars.canvas.renderAll();
            }
        }
        //TextEditor
    },
    AddText: function (placeholder) {
        MqCanvas.Vars.canvas.add(new fabric.IText(placeholder, {
            left: 50,
            top: 100,
            fontFamily: 'verdana',
            fill: '#000',
            stroke: '#000',
            fontSize: 45
        }));
    },
    AddLogo: function (url) {
        fabric.Image.fromURL(url, function (img) {
            var oImg = img.set({
                left: 0,
                top: 0,
                angle: 0,
                //border: '#000',
                stroke: '#F0F0F0',
                strokeWidth: 40
            }).scale(0.2);
            MqCanvas.Vars.canvas.add(oImg).renderAll();
            var dataURL = MqCanvas.Vars.canvas.toDataURL({
                format: 'png',
                quality: 1
            });
        });
    },
    AddBackground: function (url) {
        fabric.Image.fromURL(url, function (img) {
            MqCanvas.Vars.canvas.setBackgroundImage(img, MqCanvas.Vars.canvas.renderAll.bind(MqCanvas.Vars.canvas), {
                scaleX: MqCanvas.Vars.canvas.width / img.width,
                scaleY: MqCanvas.Vars.canvas.height / img.height,
                backgroundImageOpacity: 0.5,
                backgroundImageStretch: false
            });
        });
    },
    DeleteActiveElement:function(){
        MqCanvas.Vars.canvas.remove(MqCanvas.Vars.canvas.getActiveObject());
    },
    ExportTemplate: function () {
        var dataUrl = MqCanvas.Vars.canvas.toDataURL({
            format: 'png',
            quality: 0.8
       });
       alert(dataUrl);
    }
};
$(document).ready(function () {
    MqCanvas.Init();
    MqCanvas.Events();
});
