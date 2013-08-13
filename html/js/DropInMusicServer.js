jQuery(document).ready(function(){
$("#search").keyup(function(){
searchFor(String($(this).val()));
updateHandlers();
});
 //Regular Functions
function updateHandlers(){
$(".items_folder,.items_file,.items_back_folder").unbind('click').click(function(){

        var next_hop = $(this).attr("id");
        var type_hop = $(this).attr("class");
        var index_s = next_hop.lastIndexOf("\\");

        var prev_hop = next_hop.substr(0,index_s);

        createCookie("next_hop",prev_hop,1);
        if(type_hop.indexOf("folder")!=-1){

            var data_string = JSON.stringify({"folder":next_hop});
            console.log(data_string);
            $.ajax({type: "POST",url: "../api/folder",data: {"query_string":data_string},
            }).done(function(data){
                var data_pool = JSON.parse(data);

                var files = data_pool["files"];
                var folders = data_pool["folders"];
                console.log(data_pool);
                clearItems();
                $("#item_window").append("<p class='items_back_folder' id='"+readCookie("next_hop")+"'>Go Back</p>");
                for (i=0;i<folders.length;i++)
                {
                $("#item_window").append("<p class='items_folder' id=\""+folders[i]+"\">"+getName(folders[i])+"</p>");
                }
                for (i=0;i<files.length;i++)
                {
                $("#item_window").append("<p class='items_file' id=\""+files[i]+"\">"+getName(files[i])+"</p>");
                }

                updateHandlers();
            });
        }
        else{//this is a file and we should deliver the link
            var data_string = JSON.stringify({"file":next_hop});
            console.log(data_string);
            $.ajax({type: "POST",url: "../api/file",data: {"query_string":data_string},
            }).done(function(data){
            var data_pool = JSON.parse(data);
            console.log(data_pool);
            var url = data_pool["url"];
            $("#control_bar").empty();

            ID3.loadTags(url, function() {
                var tags = ID3.getAllTags(url);
                $("#control_bar").append("<audio controls autoplay src=\""+url+"\">Your browser does not support HTML5 audio. Sucksssss.</audio>"+"Now Playing: "+tags.title+" Track # "+tags.track+" from "+tags.album+" by "+tags.artist);

            });







            });



            updateHandlers();
        }
        });



}
function cleanURL(url){
var uri = new URI(url);
return uri.normalizePathname();
}
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
function getName(url){
var i = url.lastIndexOf("\\");
return url.substr(i+1,url.length);

}
function getFileName(url){
    var i = url.lastIndexOf("/");
    var filename_ext = url.substr(i+1,url.length);
    var j = filename_ext.lastIndexOf(".");
    return filename_ext.substr(0,j);

}
function clearItems(){
$(".items_file").each(function(index){
$(this).remove();
});
$(".items_folder").each(function(index){
$(this).remove();
});
 $(".items_back_folder").each(function(index){
$(this).remove();
});
}
function searchFor(str){
var data_string = JSON.stringify({"search_for":str});
 $.ajax({type: "POST",url: "../api/search",data: {"query_string":data_string},
                }).done(function(data){
                    var data_pool = JSON.parse(data);
                    var files = data_pool["files"];
                    var upper = 6
                    if(files.length<upper){
                        upper = files.length;
                    }
                    $("#hover_menu p").each(function(){
                        $(this).remove();
                    });
                    if (upper==0)
                    {
                    $("#hover_menu").append("<p>No Results</p>");
                    }
                    else{
                    for (i=0;i<upper ;i++){
                        $("#hover_menu").append("<p class='items_file' id=\""+files[i]+"\">"+getName(files[i])+"</p>");
                    }
                    }
                updateHandlers();
                });

}

updateHandlers();
});
