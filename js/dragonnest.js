//DEFINE NAMESPACES
var dragon = dragon || {};
var index = index || {};
var arena = arena || {};
var armoury = armoury || {};
var cave = cave || {};
var hero = hero || {};
var scrolls = scrolls || {};

// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

//ASSIGN NAMESPACES
dragon = {
    init: function(){
        //Bind the needed eventhandlers and functions
        dragon.set_glados_buttons();

        //Set the loadicon text
        dragon.set_loadicon_text();

        //Trigger Reload when pages goes over his limit.
        var origwidth = $(window).width();
        $(window).on('resize', function(){
            var currwith = $(window).width();
            if((origwidth <= 768 && currwith >= 768) || (origwidth >= 768 && currwith <= 768))
                location.reload();
        });

        //Acknowledge the init
        console.log("Main init has executed");
    },
    do_if_mobile: function(func){
        if($(window).width() <= 768) func();
    },
    do_if_tablet: function(func){
        if($(window).width() >= 768) func();
    },
    do_if_desktop: function(func){
        if($(window).width() >= 1200) func();
    },
    do_if_not_mobile: function(func){
        if($(window).width() > 768) func();
    },

    clear_caches: function(){
        //Scrolls
        if(localStorage.getItem("school_data") != null) localStorage.removeItem("school_data");
        if(localStorage.getItem("class_data") != null) localStorage.removeItem("class_data");
        if(localStorage.getItem("level_data") != null) localStorage.removeItem("level_data");
        if(localStorage.getItem("spellclass_cache") != null) localStorage.removeItem("spellclass_cache");

        //Armoury
        if(localStorage.getItem("category_data") != null) localStorage.removeItem("category_data");
        if(localStorage.getItem("size_data") != null) localStorage.removeItem("size_data");
        if(localStorage.getItem("type_data") != null) localStorage.removeItem("type_data");

        //Monster Cave
        if(localStorage.getItem("challenge_data") != null) localStorage.removeItem("challenge_data");
        if(localStorage.getItem("size_data") != null) localStorage.removeItem("size_data");
        if(localStorage.getItem("type_data") != null) localStorage.removeItem("type_data");
    },

    get_guid: function(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return 'guid' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },

    get_random_monster_src: function(){
        var monsters = [
            "./../assets/Characters/monster1.png",
            "./../assets/Characters/monster2.png",
            "./../assets/Characters/monster3.png",
            "./../assets/Characters/monster4.png",
            "./../assets/Characters/monster5.png",
            "./../assets/Characters/monster6.png",
            "./../assets/Characters/monster7.png",
            "./../assets/Characters/monster8.png",
            "./../assets/Characters/monster9.png",
            "./../assets/Characters/monster10.png" ];
        return monsters[Math.floor(Math.random()*monsters.length)];
    },

    set_glados_buttons: function(){
        if($(".btn-glados") == undefined) return;
        $.each($(".btn-glados"), function(i, e){
            e = $(e);
            var origintext = e.text();
            e.hover(function(event){
                e.html(origintext + "<i id='temptext'>&#10095;&#10095; Let's Go!</i>");
                $("#temptext").hide();
                $("#temptext").fadeIn(1900);
                if($("#bg-slider") != undefined) $("#bg-slider").carousel('pause');
            }, function(){
                $("#temptext").fadeOut(1900, function(){e.text(origintext);});
                if($("#bg-slider") != undefined) $("#bg-slider").carousel('cycle');
            });
        });
    },

    set_autocomplete: function(element, array, selectedFunction){
        if(element == undefined || array == null) return null;
        $(element).autocomplete({
            source: array
        });

        if(selectedFunction != undefined || selectedFunction != null){
            $(element).on("autocompleteselect", function(event, ui) {
                setTimeout(function(){
                    selectedFunction();
                }, 100); //Redirect to other thread for the jquery ui to fill in the textbox
            });
        }
    },

    set_loadicon_text: function(parent){
        if(parent == undefined || parent == null) parent = "";

        $.each($(parent + " .animation-text"), function(i, e){
            var element = (e.hasAttribute('data-inGraph')) ? "Graph Is" : "Results Are";
            e.textContent = 'Your ' + element + ' Loading...';
            setTimeout(function(){
                e.textContent = 'Your ' + element + ' Still Loading...';
            }, 5000);
            setTimeout(function(){
                e.textContent = 'Sorry. Still Loading. Slow internet maybe?';
            }, 10000);
            setTimeout(function(){
                e.textContent = 'Seriously? Hmmm. We DO try to get this, promised.';
            }, 16000);
            setTimeout(function(){
                e.textContent = "Why don't you take a nap allright?";
            }, 22000);
            setTimeout(function(){
                e.textContent = 'Fuck This. Keep on watching this icon. WAYYY more interesting than the data.';
            }, 30000);
            setTimeout(function(){
                e.textContent = 'We Gave Up. So Should You.';
            }, 45000);
        });
    },
    show_and_set_animation: function(parent){
        if($("#" + parent + " .animation-container").length > 0){
            parent = "#" + parent;
            var anim_ct = $(parent + " .animation-container");
            anim_ct.css("display", "flex");
            anim_ct.hide();
            anim_ct.fadeIn(1000);
            dragon.set_loadicon_text(parent);
        } else {
            dragon.delete_children(parent);
            var div = $("<div />");
            div.load("./../pageparts/loadicon.html", function(){
                $("#" + parent).append(div);
                dragon.show_and_set_animation(parent);
            });
        }
    },
    delete_children: function(parent){
        $("#" + parent).empty(); //Clear result zone
    },

    get_name_from_ghost: function(id, data){
        var item = null;
        $.each(data.ghost, function(i, e){
            if(parseInt(id) == parseInt(e[0])) {
                console.log(e);
                item = e[1];
                return e[1];
            }
        });
        return item;
    },

    get_graph_options: function(chartTitle, CustomDimention, type){
        var color;
        if (type.indexOf("spell") > -1)  color = "#499292";
        else if (type.indexOf("weapon") > -1) color = "#eea236";
        else if (type.indexOf("monster") > -1) color = "#b12d21";
        else color = "#4f769c";

        var w; var h;
        if(CustomDimention != null){
            w = CustomDimention.Width;
            h = CustomDimention.Height;
        }

        return {
            animation: {"startup": true},
            width: w,
            height: h,
            title: chartTitle,
            titleTextStyle: {color: '#eea236'},
            legend: 'none',
            backgroundColor: 'transparent',
            colors: [color, '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
            hAxis: {
                textStyle:{color: '#FFF'}
            },
            vAxis: {
                textStyle:{color: '#FFF'}
            }
        };
    },

    draw_BarChart: function(chartholder, resultarea, chartTitle, data, ghost_data, SelectedIDCallback, CustomDimention){
        if(data == null){
            $("#" + chartholder + " .chart").text("An Error occured whilst fetching your data. We are sorry.");
            $("#" + chartholder + " .chart").toggleClass("text-error");
        }

        if(ghost_data == undefined || ghost_data == null) ghost_data = data;

        //Convert to DataTable
        var dataTable = google.visualization.arrayToDataTable(data);

        // Set chart options
        var options = dragon.get_graph_options(chartTitle, CustomDimention, resultarea);

        // Instantiate and draw our chart, passing in some options.
        var element = document.getElementById(chartholder).getElementsByClassName("chart")[0];
        var chart = new google.visualization.BarChart(element);
        chart.draw(dataTable, options);

        // Handle the selection
        if(SelectedIDCallback != undefined || SelectedIDCallback != null){
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler(){
                var selection = chart.getSelection()[0];
                    chart.setSelection({column: 0, row: 0});
                var Id = ghost_data[selection.row + 1][0];
                SelectedIDCallback(Id, chartholder, resultarea);
            }
        }
    },

    draw_ColumnChart: function(chartholder, resultarea, chartTitle, data, ghost_data, SelectedIDCallback, CustomDimention){
        if(data == null){
            $("#" + chartholder + " .chart").text("An Error occured whilst fetching your data. We are sorry.");
            $("#" + chartholder + " .chart").toggleClass("text-error");
        }

        if(ghost_data == undefined || ghost_data == null) ghost_data = data;

        //Convert to DataTable
        var dataTable = google.visualization.arrayToDataTable(data);

        // Set chart options
        var options = dragon.get_graph_options(chartTitle, CustomDimention, resultarea);

        // Instantiate and draw our chart, passing in some options.
        var element = document.getElementById(chartholder).getElementsByClassName("chart")[0];
        var chart = new google.visualization.ColumnChart(element);
        chart.draw(dataTable, options);

        // Handle the selection
        if(SelectedIDCallback != undefined || SelectedIDCallback != null){
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler(){
                //Handle Selection
                var selection = chart.getSelection()[0];
                    chart.setSelection({column: 0, row: 0});
                var Id = ghost_data[selection.row + 1][0];
                SelectedIDCallback(Id, chartholder, resultarea);
            }
        }
    },

    get_items: function(url, callBackurl, chartholder, resultarea){
        $.ajax({
            url: url,
            method: 'get',
            success: function(data){
                var json;
                try {
                    json = JSON.parse(data);
                } catch (e){
                    json = data;
                }

                if($.isArray(json)){
                    callBackurl(chartholder, json, resultarea);
                } else {
                    $("#" + resultarea).empty();
                    $("#" + resultarea).prepend("<article>No Results were found.</article>")
                }
            },
            error: function(){
                $("#" + resultarea).prepend("<p>An error occured. Please refresh this page and try again.</p>");
            }
        });
    },

    add_item: function(container, item, classes){
        //Prepare
        var div = document.createElement('div');
        if(classes == "spell"){
            for(var i=0; i<item.classes.length; i++)
                if(i == 0) div.innerHTML = div.innerHTML + ("<p>   " + item.classes[i] + "</p>");
                else div.innerHTML = div.innerHTML + ("<p>, " + item.classes[i] + "</p>");
        } else {
            div.innerHTML = div.innerHTML + ("<p>" + item.type + "</p>");
        }

        var wrap = $('<article />', {
            "class": "cust_item " + classes,
            "id": "item_id" + item.id
        });

        var body = $('<div />');
        var title = $("<div />", { "class": "title row"});
        title.append("<h4 style='margin-right: 10px;'>" + item.name + "</h4>");
        title.append("<div>" + item.school + "</div>");
        if(classes == "spell") title.append("<div>  - level " + item.level + "</div>");
        if(classes == "monster") title.append("<div> ( " + item.size + ") </div>");

        var row = $("<div />", { "class": "row"});
        if(classes == "weapon") row.append("<div> Size: " + item.size + "</div>");
        if(classes == "spell") row.append("<p style='margin-right: 10px;'>Equipable for: </p>");
        else if(classes == "weapon") row.append("<p style='margin-left: 10px;'>   - Type: </p>");
        row.append(div);

        body.append(title);
        body.append(row);

        wrap.append($('<span />', {"class": "icon" }));
        wrap.append(body);

        wrap.css("display", "flex");
        wrap.hide();
        wrap.fadeIn(1000);

        container.append(wrap);
    },

    give_collapsible_container: function(title){
        var uid = dragon.get_guid();
        while(document.getElementById(uid) != undefined) uid = dragon.get_guid();

        var clickable = $("<a />", { "class": "animo", "role": "button", "data-toggle": "collapse", "href": "#" + uid + title,
            "aria-expanded": "false", "aria-controls": uid + title, "style": "text-decoration: none; display:block;"});
        var header = $('<div />', { "class": "header"});
        var a = $("<a />", { "style": "padding-top: 10px;"});
        var span = $("<span />", { "class": "animo glyphicon glyphicon-menu-down"}).appendTo(a);

        header.append("<h5>" + title + "</h5>");
        header.append(a);
        clickable.append(header);

        var section = $("<section />", { "class": "collapse", "id": uid + title});
        $(section).on('hide.bs.collapse', function(){
            if(span.hasClass("flip")) span.removeClass('flip');
        });
        $(section).on('show.bs.collapse', function(){
            if(!span.hasClass("flip")) span.addClass('flip');
            $(document.body).on("click", function(){
                section.collapse("hide");
                $(this).off();
            });
        });

        return {
            header: clickable,
            body: section
        };
    },

    get_ajax_data_basefunction: function(ajaxurl, redirect, enableSort, cachename, pushFunc, sliceint){
        if(sliceint == undefined ||sliceint == null) sliceint = 10;

        //Check if data is already saved in cache
        if(localStorage.getItem(cachename) != null){
            var cache = JSON.parse(localStorage.getItem(cachename));
            var recover_data = cache.data;  var recover_ghost = cache.ghost;
            if(enableSort){
                recover_data.sort(function(a, b) { return b[1] - a[1]; });
                recover_data = recover_data.slice(0, parseInt(sliceint + 1));

                recover_ghost.sort(function(a, b) { return b[2] - a[2]; });
            }

            var result = {
                data: recover_data,
                ghost: recover_ghost
            };
            if(redirect != undefined || redirect != null) redirect(result); return result;
        }

        //Fetch the data from the DB.
        $.ajax({
            url: ajaxurl,
            method: 'get',
            success: function (received_data) {
                var data;
                try {
                    data = JSON.parse(received_data);
                } catch(e) {
                    data = received_data;
                }

                //Make graph array
                var data_array = [];
                var background_data_array = [];

                var r = pushFunc();
                if(r.hasOwnProperty('id') && r.hasOwnProperty('label') && r.hasOwnProperty('itemcount')){
                    data_array.push([r.label, r.itemcount]);
                    background_data_array.push([r.id, "No Result Found, Sorry.", "noint"]);
                }

                $.each(data, function(i, e){
                    var r = pushFunc(e);
                    if(r.hasOwnProperty('id') && r.hasOwnProperty('label') && r.hasOwnProperty('itemcount')){
                        data_array.push([r.label, parseInt(r.itemcount)]);
                        background_data_array.push([parseInt(r.id), r.label, parseInt(r.itemcount)]);
                    }
                });

                localStorage.setItem(cachename, JSON.stringify({
                    "data": data_array,
                    "ghost": background_data_array
                }));

                if(enableSort){
                    data_array.sort(function(a, b) { return b[1] - a[1]; });
                    data_array = data_array.slice(0, parseInt(sliceint + 1));

                    background_data_array.sort(function(a, b) { return b[2] - a[2]; });
                }

                var result = {
                    "data": data_array,
                    "ghost": background_data_array
                };
                if(redirect != undefined && redirect != null) redirect(result); return result;
            },
            error: function () {
                var result = {
                    "data": null,
                    "ghost": null
                };
                if(redirect != undefined && redirect != null) redirect(result); return result;
            }
        });
    }
};

index = {
    init: function(){
        //Call the dragon
        dragon.init();

        //Load The Right Media for the Device
        index.load_media();

        //Bind the needed eventhandlers and functions
        index.track_bg_carousel();
        index.move_follower();
        index.carousel_indicators();

        //Acknowledge the init
        console.log("Local init has executed");
    },

    load_media: function(){
        dragon.do_if_not_mobile(function(){
            $("#bg-slider .item:eq(0) .media").append('<video src="assets/backgrounds/shared/dwarf_moving.mp4" autoplay="autoplay" loop="loop"></video>');
            $("#bg-slider .item:eq(1) .media").append('<video src="assets/backgrounds/shared/breathing_monster.mp4" autoplay="autoplay" loop="loop"></video>');
            $("#bg-slider .item:eq(2) .media").append('<video src="assets/backgrounds/shared/aquaman.mp4" autoplay="autoplay" loop="loop"></video>');
        });
    },

    track_bg_carousel: function(){
        $("#bg-slider").bind('slide.bs.carousel', function(e){
            var nr = $("div.active").index();

            //Unsign all previous active items
            var unlinks = $(".slidebound");
            $.each(unlinks, function(i, e){
                e = $(e);
                if(e.attr("data-slidenr") && e.hasClass("active")) e.removeClass("active");
            });

            //Assign all linked items
            var items = $(".slidebound");
            $.each(items, function(i, e){
                e = $(e);
                if(e.attr("data-slidenr") && e.attr("data-slidenr") == nr)
                    e.toggleClass("active");
            });

            //Color the articles accordingly
            index.color_items();
            index.move_follower();
        });
    },

    color_items: function(){
        var color = $("#bg-slider .active").data('color');

        //Set on navigationbody
        $.each($("#navigation-body article"), function(i, e){
            e = $(e);
            e.css("background", "radial-gradient(circle, " + color + ", transparent 85%)");
        });

        //Set on follower
        $("#follower").css("border-color", color);
    },

    move_follower: function(){
        var pos = $("#navigation-body .active").position();
        var height = $("#navigation-body .active").outerHeight();
        var width = $("#navigation-body .active").outerWidth();

        $("#follower").css("top", pos.top);
        $("#follower").css("left", pos.left);
        $("#follower").css("height", height);
        $("#follower").css("width", width);
        $("#follower").css("z-index", "0");
    },

    carousel_indicators: function(){
        $("#navigation-body article").on("click", function(){
            $("#bg-slider").carousel($(this).data('slideto'));
        });
    }
};

arena = {
    init: function(){
        dragon.show_and_set_animation("loading");

        //Set Buttonheight
        dragon.do_if_mobile(function(){
            $("*[data-btn='btn']").removeClass('btn-lg'); $("*[data-btn='btn']").addClass('btn-sm');});

        //Load Everything
        setTimeout(function () {
            google.charts.load('current', {packages: ['corechart']});
            google.charts.setOnLoadCallback(arena.get_fight_data);
        }, 250);

        //Acknowledge the init
        console.log("Local init has executed");
    },

    get_fight_data: function(){
        $.ajax({
            url: "./../server/characters/get_battle.php",
            method: 'get',
            success: function(data){
                $.each(data, function(i, e){
                    var monster = {
                        name: Base64.decode(e.name),
                        challenge: e.challenge,
                        ctype: e.ctype,
                        csize: e.csize
                    };
                    var hero = {
                        race: parseInt(e.race),
                        classe: parseInt( e.class),
                        left: e.leftyield,
                        right: e.rightyield,
                        strategy: e.strategy
                    };
                    var id = e.id;
                    var append = (parseInt(e.time) < (parseInt(e.now) - (60*60*24))) ? $
                        ("#active_fights") : $("#past_fights");

                    setTimeout(function(){
                        arena.draw_fight(append, i, id, hero, monster);

                        if(i == (data.length -1)) $("#loading").fadeOut(500, function(){this.remove();});
                    }, i * 500);
                });
            },
            error: function(){
                console.log("Something went wrong, try again.");
            }
        });
    },

    //hero = race, classe, left, right, strategy
    //monster = name, challenge, ctype, csize
    draw_fight: function(appendto, iteration, fightid, hero, monster){
        var fight = $("*[data-template='template']:eq(0)").clone();
        fight.find("#chart_fight_").attr('id', 'chart_fight_' + iteration);

        var heroimg = "./../assets/Characters/";
        var title = "";
        switch(hero.race){
            case 0:
                heroimg += "orc.png"; title += "Orc"; break;
            case 1:
                heroimg += "human.png"; title += "Human"; break;
            case 2:
                heroimg += "Dwarf.png"; title += "Dwarven"; break;
            case 3:
                heroimg += "Elf.png"; title += "Elven"; break;
        }
        fight.find(".heroimgholder img").attr('src', heroimg);
        fight.find(".monsterimgholder img").attr('src', dragon.get_random_monster_src);

        switch(hero.classe){
            case 0: title += " Druid"; break;
            case 1: title += " Paladin"; break;
            case 2: title += " Ranger"; break;
            case 3: title += " Sorcerer"; break;
        }
        fight.find(".typeholder.hhero h3").text(title);
        fight.find("*[data-yield='left']:eq(0)").text(hero.left);
        fight.find("*[data-yield='right']:eq(0)").text(hero.right);
        fight.find(".strategy p").text(hero.strategy);

        fight.find(".typeholder.mmonster h3").text(monster.name);
        fight.find(".typeholder.mmonster em").text(monster.challenge);
        fight.find(".typeholder.mmonsterinfo p:eq(0)").text(monster.ctype);
        fight.find(".typeholder.mmonsterinfo p:eq(1)").text(monster.csize);

        fight.find(".btnholder:eq(0) .btn").on("click", function(){
            arena.send_vote("chart_fight_" + iteration, fightid, true);
        });
        fight.find(".btnholder:eq(1) .btn").on("click", function(){
            arena.send_vote("chart_fight_" + iteration, fightid, false);
        });

        fight.attr('id', 'fight_' + fightid);
        arena.get_vote_data('chart_fight_' + iteration, fightid);

        fight.appendTo(appendto);
        fight.fadeIn(1000);
    },

    send_vote: function(graphid, fightid, positive){
        var vote = (positive) ? 1 : -1;
        $.ajax({
            url: "./../server/characters/set_vote.php",
            method: 'post',
            data: { "vote": vote, "fight": fightid},
            complete: function(){
                arena.get_vote_data(graphid, fightid);
            }
        });
    },

    get_vote_data: function(graphId, fightid){
        $.ajax({
            url: "./../server/characters/get_vote.php?fightid=" + fightid,
            method: 'get',
            success: function(data){
                var arr = []; var max = data[0]["vote"]; var min = data[0]["vote"];
                arr.push(["TimeStamp", "Votecount"]);

                $.each(data, function(i, e){
                    arr.push([i, e.vote]);
                    if(e.vote > max) max = e.vote;
                    if(e.vote < min) min = e.vote;
                });

                if(Math.abs(max) < Math.abs(min)) max = min;

                arena.draw_fight_chart(graphId, google.visualization.arrayToDataTable(arr), max);
                setTimeout(function(){
                    arena.check_updates(data, fightid, graphId);
                }, 20000);
            }
        });
    },
    draw_fight_chart: function(parent, data, highest){
        var colors = ["#b12d21", "#663399", "#ca8533", "#506a6b", "#e5e4c2", "#eea236"];
        var currentcolor = colors[Math.floor(Math.random()*colors.length)];

        var lowest = 0 - parseInt(highest);
        var options = {
            width: 1500,
            height: 650,
            animation: {"startup": true},
            titleTextStyle: {color: '#eea236'},
            legend: 'none',
            backgroundColor: 'transparent',
            hAxis: {
                textStyle:{color: '#FFF'},
                gridlines: {
                    color: 'transparent'
                },
                textPosition: 'none'
            },
            vAxis: {
                textStyle:{color: '#FFF'},
                gridlines: {
                    color: 'transparent'
                },
                textPosition: 'none',
                minValue: lowest, maxValue: highest
            },
            series: {
                0: { color: currentcolor }
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById(parent));
        chart.draw(data, options);
    },

    check_updates: function(olddata, fightid, graphid){
        $.ajax({
            url: "./../server/characters/get_vote.php?fightid=" + fightid,
            method: 'get',
            success: function(data){
                if(data.length != olddata.length){
                    var arr = []; var max = data[0]["vote"]; var min = data[0]["vote"];
                    arr.push(["TimeStamp", "Votecount"]);

                    $.each(data, function(i, e){
                        arr.push([i, e.vote]);
                        if(e.vote > max) max = e.vote;
                        if(e.vote < min) min = e.vote;
                    });

                    if(Math.abs(max) < Math.abs(min)) max = min;

                    arena.draw_fight_chart(graphid, google.visualization.arrayToDataTable(arr), max);
                }

                //Reinit the check for updates.
                setTimeout(function(){
                    arena.check_updates(data, fightid, graphid);
                }, 15000);
            }
        });
    }
};

armoury = {
    init: function(){
        //Awake the dragon
        dragon.init();

        //Set the needed eventhandlers
        armoury.set_sorter_buttons("category", function() {armoury.get_category_data(armoury.draw_category_chart, true);});
        $("#weapon_name_search").on("click", function() {armoury.searchWeapon();});
        $("#btnSearchByFilter").on("click", function() {armoury.draw_weapons_on_filter();});
        $("#resetFilters").on("click", function() {armoury.reset_filter();});

        //Set the different images for mobile and desktop
        armoury.load_media();

        //Preload frequently used images
        dragon.do_if_not_mobile(function(){ var img = new Image(); img.src = "./../assets/backgrounds/weapon.png"; });

        //Remove old caches
        dragon.clear_caches();
        armoury.reset_filter();
        $(window).unload(function(){dragon.clear_caches();});

        //Draw the needed grahps
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(armoury.drawCharts);

        //Set The Extra Elements
        armoury.set_recently_searched();
        setTimeout(function(){armoury.get_weapon_names(dragon.set_autocomplete, $("#weapon_name"), armoury.searchWeapon)}, 2000);

        //Acknowledge the init
        console.log("Local init has executed");
    },

    load_media: function(){
        dragon.do_if_desktop(function(){$("#warrior_armoury_top").attr('src', './../assets/backgrounds/2560x1600/wallpaper_2560%20x%201600%20wallpaper%20(6).jpg');});
        dragon.do_if_tablet(function(){$("#warrior_armoury_top").attr('src', './../assets/backgrounds/1280x960/wallpaper_1280%20x%20960%20wallpaper%20(6).jpg')})
        dragon.do_if_mobile(function(){$("#warrior_armoury_top").attr('src', './../assets/backgrounds/Mobile/wallpaper_Mobile (6).jpg')})

        dragon.do_if_not_mobile(function(){
            $(".sectionheader img").attr('src', './../assets/backgrounds/shared/barbarian.jpeg');
        });
        dragon.do_if_mobile(function(){
            $(".sectionheader img").attr('src', './../assets/backgrounds/Mobile/wallpaper_Mobile (0).jpg');
        })
    },

    set_sorter_buttons: function(chartname, redraw){
        //Set Class
        if(localStorage.getItem(chartname + "_chart_filter") == 'top')
            $("#" + chartname + "_weapon_holder .sorter button:eq(0)").addClass('active');
        else $("#" + chartname + "_weapon_holder .sorter button:eq(1)").addClass('active');

        //Set the eventhandler
        $("#" + chartname + "_weapon_holder .sorter button:eq(0)").on("click", function(){
            localStorage.setItem(chartname + '_chart_filter', 'top'); //Save the choice
            redraw(); //Draw the chart

            //Set The Button
            $.each($("#" + chartname + "_weapon_holder .sorter button"), function(i, e){
                if($(e).hasClass('active')) $(e).removeClass('active');
            });
            $(this).toggleClass('active');
        });
        $("#" + chartname + "_weapon_holder .sorter button:eq(1)").on("click", function(){
            localStorage.setItem(chartname + '_chart_filter', 'all'); //Save the choice
            redraw(); //Draw the chart

            //Set the Button
            $.each($("#" + chartname + "_weapon_holder .sorter button"), function(i, e){
                if($(e).hasClass('active')) $(e).removeClass('active');
            });
            $(this).toggleClass('active');
        });
    },

    searchWeapon: function(){
        var weaponName = $("#weapon_name").val();
        var url = "./../server/weapons/search_weapon.php?weapon=" + encodeURI(weaponName);
        dragon.get_items(url, armoury.draw_weapon, "Defined", "weapon_search_result");

        //Save Searched Item.
        armoury.save_recently_searched(weaponName);
    },
    set_recently_searched: function(){
        $.ajax({
            url: "./../server/weapons/get_searched.php",
            method: "get",
            success: function(data){
                var rawarray;
                try{
                    rawarray = JSON.parse(data);
                } catch(e){
                    rawarray = data;
                }

                var array = [];
                if(data == null || (data != null && data.length < 5)) array = ["Gauntlet", "Dagger", "Battleaxe", "Crossbow", "Sword"];
                else {
                    $.each(rawarray, function(i, e){
                        array.push(e.name);
                    });
                }
                dragon.delete_children("recent_searches");
                $.each(array, function(i ,e){
                    var span = $("<span />");
                    span.text(e);
                    var t = e;
                    span.on("click", function(){
                        $("#weapon_name").val(t);
                        armoury.searchWeapon();
                    });
                    $("#recent_searches").append(span);
                });
            },
            error: function(){
                var dummyarray= ["Gauntlet", "Dagger", "Battleaxe", "Crossbow", "Sword"];
                dragon.delete_children("recent_searches");
                $.each(dummyarray, function(i ,e){
                    var span = $("<span />");
                    span.text(e);
                    var t = e;
                    span.on("click", function(){
                        $("#weapon_name").val(t);
                        armoury.searchWeapon();
                    });
                    $("#recent_searches").append(span);
                });
            }
        })
    },
    save_recently_searched: function(weaponName){
        $.post("./../server/weapons/set_searched.php", {"weapon": JSON.stringify(weaponName)}, function(){
            armoury.set_recently_searched();
        });
    },

    //REQUEST DATA FOR CHARTS
    drawCharts: function(){
        //Fast Draw
        dragon.draw_BarChart("popular_weapon_holder", "popular_weapon_result" ,"Current most Chosen Weapons", armoury.get_popular_weapon_data());

        //Preload & Draw -> Check for cache
        if(localStorage.getItem("category_data") != null) armoury.draw_category_chart(localStorage.getItem("category_data"));
        else armoury.get_category_data(armoury.draw_category_chart, true);

        if(localStorage.getItem("size_data") != null) armoury.draw_size_chart(localStorage.getItem("size_data"));
        else armoury.get_size_data(armoury.draw_size_chart, true);

        if(localStorage.getItem("type_data") != null) armoury.draw_type_chart(localStorage.getItem("type_data"));
        else armoury.get_type_data(armoury.draw_type_chart);

        //Draw the hidden filters - Give the system time to write a small cache
        setTimeout(function(){ armoury.draw_filter_charts(); }, 2000);
    },
    draw_filter_charts: function(){
        if(localStorage.getItem("category_data") != undefined && localStorage.getItem("category_data") != null)
            armoury.draw_filter_category_chart(JSON.parse(localStorage.getItem("category_data")));
        else armoury.get_category_data(armoury.draw_filter_category_chart);

        if(localStorage.getItem("size_data") != undefined && localStorage.getItem("size_data") != null)
            armoury.draw_filter_size_chart(JSON.parse(localStorage.getItem("size_data")));
        else armoury.get_size_data(armoury.draw_filter_size_chart);

        if(localStorage.getItem("type_data") != undefined && localStorage.getItem("type_data") != null)
            armoury.draw_filter_type_chart(JSON.parse(localStorage.getItem("type_data")));
        else armoury.get_type_data(armoury.draw_filter_type_chart);
    },

    //AFTER GETTING THE DATA -> DRAW THE CHARTS
    draw_category_chart: function(result){
        dragon.draw_ColumnChart("category_weapon_holder", "category_weapon_result" , "Number of Weapons per Category", result.data, result.ghost, armoury.draw_weapons_by_category);
    },
    draw_size_chart: function(result){
        dragon.draw_ColumnChart("size_weapon_holder", "size_weapon_result" ,"Weapons of every Size", result.data, result.ghost, armoury.draw_weapons_by_size);
    },
    draw_type_chart: function(result){
        dragon.draw_ColumnChart("type_weapon_holder", "type_weapon_result" ,"Weapons that deal the shown type of damage", result.data, result.ghost, armoury.draw_weapons_by_type);
    },
    draw_filter_category_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_category_holder", "weapon_search_result" , "Weapons for each Category", result.data, result.ghost,
                armoury.set_filter_category, {Width: 920, Height:220});
        });
        dragon.do_if_tablet(function(){
            dragon.draw_ColumnChart("filter_category_holder", "weapon_search_result" , "Weapons for each Category", result.data, result.ghost,
                armoury.set_filter_category, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_category_holder", "weapon_search_result" , "Weapons for each Category", result.data, result.ghost,
                armoury.set_filter_category, {Width: 300, Height:220});
        });
    },
    draw_filter_size_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_size_holder", "weapon_search_result" , "Weapons in every Size", result.data,
                result.ghost, armoury.set_filter_size, {Width: 920, Height:220});
        });
        dragon.do_if_tablet(function(){
            dragon.draw_ColumnChart("filter_size_holder", "weapon_search_result" , "Weapons in every Size", result.data,
                result.ghost, armoury.set_filter_size, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_size_holder", "weapon_search_result" , "Weapons in every Size", result.data,
                result.ghost, armoury.set_filter_size, {Width: 300, Height:220});
        });
    },
    draw_filter_type_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_type_holder", "weapon_search_result" , "Weapons by the available types", result.data, result.ghost,
                armoury.set_filter_type, {Width: 920, Height:220});
        });
        dragon.do_if_tablet(function(){
            dragon.draw_ColumnChart("filter_type_holder", "weapon_search_result" , "Weapons by the available types", result.data, result.ghost,
                armoury.set_filter_type, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_type_holder", "weapon_search_result" , "Weapons by the available types", result.data, result.ghost,
                armoury.set_filter_type, {Width: 300, Height:220});
        });
    },

    //WHEN A SELECTION IS MADE ON THE CHARTS -> SHOW THE APPROPRIATE SPELLS
    draw_weapons_by_category: function(categoryID, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/weapons/get_weapons.php?sort=category&sortvalue=" + categoryID;
        dragon.get_items(url, armoury.draw_weapon, chartholder, resultarea);
    },
    draw_weapons_by_size: function(sizeID, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/weapons/get_weapons.php?sort=size&sortvalue=" + sizeID;
        dragon.get_items(url, armoury.draw_weapon, chartholder, resultarea);
    },
    draw_weapons_by_type: function(typeID, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/weapons/get_weapons.php?sort=type&sortvalue=" + typeID;
        dragon.get_items(url, armoury.draw_weapon, chartholder, resultarea);
    },
    draw_weapons_on_filter: function(){
        dragon.show_and_set_animation("weapon_search_result");
        var query = "";
        query += "&category="; query += (localStorage.getItem('category_filter') == null) ? -1 : parseInt(localStorage.getItem('category_filter'));
        query += "&size="; query += (localStorage.getItem('size_filter') == null) ? -1 : parseInt(localStorage.getItem('size_filter'));
        query += "&type="; query += (localStorage.getItem('type_filter') == null) ? -1 : parseInt(localStorage.getItem('type_filter'));

        var url = "./../server/weapons/get_weapon_by_filter.php?" + query;
        dragon.get_items(url, armoury.draw_weapon, "Defined", "weapon_search_result");
    },
    set_filter_category: function(categoryID){
        //Is all the data yet received?
        if(localStorage.getItem('category_data') == undefined || localStorage.getItem('category_data') == null) {
            armoury.get_category_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('category_filter') == categoryID) localStorage.removeItem('category_filter');
        else {
            localStorage.setItem('category_filter', categoryID);
            $("#resetFilters").css("display", "inline-block");
        }
        armoury.filter();
    },
    set_filter_size: function(sizeID){
        if(localStorage.getItem('size_data') == undefined || localStorage.getItem('size_data') == null) {
            armoury.get_size_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('size_filter') == sizeID) localStorage.removeItem('size_filter');
        else {
            localStorage.setItem('size_filter', sizeID);
            $("#resetFilters").css("display", "inline-block");
        }
        armoury.filter();
    },
    set_filter_type: function(typeID){
        if(localStorage.getItem('type_data') == undefined || localStorage.getItem('type_data') == null) {
            armoury.get_type_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('type_filter') == typeID) localStorage.removeItem('type_filter');
        else {
            localStorage.setItem('type_filter', typeID);
            $("#resetFilters").css("display", "inline-block");
        }
        armoury.filter();
    },

    //FILTER AND REDRAW
    filter: function(){
        //Get the data
        var categoryID = localStorage.getItem('category_filter');
        var sizeID = localStorage.getItem('size_filter');
        var typeID = localStorage.getItem('type_filter');
        var categories = JSON.parse(localStorage.getItem('category_data'));
        var sizes = JSON.parse(localStorage.getItem('size_data'));
        var types = JSON.parse(localStorage.getItem('type_data'));
        if(categoryID == null && sizeID == null && typeID == null) $("#resetFilters").hide();

        var btnText = "All";
        var lblText = "no";
        if(categoryID != null){
            var name = dragon.get_name_from_ghost(categoryID, categories);
            if(name != null){
                btnText = name;
                lblText = "Category";
            }
        }
        if(sizeID != null){
            var name = dragon.get_name_from_ghost(sizeID, sizes);
            if(name != null){
                btnText = (categoryID != null) ? btnText + ", " + name : name;
                lblText = (categoryID != null) ? lblText + ", Size" : "Size";
            }
        }
        if(typeID != null){
            var name = dragon.get_name_from_ghost(typeID, types);
            if(name != null){
                btnText = (categoryID != null || sizeID != null) ? btnText + ", " + name : name;
                lblText = (categoryID != null || sizeID != null) ? lblText + ", Type" : "Type";
            }
        }

        //Set the filter
        $("#btnSearchByFilter").text("Get " + btnText + " Weapons");
        $("#FilterText").text(" - (" + lblText + " filter is Set.)");

    },
    reset_filter:function(){
        if(localStorage.getItem('category_filter') != null) localStorage.removeItem("category_filter");
        if(localStorage.getItem('size_filter') != null) localStorage.removeItem("size_filter");
        if(localStorage.getItem('type_filter') != null) localStorage.removeItem("type_filter");
        $("#resetFilters").hide();
        armoury.filter();
    },

    //GET THE DATA
    get_popular_weapon_data: function(){
        return [
            ['Element', 'Density', { role: 'style' }],
            ['Copper', 8.94, '#b87333'],            // RGB value
            ['Silver', 10.49, 'silver'],            // English color name
            ['Gold', 19.30, 'gold'],
            ['Platinum', 21.45, 'color: #e5e4e2' ] //CSS Style Declaration
        ];
    },
    get_category_data: function(redirect, getLS){
        if(getLS == undefined || getLS == null) getLS = false;
        var url = "./../server/weapons/get_categories.php";
        var enableSort = (getLS && localStorage.getItem("category_chart_filter") == "top") ? true : false;
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noWeapon", label: "Category", itemcount: "Number of Weapons" };
            return { id: item.id, label: item.category, itemcount: item.WeaponCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, enableSort, "category_data", pushFunc, 5);
    },
    get_size_data: function(redirect, getLS){
        if(getLS == undefined || getLS == null) getLS = false;
        var url = "./../server/weapons/get_sizes.php";
        var enableSort = (getLS && localStorage.getItem("size_chart_filter") == "top") ? true : false;
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noWeapon", label: "Size", itemcount: "Number of Weapons" };
            return { id: item.id, label: item.csize, itemcount: item.WeaponCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, enableSort, "size_data", pushFunc, 5);
    },
    get_type_data: function(redirect){
        var url = "./../server/weapons/get_types.php";
        var enableSort = false;
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noWeapon", label: "Type", itemcount: "Number of Weapons" };
            return { id: item.id, label: item.ctype, itemcount: item.WeaponCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, enableSort, "type_data", pushFunc, 5);
    },
    get_weapon_names: function(redirect, element, forwarder){
        $.ajax({
            url: "./../server/weapons/get_weaponnames.php",
            method: 'get',
            success: function(data){
                var weaponnames;
                try{
                    weaponnames = JSON.parse(data);
                } catch(e){
                    weaponnames = data;
                }
                var names = [];
                $.each(weaponnames, function(i, e){
                    if(e.hasOwnProperty('name')) names.push(e.name);
                });

                if(redirect != undefined || redirect != null)
                    redirect(element, names, forwarder);
            },
            error: function(){
                console.log("Couldn't fetch autocomplete data.");
            }
        });
    },

    //DRAW A WEAPON
    draw_weapon: function(chartholder, weapons, resultarea){
        dragon.delete_children(resultarea);

        var currentletter = ""; var lettercount = 0;
        var currentguid = "";
        $.each(weapons, function(i, e) {
            if(weapons.length < 20){
                armoury.draw_weapon_dragon_hub(e, resultarea, i);
            } else {
                var letter = e.name.slice(0,1);
                if(letter != currentletter){
                    currentletter = letter;
                    lettercount++;

                    var container = dragon.give_collapsible_container(currentletter);
                    $("#" + resultarea).append(container.header);
                    $("#" + resultarea).append(container.body);
                    currentguid = container.body.attr('id');

                    var ch = container.header;
                    ch.css("display", "block");
                    ch.css("opacity", 0);
                    setTimeout(function(){
                        ch.css("opacity", "1");
                    }, lettercount * 50 + i);

                    armoury.draw_weapon_dragon_hub(e, currentguid, i);
                } else {
                    armoury.draw_weapon_dragon_hub(e, currentguid, i);
                }
            }
        });
    },
    draw_weapon_dragon_hub: function(e, resultarea, i){
        var weapon = {
            id: e.id,
            name: e.name,
            school: e.category,
            size: e.csize,
            type: e.ctype
        };
        setTimeout(function(){
            dragon.add_item($("#" + resultarea), weapon, "weapon");
        }, i * 50);
    }
};

cave = {
    init: function(){
        //Awake the dragon
        dragon.init();

        //Set the needed eventhandlers
        cave.set_sorter_buttons("type", function() {cave.get_type_data(cave.draw_type_chart, true);});
        $("#monster_name_search").on("click", function() {cave.searchMonster();});
        $("#btnSearchByFilter").on("click", function() {cave.draw_monsters_on_filter();});
        $("#resetFilters").on("click", function() {cave.reset_filter();});

        //Set Right media based on screentype
        cave.load_media();

        //Remove old caches
        dragon.clear_caches();
        cave.reset_filter();
        $(window).unload(function(){dragon.clear_caches();});

        //Draw the needed grahps
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(cave.drawCharts);

        //Set The Extra Elements
        cave.set_recently_searched();
        setTimeout(function(){cave.get_monster_names(dragon.set_autocomplete, $("#monster_name"))}, 2000);

        //Acknowledge the init
        console.log("Local init has executed");
    },

    load_media: function(){
        dragon.do_if_not_mobile(function(){
            $(".sectionheader img").attr('src', './../assets/backgrounds/shared/evil-evish%20creature.jpg');
        });
        dragon.do_if_mobile(function(){
            $(".sectionheader img").attr('src', './../assets/backgrounds/Mobile/wallpaper_Mobile (15).jpg');
        });
    },

    set_sorter_buttons: function(chartname, redraw){
        //Set Class
        if(localStorage.getItem(chartname + "_chart_filter") == 'top')
            $("#" + chartname + "_monster_holder .sorter button:eq(0)").addClass('active');
        else $("#" + chartname + "_monster_holder .sorter button:eq(1)").addClass('active');

        //Set the eventhandler
        $("#" + chartname + "_monster_holder .sorter button:eq(0)").on("click", function(){
            localStorage.setItem(chartname + '_chart_filter', 'top'); //Save the choice
            redraw(); //Draw the chart

            //Set The Button
            $.each($("#" + chartname + "_monster_holder .sorter button"), function(i, e){
                if($(e).hasClass('active')) $(e).removeClass('active');
            });
            $(this).toggleClass('active');
        });
        $("#" + chartname + "_monster_holder .sorter button:eq(1)").on("click", function(){
            localStorage.setItem(chartname + '_chart_filter', 'all'); //Save the choice
            redraw(); //Draw the chart

            //Set the Button
            $.each($("#" + chartname + "_monster_holder .sorter button"), function(i, e){
                if($(e).hasClass('active')) $(e).removeClass('active');
            });
            $(this).toggleClass('active');
        });
    },

    searchMonster: function(){
        var monsterName = $("#monster_name").val();
        var url = "./../server/monsters/search_monster.php?monster=" + encodeURI(monsterName);
        dragon.get_items(url, cave.draw_monsters, "Defined", "monster_search_result");

        //Save Searched Item.
        cave.save_recently_searched(monsterName);
    },
    set_recently_searched: function(){
        $.ajax({
            url: "./../server/monsters/get_searched.php",
            method: "get",
            success: function(data){
                var rawarray;
                try{
                    rawarray = JSON.parse(data);
                } catch(e){
                    rawarray = data;
                }

                var array = [];
                if(data == null || (data != null && data.length < 5)) array = ["Ghoul", "Dragon", "Tusker", "Beholder", "OwlBear"];
                else {
                    $.each(rawarray, function(i, e){
                        array.push(Base64.decode(e.name));
                    });
                }
                dragon.delete_children("recent_searches");
                $.each(array, function(i ,e){
                    var span = $("<span />");
                    span.text(e);
                    var t = e;
                    span.on("click", function(){
                        $("#monster_name").val(t);
                        cave.searchMonster();
                    });
                    $("#recent_searches").append(span);
                });
            },
            error: function(){
                var dummyarray = ["Ghoul", "Dragon", "Tusker", "Beholder", "OwlBear"];
                dragon.delete_children("recent_searches");
                $.each(dummyarray, function(i ,e){
                    var span = $("<span />");
                    span.text(e);
                    var t = e;
                    span.on("click", function(){
                        $("#monster_name").val(t);
                        cave.searchMonster();
                    });
                    $("#recent_searches").append(span);
                });
            }
        })
    },
    save_recently_searched: function(monsterName){
        $.post("./../server/monsters/set_searched.php", {"monster": JSON.stringify(monsterName)}, function(){
            cave.set_recently_searched();
        });
    },

    //REQUEST DATA FOR CHARTS
    drawCharts: function(){
        //Fast Draw
        dragon.draw_BarChart("popular_monster_holder", "popular_monster_result" ,"Current most Seen Monsters", cave.get_popular_monster_data());

        //Preload & Draw -> Check for Cache
        if(localStorage.getItem("challenge_data") != null) cave.draw_challenge_chart(localStorage.getItem("challenge_data"));
        else cave.get_challenge_data(cave.draw_challenge_chart, true);

        if(localStorage.getItem("size_data") != null) cave.draw_size_chart(localStorage.getItem("size_data"));
        else cave.get_size_data(cave.draw_size_chart, true);

        if(localStorage.getItem("type_data") != null) cave.draw_type_chart(localStorage.getItem("type_data"));
        else cave.get_type_data(cave.draw_type_chart, true);

        //Draw the hidden filters - Give the system time to write a small cache
        setTimeout(function(){ cave.draw_filter_charts(); }, 2000);
    },

    draw_filter_charts: function(){
        if(localStorage.getItem("challenge_data") != undefined && localStorage.getItem("challenge_data") != null)
            cave.draw_filter_challenge_chart(JSON.parse(localStorage.getItem("challenge_data")));
        else cave.get_challenge_data(cave.draw_filter_challenge_chart);

        if(localStorage.getItem("size_data") != undefined && localStorage.getItem("size_data") != null)
            cave.draw_filter_size_chart(JSON.parse(localStorage.getItem("size_data")));
        else cave.get_size_data(cave.draw_filter_size_chart);

        if(localStorage.getItem("type_data") != undefined && localStorage.getItem("type_data") != null)
            cave.draw_filter_type_chart(JSON.parse(localStorage.getItem("type_data")));
        else cave.get_type_data(cave.draw_filter_type_chart);
    },

    //AFTER GETTING THE DATA -> DRAW THE CHARTS
    draw_challenge_chart: function(result){
        dragon.draw_ColumnChart("challenge_monster_holder", "challenge_monster_result" , "Monsters By Challenge", result.data, result.ghost, cave.draw_monsters_by_challenge);
    },
    draw_size_chart: function(result){
        dragon.draw_ColumnChart("size_monster_holder", "size_monster_result" ,"Monsters Counted By Their Size", result.data, result.ghost, cave.draw_monsters_by_size);
    },
    draw_type_chart: function(result){
        dragon.draw_ColumnChart("type_monster_holder", "type_monster_result" ,"Monsters Per Type", result.data, result.ghost, cave.draw_monsters_by_type);
    },
    draw_filter_challenge_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_challenge_holder", "monster_search_result" , "Grouped By The Challenge Factor Of The Monster", result.data, result.ghost,
                cave.set_filter_challenge, {Width: 920, Height:220});
        });
        dragon.do_if_tablet(function(){
            dragon.draw_ColumnChart("filter_challenge_holder", "monster_search_result" , "Grouped By The Challenge Factor Of The Monster", result.data, result.ghost,
                cave.set_filter_challenge, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_challenge_holder", "monster_search_result" , "Grouped By The Challenge Factor Of The Monster", result.data, result.ghost,
                cave.set_filter_challenge, {Width: 300, Height:220});
        });
    },
    draw_filter_size_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_size_holder", "monster_search_result" ,"Monsters By Their Size", result.data,
                result.ghost, cave.set_filter_size, {Width: 920, Height:220});
        });
        dragon.do_if_tablet(function(){
            dragon.draw_ColumnChart("filter_size_holder", "monster_search_result" ,"Monsters By Their Size", result.data,
                result.ghost, cave.set_filter_size, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_size_holder", "monster_search_result" ,"Monsters By Their Size", result.data,
                result.ghost, cave.set_filter_size, {Width: 300, Height:220});
        });
    },
    draw_filter_type_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_type_holder", "monster_search_result" ,"Monsters and Their Behavior Type", result.data, result.ghost,
                cave.set_filter_type, {Width: 920, Height:220});
        });
        dragon.do_if_tablet(function(){
            dragon.draw_ColumnChart("filter_type_holder", "monster_search_result" ,"Monsters and Their Behavior Type", result.data, result.ghost,
                cave.set_filter_type, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_type_holder", "monster_search_result" ,"Monsters and Their Behavior Type", result.data, result.ghost,
                cave.set_filter_type, {Width: 300, Height:220});
        });
    },

    //WHEN A SELECTION IS MADE ON THE CHARTS -> SHOW THE APPROPRIATE SPELLS
    draw_monsters_by_challenge: function(challengeID, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/monsters/get_monsters.php?sort=challenge&sortvalue=" + challengeID;
        dragon.get_items(url, cave.draw_monsters, chartholder, resultarea);
    },
    draw_monsters_by_size: function(sizeID, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/monsters/get_monsters.php?sort=size&sortvalue=" + sizeID;
        dragon.get_items(url, cave.draw_monsters, chartholder, resultarea);
    },
    draw_monsters_by_type: function(typeID, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/monsters/get_monsters.php?sort=type&sortvalue=" + typeID;
        dragon.get_items(url, cave.draw_monsters, chartholder, resultarea);
    },
    draw_monsters_on_filter: function(){
        dragon.show_and_set_animation("monster_search_result");
        var query = "";
        query += "&challenge="; query += (localStorage.getItem('challenge_filter') == null) ? -1 : parseInt(localStorage.getItem('challenge_filter'));
        query += "&size="; query += (localStorage.getItem('size_filter') == null) ? -1 : parseInt(localStorage.getItem('size_filter'));
        query += "&type="; query += (localStorage.getItem('type_filter') == null) ? -1 : parseInt(localStorage.getItem('type_filter'));

        var url = "./../server/monsters/get_monsters_by_filter.php?" + query;
        dragon.get_items(url, cave.draw_monsters, "Defined", "monster_search_result");
    },
    set_filter_challenge: function(challengeID){
        //Is all the data yet received?
        if(localStorage.getItem('challenge_data') == undefined || localStorage.getItem('challenge_data') == null) {
            cave.get_challenge_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('challenge_filter') == challengeID) localStorage.removeItem('challenge_filter');
        else {
            localStorage.setItem('challenge_filter', challengeID);
            $("#resetFilters").css("display", "inline-block");
        }
        cave.filter();
    },
    set_filter_size: function(sizeID){
        if(localStorage.getItem('size_data') == undefined || localStorage.getItem('size_data') == null) {
            cave.get_size_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('size_filter') == sizeID) localStorage.removeItem('size_filter');
        else {
            localStorage.setItem('size_filter', sizeID);
            $("#resetFilters").css("display", "inline-block");
        }
        cave.filter();
    },
    set_filter_type: function(typeID){
        if(localStorage.getItem('type_data') == undefined || localStorage.getItem('type_data') == null) {
            cave.get_type_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('type_filter') == typeID) localStorage.removeItem('type_filter');
        else {
            localStorage.setItem('type_filter', typeID);
            $("#resetFilters").css("display", "inline-block");
        }
        cave.filter();
    },

    //FILTER AND REDRAW
    filter: function(){
        //Get the data
        var challengeID = localStorage.getItem('challenge_filter');
        var sizeID = localStorage.getItem('size_filter');
        var typeID = localStorage.getItem('type_filter');
        var challenges = JSON.parse(localStorage.getItem('challenge_data'));
        var sizes = JSON.parse(localStorage.getItem('size_data'));
        var types = JSON.parse(localStorage.getItem('type_data'));
        if(challengeID == null && sizeID == null && typeID == null) $("#resetFilters").hide();

        var btnText = "All";
        var lblText = "no";
        if(challengeID != null){
            var name = dragon.get_name_from_ghost(challengeID, challenges);
            if(name != null){
                btnText = name;
                lblText = "Challenge Level";
            }
        }
        if(sizeID != null){
            var name = dragon.get_name_from_ghost(sizeID, sizes);
            if(name != null){
                btnText = (challengeID != null) ? btnText + ", " + name : name;
                lblText = (challengeID != null) ? lblText + ", Size" : "Size";
            }
        }
        if(typeID != null){
            var name = dragon.get_name_from_ghost(typeID, types);
            if(name != null){
                btnText = (challengeID != null || sizeID != null) ? btnText + ", " + name : name;
                lblText = (challengeID != null || sizeID != null) ? lblText + ", Type" : "Type";
            }
        }

        //Set the filter
        $("#btnSearchByFilter").text("Get " + btnText + " Monsters");
        $("#FilterText").text(" - (" + lblText + " filter is Set.)");
    },
    reset_filter:function(){
        if(localStorage.getItem('challenge_filter') != null) localStorage.removeItem("challenge_filter");
        if(localStorage.getItem('size_filter') != null) localStorage.removeItem("size_filter");
        if(localStorage.getItem('type_filter') != null) localStorage.removeItem("type_filter");
        $("#resetFilters").hide();
        cave.filter();
    },

    //GET THE DATA
    get_popular_monster_data: function(){
        return [
            ['Element', 'Density', { role: 'style' }],
            ['Copper', 8.94, '#b87333'],            // RGB value
            ['Silver', 10.49, 'silver'],            // English color name
            ['Gold', 19.30, 'gold'],
            ['Platinum', 21.45, 'color: #e5e4e2' ] //CSS Style Declaration
        ];
    },
    get_challenge_data: function(redirect, getLS){
        if(getLS == undefined || getLS == null) getLS = false;
        var url = "./../server/monsters/get_challenges.php";
        var enableSort = (getLS && localStorage.getItem("size_chart_filter") == "top") ? true : false;
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noMonster", label: "Size", itemcount: "Number of Monsters" };
            return { id: item.id, label: "Lvl " + item.id, itemcount: item.MonsterCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, enableSort, "challenge_data", pushFunc);

    },
    get_size_data: function(redirect, getLS){
        if(getLS == undefined || getLS == null) getLS = false;
        var url = "./../server/monsters/get_sizes.php";
        var enableSort = (getLS && localStorage.getItem("size_chart_filter") == "top") ? true : false;
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noMonster", label: "Size", itemcount: "Number of Monsters" };
            return { id: item.id, label: item.csize, itemcount: item.MonsterCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, enableSort, "size_data", pushFunc);
    },
    get_type_data: function(redirect, getLS){
        if(getLS == undefined || getLS == null) getLS = false;
        var url = "./../server/monsters/get_types.php";
        var enableSort = (getLS && localStorage.getItem("type_chart_filter") == "top") ? true : false;
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noMonster", label: "Type", itemcount: "Number of Monsters" };
            return { id: item.id, label: item.ctype, itemcount: item.MonsterCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, enableSort, "type_data", pushFunc, 10);
    },
    get_monster_names: function(redirect, element){
        $.ajax({
            url: "./../server/monsters/get_monsternames.php",
            method: 'get',
            success: function(data){
                var monsternames;
                try{
                    monsternames = JSON.parse(data);
                } catch(e){
                    monsternames = data;
                }

                var names = [];
                $.each(monsternames, function(i, e){
                    if(e.hasOwnProperty('name')) names.push(Base64.decode(e.name));
                });

                if(redirect != undefined || redirect != null)
                    redirect(element, names, cave.searchMonster);
            },
            error: function(){
                console.log("Couldn't fetch autocomplete data.");
            }
        });
    },

    //DRAW A MONSTER
    draw_monsters: function(chartholder, monsters, resultarea){
        dragon.delete_children(resultarea);

        var currentletter = ""; var lettercount = 0;
        var currentguid = "";
        $.each(monsters, function(i, e) {
            if(monsters.length < 20){
                cave.draw_monster_dragon_hub(e, resultarea, i);
            } else {
                var letter = Base64.decode(e.name).slice(0,1);
                if(letter != currentletter){
                    currentletter = letter;
                    lettercount++;

                    var container = dragon.give_collapsible_container(currentletter);
                    $("#" + resultarea).append(container.header);
                    $("#" + resultarea).append(container.body);
                    currentguid = container.body.attr('id');

                    var ch = container.header;
                    ch.css("display", "block");
                    ch.css("opacity", 0);
                    setTimeout(function(){
                        ch.css("opacity", "1");
                    }, lettercount * 50 + i);

                    cave.draw_monster_dragon_hub(e, currentguid, 1);
                } else {
                    cave.draw_monster_dragon_hub(e, currentguid, 5);
                }
            }
        });
    },
    draw_monster_dragon_hub: function(e, resultarea, i){
        var monster = {
            id: e.id,
            name: Base64.decode(e.name),
            type: "Challenge Rating: " + e.challenge,
            size: e.csize,
            school: e.ctype
        };
        setTimeout(function(){
            dragon.add_item($("#" + resultarea), monster, "monster");
        }, i * 50);
    }
};

hero = {
    init: function(){
        //Bind the eventhandlers
        hero.set_create_buttons();
        hero.set_form_buttons();
        $("#confirm_fight").on("click", function(){hero.confirm();});

        //Fix Bootstrap Slide bug
        $("#race_slider").bind("slide.bs.carousel", function(e){
            if(!$("#race_slider .item.active .carousel-inner .item:eq(0)").hasClass('active'))
                $("#race_slider .item.active .carousel-inner .item:eq(0)").addClass('active');
        });

        //Set the autocomplete data
        setTimeout(function(){
            armoury.get_weapon_names(dragon.set_autocomplete, $("#left_weapon_name"), hero.set_left_weapon);
            scrolls.get_spell_names(dragon.set_autocomplete, $("#left_spell_name"), hero.set_left_spell);
        }, 1000);
        setTimeout(function(){
            armoury.get_weapon_names(dragon.set_autocomplete, $("#right_weapon_name"), hero.set_right_weapon);
            scrolls.get_spell_names(dragon.set_autocomplete, $("#right_spell_name"), hero.set_right_spell);
        }, 1250);

        //Acknowledge the init
        console.log("Local init has executed");
    },

    //SELECT CHARACTER
    set_create_buttons: function(){
        $.each($("*[data-function='create']"), function(i, e){
            $(e).on("click", function() {
                hero.create_hero();
            })
        });
        $.each($("*[data-function='class-carousel']"), function(i, e){
            $(e).owlCarousel({
                navigation : true, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true,
                pagination: false,

                afterMove: function(){
                    var currentitem = e.getElementsByClassName("item")[this.owl.currentItem];
                    $(e).attr("data-current", this.owl.currentItem);
                    currentitem = $(currentitem);
                    var title = currentitem.attr("data-title");
                    $("#class_slide_" + i + " + div .class_name").text(title);
                    $("#class_slide_" + i + " + div .class_descr").text(
                        currentitem.attr("data-desc")
                    );

                    var target = $("#class_slide_" + i + " + div .class_chars");
                    target.empty();
                    switch(title){
                        case "Paladin":
                            target.append(hero.give_logo("weapon"));
                            target.append(hero.give_logo("monster"));
                            target.append(hero.give_logo("monster"));
                            target.append(hero.give_logo("monster"));
                            break;
                        case "Druid":
                            target.append(hero.give_logo("spell"));
                            target.append(hero.give_logo("monster"));
                            break;
                        case "Sorcerer":
                            target.append(hero.give_logo("spell"));
                            target.append(hero.give_logo("monster"));
                            target.append(hero.give_logo("monster"));
                            break;
                        case "Ranger":
                            target.append(hero.give_logo("weapon"));
                            target.append(hero.give_logo("monster"));
                            break;
                    }
                }
            });
        });
    },
    give_logo: function(type){
        var div = $("<div />", { "class": type + " logo" } );
        var span = $("<span />", { "class": "icon" });
        div.append(span);
        return div;
    },
    set_form_buttons: function(){
        $("#left_weapon_label").on("click", function () {hero.set_left_weapon();});
        $("#left_spell_label").on("click", function () {hero.set_left_spell();});
        $("#right_weapon_label").on("click", function () {hero.set_right_weapon();});
        $("#right_spell_label").on("click", function () {hero.set_right_spell();});
    },
    set_left_weapon: function(){
        $("#left_weapon_label").css("background-color", "#4cae4c");
        $("#left_weapon_label").css("border-color", "#4cae4c");
        $("#left_weapon").val($("#left_weapon_name").val());
        hero.check_btn();
    },
    set_right_weapon: function(){
        $("#right_weapon_label").css("background-color", "#4cae4c");
        $("#right_weapon_label").css("border-color", "#4cae4c");
        $("#right_weapon").val($("#right_weapon_name").val());
        hero.check_btn();
    },
    set_left_spell: function(){
        $("#left_spell_label").css("background-color", "#4cae4c");
        $("#left_spell_label").css("border-color", "#4cae4c");
        $("#left_spell").val($("#left_spell_name").val());
        hero.check_btn();
    },
    set_right_spell: function(){
        $("#right_spell_label").css("background-color", "#4cae4c");
        $("#right_spell_label").css("border-color", "#4cae4c");
        $("#right_spell").val($("#right_spell_name").val());
        hero.check_btn();
    },
    check_btn: function(){
        if(($("#left_weapon").val() != "" || $("#left_spell").val() != "")
            && ($("#right_weapon").val() != "" || $("#right_spell").val() != "")){
            if($("#confirm_fight").hasClass('disabled')) $("#confirm_fight").removeClass('disabled');
        } else if(!$("#confirm_fight").hasClass('disabled')) $("#confirm_fight").addClass('disabled');
    },

    //SELECT LOADOUT
    create_hero: function(){
        var data = hero.destile_data();

        //Load The second part
        $("#monster_load").fadeIn(300);
        $("#race_slider").fadeOut(300);
        dragon.show_and_set_animation("monster_load");
        $("#cindic").hide(); $("#ctrll").hide(); $("#ctrlr").hide();

        //Set The weapons or spells
        $("#left_weapon_container").hide(); $("#right_weapon_container").hide();
        $("#left_spell_container").hide(); $("#right_spell_container").hide();
        if(data.weapons >= 1 ) $("#left_weapon_container").show();
        if(data.weapons == 2) $("#right_weapon_container").show();
        if(data.spells >= 1) $("#right_spell_container").show();
        if(data.spells == 2) $("#left_spell_container").show();

        //Save the ID's
        var id = $("#race_slider .item.active").index();
        var classid = $("#class_slide_" + id).attr("data-current");
        $("#race").val(id);
        $("#class").val(classid);

        //Pick The monster
        setTimeout(function(){
            hero.get_monster(parseInt(data.monsters), hero.fill_monster);
        }, 500);
    },
    destile_data: function(){
        var weapons = 0; var spells = 0; var monsters = 0;
        $.each($(".item.active .class_description .weapon"), function(i, e){ weapons++; });
        $.each($(".item.active .class_description .spell"), function(i, e){ spells++; });
        $.each($(".item.active .class_description .monster"), function(i, e){ monsters++; });

        return {
            weapons: weapons,
            spells: spells,
            monsters: monsters
        };
    },
    fill_monster: function(monster){
        $("#monster_name").text(monster.name);
        $("#monster_type").text(monster.type);
        $("#monster_size").text(monster.size);
        $("#monster_challenge").text(monster.challenge);

        //Hide the loadicon and show the monster
        $("#monster_load").hide();
        $("#monster_load + section").fadeIn(1000);

        //Save the ID
        $("#monster").val(monster.id);
    },
    get_monster: function(recursion, callback){
        $.ajax({
            url: "./../server/characters/get_random_monster.php?r=" + parseInt(recursion),
            method: "get",
            success: function(data){
                var monster = {
                    id: data.id,
                    name: Base64.decode(data.name),
                    type: data.ctype,
                    size: data.csize,
                    challenge: data.challenge
                };
                callback(monster);
            },
            error: function(data){
                $("#monster_load").text("An ajax call failed. Please refresh and try again.");
            }
        });
    },

    //CONFIRM FIGHT
    confirm: function(){
        if($("#confirm_fight").hasClass('disabled')) return;

        //Copy The Strategy
        $("#strategy").val($("#strategy_descr").val());

        //Save the fight
        $("#fight_form").submit();
    }
};

scrolls = {
    init: function(){
        //Awake the dragon
        dragon.init();

        //Preload Frequently used Images
        dragon.do_if_not_mobile(function(){var img = new Image(); img.src = "./../assets/backgrounds/wand.png";});

        //Load the right media
        scrolls.load_media();

        //Set the needed eventhandlers
        scrolls.set_sorter_buttons("school", function() {scrolls.get_school_data(scrolls.draw_school_chart, true);});
        scrolls.set_sorter_buttons("class", function() {scrolls.get_class_data(scrolls.draw_class_chart, true);});
        $("#spell_name_search").on("click", function() {scrolls.searchSpell();});
        $("#btnSearchByFilter").on("click", function() {scrolls.draw_spells_on_filter();});
        $("#resetFilters").on("click", function() {scrolls.reset_filter();});

        //Remove old caches
        dragon.clear_caches();
        scrolls.reset_filter();
        $(window).unload(function(){dragon.clear_caches();});

        //Draw the needed grahps
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(scrolls.drawCharts);

        //Pre-Cache the classes for each spell
        scrolls.get_spell_classes();

        //Set The Extra Elements
        scrolls.set_recently_searched();
        setTimeout(function(){scrolls.get_spell_names(dragon.set_autocomplete, $("#spell_name"), scrolls.searchSpell)}, 2000);

        //Acknowledge the init
        console.log("Local init has executed");
    },

    load_media: function(){
        dragon.do_if_desktop(function(){$("#mage_scrolls_top").attr('src', './../assets/backgrounds/2560x1600/wallpaper_2560%20x%201600%20wallpaper%20(9).jpg');});
        dragon.do_if_tablet(function(){$("#mage_scrolls_top").attr('src', './../assets/backgrounds/1280x960/wallpaper_1280%20x%20960%20wallpaper%20(9).jpg')})
        dragon.do_if_mobile(function(){$("#mage_scrolls_top").attr('src', './../assets/backgrounds/Mobile/wallpaper_Mobile (9).jpg')})

        dragon.do_if_not_mobile(function(){
            $(".sectionheader img").attr('src', './../assets/backgrounds/shared/mage_creature.jpg');
        });
        dragon.do_if_mobile(function(){
            $(".sectionheader img").attr('src', './../assets/backgrounds/Mobile/wallpaper_Mobile (10).jpg');
        });
    },

    set_sorter_buttons: function(chartname, redraw){
        //Set Class
        if(localStorage.getItem(chartname + "_chart_filter") == 'top')
            $("#" + chartname + "_spell_holder .sorter button:eq(0)").addClass('active');
        else $("#" + chartname + "_spell_holder .sorter button:eq(1)").addClass('active');

        //Set the eventhandler
        $("#" + chartname + "_spell_holder .sorter button:eq(0)").on("click", function(){
            localStorage.setItem(chartname + '_chart_filter', 'top'); //Save the choice
            redraw(); //Draw the chart

            //Set The Button
            $.each($("#" + chartname + "_spell_holder .sorter button"), function(i, e){
                if($(e).hasClass('active')) $(e).removeClass('active');
            });
            $(this).toggleClass('active');
        });
        $("#" + chartname + "_spell_holder .sorter button:eq(1)").on("click", function(){
            localStorage.setItem(chartname + '_chart_filter', 'all'); //Save the choice
            redraw(); //Draw the chart

            //Set the Button
            $.each($("#" + chartname + "_spell_holder .sorter button"), function(i, e){
                if($(e).hasClass('active')) $(e).removeClass('active');
            });
            $(this).toggleClass('active');
        });
    },

    searchSpell: function(){
        var spellName = $("#spell_name").val();
        var url = "./../server/spells/search_spell.php?spell=" + encodeURI(spellName);
        dragon.get_items(url, scrolls.draw_classless_spells, "Defined", "spell_search_result");

        //Save Searched Item.
        scrolls.save_recently_searched(spellName);
    },

    set_recently_searched: function(){
        $.ajax({
            url: "./../server/spells/get_searched.php",
            method: "get",
            success: function(data){
                var rawdata;
                try{
                    rawdata = JSON.parse(data);
                } catch(e){
                    rawdata = data;
                }

                var array = [];
                if(data == null || (data != null && data.length < 5)) array = ["Acid Fog", "Aid", "Air Walk", "Alarm", "Alter Self"];
                else {
                    $.each(rawdata, function(i, e){
                        array.push(e.name);
                    });
                }
                dragon.delete_children("recent_searches");
                $.each(array, function(i ,e){
                    var span = $("<span />");
                    span.text(e);
                    var t = e;
                    span.on("click", function(){
                        $("#spell_name").val(t);
                        scrolls.searchSpell();
                    });
                    $("#recent_searches").append(span);
                });
            },
            error: function(){
                var dummyarray= ["Acid Fog", "Aid", "Air Walk", "Alarm", "Alter Self"];
                dragon.delete_children("recent_searches");
                $.each(dummyarray, function(i ,e){
                    var span = $("<span />");
                    span.text(e);
                    var t = e;
                    span.on("click", function(){
                        $("#spell_name").val(t);
                        scrolls.searchSpell();
                    });
                    $("#recent_searches").append(span);
                });
            }
        })
    },
    save_recently_searched: function(spellName){
        $.post("./../server/spells/set_searched.php", {"spell": JSON.stringify(spellName)}, function(){
            scrolls.set_recently_searched();
        });
    },

    //REQUEST DATA FOR CHARTS
    drawCharts: function(){
        //Fast Draw
        dragon.draw_BarChart("popular_spell_holder", "popular_spell_result" ,"Current most Popular Spells", scrolls.get_popular_spell_data());

        //Preload & Draw -> Check for Cache
        if(localStorage.getItem("school_data") != null) scrolls.draw_school_chart(localStorage.getItem("school_data"));
        else scrolls.get_school_data(scrolls.draw_school_chart, true);

        if(localStorage.getItem("class_data") != null) scrolls.draw_class_chart(localStorage.getItem("class_data"));
        else scrolls.get_class_data(scrolls.draw_class_chart, true);

        if(localStorage.getItem("level_data") != null) scrolls.draw_level_chart(localStorage.getItem("level_data"));
        else scrolls.get_level_data(scrolls.draw_level_chart);

        //Draw the hidden filters - Give the system time to write a small cache
        setTimeout(function(){ scrolls.draw_filter_charts(); }, 2000);
    },

    draw_filter_charts: function(){
        if(localStorage.getItem("school_data") != undefined && localStorage.getItem("school_data") != null)
            scrolls.draw_filter_school_chart(JSON.parse(localStorage.getItem("school_data")));
        else scrolls.get_school_data(scrolls.draw_filter_school_chart);

        if(localStorage.getItem("class_data") != undefined && localStorage.getItem("class_data") != null)
            scrolls.draw_filter_class_chart(JSON.parse(localStorage.getItem("class_data")));
        else scrolls.get_class_data(scrolls.draw_filter_class_chart);

        if(localStorage.getItem("level_data") != undefined && localStorage.getItem("level_data") != null)
            scrolls.draw_filter_level_chart(JSON.parse(localStorage.getItem("level_data")));
        else scrolls.get_level_data(scrolls.draw_filter_level_chart);
    },

    //AFTER GETTING THE DATA -> DRAW THE CHARTS
    draw_school_chart: function(result){
        dragon.draw_ColumnChart("school_spell_holder", "school_spell_result" , "Spells in each School", result.data, result.ghost, scrolls.draw_spells_by_school);
    },
    draw_class_chart: function(result){
        dragon.draw_ColumnChart("class_spell_holder", "class_spell_result" ,"Usable Spells for a Character Classes", result.data, result.ghost, scrolls.draw_spells_by_class);
    },
    draw_level_chart: function(result){
        dragon.draw_ColumnChart("level_spell_holder", "level_spell_result" ,"Spells Per Trier", result.data, result.ghost, scrolls.draw_spells_by_level);
    },
    draw_filter_school_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_school_holder", "spell_search_result" , "Spells in each School", result.data, result.ghost,
                scrolls.set_filter_school, {Width: 920, Height:220});
        });
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_school_holder", "spell_search_result" , "Spells in each School", result.data, result.ghost,
                scrolls.set_filter_school, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_school_holder", "spell_search_result" , "Spells in each School", result.data, result.ghost,
                scrolls.set_filter_school, {Width: 300, Height:220});
        });
    },
    draw_filter_class_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_class_holder", "spell_search_result" ,"Usable Spells for a Character Classes", result.data,
                result.ghost, scrolls.set_filter_class, {Width: 920, Height:220});
        });
        dragon.do_if_tablet(function(){
            dragon.draw_ColumnChart("filter_class_holder", "spell_search_result" ,"Usable Spells for a Character Classes", result.data,
                result.ghost, scrolls.set_filter_class, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_class_holder", "spell_search_result" ,"Usable Spells for a Character Classes", result.data,
                result.ghost, scrolls.set_filter_class, {Width: 300, Height:220});
        });
    },
    draw_filter_level_chart: function(result){
        dragon.do_if_desktop(function(){
            dragon.draw_ColumnChart("filter_level_holder", "spell_search_result" ,"Spells Per Trier", result.data, result.ghost,
                scrolls.set_filter_level, {Width: 920, Height:220});
        });
        dragon.do_if_tablet(function(){
            dragon.draw_ColumnChart("filter_level_holder", "spell_search_result" ,"Spells Per Trier", result.data, result.ghost,
                scrolls.set_filter_level, {Width: 600, Height:220});
        });
        dragon.do_if_mobile(function(){
            dragon.draw_ColumnChart("filter_level_holder", "spell_search_result" ,"Spells Per Trier", result.data, result.ghost,
                scrolls.set_filter_level, {Width: 300, Height:220});
        });
    },

    //WHEN A SELECTION IS MADE ON THE CHARTS -> SHOW THE APPROPRIATE SPELLS
    draw_spells_by_school: function(schoolId, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/spells/get_spells.php?sort=school&sortvalue=" + schoolId;
        dragon.get_items(url, scrolls.draw_classless_spells, chartholder, resultarea);
    },
    draw_spells_by_class: function(classId, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/spells/get_spells.php?sort=class&sortvalue=" + classId;
        dragon.get_items(url, scrolls.draw_classless_spells, chartholder, resultarea);
    },
    draw_spells_by_level: function(level, chartholder, resultarea){
        dragon.show_and_set_animation(resultarea);
        var url = "./../server/spells/get_spells.php?sort=level&sortvalue=" + level;
        dragon.get_items(url, scrolls.draw_classless_spells, chartholder, resultarea);
    },
    draw_spells_on_filter: function(){
        dragon.show_and_set_animation("spell_search_result");
        var query = "";
        query += "&school="; query += (localStorage.getItem('school_filter') == null) ? -1 : parseInt(localStorage.getItem('school_filter'));
        query += "&class="; query += (localStorage.getItem('class_filter') == null) ? -1 : parseInt(localStorage.getItem('class_filter'));
        query += "&level="; query += (localStorage.getItem('level_filter') == null) ? -1 : parseInt(localStorage.getItem('level_filter'));

        var url = "./../server/spells/get_spell_by_filter.php?" + query;
        dragon.get_items(url, scrolls.draw_classless_spells, "Defined", "spell_search_result");
    },
    set_filter_school: function(schoolId){
        //Is all the data yet received?
        if(localStorage.getItem('school_data') == undefined || localStorage.getItem('school_data') == null) {
            scrolls.get_school_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('school_filter') == schoolId) localStorage.removeItem('school_filter');
        else {
            localStorage.setItem('school_filter', schoolId);
            $("#resetFilters").css("display", "inline-block");
        }
        scrolls.filter();
    },
    set_filter_class: function(classId){
        if(localStorage.getItem('class_data') == undefined || localStorage.getItem('class_data') == null) {
            scrolls.get_class_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('class_filter') == classId) localStorage.removeItem('class_filter');
        else {
            localStorage.setItem('class_filter', classId);
            $("#resetFilters").css("display", "inline-block");
        }
        scrolls.filter();
    },
    set_filter_level: function(levelId){
        if(localStorage.getItem('level_data') == undefined || localStorage.getItem('level_data') == null) {
            scrolls.get_level_data();
            return null;
        }

        //Set The Filter. Uncheck if the same item is re-clicked.
        if(localStorage.getItem('level_filter') == levelId) localStorage.removeItem('level_filter');
        else {
            localStorage.setItem('level_filter', levelId);
            $("#resetFilters").css("display", "inline-block");
        }
        scrolls.filter();
    },

    //FILTER AND REDRAW
    filter: function(){
        //Get the data
        var schoolId = localStorage.getItem('school_filter');
        var classId = localStorage.getItem('class_filter');
        var levelId = localStorage.getItem('level_filter');
        var schools = JSON.parse(localStorage.getItem('school_data'));
        var classes = JSON.parse(localStorage.getItem('class_data'));
        var levels = JSON.parse(localStorage.getItem('level_data'));
        if(schoolId == null && classId == null && levelId == null) $("#resetFilters").hide();

        var btnText = "All";
        var lblText = "no";
        if(schoolId != null){
            var name = dragon.get_name_from_ghost(schoolId, schools);
            if(name != null){
                btnText = name;
                lblText = "School";
            }
        }
        if(classId != null){
            var name = dragon.get_name_from_ghost(classId, classes);
            if(name != null){
                btnText = (schoolId != null) ? btnText + ", " + name : name;
                lblText = (schoolId != null) ? lblText + ", Class" : "Class";
            }
        }
        if(levelId != null){
            var name = null;
            $.each(levels.ghost, function(i, e){
                if(parseInt(levelId) == parseInt(e[0])) name = e[0];
            });
            if(name != null){
                btnText = (schoolId != null || classId != null) ? btnText + ", " : "";
                btnText = btnText + "Level " + name;
                lblText = (schoolId != null || classId != null) ? lblText + ", Level" : "Level";
            }
        }

        //Set the filter
        $("#btnSearchByFilter").text("Get " + btnText + " Spells");
        $("#FilterText").text(" - (" + lblText + " filter is Set.)");
    },
    reset_filter:function(){
        if(localStorage.getItem('school_filter') != null) localStorage.removeItem("school_filter");
        if(localStorage.getItem('class_filter') != null) localStorage.removeItem("class_filter");
        if(localStorage.getItem('level_filter') != null) localStorage.removeItem("level_filter");
        $("#resetFilters").hide();
        scrolls.filter();
    },

    //GET THE DATA
    get_popular_spell_data: function(){
        return [
            ['Element', 'Density', { role: 'style' }],
            ['Copper', 8.94, '#b87333'],            // RGB value
            ['Silver', 10.49, 'silver'],            // English color name
            ['Gold', 19.30, 'gold'],
            ['Platinum', 21.45, 'color: #e5e4e2' ] //CSS Style Declaration
        ];
    },

    get_school_data: function(redirect, getLS){
        if(getLS == undefined || getLS == null) getLS = false;
        var url = "./../server/spells/get_schools.php";
        var enableSort = (getLS && localStorage.getItem("school_chart_filter") == "top") ? true : false;
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noSpell", label: "School", itemcount: "Number of Spells" };
            return { id: item.SchoolID, label: item.School, itemcount: item.SpellCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, enableSort, "school_data", pushFunc);
    },

    get_class_data: function(redirect, getLS){
        if(getLS == undefined || getLS == null) getLS = false;
        var url = "./../server/spells/get_classes.php";
        var enableSort = (getLS && localStorage.getItem("class_chart_filter") == "top") ? true : false;
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noSpell", label: "School", itemcount: "Number of Spells" };
            return { id: item.id, label: item.class, itemcount: item.SpellCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, enableSort, "class_data", pushFunc);
    },

    get_level_data: function(redirect){
        var url = "./../server/spells/get_levels.php";
        var pushFunc = function(item){
            if(item == undefined || item == null)
                return { id: "noSpell", label: "Level", itemcount: "Number of Spells" };
            return { id: item.level, label: "Level " + item.level, itemcount: item.SpellCount };
        };

        return dragon.get_ajax_data_basefunction(url, redirect, null, "level_data", pushFunc);
    },

    get_spell_classes: function(){
        $.ajax({
            url: "./../server/spells/get_spellclasses.php",
            method: 'get',
            success: function(data){
                var spellclasses;
                try{
                    spellclasses = JSON.parse(data);
                } catch(e){
                    spellclasses = data;
                }
                var formatted_classes = {};

                $.each(spellclasses, function(i, e){
                    var id = e.spellID;
                    if(!(id in formatted_classes)){
                        formatted_classes[id] = {};
                        formatted_classes[id][e.level] = [];
                        formatted_classes[id][e.level].push(e.class);
                    } else {
                        if(!(e.level in formatted_classes[id])){
                            formatted_classes[id][e.level] = [];
                            formatted_classes[id][e.level].push(e.class);
                        } else {
                            formatted_classes[id][e.level].push(e.class);
                        }
                    }
                });

                localStorage.setItem('spellclass_cache', JSON.stringify(formatted_classes));
            }
        });
    },

    get_spell_names: function(redirect, element, forwarder){
        $.ajax({
            url: "./../server/spells/get_spellnames.php",
            method: 'get',
            success: function(data){
                var spellnames;
                try{
                    spellnames = JSON.parse(data);
                } catch(e){
                    spellnames = data;
                }
                var names = [];
                $.each(spellnames, function(i, e){
                    if(e.hasOwnProperty('name')) names.push(e.name);
                });

                if(redirect != undefined || redirect != null)
                    redirect(element, names, forwarder);
            },
            error: function(){
                console.log("Couldn't fetch autocomplete data.");
            }
        });
    },

    //FETCH THE CLASSES FOR A SPELL AND DRAW THAT SHIT
    draw_classless_spells: function(chartholder, spells, resultarea){
        if(localStorage.getItem('spellclass_cache') == null){
            scrolls.get_spell_classes();
            setTimeout(function(){
                var ch = chartholder; var sp = spells; var re = resultarea;
                scrolls.draw_classless_spells(ch, sp, re);
            }, 1000);
        } else {
            dragon.delete_children(resultarea);

            var currentletter = ""; var lettercount = 0;
            var currentguid = "";
            $.each(spells, function(i, e) {
                if(spells.length < 20){
                    scrolls.get_spell_class(e, resultarea, i);
                } else {
                    var letter = e.name.slice(0,1);
                    if(letter != currentletter){
                        currentletter = letter;
                        lettercount++;

                        var container = dragon.give_collapsible_container(currentletter);
                        $("#" + resultarea).append(container.header);
                        $("#" + resultarea).append(container.body);
                        currentguid = container.body.attr('id');

                        var ch = container.header;
                        ch.css("display", "block");
                        ch.css("opacity", 0);
                        setTimeout(function(){
                            ch.css("opacity", "1");
                        }, lettercount * 50 + i);

                        scrolls.get_spell_class(e, currentguid);
                    } else {
                        scrolls.get_spell_class(e, currentguid);
                    }
                }
            });
        }
    },
    get_spell_class: function(spell, resultarea, interval){
        if(localStorage.getItem('spellclass_cache') == null) {
            var sp = spell; var re = resultarea; var int = interval;
            setTimeout(function(){
                scrolls.get_spell_class(sp, re, int);
            }, 2000);
        } else {
            var cache = JSON.parse(localStorage.getItem('spellclass_cache'));
            var id = spell.id;  var level = spell.level;

            var classname = [];
            if(cache[id] != undefined && cache[id][level] != undefined){
                for(var i= 0; i<cache[id][level].length; i++) classname.push(cache[id][level][i]);
            }

            var new_spell = {
                id: id,
                name: spell.name,
                school: spell.school,
                level: level,
                classes: classname
            };

            if(interval == undefined){
                dragon.add_item($("#" + resultarea), new_spell, "spell");
            } else {
                setTimeout(function() {
                    dragon.add_item($("#" + resultarea), new_spell, "spell");
                }, interval * 50);
            }
        }
    }
};