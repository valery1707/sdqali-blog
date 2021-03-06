(function() {
    $(document).ready(function() {
	var drawText = function(ctx, text, fontSize, maxWidth) {
	    ctx.fillStyle = "white";
	    ctx.textAlign = "center";
	    ctx.font = '16pt Calibri';
	    var lines = fragmentText(ctx, text, maxWidth);
	    ctx.save();
	    lines.forEach(function (line, i) {
		var width = ctx.measureText(line).width,
		x = canvas.width / 2 - width / 2,
		y = ((i + 1) * fontSize)-(fontSize / 3.33);
		ctx.fillText(line, canvas.width / 2, (i + 1) * fontSize);
	    });
	    ctx.restore();
	}

	var fragmentText = function(ctx, text, maxWidth) {
	    var words = text.split(' '),
            lines = [],
            line = "";
	    if (ctx.measureText(text).width < maxWidth) {
		return [text];
	    }
	    while (words.length > 0) {
		while (ctx.measureText(words[0]).width >= maxWidth) {
		    var tmp = words[0];
		    words[0] = tmp.slice(0, -1);
		    if (words.length > 1) {
			words[1] = tmp.slice(-1) + words[1];
		    } else {
			words.push(tmp.slice(-1));
		    }
		}
		if (ctx.measureText(line + words[0]).width < maxWidth) {
		    line += words.shift() + " ";
		} else {
		    lines.push(line);
		    line = "";
		}
		if (words.length === 0) {
		    lines.push(line);
		}
	    }
	    return lines;
	}

	var fitImageOn = function(canvas, imageObj) {
	    var imageDimensionRatio = imageObj.width / imageObj.height;
	    var canvasDimensionRatio = canvas.width / canvas.height;
	    var renderableHeight, renderableWidth, xStart, yStart;
	    if(imageDimensionRatio < canvasDimensionRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	    } else if(imageDimensionRatio > canvasDimensionRatio) {
		renderableWidth = canvas.width
		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
		xStart = 0;
		yStart = (canvas.height - renderableHeight) / 2;
	    } else {
		renderableHeight = canvas.height;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
	    }
	    context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
	}

	var drawImage = function() {
	    var imgHeight = imageObj.height;
	    var imgWidth = imageObj.width;

	    fitImageOn(canvas, imageObj);
	};



	var canvas = document.getElementById('meme-canvas');
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	imageObj.onload = drawImage;
	imageObj.src = 'vijayaraghavan.png';
	context.drawImage(imageObj, 0, 0);

	$("#meme-text").on("input", null, null, function() {
	    drawImage();
	    drawText(context, this.value, 30, imageObj.width * 0.9);
	});

	$("#btn-download").click(function() {
	    Canvas2Image.saveAsPNG(canvas);
	});
    });
})();
