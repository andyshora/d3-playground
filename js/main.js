function example1() {
  var svgContainer = d3.select('#d3-animation--1').append('svg')
    .attr('width', 500)
    .attr('height', 500);

  var circle = svgContainer.append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', 50)
    .attr('fill', 'red');

  var bounceHeight = 300;
  var elapsedT = 0;
  var lastT = 0;

  transitionBounce();

  function transitionBounce() {
    circle
      .transition()
      .duration(2000)
      .attrTween('transform', translateBounce())
      .each('end', transitionBounce);
  }

  function translateBounce() {
    return function() {
      return function(t) {
        lastT = t;
        var p = getBouncePosition(t);
        return 'translate(' + p.x + ',' + p.y + ')';
      }
    }
  }

  /**
   * Get vertical bounc position
   * @param  {number} t 0-1
   * @return {object}   keys: x, y
   */
  function getBouncePosition(t) {
    var obj = { x: 100, y: bounceHeight * Math.sin((Math.PI * t) / 2) };
    return obj;
  }
}

function example2() {

  var h = 500;
  var w = 500;

  var dims = {
      width: w / 5,
      x: 200,
      y: 200
  };

  var svgContainer = d3.select('#d3-animation--2').append('svg')
    .attr('width', w)
    .attr('height', h);


  var squareContainer = svgContainer.append('g')
    .attr('transform', 'translate(0, 0)');

  var square = squareContainer.append('rect')
    .attr('height', dims.width)
    .attr('width', dims.width)
    .attr('fill', 'red')
    .attr('transform', 'rotate(0, ' + (dims.x+dims.width/2) + ','+ (dims.y+dims.width/2) +')')
    .attr('x', dims.x)
    .attr('y', dims.y);

  square.each(rotateInfinite);

  function rotateInfinite() {
    square
      .transition()
      .duration(10000)
      .attrTween('transform', function rotateObject() {
        return d3.interpolateString('rotate(0, '+ (dims.x+dims.width/2) + ','+ (dims.y+dims.width/2) +')', 'rotate(360, '+ (dims.x+dims.width/2) + ','+ (dims.y+dims.width/2) +')');
      })
      .ease('linear')
      .each('end', rotateInfinite);
  }
  
}


example1();
example2();
