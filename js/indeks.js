window.onload = function() {
    moment.locale = "id";
    var canv_wrap = document.getElementById("line-chart").getContext("2d");
    window.bar_chart = new Chart(document.getElementById("bar-Chart").getContext("2d"), {
        type: 'bar',
        data: {

            datasets: [{
                label: "Jumlah berita",
                backgroundColor: ["#ff2f00", "#ff9900", "#ffea00", "#1eff00", "#05c1f5","purple"],

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

    window.line_chart = new Chart(canv_wrap, {
        type: 'line',
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
                    time: {
                        displayFormats: {
                            'day': 'DD MMM YYYY'
                        },
                        unit:'day'
                    },
                    ticks: {
                        fontSize: 10
                    }
                }]
            }
        }
    });
    line_chart.options.elements.line.tension = 0;

    //console.log("klik");
    $("#load-line_").css("display", "inline-block");
    $("#line-chart-wrap").css("display", "none");
    var date_ = get_current_selected_date();
    var mulai = date_[0]
    var selesai = date_[1]
    set_bar(mulai, selesai);
    // make ajax call
    set_tag(mulai, selesai);
    set_line(mulai, selesai);





}



function drawBarChart(data, label) {
    bar_chart.data.datasets[0].data = data
    bar_chart.data.labels = label
    bar_chart.update()
}


$(document).ready(function() {

    moment.locale = "id";
    var start = moment("2020-06-01")
    var end = moment("2020-06-30");

    function cb(start, end) {
        $('#reportrange span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        buttonClasses: "btn",
        ranges: {
            'Sekarang': [moment(), moment()],
            'Kemarin': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '7 Hari terakhir': [moment().subtract(6, 'days'), moment()],
            '30 Hari terakhir': [moment().subtract(29, 'days'), moment()],
            'Bulan ini': [moment().startOf('month'), moment().endOf('month')],
            'Bulan kemarin': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);



    var ar_kat = ['Ekspor-Impor',
        'Transportasi',
        'Pendidikan',
        'Kesehatan',
        'Fertilitas',
        'Mortalitas',
        'Morbiditas',
        'Kependudukan',
        'Migrasi',
        'Kemiskinan dan Ketimpangan',
        'Ketenagakerjaan',
        'Indeks Harga Perdagangan Besar',
        'Pembangunan Manusia',
        'Lainnya',
        'Inflasi',
        'Indeks Tendensi Bisnis',
        'Indeks Tendensi Konsumen',
        'Nilai Tukar Petani',
        'Pariwisata',
        'PDB/PDRB',
        'Pertumbuhan Produksi Industri'
    ]
    var canv_wrap = document.getElementById("line-kat").getContext("2d")
    window.kategori_ = new Chart(canv_wrap, {
        type: 'line',
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
                    time: {
                        displayFormats: {
                            'day': 'DD MMM YYYY'
                        },
                        unit:'day'
                    },

                    ticks: {
                        fontSize: 10
                    }
                }]
            }
        }
    });
    kategori_.options.elements.line.tension = 0;
    set_line_kategori();


    $("#kat-bps").on('change', function() {
        set_line_kategori();
    });


    set_score_board();
    // make ajax call
    $("#re-load").click(function() {
        //console.log("klik");
        $("#load-line_").css("display", "inline-block");
        $("#line-chart-wrap").css("display", "none");





        var date_ = get_current_selected_date();

        var mulai = date_[0]
        var selesai = date_[1]
        // make ajax call
        //set_score_board(mulai, selesai);

        set_line(mulai, selesai);
        set_bar(mulai, selesai);
        set_tag(mulai, selesai);
        set_line_kategori();

    });






});