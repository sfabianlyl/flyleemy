var modal_showing=false;
var modal_hiding=false;

$(document).on("hide.bs.modal", function(){modal_hiding=true;});
$(document).on("hidden.bs.modal", function(){modal_hiding=false;});
$(document).on("show.bs.modal", function(){modal_showing=true;});
$(document).on("shown.bs.modal", function(){modal_showing=false;});

function showModal(modal){
    if(modal_hiding){
        $(document).one("hidden.bs.modal", function(){showModal(modal);});
    }else if (modal_showing){
        $(document).one("shown.bs.modal", function(){showModal(modal);});
    }else{
        $(modal).modal({backdrop:'static',keyboard:false});
    }
}

function hideModal(modal){
    if(modal_hiding){
        $(document).one("hidden.bs.modal", function(){hideModal(modal);});
    }else if (modal_showing){
        $(document).one("shown.bs.modal", function(){hideModal(modal);});
    }else{
        $(modal).modal("hide");
    }
}

function showFixed(message){
    $("#fixedBody").html(message);
    showModal("#fixedModal");
}

function hideFixed(){
    hideModal("#fixedModal");
}

function showMessage(title,message){
    $("#messageTitle").html(title);
    $("#messageBody").html(message);
    showModal("#messageModal");
}

function hideMessage(){
    hideModal("#messageModal");
}

function showLoader(){
    $("#fixedBody").html("");
    $("#fixedBody").append($("<div></div>").addClass("loading-container").append($("<div></div>").addClass("loading-img").append($("<div></div>"))));
    showModal("#fixedModal");
}

function hideLoader(){
    hideFixed();
}


$(document).ready(function(){
    $("#messageModal").on("hidden.bs.modal", function(){
        $("#messageBody").html("");
        $("#messageTitle").html("");
    });
    $("#fixedModal").on("hidden.bs.modal",function(){
        $("#fixedBody").html("");
    });
});