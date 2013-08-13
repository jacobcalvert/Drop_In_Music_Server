/*  VARIABLES SECTION  */
var transition_time = 500; //length of slides.
/* DO NOT EDIT BELOW HERE */
jQuery(document).ready(function(){
var is_shown = false;
$("div#hover_menu_tab").click(function(){

    if(is_shown==false){
    $("div#hover_menu").animate(
        {width:250,overflow:scroll,left:0},{queue:false,duration:transition_time}
        );
    $("div#hover_menu_tab").animate(
        {left:280},{queue:false,duration:transition_time}
    );
    $("div#hover_menu_tab").css("background","#1B1A1F url('img/search.png')");
    $("div#hover_menu_tab").css("background-size", "25px 25px");
    $("div#hover_menu_tab").css("background-repeat", "no-repeat");
    is_shown=true;
    }
    else{


    $("div#hover_menu").animate(
                {width:0,left:-30},{queue:false,duration:transition_time}
                );
    $("div#hover_menu_tab").animate(
                {left:0},{queue:false,duration:transition_time}
            );
    $("div#hover_menu_tab").css("background","#1B1A1F url('img/search.png')");
    $("div#hover_menu_tab").css("background-size", "25px 25px");
    $("div#hover_menu_tab").css("background-repeat", "no-repeat");




    is_shown=false;
    }



});

});
