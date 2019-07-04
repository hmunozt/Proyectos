
var $SC = {

    // Page variable
    page : '', // Get current page by body element id attribute

    // Config variables
    config: {
        showTrace: false, // Set to false to hide functions tracing in the console log
        supportedStorage: false,
        updateTimer: 600000, // Update content every 5 minutes
        swiperTimerIdle: 15000, // Swipe slides every 5 seconds
        swiperTimer: 5000, // Swipe slides every 5 seconds
        API: 'https://demo-spt.smartcircle.net/wom/api.php', // Change this to: "http://demo-spt.smartcircle.net/wom/api.php"
        testing_locations: ['RXPH98-ZL2213', 'XZYL43-HM6568']
    },

    // Data variables - variables that can be changed - add more if needed
    data: {
        devicescid: '',
        device1: '',
        device2: '',
        device3: '',
        device4: '',
        device5: '',
        device6: '',
        device7: '',
        device8: '',
        device9: '',
        device10: '',
        device11: '',
        device12: '',
        device13: '',
        device14: '',
        device15: '',
        device16: '',
        device17: '',
        device18: '',
        device19: '',
        device20: '',
        device21: '',
        device22: '',
        device23: '',
        device24: '',
        device25: '',
        device26: '',
        device27: '',
        device28: '',
        device29: ''
    },

    // Constant variables
    model: '',
    locationkey: '',
    lang:0,
    swiperObject: null,
    updateObject: 0,
    availableImgaes:['CAMARA.PNG', 'PANTALLA.PNG', 'MEMORIA_EXTERNA.PNG', 'MEMORIA_INTERNA.PNG'],
    
    

    // Init SC project function
    init: function() {
        $SC.trace('Init $SC project');

        var self = $SC;

        // Set page variable
        self.page = $('body').attr('id');

        // Trace page variable
        $SC.trace('page: ' + self.page);

        // Set data variables default values
        self.model = self.getParameterByName('_model');
        self.locationkey = self.getParameterByName('_locationkey');
        self.lang = self.getParameterByName('_lang');

        if (self.model === null || self.model === ''){
            self.model = 'iPhone11,6';
        }

        if (self.locationkey === null || self.locationkey === ''){
            self.locationkey = 'LDTJ63-KZ8913';
        }
        self.lang = 0;
        
        // Trace constant variables
        $SC.trace('model: ' + self.model);
        $SC.trace('locationkey: ' + self.locationkey);

        // Set storage config variables
        if(typeof(Storage) !== "undefined") {
            self.config.supportedStorage = true;
        }
        else {
            self.config.supportedStorage = false;
        }

        // Trace config variables
        $SC.trace('showTrace: ' + self.config.showTrace);
        $SC.trace('supportedStorage:' + self.config.supportedStorage);

        $SC.trace('Data object: ');
        $SC.trace(self.data, true);

        // Allow cross-domain XHR requests
        $.support.cors = true;

        // Set default data from repository
        self.setDataFromRepository();

        // Update content from ajax call every #SC.config.updateTimer seconds
        self.updateContent.start();

        // Start or stop swiper on window blur or focus
        //self.swiperStartOrStop();

    },

    // Get data parameter by name function
    getParameterByName: function(name) {
        $SC.trace('Init $SC.getParameterByName function for: ' + name);

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

            return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    },

    // Update HTML function
    updateHTML: function() {
        $SC.trace('Init $SC.updateHTML function');

        var self = $SC;

        if ($SC.isEmptyObject(self.data)) return;

        // If page is "lifted" or "touch" init or reset swiper
        if (self.page == 'lifted' || self.page == 'touch'|| self.page == 'idle') {

            // If swiper exists
            if (self.swiperObject) {
                $SC.trace('Swiper RESET');

                // Destroy current swiper
                //self.swiper.destroy();

                // Set new html data
                self.setProjectDataValues();

                // Init new swiper
                //$SC.swiper.init();
            }

            // If swiper does NOT exists
            else {
                $SC.trace('Swiper INIT');

                // Set new html data
                self.setProjectDataValues();

                // Init swiper
                $SC.swiper.init();
            }

            $SC.trace('Swiper slides object: ');
            $SC.trace(self.swiperObject.slides, true);
        }

        // If page is "idle"
        if (self.page == 'idle') {
            
            // Set new html data
            //self.setProjectDataValues();

        }

    },

    // Set project data values
    setProjectDataValues: function() {
        $SC.trace('Init $SC.setProjectDataValues function');

        var self = $SC;
        var last_value = '';
        
        
        // Set new html data
        $.each(self.data, function(key, val) {

            var initial_key = key.substr(6);
            
            // Fill the accessibillity array with available images
            if (key == 'device12' || key == 'device14' || key == 'device16' || key == 'device18' ||
                key == 'device20' || key == 'device22' || key == 'device24' || key == 'device26'){
                
                if (val !== '' && val !== null){
                    if (self.availableImgaes.indexOf(self.convertToUpperPng(val)) != -1){
                        $("[img-id='fld" + initial_key + "']").attr('src','img/'+self.convertToUpperPng(val));
                    }
                } 
                
            }
            
            if (key == 'device7' || key == 'device8' || key == 'device9'){
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
                    else if (val.length == 7) {
                        val = val.substring(0,1)+"."+val.substring(1,4)+"."+val.substring(4);
                    }
                }
            }
            
            if (val && val != '0' && val != '0.00' && val != '0,00') {
                // Set value

                $("[data-id='fld" + initial_key + "']").html(val);
                $("[data-id='fld" + initial_key + "wrapper']").removeClass('disabled');
            }
            // If value is not set
            else {
                $("[data-id='fld" + initial_key + "']").html('');
                $("[data-id='fld" + initial_key + "wrapper']").addClass('disabled');
            }
            last_value = val;
        });
        
        
    },

    // Set storage data
    setDataFromRepository: function() {
        $SC.trace('Init $SC.setDataFromRepository function');

        var self = $SC;

        // If localStorage supported
        if(self.config.supportedStorage && localStorage !== null){

            // Set all data variables from localStorage
            $.each(self.data, function(key, val) {

                self.data[key] = localStorage.getItem(key);
            });
        }

        // If device OS is Android
        else {
            if (typeof Android != 'undefined'){

                // Set all data variables from Android storage
                $.each(self.data, function(key, val) {

                    // Check if value exist and is not empty in Android storage
                    if (Android.read(key) !== null && Android.read(key) !== '') {

                        self.data[key] = Android.read(key);
                    }
                });
            }
        }
        //if no model set it so the swiper can start
        if (!self.data['devicescid'] )self.data['devicescid'] = self.model;
        // Update current html with new data
        self.updateHTML();
    },

    // Set data from response
    setDataFromResponse: function(response) {
        $SC.trace('Init $SC.setDataFromResponse function');

        var self = $SC;

        // If response is NOT empty
        if (typeof response != 'undefined' && response !== null) {

            // Set repository and html data
            $.each(response, function (key, val) {
                
                // If localStorage supported
                if (self.config.supportedStorage && localStorage !== null) {

                    // Set all data variables in localStorage
                    localStorage.setItem('device' + key.substr(3), val);
                }
                else {
                    // If os is Android
                    if (typeof Android != 'undefined') {
                        // Set all data variables in Android storage
                        Android.write('device' + key.substr(3), val);
                    }
                }

                // Set data in js object
                self.data['device' + key.substr(3)] = val;
            });

            // Return data
            return self.data;
        }

        // Return false if response is empty
        return false;
    },

    // Update content via ajax request
    updateContent: {
        updater: 'undefined',
        updateTimer: 0,
        init: function() {
            $SC.trace('Init $SC.updateContent.init function');

            var self = $SC;

            // Set current date
            var now = new Date();

            // Set request data
            var jsonObjects = {model: self.model, locationkey: self.locationkey, lang: self.lang, time: now.getTime()};

            $.ajax({
                crossDomain: true,
                url: $SC.config.API,
                type: 'GET',
                dataType: "json",
                cache: false,
                data: jsonObjects,
                success: function (response) {
                    $SC.trace('Ajax success!!!');

                    $SC.trace(response, true);

                    // Update repository if response from ajax
                    if (self.setDataFromResponse(response)) self.updateHTML();
                },
                error: function (error) {
                    //call it sso swiper can start if no connection or call fails
                    self.updateHTML();
                    $SC.trace('Ajax call error: ' + error);
                }
            });
        },
        start: function() {
            $SC.trace('Init $SC.updateContent.start function');

            var self = $SC.updateContent;

            self.updateTimer = $SC.config.updateTimer;

            self.init();

            self.updater = setInterval(self.init, self.updateTimer);

        },
        stop: function() {
            $SC.trace('Init $SC.updateContent.stop function');

            var self = $SC.updateContent;

            if (self.updater) clearInterval(self.updater);
        }
    },

    // Swiper object - documentation from http://www.idangero.us/swiper/api/
    swiper: {
        // Init swiper function
        init: function() {
            $SC.trace('Init $SC.swiper.init function');
            
            var self = $SC;
            
            
            // Create swiper object
            if (self.page == 'idle') {
                self.swiperObject = new Swiper('.swiper-container', {
                    loop: true,
                    loopedSlides: 0,
                    autoplay: self.config.swiperTimer, // time for slide to swipe
                    autoplayDisableOnInteraction: false,
                    keyboardControl: true,
                    loopAdditionalSlides: 0,
                    speed:2000,
                    effect:'cube',
                    cube: {
                        slideShadows: false,
                        shadow: false
                      }
                });
            }
            else{
                self.swiperObject = new Swiper('.swiper-container', {
                    loop: true,
                    loopedSlides: 0,
                    autoplay: self.config.swiperTimer, // time for slide to swipe
                    autoplayDisableOnInteraction: false,
                    keyboardControl: true,
                    loopAdditionalSlides: 0
                });
            }
            
        },
        destroy: function() {
            $SC.trace('Init $SC.swiper.destroy function');

            var self = $SC;

            // Destroy swiper object
            self.swiperObject.destroy(true,true);
            self.swiperObject = null;

            // Remove all styles
            $('.swiper-wrapper').removeAttr('style');
            $('.swiper-slide').removeAttr('style');

            // Remove slide duplicates
            $('.swiper-slide-duplicate').remove();
        },
        stop: function() {
            $SC.trace('Init $SC.swiper.stop function');

            var self = $SC;

            // Set the swiper to 1st slide
            self.swiperObject.slideTo(1, 10, false);

            // Stop swiper autoplay
            self.swiperObject.stopAutoplay();

        },
        start: function() {
            $SC.trace('Init $SC.swiper.start function');

            var self = $SC;

            // Stop swiper autoplay
            self.swiperObject.startAutoplay();
        }
    },

    // Start or stop swiper
    swiperStartOrStop: function() {
        $SC.trace('Init $SC.swiperStartOrStop function');

        var self = $SC;

        // On window focus and blur
        $(window).focus(function() {
            $SC.trace('Init $(window).focus() function');

            // Start updating content
            self.updateContent.start();

        }).blur(function() {
            $SC.trace('Init $(window).blur() function');

            // If swiper
            if (self.swiperObject) {

                // Stop updating content
                self.updateContent.stop();

                // Stop swiper
                //self.swiper.stop();
            }

            else {

                // Stop updater
                self.updateContent.stop();
            }

        });
    },

    // Trace actions function
    trace: function (message, hide_time) {
        var hide_time = hide_time || false;

        var today = new Date();

        // get hours, minutes and seconds
        var hh = today.getHours().toString();
        var mm = today.getMinutes().toString();
        var ss = today.getSeconds().toString();
        var ms = today.getMilliseconds().toString();

        // Add leading '0' to see 14:08:06.001 instead of 14:8:6.1
        hh = hh.length == 1 ? "0" + hh : hh;
        mm = mm.length == 1 ? "0" + mm : mm;
        ss = ss.length == 1 ? "0" + ss : ss;
        ms = ms.length == 1 ? "00" + ms : ms.length == 2 ? "0" + ms : ms;

        // set time
        var time = "UTC " + hh + ':' + mm + ':' + ss + '.' + ms;

        if ($SC.config.showTrace) {
            if (hide_time)
                console.log(message);
            else
                console.log(time + ' - ' + message);
        }
    },

    // Check if object properties are empty
    isEmptyObject: function(object) {
        $SC.trace('Init $SC.isEmptyObject function');

        if ($.isEmptyObject(object)) return true;

        var tester = true;

        $.each(object, function(key, val) {
            if(val) tester = false;
        });

        return tester;
    },
    
    
    convertToUpperPng: function(val){
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

}

// load project functions after document DOM is ready
$(document).ready(function() {

    // Init project
    $SC.init();
});


//reinit swiper on resize
var resizeTimer;
window.onresize = function(){
    if (resizeTimer){
        clearTimeout(resizeTimer);
    } 
    resizeTimer = setTimeout(function(){
        $SC.updateHTML(); 
    }, 100);
};