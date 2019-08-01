var MqCanvas = {
    Vars: {
        OriginalContext: '',
        AlterContext: '',
        CanvasElement: '',
        CanvasTextDiv: '',
        Pos1: 0,
        Pos2: 0,
        Pos3: 0,
        Pos4: 0,
    },
    Init: function () {
        this.Vars.CanvasElement = document.getElementById('canvas');
        this.Vars.OriginalContext = canvas.getContext('2d');
        this.Vars.AlterContext = canvas.getContext('2d');
        this.InsertBackgroundImage();
        this.Addtext();
        this.InsertLogoImage();
        $("#canvasTextDiv").mouseup(function () {
            $('#canvasTextDiv').unbind('mousemove');
        });
        $("body").mouseup(function () {
            $('#canvasTextDiv').unbind('mousemove');
        });
        $("#canvasTextDiv").mousedown(function () {
            $('#canvasTextDiv').mousemove(function (event) {
                MqCanvas.ElementDrag(event);
            });
        });


        //this.Vars.CanvasElement.addEventListener('mousemove', MqCanvas.pick);
    },
    InsertBackgroundImage: function () {
        var img = new Image();
        img.onload = function () {
            MqCanvas.Vars.AlterContext.drawImage(img, 0, 0);
            MqCanvas.Addtext();
        };
        img.src = window.location.origin + '/Content/rhino.jpg';
    },
    InsertLogoImage: function () {
        var img = new Image();
        img.src = window.location.origin + '/Content/logo.jpg';
        img.onload = function () {
            MqCanvas.Vars.AlterContext.drawImage(img, 0, 0);
        };
    },
    Addtext: function () {
        MqCanvas.Vars.AlterContext.font = "40pt Calibri";
        MqCanvas.Vars.AlterContext.fillText('Hello world1', 50, 50);
    },
    pick: function (event) {
        var color = document.getElementById('color');
        var x = event.layerX;
        var y = event.layerY;
        var pixel = MqCanvas.Vars.AlterContext.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ', ' + data[1] +
            ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        color.style.background = rgba;
        color.textContent = rgba;
    },
    ElementDrag: function (e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        MqCanvas.Vars.Pos1 = MqCanvas.Vars.Pos3 - e.clientX;
        MqCanvas.Vars.Pos2 = MqCanvas.Vars.Pos4 - e.clientY;
        MqCanvas.Vars.Pos3 = e.clientX;
        MqCanvas.Vars.Pos4 = e.clientY;
        // set the element's new position:
        var offSetTop = MqCanvas.Vars.Pos2 + "px";
        var offsetLeft = MqCanvas.Vars.Pos1 + "px";
        console.log(offsetLeft);
        //$("#canvasTextDiv").style.top = ($("#canvasTextDiv").offsetTop - MqCanvas.Vars.Pos2) + "px";
        //$("#canvasTextDiv").style.left = ($("#canvasTextDiv").offsetLeft - MqCanvas.Vars.Pos1) + "px";
        $("#canvasTextDiv").css("top", offSetTop);
        $("#canvasTextDiv").css("left", offsetLeft);
    },
};
$(document).ready(function () {
    MqCanvas.Init();
});
