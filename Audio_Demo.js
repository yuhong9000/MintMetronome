CDO.Sound.Init = function () {

      /* Load the elements once they've been added */
      els = CDO.Sound.elements;

      $("body").on("click", els.sounds, function(){
          var src_mp3 = $(this).attr("data-src-mp3");
          var src_ogg = $(this).attr("data-src-ogg");

          // check if HTML5 Audio Element is supported
          var HTML5AudioSupport = Modernizr.audio;
          if (HTML5AudioSupport && (HTML5AudioSupport.mp3 != '' || HTML5AudioSupport.ogg != ''))
              playHtml5(HTML5AudioSupport, src_mp3, src_ogg);
          // check if Flash is supported (mp3 only)
          else if (Modernizr.flash)
              playFlash(src_mp3);
          // open a browser page directly on the sound (mp3 only)
          else playRaw(src_mp3);
      });
  };

  // HTML5 sound play
  function playHtml5(HTML5AudioSupport, src_mp3, src_ogg){
    if(HTML5AudioSupport.mp3 != ''){
      var audio = new Audio(src_mp3);
        audio.addEventListener("error", function(e){
          playHtml5OGG(src_ogg);
        });
        audio.play();
    } else playHtml5OGG(src_ogg);
  }

  function playHtml5OGG(src_ogg){
      var audio = new Audio(src_ogg);
      audio.addEventListener("error", function(e){alert("Apologies, the sound is not available.");});
      audio.play();
  }
