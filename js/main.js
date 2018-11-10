 var text = new Blotter.Text("Molo", {
        family : "Fivo Sans Modern",
        size : 400,
        fill : "#fff",
        weight : 900,
        paddingRight : 300,
        paddingLeft : 200,
       
      });

      var material = new Blotter.LiquidDistortMaterial();
// setting for speed twisting motion
// it is a float variable between 0.0 ~ 1.0
material.uniforms.uSpeed.value = 0.1;

material.uniforms.uSeed.value = 20;


// setting untuk distorsi liukan gelombang
// it is a float variable between 0.0 ~ 1.0
material.uniforms.uVolatility.value = 0.4;

      var blotter = new Blotter(material, { texts : text });

      var scope = blotter.forText(text);


// we will display it in element 'satu' in html
scope.appendTo(satu);

/* 
Google SpreadSheet
*/
$(document).ready(function() {
   var docHeight = $(document).height(),
  scrollPercent;



      var tableArray = [];
      /* First parameter in .getJSON method is published google spreadsheet's modified link for getting data formed with JSON. Tricky key is putting key between link template over here : https://spreadsheets.google.com/feeds/list/PUT-KEY_HERE/od6/public/values?alt=json  | You might be get key when you published your data spreadsheet. The key inside the URL. After getting JSON object you can investigate which key represent data. In this example json.feed.entry is an array that includes my data. Your solution should look similar like that.
      */
      $.getJSON('https://spreadsheets.google.com/feeds/list/1hTWYmtNHxk64kJ0yk7tYYiKQZKqG7r8bVbH28Whz17c/od6/public/values?alt=json', function(json) {
        for (var i = 0; i < json.feed.entry.length; i++) {
          var iArray = [];
          iArray.push(json.feed.entry[i].gsx$name.$t);
          iArray.push('<a href="'+json.feed.entry[i].gsx$url.$t+ '">URL</a>');
          tableArray.push(iArray);
          
          $("#container").append('<a class="link" target="_blank"><article><div class="content"><h2>' + json.feed.entry[i].gsx$name.$t + '</h2><h3>' + json.feed.entry[i].gsx$aside.$t + '</h3></div><div class="flip-box"><div class="flip-box-inner"><div class="flip-box-front"><video autoplay loop poster="' + json.feed.entry[i].gsx$urlimg.$t + '"> <source src="' + json.feed.entry[i].gsx$urlvid.$t + '" type="video/mp4" /></video></div><div class="flip-box-back" style="background-color:' + json.feed.entry[i].gsx$color.$t + ';"></div></div></div></article></a>');
        
          
        }
       
      })
       .done(function() {
        console.log( "second success" );
        $("article").each(function( i ) {


                // Regular
          $(this).pressure({
                start: function(event){
                  // this is called on force start
                  $(".couille").html("small THROAT");
                  $(this).css("background", "red");
                  $(this).addClass("hover");
                },
                end: function(){
                  // this is called on force end
                  $(this).removeClass("hover");
                 
                },
                startDeepPress: function(event){
                  // this is called on "force click" / "deep press", aka once the force is greater than 0.5
                  
                },
                endDeepPress: function(){
                  // this is called when the "force click" / "deep press" end
                },
                change: function(force, event){
                  // this is called every time there is a change in pressure
                  // force will always be a value from 0 to 1 on mobile and desktop
                  if (force > 0.99) {
                    $(".couille").html(i+1);
                  }
                 
                },
                unsupported: function(){
                  // NOTE: this is only called if the polyfill option is disabled!
                  // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
                }
              });
         
        });



      })
      ;
    
});




