

$(document).ready(function() {

    $('#modal-unduh').on('hidden.bs.modal', function () {
        $("#tbody-modal").empty();
        $("#trhead-modal").empty();
        $("#loading-anim").hide();
    });
    moment.locale = "id";
    var start = moment("2020-01-01")
    var end = moment("2020-06-07");

    function cb(start, end) {
        $('#reportrange span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
    };

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

    $("#cek-btn").click(function() {
        //show load bar
        $("#loading-anim").show();
        var date_ = get_current_selected_date();
        var start = date_[0];
        var end = date_[1];
        var katakunci = $("#cari").val();
        var batas = $("#batas").val()


        var data = {
            'start': start,
            'end': end,
            'katakunci': katakunci,
            'batas':batas
        };
        $.ajax({
            url: 'api/get_beritadetail',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            data: data,
            success: function(result) {
                console.log(result);

                var nama_kolom = Object.keys(result[0]);

                //append nama kolom
                var kolom_html = "";
                var header_data = [];
                for (i in nama_kolom) {
                    kolom_html += "<td>" + nama_kolom[i] + "</td>";
                    header_data[i] = nama_kolom[i];
                }
                
                $("#trhead-modal").append(kolom_html);

                //apend row
                var rows_html = "<tr>";
                for (j = 0; j < 5; j++) {
                    row_html = "";
                    for (i in nama_kolom) {
                        data = result[j][nama_kolom[i]]
                        console.log(data)
                        row_html += "<td>" + String(data).substring(0, 100) + "</td>";
                    }
                    rows_html = rows_html + row_html + "</tr><tr>";

                }

                $("#tbody-modal").append(rows_html);
                let csv = '';
                let items = result;
                console.log(items);

                // Loop the array of objects
                for (let row = 0; row < items.length; row++) {
                    let keysAmount = Object.keys(items[row]).length;
                    let keysCounter = 0;

                    // If this is the first row, generate the headings
                    if (row === 0) {

                        // Loop each property of the object
                        for (let key in items[row]) {

                            // This is to not add a comma at the last cell
                            // The '\n' adds a new line
                            csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n');
                            keysCounter++;
                        }
                    } else {
                        for (let key in items[row]) {
                            val_ = '\"'+String(items[row][key])+'\"'
                            csv +=  val_+ (keysCounter + 1 < keysAmount ? ',' : '\r\n')
                            keysCounter++;
                        }
                    }

                    keysCounter = 0;
                }


                $("#unduh-btn").attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
                $("#unduh-btn").attr('download', 'data_berita.csv');

                //show modal
                $("#modal-unduh").modal('show');
                $("#total-baris").html(String(result.length));
                $("#unduh-btn").click(function() {



                })



            },
        });
    });

});