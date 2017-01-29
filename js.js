
let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",
    worldfile = "https://rawgit.com/Docwali777/mapdatavisualization/master/world-map.json",
    h = window.innerHeight,
    w = window.innerWidth;
let projection =

d3.geoMercator()
 // .center([-81.369515, 28.538479])
 .scale(130)
// 	.translate([w, h / 2]);



let path = d3.geoPath()
  .projection(projection)

  var svg = d3.select("body").append("svg").attr("height", h).attr("width", w)
  //.style("border", "1px solid black")

d3.queue()
    .defer(d3.json, url)
   .await(meteorites)

//Access JSON data for Meteorite-strike-data
function meteorites()
{d3.json(url, function(data){


var circle = svg.selectAll("class", "  circle").data(data.features).enter().append("circle")

circle.attr("class", "circle")
.attr("cx", function(d){
if (d.geometry ===null){return 0}
else {return projection(d.geometry.coordinates)[0]}

})
.attr("cy", function(d){
if (d.geometry ===null){return 0}
else {return projection(d.geometry.coordinates)[1]}

})
// console.log(data)
})

}

d3.json(worldfile, function(map){

svg.selectAll("path")
.data(map.features).enter().append("path")
.attr("d", path)




console.log(map.features[0].properties.sovereignt)
})
