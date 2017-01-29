
let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",
    worldfile = "https://rawgit.com/Docwali777/mapdatavisualization/master/world-map.json",
    h = 1000,
    w = 1400;
let projection =

d3.geoMercator()
 //.center([-81.369515, 28.538479])
 .scale(100)
 	.translate([w / 2, h / 2]);



let path = d3.geoPath()
  .projection(projection)

  var zoom = d3.zoom()
      .on("zoom", zoomed);

      function zoomed() {
    view.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
  }

  function clicked(d, i) {
    if (d3.event.defaultPrevented) return; // zoomed

    d3.select(this).transition()
        .style("fill", "black")
      .transition()
        .style("fill", "white");
  }

  function nozoom() {
    d3.event.preventDefault();
  }


  var svg = d3.select("body")
  .on("touchstart", nozoom)
      .on("touchmove", nozoom)
  .append("svg").attr("height", h).attr("width", w)
  var g = svg.append("g")
      .call(zoom);

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
        Reclate: ${d.properties.reclat} <br>`;
  });
    // tip.text(function(d) {
    //   console.log(d.features.properties.mass)
    // })


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
.on('mouseover', tip.show)
.on('mouseout', tip.hide);

svg.call(tip)

console.log(data.features[0].properties)
})




}

d3.json(worldfile, function(map){

svg.selectAll("path")
.data(map.features).enter().append("path")
.attr("d", path)





})
