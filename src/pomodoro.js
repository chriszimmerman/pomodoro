$(document).ready(function(){
    var main = '#main';
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

    $(workTimer).append($("<div class=\"ui-block-a\">Minutes: <select id=\"workMinutes\" /></div>"));
    $(workTimer).append($("<div class=\"ui-block-b\">Seconds: <select id=\"workSeconds\" /></div>"));
    $(breakTimer).append($("<div class=\"ui-block-a\">Minutes: <select id=\"breakMinutes\" /></div>"));
    $(breakTimer).append($("<div class=\"ui-block-b\">Seconds: <select id=\"breakSeconds\" /></div>"));

    for(var i = 0; i <= 59; i++){
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

    function formatSeconds(seconds){
        return seconds < 10 ? ("0" + seconds) : seconds;
    }

    function initializeTimer(){
        isWork = !isWork;
        $(main).empty();

        if(isWork){
            $(main).append($("<h1>Work</h1><h1 id=\"time\">" + time['workMinutes'] + ":" + formatSeconds(time['workSeconds']) + "</h1>"));
            $(main).css('color', 'red');
            minutesLeft = new Number(time['workMinutes']);
            secondsLeft = new Number(time['workSeconds']);
        }
        else {
            $(main).append($("<h1>Break</h1><h1 id=\"time\">" + time['breakMinutes'] + ":" + formatSeconds(time['breakSeconds']) + "</h1>"));
            $(main).css('color', 'green');
            minutesLeft = new Number(time['breakMinutes']);
            secondsLeft = new Number(time['breakSeconds']);
        }
    }

    function countdown(){
        secondsLeft--;
        if(minutesLeft < 1 && secondsLeft < 1){
            var snd = isWork ? new Audio("assets/timer.wav") : new Audio("assets/buzzer.mp3");
            snd.play();
            initializeTimer();
        }
        else {
            if(secondsLeft < 0){
                secondsLeft = 59;
                minutesLeft--;
            }
            $('#time').text(minutesLeft + ":" + formatSeconds(secondsLeft));
        }
    };
});