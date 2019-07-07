var API = 'https://demo-spt.smartcircle.net/wom/api.php';
var data = {
    device1scid: '',
    device11: '',
    device12: '',
    device13: '',
    device14: '',
    device15: '',
    device16: '',
    device17: '',
    device18: '',
    device19: '',
    device110: '',
    device111: '',
    device112: '',
    device113: '',
    device114: '',
    device115: '',
    device116: '',
    device117: '',
    device118: '',
    device119: '',
    device120: '',
    device121: '',
    device122: '',
    device123: '',
    device124: '',
    device125: '',
    device126: '',
    device127: '',
    device128: '',
    device129: '',
    device2scid: '',
    device21: '',
    device22: '',
    device23: '',
    device24: '',
    device25: '',
    device26: '',
    device27: '',
    device28: '',
    device29: '',
    device210: '',
    device211: '',
    device212: '',
    device213: '',
    device214: '',
    device215: '',
    device216: '',
    device217: '',
    device218: '',
    device219: '',
    device220: '',
    device221: '',
    device222: '',
    device223: '',
    device224: '',
    device225: '',
    device226: '',
    device227: '',
    device228: '',
    device229: '',
    device3scid: '',
    device31: '',
    device32: '',
    device33: '',
    device34: '',
    device35: '',
    device36: '',
    device37: '',
    device38: '',
    device39: '',
    device310: '',
    device311: '',
    device312: '',
    device313: '',
    device314: '',
    device315: '',
    device316: '',
    device317: '',
    device318: '',
    device319: '',
    device320: '',
    device321: '',
    device322: '',
    device323: '',
    device324: '',
    device325: '',
    device326: '',
    device327: '',
    device328: '',
    device329: '',
    device4scid: '',
    device41: '',
    device42: '',
    device43: '',
    device44: '',
    device45: '',
    device46: '',
    device47: '',
    device48: '',
    device49: '',
    device410: '',
    device411: '',
    device412: '',
    device413: '',
    device414: '',
    device415: '',
    device416: '',
    device417: '',
    device418: '',
    device419: '',
    device420: '',
    device421: '',
    device422: '',
    device423: '',
    device424: '',
    device425: '',
    device426: '',
    device427: '',
    device428: '',
    device429: '',
    device5scid: '',
    device51: '',
    device52: '',
    device53: '',
    device54: '',
    device55: '',
    device56: '',
    device57: '',
    device58: '',
    device59: '',
    device510: '',
    device511: '',
    device512: '',
    device513: '',
    device514: '',
    device515: '',
    device516: '',
    device517: '',
    device518: '',
    device519: '',
    device520: '',
    device521: '',
    device522: '',
    device523: '',
    device524: '',
    device525: '',
    device526: '',
    device527: '',
    device528: '',
    device529: ''	
};
var modelsArray = [];
var supportedStorage = true;
var locationkey = 'RTFC13-SR1111';
var lang = 0;
var availableImgaes = ['CAMARA.PNG', 'PANTALLA.PNG', 'MEMORIA_EXTERNA.PNG', 'MEMORIA_INTERNA.PNG'];
var availableVideos = ['SCREEN_SAVER1.MP4'];

if(typeof(Storage) !== "undefined") {
    supportedStorage = true;
}
else {
    supportedStorage = true;
}

function getParameterByName(name) {

    if (window.location.hash){
        var hashes = window.location.hash.slice(window.location.hash.indexOf('#') + 1).split('&');

        for(var i = 0; i < hashes.length; i++) {
            var hash = hashes[i].split('=');

            if(hash.length > 1) {

                if (hash[0] == name){
                    return hash[1];
                }

            }
        }
    }
    else {

        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);

        return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}
function insertPricetags(models){
    modelsArray = models.split("|");
    while (modelsArray.length > 5){
        modelsArray.pop();
    }
    loadDataFromRepository();
    loadDataFromAPI();
}

//setTimeout(function () { insertPricetags("HTC One"); }, 200);
//setTimeout(function () {insertPricetags("moto g(6)|HTC One"); }, 200);
//setTimeout(function () { insertPricetags("HTC One|iPhone11,2|moto g(6)"); }, 200);
setTimeout(function () { insertPricetags("moto g(6)|HTC One|D6603|Aquaris U Plus"); }, 200);
//setTimeout(function(){insertPricetags("HTC One|moto g(6)|iPhone11,2|Aquaris U Plus|MAR-LX3A"); }, 200);
function updateHtml(){
    $.each(data, function(key, val) {
        
        var initial_key = key.substr(7);
        var initial_key_device = key.substr(6);
        
        
        if (initial_key == '16' || initial_key == '18' ||
            initial_key == '20' || initial_key == '22'){
            
            if (val !== '' && val !== null){
                if (availableImgaes.indexOf(convertToUpperPng(val)) != -1){
                    $("[img-id='device" + initial_key_device + "']").attr('src','img/'+convertToUpperPng(val));
                }
            }
        }
        
        if (initial_key == '7' || initial_key == '8' || initial_key == '9'){
            if (val !== null){
                if (val.length == 4) {
                    val = val.substring(0,1)+"."+val.substring(1);
                }
                else if (val.length == 5) {
                    val = val.substring(0,2)+"."+val.substring(2);
                }
                else if (val.length == 6) {
                    val = val.substring(0,3)+"."+val.substring(3);
                }
            }
        }
        
        $("[data-id='" + key + "']").html(val);
        
        if (val === null || val === ""){
            $("[data-id='" + key + "wrapper']").addClass('disabled');
        }
        else{
            $("[data-id='" + key + "wrapper']").removeClass('disabled');
        }
        
    });
}
function loadDataFromRepository(){
    
    if (modelsArray.length == 1) {
        
        $("#two_models_view").addClass('disabled');
        $("#three_models_view").addClass('disabled');		
		$("#four_models_view").addClass('disabled');	
		$("#five_models_view").addClass('disabled');
        $("#one_model_view").removeClass('disabled');
        loadDataDevice1();
        resetDataDevice("device2");
        resetDataDevice("device3");
        resetDataDevice("device4");
		resetDataDevice("device5");
    }
    if (modelsArray.length == 2) {
        
        $("#one_model_view").addClass('disabled');
        $("#three_models_view").addClass('disabled');
		$("#four_models_view").addClass('disabled');
		$("#five_models_view").addClass('disabled');
        $("#two_models_view").removeClass('disabled');
        
        loadDataDevice1();
        loadDataDevice2();
        resetDataDevice("device3");
        resetDataDevice("device4");
		resetDataDevice("device5");
    }
    if (modelsArray.length == 3) {
        
        $("#one_model_view").addClass('disabled');
        $("#two_models_view").addClass('disabled');
		$("#four_models_view").addClass('disabled');
		$("#five_models_view").addClass('disabled');
        $("#three_models_view").removeClass('disabled');
        
        loadDataDevice1();
        loadDataDevice2();
        loadDataDevice3();
        resetDataDevice("device4");
		resetDataDevice("device5");
    }
    if (modelsArray.length == 4) {
        
        $("#one_model_view").addClass('disabled');
        $("#two_models_view").addClass('disabled');
        $("#three_models_view").addClass('disabled');
        $("#five_models_view").addClass('disabled');
        $("#four_models_view").removeClass('disabled');
        
        loadDataDevice1();
        loadDataDevice2();
        loadDataDevice3();
        loadDataDevice4();
		resetDataDevice("device5");
    }
    if (modelsArray.length == 5) {
        
        $("#one_model_view").addClass('disabled');
        $("#two_models_view").addClass('disabled');
        $("#three_models_view").addClass('disabled');
		$("#four_models_view").addClass('disabled');
        $("#five_models_view").removeClass('disabled');
        
        loadDataDevice1();
        loadDataDevice2();
        loadDataDevice3();
        loadDataDevice4();
		loadDataDevice5();
    }	
    updateHtml();
}

function loadDataToRepository(response){
    if (typeof response != 'undefined' && response !== null) {
        var current_scid = response.fldscid;
        $.each(response, function (key, val) {
            // If localStorage supported
            if (supportedStorage && localStorage !== null) {

                // Set all data variables in localStorage
                localStorage.setItem('device' + current_scid + key.substr(3), val);
            }
            else {
                // If os is Android
                if (typeof Android != 'undefined') {
                    // Set all data variables in Android storage
                    Android.write('device' + current_scid + key.substr(3), val);
                }
            }
        
        });
        return data;
    }
    return false;
}
function loadDataFromAPI(){
    var now = new Date();
    for (var i = 0; i < modelsArray.length; i++) {
        
        var jsonObjects = {model: modelsArray[i], locationkey: locationkey, lang: lang, time: now.getTime()};
        
        $.ajax({
            crossDomain: true,
            url: API,
            type: 'GET',
            dataType: "json",
            cache: false,
            data: jsonObjects,
            success: function (response) {
                if (loadDataToRepository(response)) loadDataFromRepository();
            },
            error: function (error) {
            }
        });
    }
}

function loadDataDevice1(){
    $.each(data, function(key, val) {
        var key_base = key.substr(0,7);
        if (key_base == "device1"){
            var search_base = "device"+modelsArray[0];
            var initial_key = key.substr(7);
            if(supportedStorage && localStorage !== null){
                if (localStorage.getItem(search_base+initial_key) !== null && localStorage.getItem(search_base+initial_key) !== "null"){
                    self.data[key] = localStorage.getItem(search_base+initial_key);
                }
            }
            else {
                if (typeof Android != 'undefined'){
                    if (Android.read(search_base+initial_key) !== null && Android.read(search_base+initial_key) !== "null") {
                        self.data[key] = Android.read(search_base+initial_key);
                    }
                }
            }
        }
    });
}
function loadDataDevice2(){
    $.each(data, function(key, val) {
        var key_base = key.substr(0,7);
        var search_base = "device"+modelsArray[1];
        if (key_base == "device2"){
            
            var initial_key = key.substr(7);
            
            if(supportedStorage && localStorage !== null){
                
                if (localStorage.getItem(search_base+initial_key) !== null && localStorage.getItem(search_base+initial_key) !== "null"){
                    self.data[key] = localStorage.getItem(search_base+initial_key);
                }
            }
            else {
                if (typeof Android != 'undefined'){
                    if (Android.read(search_base+initial_key) !== null && Android.read(search_base+initial_key) !== "null") {
                        self.data[key] = Android.read(search_base+initial_key);
                    }
                }
            }
        }
    });
}
function loadDataDevice3(){
    $.each(data, function(key, val) {
        var key_base = key.substr(0,7);
        var search_base = "device"+modelsArray[2];
        if (key_base == "device3"){
            var initial_key = key.substr(7);
            if(supportedStorage && localStorage !== null){
                if (localStorage.getItem(search_base+initial_key) !== null && localStorage.getItem(search_base+initial_key) !== "null"){
                    data[key] = localStorage.getItem(search_base+initial_key);
                }
            }
            else {
                if (typeof Android != 'undefined'){
                    if (Android.read(search_base+initial_key) !== null && Android.read(search_base+initial_key) !== "null") {
                        self.data[key] = Android.read(search_base+initial_key);
                    }
                }
            }
        }
    });
}
function loadDataDevice4(){
    $.each(data, function(key, val) {
        var key_base = key.substr(0,7);
        var search_base = "device"+modelsArray[3];
        if (key_base == "device4"){
            var initial_key = key.substr(7);
            if(supportedStorage && localStorage !== null){
                if (localStorage.getItem(search_base+initial_key) !== null && localStorage.getItem(search_base+initial_key) !== "null"){
                    data[key] = localStorage.getItem(search_base+initial_key);
                }
            }
            else {
                if (typeof Android != 'undefined'){
                    if (Android.read(search_base+initial_key) !== null && Android.read(search_base+initial_key) !== "null") {
                        self.data[key] = Android.read(search_base+initial_key);
                    }
                }
            }
        }
    });
}
function loadDataDevice5(){
    $.each(data, function(key, val) {
        var key_base = key.substr(0,7);
        var search_base = "device"+modelsArray[4];
        if (key_base == "device5"){
            var initial_key = key.substr(7);
            if(supportedStorage && localStorage !== null){
                if (localStorage.getItem(search_base+initial_key) !== null && localStorage.getItem(search_base+initial_key) !== "null"){
                    data[key] = localStorage.getItem(search_base+initial_key);
                }
            }
            else {
                if (typeof Android != 'undefined'){
                    if (Android.read(search_base+initial_key) !== null && Android.read(search_base+initial_key) !== "null") {
                        self.data[key] = Android.read(search_base+initial_key);
                    }
                }
            }
        }
    });
}
function resetDataDevice(deviceid){
    $.each(data, function(key, val) {
        var key_base = key.substr(0,7);
        if (key_base == deviceid){
            data[key] = "";
        }
    });
}

function convertToUpperPng(val){
    val = val.toUpperCase();
    if (val.indexOf('.PNG') != -1){
        val = val.substring(0, val.indexOf('.PNG'));
    }
    if (val.indexOf('.SVG') != -1){
        val = val.substring(0, val.indexOf('.SVG'));
    }
    val = val + ".PNG";
    return val;
}
function convertToUpperMP4(val){
    val = val.toUpperCase();
    if (val.indexOf('.MP4') != -1){
        val = val.substring(0, val.indexOf('.MP4'));
    }
    val = val + ".MP4";
    return val;
}
