/*$(document).ready(function() {
    $(".menuindikator").mousedown(function() {
        $(this).attr('size', 8);

    });
    $(".menuindikator").change(function() {

        $(this).attr('size', 0);

    });
    $("body").click(function() {

        $(".menuindikator").attr('size', 0);

    });
});*/
// define functions
function formatTimeData(data) {

    let timeData = {};
    let date = moment();
    let endDate = moment();
    for (i in data) {
        timeData[String(data[i].x)] = parseInt(data[i].y);
        if (date > moment(data[i].x)) {
            date = moment(data[i].x);
        }
        if (endDate < moment(data[i].x)) {
            endDate = moment(data[i].x);
        }
    }

    let datas = [];


    do {
        let dateStr = date.format("YYYY-MM-DD");

        let obj = {
            'x': dateStr
        }
        if (timeData.hasOwnProperty(dateStr)) {

            obj['y'] = timeData[dateStr];
        } else {
            obj['y'] = 0;
        }
        datas.push(obj);
        date.add(1, 'day');
    } while (date.isBefore(endDate));

    return datas

}

function set_monitor(e) {
    blur();
    if (e == 'indikator') {
        $.ajax({
            url: 'api/twitter/monitor',
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            data: { 'monitor': e },
            success: function(result) {

                let waktu_sum = result['waktu_sum'].map(function(e) {
                    return { 'x': e['tanggal'], 'y': e['jumlah'] }
                });

                let label_prov = result['provinsi_sum'].map(function(e) {
                    return e['provinsi'];
                });
                let data_prov = result['provinsi_sum'].map(function(e) {
                    return e['jumlah'];
                });
                let label_indikator = result['indikator_sum'].map(function(e) {
                    return e['indikator'];
                });
                let data_indikator = result['indikator_sum'].map(function(e) {
                    return e['jumlah'];
                });
                monitor_provinsi_bar.data.datasets[0].data = data_prov;
                monitor_provinsi_bar.data.labels = label_prov
                monitor_provinsi_bar.update();
                waktu_sum = formatTimeData(waktu_sum)
                monitor_waktu.data.datasets[0].data = waktu_sum;
                monitor_waktu.update();
                monitor_indikator_bar.data.datasets[0].data = data_indikator;
                monitor_indikator_bar.data.labels = label_indikator
                monitor_indikator_bar.update();
                unblur();

            }
        });

    } else if (e == 'covid') {
        $.ajax({
            url: 'api/twitter/monitor',
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            data: { 'monitor': e },
            success: function(result) {
                let waktu_sum = result['waktu_sum'].map(function(e) {
                    return { 'x': e['tanggal'], 'y': e['jumlah'] }
                });

                let label_prov = result['provinsi_sum'].map(function(e) {
                    return e['provinsi'];
                });
                let data_prov = result['provinsi_sum'].map(function(e) {
                    return e['jumlah'];
                });

                monitor_provinsi_bar.data.datasets[0].data = data_prov;
                monitor_provinsi_bar.data.labels = label_prov
                monitor_provinsi_bar.update();
                waktu_sum = formatTimeData(waktu_sum)
                monitor_waktu.data.datasets[0].data = waktu_sum;
                monitor_waktu.update();

                fillMonitorTable(result['popular'], 0);
                fillMonitorTable(result['popular_todsay'], 1);
                unblur();


            }
        });
    }
    return 0;
}

function fillMonitorTable(data, tipe) {


    try {
        d = data.map(function(e, i) {
            let t = "<tr><td>" + String(parseInt(i) + 1) + "</td>" +
                "<td>@" + e['user_name'] + "</td>" +
                "<td>" + e['status_text'] + "</td>" +
                "<td>" + e['status_retweets'] + "</td></tr>";
            return t;
        });
    } catch (err) {
        console.log(err)
        return 0;
    }
    dj = d.join("");

    if (tipe == 0) {
        $("#monitor-popular").append(dj);
    } else {
        $("#monitor-popular-today").append(dj);
    }
}



function set_score_board() {

    $.ajax({
        url: 'api/getsum_berita',
        method: 'get',
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {

            $("#total-berita").html(result['sum_berita']['totalberita'].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
            $("#total-sumber").html(result['sum_berita']['totalsumber'].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
            $("#berita-bps").html(result['sum_berita']['totalberita_bps'].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
            for (i in result['sum_sentimen']) {

                nilai_ = String(result['sum_sentimen'][i]['jumlah'])
                nilai_ = nilai_.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                kelas_ = String(result['sum_sentimen'][i]['sentimen'])
                if (kelas_ == 'positif') {
                    $("#total-positif").html(nilai_);
                }
                if (kelas_ == 'negatif') {
                    $("#total-negatif").html(nilai_);
                }
                if (kelas_ == 'netral') {
                    $("#total-netral").html(nilai_);
                }
            }



        }

    });
}

function set_line(mulai, selesai) {
    $.ajax({
        url: 'api/getdaily_sumber',
        method: 'get',
        data: {
            "start": String(mulai),
            "end": String(selesai)
        },
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
            console.log(result)
            // prepare data received
            var dk, dr, dd, da = [];
            var data_kompas = result.filter(function(res) {
                return res['sumber'].toLowerCase() === 'kompas'
            });
            var data_republika = result.filter(function(res) {
                return res['sumber'].toLowerCase() === 'republika'
            });
            var data_detik = result.filter(function(res) {
                return res['sumber'].toLowerCase() === 'detik'
            });
            var data_antara = result.filter(function(res) {
                return res['sumber'].toLowerCase() === 'antara'
            });
            var data_okezone = result.filter(function(res) {
                return res['sumber'].toLowerCase() === 'okezone'
            });

            var data_bisnis = result.filter(function(res) {
                return res['sumber'].toLowerCase() === 'bisnis'
            });
            var data_okezone = result.filter(function(res) {
                return res['sumber'].toLowerCase() === 'okezone'
            });


            var dk = prepare_dt(data_kompas);
            var dr = prepare_dt(data_republika);
            var dd = prepare_dt(data_detik);
            var da = prepare_dt(data_antara);
            var db = prepare_dt(data_bisnis);
            var doo = prepare_dt(data_okezone);

            var hasil = [da, db, dd, dk, dr,doo];
            // draw chart based on data
            draw_line_chart(hasil);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            var e = String(thrownError.message);
        },
        complete: function() {
            $("#load-line_").css("display", "none");
            $("#line-chart-wrap").css("display", "block");
        }
    });
}


function set_bar(mulai, selesai) {
    $("#bar-wrap").css("display", "none");
    $("#bar-load").css("display", "inline-block");
    $.ajax({
        url: 'api/getsum_sumber',
        method: 'GET',
        data: {
            'start': mulai,
            'end': selesai
        },
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
            console.log(result)

            var data = [];
            var label = [];
            for (row in result) {
                var x = result[row].sumber;
                var y = result[row].jumlah;
                data[row] = y
                label[row] = x;
            }

            $("#bar-load").css("display", "none");
            drawBarChart(data, label);
            $("#bar-wrap").css("display", "block");
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            var e = String(thrownError.message);


        }
    });

}

function set_tag(mulai, selesai) {
    $("#tag-wrap").css('display', 'none');
    $("#tag-load").css('display', 'inline-block');
    $.ajax({

        url: 'api/gettop_tags',
        method: 'get',
        data: {
            "start": String(mulai),
            "end": String(selesai)
        },
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {

            str_all = "";

            for (row_idx in result) {
                label_ = result[row_idx].nama_tag
                data_ = result[row_idx].jumlah
                str_ = "<tr scope='row'>" +
                    "<td class='text-right'>" + String(parseInt(row_idx) + 1) + "</td>" +
                    "<td class='text-left'>" + label_ + "</td>" +
                    "<td class='text-right'>" + String(data_) + "</td></tr>";
                str_all += str_

            }
            $("#tag-table").empty();
            $("#tag-table").append(str_all);


        },
        complete: function() {
            $("#tag-wrap").css('display', 'inline-block');
            $("#tag-load").css('display', 'none');
        }
    });
}

function set_chartutama(kategori) {
    $("#utama-chart1").css("display", "none");
    $("#utama-chart2").css("display", "none");
    $("#bar-load1").css("display", "inline-block");
    $.ajax({
        url: 'api/getsum_sentimen',
        method: 'GET',
        data: {
            'kategori': kategori,
        },
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
            function ar_sen(ar, kelas) {
                try {
                    var ne = result[ar].filter(function(item) {
                        if (item.sentimen.toLowerCase() === kelas) {
                            return item;
                        }
                    })[0].jumlah;
                    return ne;
                } catch (e) {
                    return 0
                }



            }

            function make_data(data, jenis) {
                data[0] = ar_sen(jenis, 'positif');
                data[2] = ar_sen(jenis, 'negatif');
                data[1] = ar_sen(jenis, 'netral');
                return data;
            }
            var data1 = [];
            var data2 = [];
            var label = ["Positif", "Netral", "Negatif"];
            var data1 = make_data(data1, 'sentimen');
            var data2 = make_data(data2, 'sentimen_kutipan');
            console.log(ar_sen('sentimen', 'positif'))


            uchart1.data.datasets[0].data = data1;
            uchart1.data.labels = label;
            uchart1.update();
            uchart2.data.datasets[0].data = data2;
            uchart2.data.labels = label;
            uchart2.update();
            $("#utama-chart1").css("display", "block");
            $("#utama-chart2").css("display", "block");
            $("#bar-load1").css("display", "none");
        },
        error: function(xhr, ajaxOptions, thrownError) {

            var e = String(thrownError.message);
            console.log("some error");


        }
    });
}

function set_nersum() {
    var kategori = $("#ner-kat").val();

    $.ajax({
        url: 'api/getsum_ner',
        method: 'get',
        contentType: 'application/json',
        dataType: 'json',
        data: {
            'kategori': kategori
        },
        success: function(result) {
            console.log("hasil", result);
            var tokoh = array2html_ent(result.tokoh);
            var organisasi = array2html_ent(result.organisasi);
            var lokasi = array2html_ent(result.lokasi);
            var posisi = array2html_ent(result.posisi);

            $('#tabel-tokoh').empty();
            $('#tabel-posisi').empty();
            $('#tabel-organisasi').empty();
            $('#tabel-posisi').empty();
            $('#tabel-lokasi').empty();

            $('#tabel-tokoh').append(tokoh);
            $('#tabel-posisi').append(posisi);
            $('#tabel-organisasi').append(organisasi);
            $('#tabel-lokasi').append(lokasi);

            var sentimen = result.sentimen;
        }
    });
}


function urutkan(property, order) {
    var sort_order = 1;
    if (order === "desc") {
        sort_order = -1;
    }
    return function(a, b) {
        // a should come before b in the sorted order
        if (a[property] < b[property]) {
            return -1 * sort_order;
            // a should come after b in the sorted order
        } else if (a[property] > b[property]) {
            return 1 * sort_order;
            // a and b are the same
        } else {
            return 0 * sort_order;
        }
    }
}

function set_line_kategori() {
    var kategori = $("#kat-bps").val();
    $("#loading-anim1").css('display', 'inline-block');
    $("#line-kat-wrap").hide();
    var date_ = get_current_selected_date()
    var mulai = date_[0]
    var selesai = date_[1]
    console.log(kategori, mulai, selesai);
    $.ajax({
        url: 'api/getdaily_indikator',
        method: 'get',
        contentType: 'application/json',
        dataType: 'json',
        data: {
            'start': mulai,
            'end': selesai,
            'ind': kategori
        },
        success: function(result) {

            if (result.length <= 3) {

                $("#sel-kat").html(kategori);
                $("#jumlah-kat").html(result.length);
                $("#warn-kat").css('display', 'inline-block');
                $("#loading-anim1").css('display', 'none');
                return 0;
            }
            var data = [];

            for (row in result) {
                var x = result[row].waktu;
                var y = result[row].jumlah;
                data[row] = {
                    x: x,
                    y: y
                }

            }
            kategori_chart(data, kategori);
            $("#loading-anim1").css('display', 'none');
            $('#line-kat-wrap').css('display', 'flex');
            $("#warn-kat").css('display', 'none');


        }
    })
}

function kategori_chart(data, kategori) {

    kategori_.data = {
        datasets: [{
            data: data,
            label: kategori,
            pointStyle: 'circle',
            borderWidth: 2,
            borderColor: "rgb(0,12,246)",
            backgroundColor: "rgba(0,12,246,0.2)",
            fill: true
        }]
    };
    kategori_.update();
    $("#loading-anim1").css('display', 'none');
    $("#line-chart-wrap1").css('display', 'flex')

}

function set_sunburst() {
    // Dimensions of sunburst.

    var width = 600;
    var height = 450;
    var radius = Math.min(width, height) / 2;

    // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
    var b = {
        w: 250,
        h: 30,
        s: 3,
        t: 10
    };
     // Mapping of step names to colors.

    // Total size of all segments; we set this later, after loading the data.
    var totalSize = 0;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    var vis = d3.select("#chart").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("id", "container")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var partition = d3.partition()
        .size([2 * Math.PI, radius * radius]);

    var arc = d3.arc()
        .startAngle(function(d) { return d.x0; })
        .endAngle(function(d) { return d.x1; })
        .innerRadius(function(d) { return Math.sqrt(d.y0); })
        .outerRadius(function(d) { return Math.sqrt(d.y1); });

    // Use d3.text and d3.csvParseRows so that we do not need to have a header
    // row, and can receive the csv as an array of arrays.
    $.ajax({
        url: 'api/getsum_indikator',
        method: 'get',

        contentType: 'application/json',
        dataType: 'json',
        success: function(root) {

            var json = zoomable_format(root);

            createVisualization(json);
        }
    });

    // Main function to draw and set up the visualization, once we have the data.
    function createVisualization(json) {

        // Basic setup of page elements.
        initializeBreadcrumbTrail();



        // Bounding circle underneath the sunburst, to make it easier to detect
        // when the mouse leaves the parent g.
        vis.append("svg:circle")
            .attr("r", radius)
            .style("opacity", 0);

        // Turn the data into a d3 hierarchy and calculate the sums.
        var root = d3.hierarchy(json)
            .sum(function(d) { return d.size; })
            .sort(function(a, b) { return b.value - a.value; });

        // For efficiency, filter nodes to keep only those large enough to see.
        var nodes = partition(root).descendants()
            .filter(function(d) {
                return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
            });

        var path = vis.data([json]).selectAll("path")
            .data(nodes)
            .enter().append("svg:path")
            .attr("display", function(d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function(d) { return color(d.data.name); })
            .style("opacity", 1)
            .on("mouseover", mouseover);

        // Add the mouseleave handler to the bounding circle.
        d3.select("#container").on("mouseleave", mouseleave);

        // Get total size of the tree = value of root node from partition.
        totalSize = path.datum().value;
    };

    // Fade all but the current sequence, and show it in the breadcrumb trail.
    function format(n) {
        return n.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

    }

    function mouseover(d) {

        var percentage = (100 * d.value / totalSize).toPrecision(3);
        var percentageString = "\n( " + percentage + " % )";
        if (percentage < 0.1) {
            percentageString = "< 0.1%";
        }
        var valueString = format(String(d.value));
        var eksplan = valueString + percentageString;

        d3.select("#percentage")
            .text(eksplan)

        d3.select("#explanation")
            .style("visibility", "");

        var sequenceArray = d.ancestors().reverse();
        sequenceArray.shift(); // remove root node from the array
        updateBreadcrumbs(sequenceArray, eksplan, valueString);

        // Fade all the segments.
        d3.selectAll("path")
            .style("opacity", 0.3);

        // Then highlight only those that are an ancestor of the current segment.
        vis.selectAll("path")
            .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
            })
            .style("opacity", 1);
    }

    // Restore everything to full opacity when moving off the visualization.
    function mouseleave(d) {

        // Hide the breadcrumb trail
        d3.select("#trail")
            .style("visibility", "hidden");

        // Deactivate all segments during transition.
        d3.selectAll("path").on("mouseover", null);

        // Transition each segment to full opacity and then reactivate it.
        d3.selectAll("path")
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .on("end", function() {
                d3.select(this).on("mouseover", mouseover);
            });

        d3.select("#explanation")
            .style("visibility", "hidden");
    }

    function initializeBreadcrumbTrail() {
        // Add the svg area.
        var trail = d3.select("#sequence").append("svg:svg")
            .attr("width", 1000)
            .attr("height", 50)
            .attr("id", "trail");
        // Add the label at the end, for the percentage.
        trail.append("svg:text")
            .attr("id", "endlabel")
            .style("fill", "#000");
    }

    // Generate a string that describes the points of a breadcrumb polygon.
    function breadcrumbPoints(d, i) {
        var points = [];
        points.push("0,0");
        points.push(b.w + ",0");
        points.push(b.w + b.t + "," + (b.h / 2));
        points.push(b.w + "," + b.h);
        points.push("0," + b.h);
        if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
            points.push(b.t + "," + (b.h / 2));
        }
        return points.join(" ");
    }

    // Update the breadcrumb trail to show the current sequence and percentage.
    function updateBreadcrumbs(nodeArray, percentageString, valueString) {

        // Data join; key function combines name and depth (= position in sequence).
        var trail = d3.select("#trail")
            .selectAll("g")
            .data(nodeArray, function(d) { return d.data.name + d.depth; });

        // Remove exiting nodes.
        trail.exit().remove();

        // Add breadcrumb and label for entering nodes.
        var entering = trail.enter().append("svg:g");

        entering.append("svg:polygon")
            .attr("points", breadcrumbPoints)
            .style("fill", function(d) { return color(d.data.name); });

        entering.append("svg:text")
            .attr("x", (b.w + b.t) / 2)
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")

            .attr("text-anchor", "middle")
            .text(function(d) {
                nama = d.data.name;
                if (nama.length > 25) {
                    return nama.substring(0, 25) + " ..."
                }
                return nama;
            });

        // Merge enter and update selections; set position for all nodes.
        entering.merge(trail).attr("transform", function(d, i) {
            return "translate(" + i * (b.w + b.s) + ", 0)";
        });

        // Now move and update the percentage at the end.

        d3.select("#trail").select("#endlabel")
            .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(valueString + " ")
            .text(percentageString);

        // Make the breadcrumb trail visible, if it's hidden.
        d3.select("#trail")
            .style("visibility", "");

    }



    // Take a 2-column CSV and transform it into a hierarchical structure suitable
    // for a partition layout. The first column is a sequence of step names, from
    // root to leaf, separated by hyphens. The second column is a count of how 
    // often that sequence occurred.
    function buildHierarchy(csv) {
        var root = { "name": "root", "children": [] };
        for (var i = 0; i < csv.length; i++) {
            var sequence = csv[i][0];
            var size = +csv[i][1];
            if (isNaN(size)) { // e.g. if this is a header row
                continue;
            }
            var parts = sequence.split("-");
            var currentNode = root;
            for (var j = 0; j < parts.length; j++) {
                var children = currentNode["children"];
                var nodeName = parts[j];
                var childNode;
                if (j + 1 < parts.length) {
                    // Not yet at the end of the sequence; move down the tree.
                    var foundChild = false;
                    for (var k = 0; k < children.length; k++) {
                        if (children[k]["name"] == nodeName) {
                            childNode = children[k];
                            foundChild = true;
                            break;
                        }
                    }
                    // If we don't already have a child node for this branch, create it.
                    if (!foundChild) {
                        childNode = { "name": nodeName, "children": [] };
                        children.push(childNode);
                    }
                    currentNode = childNode;
                } else {
                    // Reached the end of the sequence; create a leaf node.
                    childNode = { "name": nodeName, "size": size };
                    children.push(childNode);
                }
            }
        }
        return root;
    };
}


function set_indikator() {

    const width = 800,
        height = 500,
        maxRadius = (Math.min(width, height) / 2) - 5;
    $("#load-line").css("display", "inline-block");
    $("#indikator-wrapper").css("display", "none");
    const formatNumber = d3.format(',d');

    const x = d3.scaleLinear()
        .range([0, 2 * Math.PI])
        .clamp(true);

    const y = d3.scaleSqrt()
        .range([maxRadius * .1, maxRadius]);

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const partition = d3.partition();

    const arc = d3.arc()
        .startAngle(d => x(d.x0))
        .endAngle(d => x(d.x1))
        .innerRadius(d => Math.max(0, y(d.y0)))
        .outerRadius(d => Math.max(0, y(d.y1)));

    const middleArcLine = d => {
        const halfPi = Math.PI / 2;
        const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
        const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

        const middleAngle = (angles[1] + angles[0]) / 2;
        const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
        if (invertDirection) {
            angles.reverse();
        }

        const path = d3.path();
        path.arc(0, 0, r, angles[0], angles[1], invertDirection);
        return path.toString();
    };

    const textFits = d => {
        const CHAR_SPACE = 6;

        const deltaAngle = x(d.x1) - x(d.x0);
        const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
        const perimeter = r * deltaAngle;

        return d.data.name.length * CHAR_SPACE < perimeter;
    };

    const svg = d3.select('#indikator').append('svg')
        .style('width', '100vw')
        .style('height', '100vh')
        .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
        .on('click', () => focusOn()); // Reset zoom on canvas click


    $.ajax({
        url: 'api/getsum_indikator',
        method: 'get',

        contentType: 'application/json',
        dataType: 'json',
        success: function(root) {
            console.log(root)



            var cdt = zoomable_format(root);


            var root = cdt;

            root = d3.hierarchy(root);
            root.sum(d => d.size);

            const slice = svg.selectAll('g.slice')
                .data(partition(root).descendants());

            slice.exit().remove();

            const newSlice = slice.enter()
                .append('g').attr('class', 'slice')
                .on('click', d => {
                    d3.event.stopPropagation();
                    focusOn(d);
                });

            newSlice.append('title')
                .text(d => d.data.name + '\n' + formatNumber(d.value));

            newSlice.append('path')
                .attr('class', 'main-arc')
                .style('fill', d => color((d.children ? d : d.parent).data.name))
                .attr('d', arc);

            newSlice.append('path')
                .attr('class', 'hidden-arc')
                .attr('id', (_, i) => `hiddenArc${i}`)
                .attr('d', middleArcLine);

            const text = newSlice.append('text')
                .attr('display', d => textFits(d) ? null : 'none');

            // Add white contour
            text.append('textPath')
                .attr('startOffset', '50%')
                .attr('xlink:href', (_, i) => `#hiddenArc${i}`)
                .text(d => d.data.name)
                .style('fill', 'none')
                .style('stroke', '#fff')
                .style('stroke-width', 5)
                .style('stroke-linejoin', 'round');

            text.append('textPath')
                .attr('startOffset', '50%')
                .attr('xlink:href', (_, i) => `#hiddenArc${i}`)
                .text(d => d.data.name);
            $("#load-line").css("display", "none");
            $("#indikator-wrapper").css("display", "inherit");

        }
    });



    function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
        // Reset to top-level if no data point specified
        const transition = svg.transition()
            .duration(750)
            .tween('scale', () => {
                const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                    yd = d3.interpolate(y.domain(), [d.y0, 1]);
                return t => {
                    x.domain(xd(t));
                    y.domain(yd(t));
                };
            });

        transition.selectAll('path.main-arc')
            .attrTween('d', d => () => arc(d));

        transition.selectAll('path.hidden-arc')
            .attrTween('d', d => () => middleArcLine(d));

        transition.selectAll('text')
            .attrTween('display', d => () => textFits(d) ? null : 'none');

        moveStackToFront(d);

        function moveStackToFront(elD) {
            svg.selectAll('.slice').filter(d => d === elD)
                .each(function(d) {
                    this.parentNode.appendChild(this);
                    if (d.parent) {
                        moveStackToFront(d.parent);
                    }
                })
        }

    }
}

function draw_tag_chart(data, label) {

    console.log(data, label)
    var ctx = document.getElementById('tag-Chart').getContext('2d');
    var chartData = {
        labels: label,
        datasets: [{
            label: "Jumlah Berita",
            data: data,
            backgroundColor: 'rgba(4, 128, 119,1)',
            hoverBackgroundColor: 'rgba(4, 128, 119,0.6)'
        }]
    };

    var TagChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: chartData,
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        min: 0
                    }
                }],
                yAxes: [{
                    stacked: true
                }]
            }

        }
    });

}

function draw_line_chart_dash(data) {

    var canv_wrap = document.getElementById("line-chart").getContext("2d")
    var xxx = new Chart(canv_wrap, {
        type: 'line',
        data: {
            datasets: [{
                data: data[0],
                label: "Antara",
                borderColor: "#3e95cd",
                lineTension: 0,
                backgroundColor: 'rgba(3, 144, 252,0.3)',
            }, {
                data: data[1],
                label: "Detik",
                borderColor: "#8e5ea2",
                fill: true
            }, {
                data: data[2],
                label: "Kompas",
                borderColor: "#3cba9f",
                fill: true
            }, {
                data: data[3],
                label: "Republika",
                borderColor: "#e8c3b9",
                fill: true
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Jumlah Berita per hari'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',

                    ticks: {
                        fontSize: 10
                    }
                }]
            }
        }
    });



}

function exportToCsv(filename, rows) {
    var processRow = function(row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function prepare_dt(datax) {
    var dk = [];
    for (row_idx in datax) {
        dk[row_idx] = {
            "x": datax[row_idx].waktu,
            "y": datax[row_idx].jumlah

        }
    }
    return dk;
}


//fungsi mengambil berita dan assign ke line chart





function get_current_selected_date() {
    var input_date = $("#reportrange span").html().split("-");
    var mulai = moment(input_date[0], "D MMMM YYYY");
    mulai = mulai.format("YYYY-MM-DD");
    var selesai = moment(input_date[1], "D MMMM YYYY");
    selesai = selesai.format("YYYY-MM-DD");
    var input_date = $("#reportrange span").html().split("-");
    var mulai = moment(input_date[0], "D MMMM YYYY");
    mulai = mulai.format("YYYY-MM-DD");
    var selesai = moment(input_date[1], "D MMMM YYYY");
    selesai = selesai.format("YYYY-MM-DD");
    date_ = [mulai, selesai];
    return date_;
}

function draw_line_chart(data) {

    line_chart.data = {
        datasets: [{
            data: data[0],
            label: "Antara",
            borderColor: "rgba(255, 47, 0,1)",
            backgroundColor: "rgba(255, 47, 0,.2)",
            
            fill: true
        }, {
            data: data[1],
            label: "Bisnis",
            borderColor: "rgba(255, 153, 0,2)",
            backgroundColor: "rgba(255, 153, 0,.2)",
            
            fill: true
        }, {
            data: data[2],
            label: "Detik",
            borderColor: "rgba(255, 234, 0,1)",
            backgroundColor: "rgba(255, 234, 0,.2)",
            
            fill: true
        }, {
            data: data[3],
            label: "Kompas",
            borderColor: "rgba(30, 255, 0,1)",
            backgroundColor: "rgba(30, 255, 0,.2)",
            
            fill: true
        }, {
            data: data[4],
            label: "Republika",
            borderColor:"rgb(128,0,128)",
            backgroundColor:"rgba(128,0,128,0.2)",
            
            fill: true
        },{
            data :data[5],
            label:"Okezone",
            borderColor: "rgba(5, 193, 245,1)",
            backgroundColor: "rgba(5, 193, 245,.2)",
            fill:true
        }]
    };
    line_chart.update();
    $("#load-line_").css("display", "none");
    $("#line-chart-wrap").css("display", "block");
}

function zoomable_format(response) {
    var nilai = [];
    for (var i in response) {
        nilai[i] = response[i].jumlah_berita
    }


    var indeks = 0;
    var data = {
        name: "indikator BPS",
        children: [{
            name: "Ekonomi",
            children: [{
                name: "Ekspor-Impor",
                children: [{ name: "Indeks Unit Value Ekspor/Impor", "size": 539 }]
            }, {
                name: "Transportasi",
                children: [{
                    name: "Rasio Penumpang per Pesawat Udara ",
                    "size": 12
                }, {
                    name: "Rasio Barang per Pesawat Udara ",
                    "size": 6
                }, {
                    name: "Rasio Penumpang per Kapal ",
                    "size": 8
                }, {
                    name: "Rasio Barang per Kapal ",
                    "size": 0
                }, {
                    name: "Rasio Penduduk terhadap Mobil Penumpang ",
                    "size": 0
                }, {
                    name: "Rasio Penduduk terhadap Kendaraan Bermotor ",
                    "size": 0
                }, {
                    name: "Rasio Penduduk terhadap Bus Umum ",
                    "size": 0
                }, { name: "Jumlah Kendaraan Bermotor ", "size": 0 }, {
                    name: "Panjang Jalan ",
                    "size": 0
                }, { name: "Rasio Kendaraan Bermotor terhadap Panjang Jalan", "size": 0 }]
            }, {
                name: "Indeks Harga Perdagangan Besar",
                children: [{ name: "Indeks Harga Perdagangan Besar (IHPB)", "size": 8 }]
            }, {
                name: "Inflasi",
                children: [{ name: "Indeks Harga Konsumen (IHK)", "size": 129 }, {
                    name: "Inflasi",
                    "size": 568
                }, {
                    name: "Indeks Konsumsi Rumah Tangga (IKRT) ",
                    "size": 44
                }, { name: "Inflasi Perdesaan", "size": 25 }]
            }, {
                name: "Indeks Tendensi Bisnis",
                children: [{
                    name: "Indeks Tendensi Bisnis (ITB) ",
                    "size": 32
                }, {
                    name: "Indeks datakator Kini (IIK) ",
                    "size": 0
                }, { name: "Indeks datakator Mendatang (IIM)", "size": 0 }]
            }, {
                name: "Indeks Tendensi Konsumen",
                children: [{
                    name: "Indeks Tendensi Konsumen (ITK)",
                    "size": 23
                }, {
                    name: "Indeks datakator Kini (IIK)",
                    "size": 1
                }, { name: "Indeks datakator Mendatang (IIM)", "size": 0 }]
            }, {
                name: "Nilai Tukar Petani",
                children: [{
                    name: "Nilai Tukar Petani (NTP)",
                    "size": 191
                }, {
                    name: "Indeks Harga yang Diterima Petani (It)",
                    "size": 71
                }, {
                    name: "Indeks Harga yang Dibayar Petani (Ib)",
                    "size": 58
                }, { name: "Rata-Rata Harga Gabah", "size": 20 }]
            }, {
                name: "Pariwisata",
                children: [{
                    name: "Rata-Rata Lama Menginap Tamu (Asing dan Dalam Negeri)",
                    "size": 0
                }, {
                    name: "Rata-Rata Lama Tinggal Wisatawan Mancanegara",
                    "size": 0
                }, {
                    name: "Rata-Rata Pengeluaran per Wisman per Hari per Kunjungan",
                    "size": 0
                }, {
                    name: "Tingkat Penghunian Kamar (TPK)",
                    "size": 44
                }, { name: "Penerimaan dari Wisatawan Mancanegara", "size": 57 }]
            }, {
                name: "PDB/PDRB",
                children: [{
                    name: "Produk Domestik Bruto (PDB)/Produk Domestik Regional Bruto (PDRB)",
                    "size": 163
                }, { name: "Laju Pertumbuhan PDB/PDRB ", "size": 253 }, {
                    name: "Indeks Implisit ",
                    "size": 0
                }, {
                    name: "Distribusi Persentase PDB/PDRB ",
                    "size": 0
                }, {
                    name: "PDB/PDRB per Kapita ",
                    "size": 4
                }, {
                    name: "Rasio Modal-Output Marginal ",
                    "size": 0
                }, { name: "Rasio Tenaga Kerja-Output Marginal", "size": 0 }]
            }, {
                name: "Pertumbuhan Produksi Industri",
                children: [{
                    name: "Pertumbuhan Produksi Industri Pengolahan ",
                    "size": 9
                }, { name: "Indeks Produksi Industri Pengolahan ", "size": 0 }]
            }]
        }, {
            name: "Sosial",
            children: [{
                name: "Pendidikan",
                children: [{
                    name: "Angka Melek Huruf (AMH) ",
                    "size": 4
                }, {
                    name: "Angka Partisipasi Kasar (APK) ",
                    "size": 0
                }, {
                    name: "Angka Partisipasi Murni (APM) ",
                    "size": 0
                }, {
                    name: "Angka Partisipasi Sekolah (APS) ",
                    "size": 4
                }, { name: "Rata-Rata Lama Sekolah ", "size": 16 }, {
                    name: "Angka Putus Sekolah ",
                    "size": 0
                }, {
                    name: "Rasio Murid-Guru ",
                    "size": 0
                }, {
                    name: "Pengeluaran Publik masuk Pendidikan sebagai Persentase dari Total Belanja Pemerintah",
                    "size": 0
                }]
            }, {
                name: "Kesehatan",
                children: [{
                    name: "Persentase Balita yang Ditolong Penolong Kelahiran ",
                    "size": 0
                }, {
                    name: "Cakupan Imunisasi ",
                    "size": 0
                }, {
                    name: "Persentase Balita yang Sudah Diimunisasi Lengkap ",
                    "size": 0
                }, {
                    name: "Persentase Penduduk Sakit dengan Pengobatan sendiri ",
                    "size": 0
                }, {
                    name: "Persentase Penduduk Sakit yang Konsultasi ke Tenaga Medis",
                    "size": 0
                }, {
                    name: "Persentase Penduduk Sakit yang Menjalani Rawat Inap di RS/Klinik yang Menyediakan Tenaga Medis",
                    "size": 0
                }]
            }, {
                name: "Fertilitas",
                children: [{
                    name: "Rata-Rata Jumlah Anak yang Pernah Dilahirkan/Paritas ",
                    "size": 0
                }, {
                    name: "Anak Lahir Hidup (ALH) ",
                    "size": 0
                }, {
                    name: "Anak Masih Hidup (AMH) ",
                    "size": 0
                }, {
                    name: "Angka Kelahiran Kasar ",
                    "size": 0
                }, {
                    name: "Angka Kelahiran Menurut Umur ",
                    "size": 0
                }, { name: "Angka Kelahiran Total ", "size": 1 }, {
                    name: "Angka Kelahiran Umum ",
                    "size": 0
                }, {
                    name: "Angka Reproduksi Neto ",
                    "size": 0
                }, { name: "Angka Reproduksi Kasar ", "size": 0 }, {
                    name: "Rasio Anak-Ibu ",
                    "size": 0
                }, {
                    name: "Umur Kawin Pertama (UKP) ",
                    "size": 0
                }, {
                    name: "Angka Prevalensi Pemakaian Kontrasepsi ",
                    "size": 0
                }, {
                    name: "Persentase Pemakai Suatu Cara KB Menurut Alat/Cara KB ",
                    "size": 0
                }, { name: "Persentase Pernah Pakai KB", "size": 0 }]
            }, {
                name: "Mortalitas",
                children: [{
                    name: "Angka Kematian Anak (AKA) ",
                    "size": 0
                }, {
                    name: "Angka Kematian Balita (AKBa) ",
                    "size": 0
                }, {
                    name: "Angka Kematian Bayi (AKB) ",
                    "size": 0
                }, {
                    name: "Angka Kematian Ibu (AKI) ",
                    "size": 3
                }, {
                    name: "Angka Kematian Kasar (AKK) ",
                    "size": 0
                }, {
                    name: "Angka Kematian Menurut Usia (AKMU) ",
                    "size": 0
                }, {
                    name: "Angka Kematian Neo-natal ",
                    "size": 0
                }, {
                    name: "Angka Kematian Post Neo-natal ",
                    "size": 0
                }, { name: "Angka Harapan Hidup", "size": 21 }]
            }, {
                name: "Morbiditas",
                children: [{
                    name: "Angka Kesakitan/ Morbiditas/Persentase Penduduk yang Mempunyai Keluhan Kesehatan",
                    "size": 1
                }, { name: "Rata-Rata Lama Sakit", "size": 0 }, {
                    name: "Tingkat Prevalensi ",
                    "size": 0
                }, { name: "Insidensi ", "size": 0 }, {
                    name: "Angka Fatalitas Kasus ",
                    "size": 0
                }, { name: "Angka Daya Tular ", "size": 0 }, {
                    name: "Tingkat Serangan ",
                    "size": 0
                }]
            }, {
                name: "Kependudukan",
                children: [{
                    name: "Kepadatan Penduduk ",
                    "size": 55
                }, {
                    name: "Laju Pertumbuhan Penduduk ",
                    "size": 6
                }, {
                    name: "Rasio Jenis Kelamin ",
                    "size": 0
                }, { name: "Distribusi Penduduk Menurut Wilayah", "size": 0 }]
            }, {
                name: "Migrasi",
                children: [{
                    name: "Angka Migrasi Masuk ",
                    "size": 0
                }, { name: "Angka Migrasi Keluar ", "size": 0 }, {
                    name: "Migrasi Neto ",
                    "size": 0
                }, { name: "Migrasi Seumur Hidup ", "size": 0 }, {
                    name: "Migrasi Risen ",
                    "size": 0
                }, { name: "Migrasi Total", "size": 0 }]
            }, {
                name: "Kemiskinan dan Ketimpangan",
                children: [{
                    name: "Ketimpangan Pendapatan (Ukuran Bank Dunia)",
                    "size": 0
                }, { name: "Koefisien Gini", "size": 103 }, {
                    name: "Garis Kemiskinan (GK) ",
                    "size": 287
                }, {
                    name: "Persentase Penduduk Miskin ",
                    "size": 231
                }, {
                    name: "Indeks Kedalaman Kemiskinan ",
                    "size": 17
                }, {
                    name: "Indeks Keparahan Kemiskinan ",
                    "size": 24
                }, { name: "Indeks Kemiskinan Manusia (IKM) ", "size": 0 }]
            }, {
                name: "Ketenagakerjaan",
                children: [{ name: "Angkatan Kerja", "size": 182 }, {
                    name: "Setengah Penganggur",
                    "size": 0
                }, {
                    name: "Tingkat Partisipasi Angkatan Kerja (TPAK)",
                    "size": 15
                }, {
                    name: "Tingkat Pengangguran Terbuka (TPT)",
                    "size": 160
                }, { name: "Tingkat Kesempatan Kerja", "size": 0 }, {
                    name: "Rasio Ketergantungan",
                    "size": 0
                }, {
                    name: "Rata-Rata Upah Harian Buruh Bangunan",
                    "size": 0
                }, { name: "Rata-Rata Upah Harian Buruh Tani", "size": 21 }]
            }, {
                name: "Pembangunan Manusia",
                children: [{
                    name: "Indeks Pembangunan Manusia (IPM)",
                    "size": 48
                }, {
                    name: "Rata-Rata Pengeluaran Perkapita Riil yang Disesuaikan (Daya Beli)",
                    "size": 0
                }, {
                    name: "Indeks Pembangunan Gender (IPG) ",
                    "size": 2
                }, { name: "Indeks Pemberdayaan Gender (IDG) ", "size": 2 }]
            }]
        }, {
            name: "Lainnya",
            children: [{ name: "Lainnya", children: [{ name: "Lainnya", "size": 14 }] }]
        }]
    };
    var indi_size = [];

    for (var satu in data.children) {
        for (var dua in data.children[satu].children) {
            for (var tiga in data.children[satu].children[dua].children) {
                data.children[satu].children[dua].children[tiga].size = nilai[indeks]
                indi_size[indeks] = {
                    'nama_indikator': data.children[satu].children[dua].children[tiga].name,
                    'jumlah_berita': nilai[indeks]
                }

                indeks += 1;
            }
        }
    }
    // make for top ind
    $("#tabel-indikator").empty();
    var top_ind = indi_size.sort(urutkan("jumlah_berita", 'desc')).slice(0, 10);
    //console.log(top_ind)
    for (var i in top_ind) {
        var y = parseInt(i) + 1;
        $("#tabel-indikator").append("<tr><td class='text-center'>" + y +
            "</td><td>" + top_ind[i].nama_indikator +
            "</td><td class='text-right'>" + top_ind[i].jumlah_berita + "</td></tr>");
    }


    return data;


}