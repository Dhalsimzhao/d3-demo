// console.log(d3)

window.onload = function () {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // create svg
  d3.select('#test').append('svg')
    .attr('width', 200).attr('height', 100)

  var xScale, yScale, xAxis, yAxis;
  var startTime, now;
  now = new Date();
  startTime = new Date(now.getTime() - 60*60*24*180*1000);
  // console.log(startTime, now);

  xScale = d3.scaleTime().domain([startTime, now]).range([0, 200]);
  yScale = d3.scaleLinear().domain([0, 6]).range([0, 100]);

  xAxis = d3.axisBottom(xScale)
    .ticks(7)
    .tickSize(0)
    .tickPadding(1)
    .tickFormat(function (tick) {
      return months[tick.getMonth()];
    });
  yAxis = d3.axisLeft(yScale)
    .ticks(5)
    .tickSize(0)
    .tickFormat(function(tick, index){
      return days[index];
    });

  var g = d3.select('svg').append('g')
  g.append('g')
    .attr('class', 'axis x')
    .attr('transform', 'translate(20, 100)').call(xAxis);
  g.append('g')
    .attr('class', 'axis y')
    .attr('transform', 'translate(15, 0)').call(yAxis);


}