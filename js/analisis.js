


function array2html_ent(e) {
    var t = ""
    for (i in e) {
        var x = "<tr><td class='text-center'>" +
            String(parseInt(i) + 1) + "</td><td class='text-left'>" +
            String(e[i].entitas) + "</td><td  class='text-right'>" +
            String(e[i].jumlah) + "</td><tr>"
        t = t + x
    }
    return t;
}

function draw_sna(id_,leg_,file_) {
    var svg = d3.select(id_),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json(file_, function(error, graph) {
        if (error) throw error;

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", function(d) { return d.group; })
            .attr("fill", function(d) { return color(d.group); })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function(d) { return d.id; });

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }
    });

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    var Svg1 = d3.select(leg_)

    // create a list of keys
    
    var keys = ["Indikator BPS", "Tokoh Publik"]    


    

    // Usually you have a color scale in your chart already
    var color1 = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeCategory10);

    // Add one dot in the legend for each name.
    Svg1.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
        .attr("cy", 25)
        .attr("cx", function(d, i) { return 100 + i * 195 }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d) { return color1(d) })

    // Add one dot in the legend for each name.
    Svg1.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("y", 27)
        .attr("x", function(d, i) { return 115 + i * 195 }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d) { return color1(d) })
        .text(function(d) { return d })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
}


$(document).ready(function() {
    var uc1 = document.getElementById("uchart1").getContext("2d");
    var uc2 = document.getElementById("uchart2").getContext("2d");
    var bgc = ["#05ff71", "#4083ff", "#ff4040"]
    window.uchart1 = new Chart(uc1, {
        type: 'bar',
        data: {

            datasets: [{
                label: "Jumlah berita",
                backgroundColor: bgc,

            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: false,
                text: 'Jumlah Berita'
            }

        }
    });
    window.uchart2 = new Chart(uc2, {
        type: 'bar',
        data: {

            datasets: [{
                label: "Jumlah berita",
                backgroundColor: bgc,

            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: false,
                text: 'Jumlah Berita'
            }

        }
    });
    var kategori = $("#sentimen-kat").val()
    set_chartutama(kategori);
    //set_indikator();
    set_sunburst()
    set_nersum();
    draw_sna("#graph-sna","#graphsna-legend","data/indikatorsna.json");
    draw_sna("#graph-sna2","#graphsna2-legend","data/tokohsna.json");
    // fungsi tombol navigasi
    $("#tab-entitas").click(function(){
        $("#tab-entitas").addClass("active");
        $("#tab-sentimen").removeClass("active");
        $("#tab-sna").removeClass("active");
        $("#ner").css('display','block');
        $("#sentimen").css('display','none');
        $("#sna").css('display','none');
    });
    $("#tab-sentimen").click(function(){
        $("#tab-entitas").removeClass("active");
        $("#tab-sentimen").addClass("active");
        $("#tab-sna").removeClass("active");
        $("#ner").css('display','none');
        $("#sentimen").css('display','block');
        $("#sna").css('display','none');
    });
    $("#tab-sna").click(function(){
        $("#tab-entitas").removeClass("active");
        $("#tab-sentimen").removeClass("active");
        $("#tab-sna").addClass("active");
        $("#ner").css('display','none');
        $("#sentimen").css('display','none');
        $("#sna").css('display','block');
    });
    // ner kategori auto change  
    $("#ner-kat").on('change', function() {
        set_nersum();
    });
    // ner sentimen auto change  
    $("#sentimen-kat").on('change', function() {
        var kategori = $("#sentimen-kat").val();
        set_chartutama(kategori);
    });




});


// fungsi membuat grafik garis dinamis berita