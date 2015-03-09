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
    .attr('transform', 'rotate(0, ' + (dims.x + dims.width / 2) + ', ' + (dims.y + dims.width / 2) + ')')
    .attr('x', dims.x)
    .attr('y', dims.y);

  square.each(rotateInfinite);

  function rotateInfinite() {
    square
      .transition()
      .duration(10000)
      .attrTween('transform', function rotateObject() {
        return d3.interpolateString('rotate(0, '+ (dims.x + dims.width / 2) + ', ' + (dims.y + dims.width / 2) +')', 'rotate(360, '+ (dims.x + dims.width / 2) + ', ' + (dims.y + dims.width / 2) + ')');
      })
      .ease('linear')
      .each('end', rotateInfinite);
  }
  
}

function example3() {

  var h = 500;
  var w = 500;

  var dims = {
      width: w / 2,
      x: 200,
      y: 200,
      r: w / 4
  };

  var svgContainer = d3.select('#d3-animation--3').append('svg')
    .attr('width', w)
    .attr('height', h);


  var wheelContainer = svgContainer.append('g')
    .attr('transform', 'translate(0, 0)');

  var wheel = wheelContainer.append('circle')
    .attr('fill', 'red')
    .attr('cx', dims.x)
    .attr('cy', dims.y)
    .attr('r', dims.r);

  var innerWheel = wheelContainer.append('circle')
    .attr('fill', 'white')
    .attr('cx', dims.x)
    .attr('cy', dims.y)
    .attr('r', dims.r - 5);

  appendCars();

  function appendCars() {
    for (var i = 0; i < 108; i++) {
      if (i % 3 !== 1) {
        continue;
      }
      wheelContainer.append('circle')
        .attr('height', 10)
        .attr('width', 10)
        .attr('r', 5)
        .attr('fill', 'orange')
        .attr('cx', dims.x + (Math.cos(i * 10) * dims.r))
        .attr('cy', dims.y + (Math.sin(i * 10) * dims.r));
    }
    
  }

  wheel.each(rotateInfinite);

  function rotateInfinite() {
    wheelContainer
      .transition()
      .duration(30000)
      .attrTween('transform', function rotateObject() {
        return d3.interpolateString('rotate(0, '+ dims.x + ', ' + dims.y +')', 'rotate(360, '+ dims.x + ', ' + dims.y + ')');
      })
      .ease('linear')
      .each('end', rotateInfinite);
  }

}

example1();
example2();
example3();