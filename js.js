
let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",
    worldfile = "https://rawgit.com/Docwali777/mapdatavisualization/master/world-map.json",
    h = 1000,
    w = 1400;
let projection =

d3.geoMercator()
.scale(150)
 	.translate([w / 2, h / 2]);

var color = d3.scaleOrdinal(d3.schemeCategory20);

let path = d3.geoPath()
  .projection(projection)

var zoom = d3.zoom();


  var svg = d3.select("body")
  .append("svg").attr("height", h).attr("width", w).call(zoom)


d3.queue()
    .defer(d3.json, url)
   .await(meteorites)


   var tip = d3.tip()


//Access JSON data for Meteorite-strike-data
function meteorites()
{d3.json(url, function(data){

  tip.attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
  return `Name: ${d.properties.name} <br>
    Mass: ${d.properties.mass} <br>
      Reclong: ${d.properties.reclong} <br>
        Reclat: ${d.properties.reclat} <br>`;
  });

var circle = svg.selectAll("class", "  circle").data(data.features).enter().append("circle")

var min = d3.min(data.features, function(d){return +d.properties.mass})
var max = d3.max(data.features, function(d){return +d.properties.mass})

var radius = d3.scaleSqrt().domain([min, max]).range([1.5, 30])

circle.attr("class", "circle")
.attr("cx", function(d){
if (d.geometry ===null){return 0}
else {return projection(d.geometry.coordinates)[0]}

})
.attr("cy", function(d){
if (d.geometry ===null){return 0}
else {return projection(d.geometry.coordinates)[1]}

})
    .attr("r", function(d){return radius(+d.properties.mass)})
.attr("fill", function(d, i){return  color(radius(+d.properties.mass)) })
.on('mouseover', tip.show)
.on('mouseout', tip.hide);

svg.call(tip)

})




}

d3.json("anotherwolrdJSON.json", function(map){

svg.selectAll("path")
.data(map.features).enter().append("path")
.attr("d", path)
.attr("fill", "white")



})
