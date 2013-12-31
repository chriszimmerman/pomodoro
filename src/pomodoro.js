$(document).ready(function(){
    var workTimer = '#workTimer';
    var breakTimer = '#breakTimer';
    var workMinutes = '#workMinutes';
    var workSeconds = '#workSeconds';
    var breakMinutes = '#breakMinutes';
    var breakSeconds = '#breakSeconds';
    var minutesLeft;
    var secondsLeft;
    var timerIntervalId;
    var isWork = false;
    var time;

    function formatSeconds(seconds){
        return seconds < 10 ? ("0" + seconds) : seconds;
    }

    function initializeTimer(){
        isWork = !isWork;

        $('#workContent').empty();
        $('#breakContent').empty();

        if(isWork){
            $('#workContent').append($("<h1>Work</h1><h1 id=\"time\">" + time['workMinutes'] + ":" + formatSeconds(time['workSeconds']) + "</h1>"));
            $('#workContent').css('color', 'red');
            minutesLeft = new Number(time['workMinutes']);
            secondsLeft = new Number(time['workSeconds']);
        }
        else {
            $('#workContent').append($("<h1>Break</h1><h1 id=\"time\">" + time['breakMinutes'] + ":" + formatSeconds(time['breakSeconds']) + "</h1>"));
            $('#workContent').css('color', 'green');
            minutesLeft = new Number(time['breakMinutes']);
            secondsLeft = new Number(time['breakSeconds']);
        }
    }

    function countdown(){
        secondsLeft--;
        if(minutesLeft < 1 && secondsLeft < 1){
            var snd = new Audio("assets/timer.wav");
            snd.play();
            initializeTimer();
        }
        else if(secondsLeft < 0){
            secondsLeft = 59;
            minutesLeft--;
            $('#time').text(minutesLeft + ":" + formatSeconds(secondsLeft));
        }
        else{
            $('#time').text(minutesLeft + ":" + formatSeconds(secondsLeft));
        }
    };

    $(workTimer).append($("<div id=\"workMinutesDiv\" class=\"ui-block-a\">Minutes: <select id=\"workMinutes\" /></div>"));
    $(workTimer).append($("<div id=\"workSecondsDiv\" class=\"ui-block-b\">Seconds: <select id=\"workSeconds\" /></div>"));
    $(breakTimer).append($("<div id=\"breakMinutesDiv\" class=\"ui-block-a\">Minutes: <select id=\"breakMinutes\" /></div>"));
    $(breakTimer).append($("<div id=\"breakSecondsDiv\" class=\"ui-block-b\">Seconds: <select id=\"breakSeconds\" /></div>"));

    for(var i = 0; i < 60; i++){
        $(workMinutes).append($("<option value=" + i + ">" + i + "</option>"));
        $(workSeconds).append($("<option value=" + i + ">" + i + "</option>"));
        $(breakMinutes).append($("<option value=" + i + ">" + i + "</option>"));
        $(breakSeconds).append($("<option value=" + i + ">" + i + "</option>"));
    }

    $(workMinutes).selectmenu();
    $(workSeconds).selectmenu();
    $(breakMinutes).selectmenu();
    $(breakSeconds).selectmenu();

    $('#start').click(function(){
        time = {
            workMinutes: $(workMinutes).val(),
            workSeconds: $(workSeconds).val(),
            breakMinutes: $(breakMinutes).val(),
            breakSeconds: $(breakSeconds).val()
        };

        initializeTimer();
        timerIntervalId = setInterval(countdown, 1000);
    });
});