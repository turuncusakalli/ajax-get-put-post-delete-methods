// GET DATA FROM URL
var myData;

$.ajax({
    url: "https://heraklet.fnaghshin.com/marketlist/",
    type: 'GET',
    async: false,
    success: function (data) {
        myData = data;
    }
});



// ADD DATA TITLES TO MENU
$("#addShopButton").after($("<div class='heyyo'></div>"));

function appendAfterElement(data) {
    let h1 = $("<h1></h1>").text(data.title);
    h1.addClass("h1Click");
    let buttonEdit = $("<button></button>").text("Edit Me");
    buttonEdit.addClass("elementEdit");
    let buttonDelete = $("<button></button>").text("Delete Me");
    buttonDelete.addClass("elementDelete");
    let horow = $("<hr></hr>");
    $(".heyyo").append(horow, h1, buttonEdit, buttonDelete);
}

for (let i = 0; i < Object.keys(myData).length; i++) {
    appendAfterElement(myData[i]);
}


// SET DEFAULT LOCATION 
$(document).ready(function () {
    initMap({ title: "Heraklet", latitude: "40.99354558589812", longitude: "28.82569730227881" })
});



// TAKE LOCATION OF GIVEN DATA 
function initMap(data) {
    let myLatLng = { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) };
    let map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 15,
        center: myLatLng,
    });
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: data.title,
    });
}

function takeAction(text) {
    for (let i = 0; i < Object.keys(myData).length; i++) {
        if (myData[i].title == text) {
            initMap(myData[i])
        }
    }
}


// AFTER CLICK THE TITLE, SEND DATA AND SHOW & HIDE BUTTONS
$(".h1Click").click(function () {
    let text = jQuery(this).text();
    $(".elementEdit").hide();
    $(".elementDelete").hide();
    let next1 = jQuery(this).next();
    let next2 = jQuery(this).next().next();
    next1.show();
    next2.show();
    takeAction(text);
});



// WHEN CLICK TO ADD SHOP BOTTON, GO TO THAT PAGE
$("#addShopButton").click(function () {
    window.location.href = "newshop.html";
})


// CREATE VARIABLES FOR FORM
var $stitle = $(".stitle");
var $slatitude = $(".slatitude");
var $slongitude = $(".slongitude");


// ADD NEW LOCATION
$(".button1").click(function (e) {
    e.preventDefault();

    var sstitle = String($("input[class=stitle]").val());
    var sslatitude = String($("input[class=slatitude]").val());
    var sslongitude = String($("input[class=slongitude]").val());
    let postData = {"title": sstitle, "lat": sslatitude, "long": sslongitude };
    $.ajax({
        url: "https://heraklet.fnaghshin.com/addmarket",
        type: 'POST',
        data: JSON.stringify(postData),
        success: function (data) {
            console.log('POST has performed.');
            console.log(data);
        }
    });
    window.location.href = "index.html";
});



$(".elementEdit").click(function (e) {
    e.preventDefault();

    let text = jQuery(this).prev().text();
    for (let i in myData) {
        if (myData[i].title == text) {
            sessionStorage.setItem("current", myData[i].id);
        };
    };
    window.location.href = "editMe.html";
});



var $ctitle = $(".ctitle");
var $clatitude = $(".clatitude");
var $clongitude = $(".clongitude");

// EDIT CURRENT LOCATION
$(".button2").click(function (e) {
    e.preventDefault();
    let cctitle = String($("input[class=ctitle]").val());
    let cclatitude = String($("input[class=clatitude]").val());
    let cclongitude = String($("input[class=clongitude]").val());

    console.log(sessionStorage.getItem("current"));

    let putData = {
        "marketid": sessionStorage.getItem("current"), "title": cctitle,
        "latitude": cclatitude, "longitude": cclongitude
    };
    $.ajax({
        url: 'https://heraklet.fnaghshin.com/updatemarket',
        type: 'PUT',
        data: JSON.stringify(putData),
        success: function (data) {
            console.log('PUT has performed.');
            console.log(data);
        }
    });
    window.location.href = "index.html";
});


// DELETE CURRENT LOCATION
$(".elementDelete").click(function (e) {
    e.preventDefault();
    let text = jQuery(this).prev().prev().text();
    let deleteData;
    for (let i in myData) {
        if (myData[i].title == text) {
            deleteData = myData[i].id;
        };
    };
    deleteData={marketid:deleteData};
    $.ajax({
        url: 'https://heraklet.fnaghshin.com/deletemarket',
        type: 'DELETE',
        data: JSON.stringify(deleteData),
        success: function (data) {
            console.log('DELETE has performed.');
            console.log(data);
        }
    });
    window.location.href = "index.html";
});
