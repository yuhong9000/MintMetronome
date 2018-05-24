var $tempo = $('#tempo');
var $plus = $('#plus');
var $minus = $('#minus');
var $play = $('#play');
var timeout,playout,iconout;
var bpm = $('#bpm').val();
var time_sigature = $('#time_signature').val();

var playing = -1; // play status: 1 is playing, -1 is not playing

// audio element
var $audioElement1 = $('audio');
// var $audioElement1 = document.createElement('audio');
// $audioElement1.setAttribute('src', 'sound/Wood_Block_Tick.wav');
// $audioElement1.setAttribute('autoplay', 'autoplay');

// event tempo select option change
$tempo.on('change',function(event){
  console.log('event.target.value: ' + event.target.value);
  let n = event.target.value;
  let $beats = $('main div:first-child img');
  let $div = $beats.parent();
  $beats.remove();
  for(let i = 0; i < n; i++){
    $div.append('<img class="icon" src="img/if_25-Communication_2123871.png" alt="beat">');
  }
});

function IncrementBPM(num){
  let $display = $('#bpm');
  $display.val(Math.min(parseInt($display.val())+1,200));
  bpm = $display.val();
  console.log('setting: '+ 60000/bpm);
}

function DecreaseBPM(num){
  let $display = $('#bpm');
  $display.val(Math.max(parseInt($display.val())-1,1));
  bpm = $display.val();
  console.log('setting: '+ 60000/bpm);
}

// plus minus buttons event
$plus.on({
  click: function(){
    IncrementBPM(1);
  },
  mousedown: function(){
    timeout = setInterval(function() {
      IncrementBPM(1);
    },125)
  },
  mouseleave: function () {
      clearInterval(timeout);
      return false;
  }
});

$minus.on({
  click: function(){
    DecreaseBPM(1);
  },
  mousedown: function(){
    timeout = setInterval(function() {
      DecreaseBPM(1);
    },125)
  },
  mouseleave: function () {
      clearInterval(timeout);
      return false;
  }
});

$(document).mouseup(function(){
    clearInterval(timeout);
    return false;
});

$('#bpm').on({
  change: function(event){
    if(event.target.value < 0){
      event.target.value = 1;
      bpm = 1;
    }else if(event.target.value > 400){
      event.target.value = 400;
      bpm = 400;
    }else{
      bpm = event.target.value;
    }
  }
});

$('#time_signature').on({
  change: function(event){
    time_sigature = event.target.value;
  }
});

// play button event
$('#play').on({
  click: function(event){
    setTimeout(()=>{playBeat(event);},0);
    setTimeout(()=>{playBeatIcon(event);},0);
    // console.log("hello there");
  }
});

function playBeat(event){
  playing *= -1;
  if(playing == 1){
    clearInterval(playout);
    console.log('playing: '+60000/bpm);

    let audio = new Audio($audioElement1.attr("src"));
    // let interval = $audioElement1[0].duration*1000;
    // console.log('duration: '+ (60000/bpm - interval));
    audio.load();
    audio.play();
    playout = setInterval(function() {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    },60000/(bpm*time_sigature));
    playBeatIcon();
    $(event.target).attr('src','img/if_91-Pause_2123935.png');
  }
  else{
    clearInterval(playout);
    playBeatIcon();
    $(event.target).attr('src','img/if_91-Play_2123935.png');
  }
}

function playBeatIcon(){
  let $beatIcons = $('img[alt="beat"]');
  // $beatIcons[0].style.filter = "invert(100%)";
  // console.log($beatIcons[0]);
  let index = 0;
  let start = 1;
  let flag = 1;

  clearInterval(iconout);
  for(let i = 0; i < $tempo.val();i++){
    $beatIcons[i].style.filter = "invert(0%)";
  }

  let play = function(){
    flag *= -1;
    if(flag == 1){
      $beatIcons[index].style.filter = "invert(0%)";
    }else{
      $beatIcons[index].style.filter = "invert(65%)";
    }
  };

  if(playing == 1){
    play();
    iconout = setInterval(function() {
      play();
      start++;
      if(start == time_sigature * 2){
        start = 0;
        index = (index==$tempo.val()-1)? 0:index+1;
      }
    },30000/(bpm*time_sigature));
  }

}
