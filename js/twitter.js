function drawLokasiChart(data, label) {
    lokasi_bar.data.datasets[0].data = data
    lokasi_bar.data.labels = label
    lokasi_bar.update()
}

function drawHarianChart(data) {
    console.log(data);
    hari_bar.data.datasets[0].data = data
    hari_bar.update()
}

function blur() {
    $(".content").css('filter', 'blur(2px)');
    $("#m-load").css('display', 'block');
}

function unblur() {
    $(".content").css('filter', 'blur(0px)');
    $("#m-load").css('display', 'none');
}

function fillPopularTable(data, tipe) {


    d = data.map(function(e, i) {
        let t = "<tr><td>" + String(parseInt(i) + 1) + "</td>" +
            "<td>@" + e['user_name'] + "</td>" +
            "<td>" + e['status_text'] + "</td>" +
            "<td>" + e['status_retweets'] + "</td></tr>";
        return t;
    });
    dj = d.join("");

    if (tipe == 0) {
        $("#tabel-popular").append(dj);
    } else {
        $("#tabel-popular-today").append(dj);
    }
}



$(document).ready(function() {

    var uc1 = document.getElementById("twit-lokasi-bar").getContext("2d");
    var uc2 = document.getElementById("twit-hari-bar").getContext("2d");
    var uc3 = document.getElementById("monitor-lokasi-bar").getContext("2d");
    var uc4 = document.getElementById("monitor-hari-bar").getContext("2d");
    var uc5 = document.getElementById("monitor-indikator-bar").getContext("2d");
    var bgc = "#5a07a3"
    window.lokasi_bar = new Chart(uc1, {
        type: 'horizontalBar',
        data: {

            datasets: [{
                label: "Jumlah Cuitan",
                pointStyle: 'circle',
                borderWidth: 2,
                borderColor: "rgba(101, 4, 186,1)",
                backgroundColor: "rgba(101, 4, 186,1)",
                fill: true

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
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Jumlah Cuitan'
                    }
                }]
            },
            title: {
                display: true,
                text: 'Jumlah Cuitan Berdasarkan Provinsi',
                fontSize: 18
            }

        }
    });

    window.hari_bar = new Chart(uc2, {
        type: 'line',
        data: {

            datasets: [{
                label: "Jumlah Cuitan",
                pointStyle: 'circle',
                borderWidth: 2,
                borderColor: "rgba(101, 4, 186,1)",
                backgroundColor: "rgba(101, 4, 186,0.2)",
                fill: true

            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                offset: false,
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Jumlah Cuitan'
                    },
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            'day': 'MMM DD YYYY'
                        },
                        unit: 'day'
                    },


                    ticks: {
                        fontSize: 10
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Tanggal'
                    }
                }]
            },
            title: {
                display: true,
                text: 'Jumlah Cuitan Berdasarkan waktu (harian)',
                fontSize: 18
            }

        }
    });
    window.monitor_provinsi_bar = new Chart(uc3, {
        type: 'horizontalBar',
        data: {

            datasets: [{
                label: "Jumlah Cuitan",
                pointStyle: 'circle',
                borderWidth: 2,
                borderColor: "rgba(101, 4, 186,1)",
                backgroundColor: "rgba(101, 4, 186,1)",
                fill: true

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
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Jumlah Cuitan'
                    }
                }]
            },
            title: {
                display: true,
                text: 'Jumlah Cuitan Berdasarkan Provinsi',
                fontSize: 18
            }

        }
    });
    window.monitor_indikator_bar = new Chart(uc5, {
        type: 'horizontalBar',
        data: {

            datasets: [{
                label: "Jumlah Cuitan",
                pointStyle: 'circle',
                borderWidth: 2,
                borderColor: "rgba(101, 4, 186,1)",
                backgroundColor: "rgba(101, 4, 186,1)",
                fill: true

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
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Jumlah Cuitan'
                    }
                }]
            },
            title: {
                display: true,
                text: 'Jumlah Cuitan Berdasarkan keyword Indikator BPS',
                fontSize: 18
            }

        }
    });

    window.monitor_waktu = new Chart(uc4, {
        type: 'line',
        data: {

            datasets: [{
                label: "Jumlah Cuitan",
                pointStyle: 'circle',
                borderWidth: 2,
                borderColor: "rgba(101, 4, 186,1)",
                backgroundColor: "rgba(101, 4, 186,0.2)",
                fill: true

            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                offset: false,
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Jumlah Cuitan'
                    },
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            'day': 'MMM DD YYYY'
                        },
                        unit: 'day'
                    },


                    ticks: {
                        fontSize: 10
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Tanggal'
                    }
                }]
            },
            title: {
                display: true,
                text: 'Jumlah Cuitan Berdasarkan waktu (harian)',
                fontSize: 18
            }

        }
    });
    $("#pilih").click(function() {
        $("#live").css('filter', 'blur(2px)');
        $("#m-load").css('display', 'block');
        let key = $("#keyword").val()
        if (key.length < 3) {
            alert("maaf, masukkan minimal 3 karakter");
            $("#live").css('filter', 'blur(0px)');
            $("#m-load").css('display', 'none');
            return 0;
        }

        let urlx = "api/twitter/gettweets_bykeywords"
        $.ajax({
            url: urlx,
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            data: {
                'keyword': key
            },
            success: function(result) {
                var sortable = [];

                for (var v in result['lokasi']) {
                    sortable.push([v, result['lokasi'][v]]);
                }

                sortable.sort(function(a, b) {
                    return b[1] - a[1];
                });
                var lokasi_data = sortable.map(function(e) {
                    return e[1]
                });
                var lokasi_label = sortable.map(function(e) {
                    return e[0]
                });



                drawLokasiChart(lokasi_data, lokasi_label);

                var harian_data = result['jumlah_harian'].map(function(e) {
                    return { 'x': e['tanggal'].slice(0, 10), 'y': e['jumlah'] };
                });

                let x1 = formatTimeData(harian_data)

                drawHarianChart(x1);

                $("#tabel-popular").empty();
                $("#tabel-popular-today").empty();
                fillPopularTable(result['popular'], 0);
                fillPopularTable(result['popular_today'], 1);
                $("#live").css('filter', 'blur(0px)');
                $("#m-load").css('display', 'none');

            }
        });

    });
    $("#btn-tab1").click(function() {
        $("#live").css('display', 'none');
        $("#monitoring").css('display', 'block');
        $("#btn-tab2").removeClass('active');
        $("#btn-tab1").addClass('active');
    });
    $("#btn-tab2").click(function() {
        $("#live").css('display', 'block');
        $("#monitoring").css('display', 'none');
        $("#btn-tab1").removeClass('active');
        $("#btn-tab2").addClass('active');
    });
    $("#monitor-keyword").change(function() {
        let nilai = $("#monitor-keyword").val()
        if (nilai == 'covid') {
            $("#row-indikator").css('display', 'none');
            $("#popular-wrap").css('display', 'block');
        } else {
            $("#row-indikator").css('display', 'block');
            $("#popular-wrap").css('display', 'none');
        }

    });
    $("#monitor-pilih").click(function() {
        let nilai = $("#monitor-keyword").val();
        set_monitor(nilai);


    });
});