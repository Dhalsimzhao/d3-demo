// console.log(d3)

window.onload = function () {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // create svg
  d3.select('#test').append('svg')
    .attr('width', 550).attr('height', 100)

  var xScale, yScale, xAxis, yAxis;
  var startTime, now;
  now = new Date();
  startTime = new Date(now.getTime() - 60*60*24*(26*7)*1000);
  // console.log(startTime, now);

  xScale = d3.scaleTime().domain([startTime, now]).range([0, 389]);
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
      return days[index].charAt(0);
    });

  var g = d3.select('svg').append('g')
  g.append('g')
    .attr('class', 'axis x')
    .attr('transform', 'translate(20, 110)').call(xAxis);
  g.append('g')
    .attr('class', 'axis y')
    .attr('transform', 'translate(15, 0)').call(yAxis);

  // draw heat map
  function getDatas() {
    var datas = [];
    var week, day, now;
    now = new Date();
    var restWeekdays = 6 - now.getDay();
    var endTime = new Date(now.getTime() + (restWeekdays+1)*24*60*60*1000);
    var endTimeStamp = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()).getTime();
    if (now.getDay()) {}
    for (var i = 0; i < 26*7; i++) {
      week = Math.floor(i/7);
      day = i % 7;
      datas.push({
        date: new Date(endTimeStamp - 60*60*24 * (26*7 - (week*7 + day))*1000),
        week: week,
        day: day,
        value: Math.random()
      });
    }
    return datas;
  }

  function getColor(value) {
    if (value > 0.9) {
      return 'red';
    } else if (value < 0.3) {
      return 'green';
    } else {
      return '#f2f2f2';
    }
  }
  var datas = getDatas();
  g.append('g').attr('class', 'cells').attr('transform', 'translate(20, 0)')
    .selectAll('.heat-map').data(datas).enter().append('svg:rect')
    .attr('width', 14)
    .attr('height', 14)
    .attr('x', (data)=>{
      return data.week * 15;
    })
    .attr('y', (data)=>{
      return data.day * 15;
    })
    .style('fill', function (data) {
      return data.date > Date.now() ? '#fff' : getColor(data.value)
    })
    .style('stroke', (data) => {
      return data.date > Date.now() ? '#eee' : 'none'
    })
    .on('mouseover', (data) => {
      tooltip.style('visibility', 'visible');
      tooltip.html(() => {
        var date = data.date;
        return days[date.getDay()] + ' ' + [date.getMonth()+1, date.getDate(), date.getFullYear()].join('/');
      });
    })
    .on('mousemove', (data) => {
      tooltip.style('left', d3.event.pageX+'px')
             .style('top', d3.event.pageY+'px')
    })
    .on('mouseout', (data) => {
      tooltip.style('visibility', 'hidden')
    })

  var tooltip = createTooltip();
  window.tooltip = tooltip;
  function createTooltip() {
    return d3.select('body').append('div')
              .attr('class', 'tooltip')
              .style('visibility', 'hidden')
  }
}