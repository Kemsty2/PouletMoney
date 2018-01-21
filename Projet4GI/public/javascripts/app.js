$(document).foundation();
$(function (){
    $(".sticky").sticky({
        topSpacing: 10,
        zIndex: 60,
        stopper: "#footer"
    });
});

$(document).ready(function() {
    $('.mdb-select').material_select();
});


