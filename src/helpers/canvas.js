export const Config = {
  get width() { return window.innerWidth },
  get height() { return window.innerHeight - 55 },
};

export const movePointAlongMatrix = (vector1, vector2, percentage) => {
  return {
    x : vector1.x * (1.0 - percentage) + vector2.x * percentage, 
    y : vector1.y * (1.0 - percentage) + vector2.y * percentage,
  }
};

export const dragBoundFunc = function(pos) {
  const minX = -550;
  const maxX = Config.width - 500;
  const minY = -500;
  const maxY = Config.height - 450;
  var x = pos.x;
  var y = pos.y;

  if (pos.x < minX) {
    x = minX;
  } else if (pos.x > maxX) {
    x = maxX;
  }

  if (pos.y < minY) {
    y = minY;
  } else if (pos.y > maxY) {
    y = maxY;
  }

  return { x, y };
};

export const handleDragEvents = function(stage) {
  stage.on('dragstart', function() {
    document.body.style.cursor = "grabbing";
  });

  stage.on('dragend', function() {
    document.body.style.cursor = "initial";
  });
}

export const handleZoom = function(stage) {
  const scaleBy = 1.025;
  const minScale = 0.8;
  const maxScale = 2;

  stage.on('wheel', e => {
    e.evt.preventDefault();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    var newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    if (newScale >= maxScale || newScale <= minScale) {
      return;
    }

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
        newScale,
      y:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
        newScale
    };

    stage.position(newPos);
    stage.batchDraw();
  });
}
