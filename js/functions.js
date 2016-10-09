function create_stylish_table(){
    var table = $("table");

    // Add tbody thead tfoot
    table.find('tr:nth-child(2), tr:nth-last-child(2)').remove();
    table.find('tr:first').unwrap();
    table.find('tr:first').wrap("<thead></thead>");
    $("table > tr:not(:last-child, :nth-last-child(2))").wrapAll("<tbody></tbody>");
    $("table > tr:last-child, table > tr:nth-last-child(2)").wrapAll("<tfoot></tfoot>");

    var table_body = $("table tbody");
    var table_head = $("table thead");
    var table_foot = $("table tfoot");
    table.attr("id", "scoreboard");

    $('table tr td, table tr th').each(function(){
        var text = $(this).text();
        if(text.indexOf("Total att/solv") != -1)
            $(this).html("attm" + "<br>" + "solv");
        else if(text.indexOf("/") != -1)
            $(this).html(text.split("/").join("<br>"));
    });

    table_body.find('tr').each(function () {
        // team name
        $(this).find("td:not(:lt(4), :last-child)").each(function(){
            var text = $(this).html().split('<br>');
            $(this).html(text[0] + '<span class="muted"> ' + (text[1] == "PPP" ? "--" : text[1]) + "</span>");

            // Add yes no first-yes pending
            if(text[0] != '0' && text[1] == '--'){
                $(this).addClass('no');
            }
            else if(text[0] != '0' && text[1] == 'PPP'){
                $(this).addClass('pending');
            }
            else if(text[0] != '0' && text[1] != '--'){
                $(this).addClass('yes');
            }
        });
        // uni name
        $(this).find("td:eq(1)").each(function(){
            var text = $(this).html().split('<br>');
            $(this).html(text[0] + '<span class="muted"> ' + (text[1] ? text[1] : "") + "</span>");
        });
    });

    // Add balloon
    table_head.find("th:not(:lt(4), :last-child)").each(function(index){
        var char = String.fromCharCode(index + 65);
        $(this).html('<span class="balloon color-' + char + '">' + char + '</span>');
    });
    table_foot.find("tr:first-child th:not(:lt(4), :last-child)").each(function(index){
        var char = String.fromCharCode(index + 65);
        $(this).html('<span class="balloon color-' + char + '">' + char + '</span>');
    });

    // table column width
    table_head.find('th:not(2)').css("width", "5%");
    table_head.find('th:nth-child(2)').css("width", "30%");

    // name column
    table_body.find('tr').each(function(){
        $(this).find('td:eq(1)').each(function(){
            $(this).css({"text-align": "left", "padding-left": "10px"});
        });
    });

    // remove strong tag
    table.find('tr').each(function(){
        $(this).find('th:lt(4)').each(function(){
            $(this).text($(this).find('strong').text());
        });
    });

    // first accept
    $.getJSON("first_accept.json", function(result){
        $.each(result, function(i, field){
            if(field.team_title != "dalghak" && field.team_title != ""){
                var td = table_body.find('tr:has(td:contains(' + field.team_title + '))').children("td").eq(field.question_title.charCodeAt(0)-61);
                if(td.hasClass("yes"))
                    td.addClass("first");
            }
        });
    });

    // designer
    $("table + p").html("<br>Scoreboard redesigned by: Ali Gandomi").addClass("designer");
}

function compare(){
    $('#container table tbody tr').each(function(){
        var index_text = $(this).children("td").eq(1).text();
        $(this).find('td:not(:lt(4), :last-child)').each(function(){
            var index_num = $(this).index();
            var first = $(this).text();
            var second = $('#final-table table tbody tr:has(td:contains(' + index_text + '))').children("td").eq(index_num).text();
            if(first != second){
                $(this).html(second.split(" ")[0] + '<span class="muted"> --</span>');
                $(this).removeClass().addClass("pending");
            }
        });
    });
    cal_attm();
    cal_submitted();
    cal_sum_attm_solv();
}

function slider(){
    $(".pending").click(function () {
        $(".pending").off('click');
        $(".pending").css('cursor', 'default');
        slide($(this));
    });

    function slide(pending) {
        var row = pending.parents("tr:first");
        var other_row = row.siblings('tr');
        pending.css('cursor', 'default');
        pending.animate({backgroundColor: "#f88"}, 750, 'swing', function () {
            pending.animate({backgroundColor: '#8f8'}, 750, 'swing', function () {
                pending.animate({backgroundColor: "#f88"}, 750, 'swing', function () {
                    pending.animate({backgroundColor: '#8f8'}, 750, 'swing', function () {
                        pending.animate({backgroundColor: "#f88"}, 750, 'swing', function () {

                            var five_result_td = row.children("td:lt(4), td:last-child");
                            var solved = row.children("td:eq(2)");
                            var total_time = row.children("td:eq(3)");
                            var this_time = pending.children("span").eq(0);
                            var attm_solved = row.children("td:last-child");
                            var attm_solved_part = attm_solved.html().split("<br>");
                            var last_row_td = $("table:first-of-type tfoot tr:last-child").children("td").eq(pending.index());
                            var last_row_td_part = last_row_td.html().split("<br>");
                            var last_td_in_last_row = $("table:first-of-type tfoot tr:last-child td:last-child");
                            var last_td_in_last_row_part = last_td_in_last_row.html().split("<br>");

                            var index_text = pending.closest("tr").children("td").eq(1).text();
                            var tmp = $('#final-table table tbody tr:has(td:contains(' + index_text + '))').children("td").eq(pending.index());
                            var _try = parseInt(tmp.text()) ;
                            var judged = tmp.children("span").eq(0).text();
                            var first_accept = tmp.hasClass("first");
                            //var tmptmp = false;
                            //alert(index_text);
                            //if(index_text == "qaen_university"){
                            //    alert("ok");
                            //    $("#container table tbody tr").each(function(){
                            //        var ranke = $(this).children("td").eq(0);
                            //        if(+ranke.text() == 26 && tmptmp){
                            //            ranke.text(+ranke.text() + 1);
                            //        }
                            //    });
                            //}

                            pending.removeClass('pending').css("background-color", "");

                            if (judged != " --") {

                                pending.addClass('yes');
                                if(first_accept){
                                    pending.addClass("first");
                                }
                                other_row.css('opacity', 0.2);
                                five_result_td.addClass('sorting-row-yes');

                                solved.text(parseInt(solved.text()) + 1);
                                total_time.text(parseInt(total_time.text()) + parseInt(judged) + (_try > 1 ? (_try - 1) * 20 : 0));
                                this_time.text(judged);
                                tmp1 = attm_solved_part[0];
                                tmp2 = parseInt(attm_solved_part[1]) + 1;
                                attm_solved.html(tmp1 + "<br>" + tmp2);
                                tmp1 = last_row_td_part[0];
                                tmp2 = (first_accept ? this_time.text() : last_row_td_part[1]);
                                tmp3 = parseInt(last_row_td_part[2]) + 1;
                                last_row_td.html(tmp1 + "<br>" + tmp2 + "<br>" + tmp3);
                                tmp1 = last_td_in_last_row_part[0];
                                tmp2 = parseInt(last_td_in_last_row_part[1]) + 1;
                                last_td_in_last_row.html(tmp1 + "<br>" + tmp2);

                                var interval_time = (row.index() + 1 <= 5 ? 800 : (row.index() + 1 <= 10 ? 300 : (row.index() + 1 > parseInt(row.siblings("tr:last-child").children("td").eq(0).text()) / 2 ? 80 : 90)));
                                var intervalID = setInterval(function () {
                                    var before_soleved = parseInt(row.prev("tr").children("td").eq(2).text());
                                    var before_time = parseInt(row.prev("tr").children("td").eq(3).text());
                                    if (isNaN(before_soleved) || before_soleved > parseInt(solved.text()) || (before_soleved == parseInt(solved.text()) && before_time < parseInt(total_time.text()))) {
                                        window.clearInterval(intervalID);
                                        setTimeout(function () {
                                            other_row.css('opacity', 1);
                                            five_result_td.removeClass('sorting-row-yes');
                                            set_click_handler();
                                        }, 2500);
                                    }
                                    else{
                                        row.insertBefore(row.prev());
                                        var first_td = row.children("td:first");
                                        var first_td_of_first_tr_sibling = row.next('tr').children("td:first");
                                        if (parseInt(first_td.text()) > 1 && first_td.text() != first_td_of_first_tr_sibling.text()) {
                                            first_td.text(parseInt(first_td.text()) - 1);
                                            first_td_of_first_tr_sibling.text(parseInt(first_td_of_first_tr_sibling.text()) + 1);
                                        }
                                    }
                                }, interval_time);
                            }
                            else {
                                pending.addClass('no');
                                other_row.css('opacity', 0.2);
                                five_result_td.addClass('sorting-row-no');

                                //tmp1 = attm_solved_part[0];
                                //tmp2 = attm_solved_part[1];
                                //attm_solved.html(tmp1 + "<br>" + tmp2);
                                //tmp1 = last_row_td_part[0];
                                //tmp2 = last_row_td_part[1];
                                //tmp3 = last_row_td_part[2];
                                //last_row_td.html(tmp1 + "<br>" + tmp2 + "<br>" + tmp3);
                                //tmp1 = last_td_in_last_row_part[0];
                                //tmp2 = last_td_in_last_row_part[1];
                                //last_td_in_last_row.html(tmp1 + "<br>" + tmp2);

                                setTimeout(function () {
                                    other_row.css('opacity', 1);
                                    five_result_td.removeClass('sorting-row-no');
                                    set_click_handler();
                                }, 2500);
                            }
                        });
                    });
                });
            });
        });
    }

    function set_click_handler() {
        $(".pending").css('cursor', 'pointer');
        $(".pending").click(function () {
            $(".pending").off('click');
            $(".pending").css('cursor', 'default');
            slide($(this));
        });
    }
}

function cal_attm(){
    $("table:first tbody tr").each(function(){
        var sum = 0;
        $(this).children("td:not(:lt(4), :last-child)").each(function(){
            sum += parseInt($(this).text());
        });
        var text = $(this).children("td").last().html().split("<br>");
        $(this).children("td").last().html(sum + "<br>" + text[1]);
    });
}

function cal_submitted(){
    var colCount = 0;
    $("table:first tbody tr:first td").each(function () {
        if ($(this).attr('colspan')) {
            colCount += +$(this).attr('colspan');
        } else {
            colCount++;
        }
    });
    for(var i = 4; i < colCount - 1; i++){
        var sum = 0;
        $("table:first tbody tr").each(function(){
            sum += parseInt($(this).children("td").eq(i).text());
        });
        var td = $("table:first tfoot tr:last-child").children("td").eq(i);
        var text = td.html().split("<br>");
        td.html(sum + "<br>" + text[1] + "<br>" + text[2]);
    }
}

function cal_sum_attm_solv(){
    var sum_attm = 0;
    var sum_solv = 0;
    $("table:first tbody tr").each(function(){
        var text = $(this).children("td").last().html().split("<br>");
        sum_attm += +text[0];
        sum_solv += +text[1];
    });
    var td = $("table:first tfoot tr:last-child").children("td").last();
    var text = td.html().split("<br>");
    td.html(sum_attm + "<br>" + sum_solv);
}

function show_team_pic(){

    $("#container table tbody tr").each(function(){
        $(this).children("td:eq(1)").click(function(){
            var name = $(this).text();
            $( "#dialog img").attr({"src": "team_pic/" + name.slice(0, -1) + ".JPG", "alt": name.slice(0, -1)});
            $( "#dialog" ).dialog({
                show: {
                    effect: "fold",
                    duration: 500
                },
                hide: {
                    effect: "explode",
                    duration: 500
                },
                width: 834,
                height: 511,
                modal: true,
                title: name
            });
        });
    });
}