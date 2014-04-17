// JQM configs
$(document).bind("mobileinit", function(){
    $.mobile.ajaxEnabled = false;
    $.mobile.buttonMarkup.hoverDelay = 10;
    $.mobile.defaultPageTransition = 'none';
    $.mobile.touchOverflowEnabled = true;
    $.mobile.hashListeningEnabled = false;
    $.mobile.ajaxLinksEnabled = false;
});

var api_urls = {
    dev : 'https://api-dev.meetin.gs',
    beta : 'https://api-beta.meetin.gs',
    live : 'https://api.meetin.gs'
};

var desktop_links = {
    dev : 'https://dev.meetin.gs/meetings_global/detect',
    beta : 'https://beta.meetin.gs/meetings_global/detect',
    live : 'https://meetin.gs/meetings_global/detect'
};

var mobile_redirect_urls = {
    dev : 'https://mobiledev.meetin.gs',
    beta : 'https://mobilebeta.meetin.gs',
    live : 'https://mobile.meetin.gs'
};

var version_check_urls = {
    dev : 'http://versions.meetin.gs/'+window.build_mode+'/current-dev.json',
    beta : 'http://versions.meetin.gs/'+window.build_mode+'/current-beta.json',
    live : 'http://versions.meetin.gs/'+window.build_mode+'/current.json'
};

var app_mode = (function(){
    var mode;
    if(window.build_mode !== 'web' ) mode = 'live';
    else if(window.location.href.indexOf('mdev') !== -1) mode = 'dev';
    else if(window.location.href.indexOf('localhost') !== -1) mode = 'dev';
    else if(window.location.href.indexOf('mbeta') !== -1) mode = 'beta';
    else mode = 'live';
    return mode;
})();


window.app = {
    timezones: {"data":{"America/Bogota":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Bogota ( America )","name":"America/Bogota"},"America/Whitehorse":{"offset_string":"UTC-8","offset_value":-28800,"changed_offset_string":"UTC-7","readable_name":"-8:00 Whitehorse ( America )","changed_offset_value":-25200,"name":"America/Whitehorse","dst_change_epoch":1394360305,"changed_readable_name":"-7:00 Whitehorse ( America )"},"Africa/Kinshasa":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Kinshasa ( Africa )","name":"Africa/Kinshasa"},"America/Mazatlan":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Mazatlan ( America )","changed_offset_value":-21600,"name":"America/Mazatlan","dst_change_epoch":1396775117,"changed_readable_name":"-6:00 Mazatlan ( America )"},"Antarctica/Palmer":{"offset_string":"UTC-3","offset_value":-10800,"changed_offset_string":"UTC-4","readable_name":"-3:00 Palmer ( Antarctica )","changed_offset_value":-14400,"name":"Antarctica/Palmer","dst_change_epoch":1394335625,"changed_readable_name":"-4:00 Palmer ( Antarctica )"},"America/Indiana/Vincennes":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Vincennes ( America/Indiana )","changed_offset_value":-14400,"name":"America/Indiana/Vincennes","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Vincennes ( America/Indiana )"},"Africa/Conakry":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Conakry ( Africa )","name":"Africa/Conakry"},"Asia/Manila":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Manila ( Asia )","name":"Asia/Manila"},"America/Nassau":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Nassau ( America )","changed_offset_value":-14400,"name":"America/Nassau","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Nassau ( America )"},"Asia/Dhaka":{"offset_string":"UTC+6","offset_value":21600,"readable_name":"+6:00 Dhaka ( Asia )","name":"Asia/Dhaka"},"Europe/Belgrade":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Belgrade ( Europe )","changed_offset_value":7200,"name":"Europe/Belgrade","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Belgrade ( Europe )"},"America/Los_Angeles":{"offset_string":"UTC-8","offset_value":-28800,"changed_offset_string":"UTC-7","readable_name":"-8:00 Los Angeles ( America )","changed_offset_value":-25200,"name":"America/Los_Angeles","dst_change_epoch":1394360305,"changed_readable_name":"-7:00 Los Angeles ( America )"},"Asia/Aqtau":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Aqtau ( Asia )","name":"Asia/Aqtau"},"Asia/Dushanbe":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Dushanbe ( Asia )","name":"Asia/Dushanbe"},"Africa/Bujumbura":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Bujumbura ( Africa )","name":"Africa/Bujumbura"},"Europe/Vaduz":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Vaduz ( Europe )","changed_offset_value":7200,"name":"Europe/Vaduz","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Vaduz ( Europe )"},"Asia/Baghdad":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Baghdad ( Asia )","name":"Asia/Baghdad"},"America/Juneau":{"offset_string":"UTC-9","offset_value":-32400,"changed_offset_string":"UTC-8","readable_name":"-9:00 Juneau ( America )","changed_offset_value":-28800,"name":"America/Juneau","dst_change_epoch":1394364102,"changed_readable_name":"-8:00 Juneau ( America )"},"Asia/Beirut":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Beirut ( Asia )","changed_offset_value":10800,"name":"Asia/Beirut","dst_change_epoch":1396131547,"changed_readable_name":"+3:00 Beirut ( Asia )"},"America/St_Kitts":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 St Kitts ( America )","name":"America/St_Kitts"},"America/Inuvik":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Inuvik ( America )","changed_offset_value":-21600,"name":"America/Inuvik","dst_change_epoch":1394356508,"changed_readable_name":"-6:00 Inuvik ( America )"},"Africa/Nairobi":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Nairobi ( Africa )","name":"Africa/Nairobi"},"Asia/Pyongyang":{"offset_string":"UTC+9","offset_value":32400,"readable_name":"+9:00 Pyongyang ( Asia )","name":"Asia/Pyongyang"},"Pacific/Norfolk":{"offset_string":"UTC+11:30","offset_value":41400,"readable_name":"+11:30 Norfolk ( Pacific )","name":"Pacific/Norfolk"},"America/St_Johns":{"offset_string":"UTC-3:30","offset_value":-12600,"changed_offset_string":"UTC-2:30","readable_name":"-3:30 St Johns ( America )","changed_offset_value":-9000,"name":"America/St_Johns","dst_change_epoch":1394337524,"changed_readable_name":"-2:30 St Johns ( America )"},"Pacific/Guam":{"offset_string":"UTC+10","offset_value":36000,"readable_name":"+10:00 Guam ( Pacific )","name":"Pacific/Guam"},"Australia/Currie":{"offset_string":"UTC+11","offset_value":39600,"changed_offset_string":"UTC+10","readable_name":"+11:00 Currie ( Australia )","changed_offset_value":36000,"name":"Australia/Currie","dst_change_epoch":1396714368,"changed_readable_name":"+10:00 Currie ( Australia )"},"America/Hermosillo":{"offset_string":"UTC-7","offset_value":-25200,"readable_name":"-7:00 Hermosillo ( America )","name":"America/Hermosillo"},"Asia/Muscat":{"offset_string":"UTC+4","offset_value":14400,"readable_name":"+4:00 Muscat ( Asia )","name":"Asia/Muscat"},"America/Indiana/Knox":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Knox ( America/Indiana )","changed_offset_value":-18000,"name":"America/Indiana/Knox","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Knox ( America/Indiana )"},"America/Grenada":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Grenada ( America )","name":"America/Grenada"},"Asia/Bahrain":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Bahrain ( Asia )","name":"Asia/Bahrain"},"Africa/Addis_Ababa":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Addis Ababa ( Africa )","name":"Africa/Addis_Ababa"},"Asia/Samarkand":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Samarkand ( Asia )","name":"Asia/Samarkand"},"America/Halifax":{"offset_string":"UTC-4","offset_value":-14400,"changed_offset_string":"UTC-3","readable_name":"-4:00 Halifax ( America )","changed_offset_value":-10800,"name":"America/Halifax","dst_change_epoch":1394345117,"changed_readable_name":"-3:00 Halifax ( America )"},"Asia/Ulaanbaatar":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Ulaanbaatar ( Asia )","name":"Asia/Ulaanbaatar"},"Asia/Jerusalem":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Jerusalem ( Asia )","changed_offset_value":10800,"name":"Asia/Jerusalem","dst_change_epoch":1395966383,"changed_readable_name":"+3:00 Jerusalem ( Asia )"},"America/Cayman":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Cayman ( America )","name":"America/Cayman"},"America/Guyana":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Guyana ( America )","name":"America/Guyana"},"America/Indiana/Vevay":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Vevay ( America/Indiana )","changed_offset_value":-14400,"name":"America/Indiana/Vevay","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Vevay ( America/Indiana )"},"Asia/Kuwait":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Kuwait ( Asia )","name":"Asia/Kuwait"},"Europe/Chisinau":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Chisinau ( Europe )","changed_offset_value":10800,"name":"Europe/Chisinau","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Chisinau ( Europe )"},"Atlantic/Reykjavik":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Reykjavik ( Atlantic )","name":"Atlantic/Reykjavik"},"Asia/Krasnoyarsk":{"offset_string":"UTC+7","offset_value":25200,"changed_offset_string":"UTC+8","readable_name":"+7:00 Krasnoyarsk ( Asia )","changed_offset_value":28800,"name":"Asia/Krasnoyarsk","dst_change_epoch":1396120156,"changed_readable_name":"+8:00 Krasnoyarsk ( Asia )"},"Europe/Bucharest":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Bucharest ( Europe )","changed_offset_value":10800,"name":"Europe/Bucharest","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Bucharest ( Europe )"},"Pacific/Wake":{"offset_string":"UTC+12","offset_value":43200,"readable_name":"+12:00 Wake ( Pacific )","name":"Pacific/Wake"},"Africa/Blantyre":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Blantyre ( Africa )","name":"Africa/Blantyre"},"America/Dawson_Creek":{"offset_string":"UTC-7","offset_value":-25200,"readable_name":"-7:00 Dawson Creek ( America )","name":"America/Dawson_Creek"},"America/North_Dakota/New_Salem":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 New Salem ( America/North Dakota )","changed_offset_value":-18000,"name":"America/North_Dakota/New_Salem","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 New Salem ( America/North Dakota )"},"Pacific/Tahiti":{"offset_string":"UTC-10","offset_value":-36000,"readable_name":"-10:00 Tahiti ( Pacific )","name":"Pacific/Tahiti"},"Europe/Istanbul":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Istanbul ( Europe )","changed_offset_value":10800,"name":"Europe/Istanbul","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Istanbul ( Europe )"},"Pacific/Fiji":{"offset_string":"UTC+12","offset_value":43200,"readable_name":"+12:00 Fiji ( Pacific )","name":"Pacific/Fiji"},"America/Atikokan":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Atikokan ( America )","name":"America/Atikokan"},"America/Bahia":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Bahia ( America )","name":"America/Bahia"},"America/Matamoros":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Matamoros ( America )","changed_offset_value":-18000,"name":"America/Matamoros","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Matamoros ( America )"},"Pacific/Marquesas":{"offset_string":"UTC-9:30","offset_value":-34200,"readable_name":"-9:30 Marquesas ( Pacific )","name":"Pacific/Marquesas"},"Australia/Broken_Hill":{"offset_string":"UTC+10:30","offset_value":37800,"changed_offset_string":"UTC+9:30","readable_name":"+10:30 Broken Hill ( Australia )","changed_offset_value":34200,"name":"Australia/Broken_Hill","dst_change_epoch":1396716266,"changed_readable_name":"+9:30 Broken Hill ( Australia )"},"America/Antigua":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Antigua ( America )","name":"America/Antigua"},"EST":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 EST","name":"EST"},"America/New_York":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 New York ( America )","changed_offset_value":-14400,"name":"America/New_York","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 New York ( America )"},"America/El_Salvador":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 El Salvador ( America )","name":"America/El_Salvador"},"Pacific/Pohnpei":{"offset_string":"UTC+11","offset_value":39600,"readable_name":"+11:00 Pohnpei ( Pacific )","name":"Pacific/Pohnpei"},"America/Blanc-Sablon":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Blanc-Sablon ( America )","name":"America/Blanc-Sablon"},"Africa/Harare":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Harare ( Africa )","name":"Africa/Harare"},"Asia/Shanghai":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Shanghai ( Asia )","name":"Asia/Shanghai"},"Indian/Comoro":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Comoro ( Indian )","name":"Indian/Comoro"},"Africa/Porto-Novo":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Porto-Novo ( Africa )","name":"Africa/Porto-Novo"},"Pacific/Nauru":{"offset_string":"UTC+12","offset_value":43200,"readable_name":"+12:00 Nauru ( Pacific )","name":"Pacific/Nauru"},"Europe/Warsaw":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Warsaw ( Europe )","changed_offset_value":7200,"name":"Europe/Warsaw","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Warsaw ( Europe )"},"UTC":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 UTC","name":"UTC"},"Europe/Brussels":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Brussels ( Europe )","changed_offset_value":7200,"name":"Europe/Brussels","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Brussels ( Europe )"},"America/Guadeloupe":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Guadeloupe ( America )","name":"America/Guadeloupe"},"America/Havana":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Havana ( America )","changed_offset_value":-14400,"name":"America/Havana","dst_change_epoch":1394341321,"changed_readable_name":"-4:00 Havana ( America )"},"Antarctica/Casey":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Casey ( Antarctica )","name":"Antarctica/Casey"},"America/Barbados":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Barbados ( America )","name":"America/Barbados"},"Pacific/Kwajalein":{"offset_string":"UTC+12","offset_value":43200,"readable_name":"+12:00 Kwajalein ( Pacific )","name":"Pacific/Kwajalein"},"Africa/Ouagadougou":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Ouagadougou ( Africa )","name":"Africa/Ouagadougou"},"Africa/Abidjan":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Abidjan ( Africa )","name":"Africa/Abidjan"},"America/Rainy_River":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Rainy River ( America )","changed_offset_value":-18000,"name":"America/Rainy_River","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Rainy River ( America )"},"Asia/Makassar":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Makassar ( Asia )","name":"Asia/Makassar"},"MET":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 MET","changed_offset_value":7200,"name":"MET","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 MET"},"America/Santarem":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Santarem ( America )","name":"America/Santarem"},"Asia/Vladivostok":{"offset_string":"UTC+10","offset_value":36000,"changed_offset_string":"UTC+11","readable_name":"+10:00 Vladivostok ( Asia )","changed_offset_value":39600,"name":"Asia/Vladivostok","dst_change_epoch":1396110664,"changed_readable_name":"+11:00 Vladivostok ( Asia )"},"Asia/Pontianak":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Pontianak ( Asia )","name":"Asia/Pontianak"},"Africa/Lusaka":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Lusaka ( Africa )","name":"Africa/Lusaka"},"Africa/Luanda":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Luanda ( Africa )","name":"Africa/Luanda"},"America/Argentina/Mendoza":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Mendoza ( America/Argentina )","name":"America/Argentina/Mendoza"},"Europe/Kaliningrad":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Kaliningrad ( Europe )","changed_offset_value":10800,"name":"Europe/Kaliningrad","dst_change_epoch":1396139141,"changed_readable_name":"+3:00 Kaliningrad ( Europe )"},"Europe/Madrid":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Madrid ( Europe )","changed_offset_value":7200,"name":"Europe/Madrid","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Madrid ( Europe )"},"Africa/Mogadishu":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Mogadishu ( Africa )","name":"Africa/Mogadishu"},"America/Yellowknife":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Yellowknife ( America )","changed_offset_value":-21600,"name":"America/Yellowknife","dst_change_epoch":1394356508,"changed_readable_name":"-6:00 Yellowknife ( America )"},"America/St_Thomas":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 St Thomas ( America )","name":"America/St_Thomas"},"Atlantic/Stanley":{"offset_string":"UTC-3","offset_value":-10800,"changed_offset_string":"UTC-4","readable_name":"-3:00 Stanley ( Atlantic )","changed_offset_value":-14400,"name":"Atlantic/Stanley","dst_change_epoch":1397971134,"changed_readable_name":"-4:00 Stanley ( Atlantic )"},"Pacific/Majuro":{"offset_string":"UTC+12","offset_value":43200,"readable_name":"+12:00 Majuro ( Pacific )","name":"Pacific/Majuro"},"America/Jamaica":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Jamaica ( America )","name":"America/Jamaica"},"America/Argentina/Cordoba":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Cordoba ( America/Argentina )","name":"America/Argentina/Cordoba"},"Asia/Kashgar":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Kashgar ( Asia )","name":"Asia/Kashgar"},"Indian/Antananarivo":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Antananarivo ( Indian )","name":"Indian/Antananarivo"},"Asia/Anadyr":{"offset_string":"UTC+11","offset_value":39600,"changed_offset_string":"UTC+12","readable_name":"+11:00 Anadyr ( Asia )","changed_offset_value":43200,"name":"Asia/Anadyr","dst_change_epoch":1396106867,"changed_readable_name":"+12:00 Anadyr ( Asia )"},"Indian/Mauritius":{"offset_string":"UTC+4","offset_value":14400,"readable_name":"+4:00 Mauritius ( Indian )","name":"Indian/Mauritius"},"MST7MDT":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 MST7MDT","changed_offset_value":-21600,"name":"MST7MDT","dst_change_epoch":1394356509,"changed_readable_name":"-6:00 MST7MDT"},"America/Cuiaba":{"offset_string":"UTC-3","offset_value":-10800,"changed_offset_string":"UTC-4","readable_name":"-3:00 Cuiaba ( America )","changed_offset_value":-14400,"name":"America/Cuiaba","dst_change_epoch":1392520719,"changed_readable_name":"-4:00 Cuiaba ( America )"},"Asia/Irkutsk":{"offset_string":"UTC+8","offset_value":28800,"changed_offset_string":"UTC+9","readable_name":"+8:00 Irkutsk ( Asia )","changed_offset_value":32400,"name":"Asia/Irkutsk","dst_change_epoch":1396116359,"changed_readable_name":"+9:00 Irkutsk ( Asia )"},"Asia/Sakhalin":{"offset_string":"UTC+10","offset_value":36000,"changed_offset_string":"UTC+11","readable_name":"+10:00 Sakhalin ( Asia )","changed_offset_value":39600,"name":"Asia/Sakhalin","dst_change_epoch":1396110664,"changed_readable_name":"+11:00 Sakhalin ( Asia )"},"Africa/Sao_Tome":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Sao Tome ( Africa )","name":"Africa/Sao_Tome"},"America/Manaus":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Manaus ( America )","name":"America/Manaus"},"Pacific/Niue":{"offset_string":"UTC-11","offset_value":-39600,"readable_name":"-11:00 Niue ( Pacific )","name":"Pacific/Niue"},"Africa/Monrovia":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Monrovia ( Africa )","name":"Africa/Monrovia"},"America/Tijuana":{"offset_string":"UTC-8","offset_value":-28800,"changed_offset_string":"UTC-7","readable_name":"-8:00 Tijuana ( America )","changed_offset_value":-25200,"name":"America/Tijuana","dst_change_epoch":1394360305,"changed_readable_name":"-7:00 Tijuana ( America )"},"Asia/Ho_Chi_Minh":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Ho Chi Minh ( Asia )","name":"Asia/Ho_Chi_Minh"},"Africa/Algiers":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Algiers ( Africa )","name":"Africa/Algiers"},"Europe/Riga":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Riga ( Europe )","changed_offset_value":10800,"name":"Europe/Riga","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Riga ( Europe )"},"Europe/Vilnius":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Vilnius ( Europe )","changed_offset_value":10800,"name":"Europe/Vilnius","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Vilnius ( Europe )"},"Asia/Colombo":{"offset_string":"UTC+5:30","offset_value":19800,"readable_name":"+5:30 Colombo ( Asia )","name":"Asia/Colombo"},"Antarctica/DumontDUrville":{"offset_string":"UTC+10","offset_value":36000,"readable_name":"+10:00 DumontDUrville ( Antarctica )","name":"Antarctica/DumontDUrville"},"America/Boise":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Boise ( America )","changed_offset_value":-21600,"name":"America/Boise","dst_change_epoch":1394356508,"changed_readable_name":"-6:00 Boise ( America )"},"Pacific/Pago_Pago":{"offset_string":"UTC-11","offset_value":-39600,"readable_name":"-11:00 Pago Pago ( Pacific )","name":"Pacific/Pago_Pago"},"Africa/Kampala":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Kampala ( Africa )","name":"Africa/Kampala"},"Indian/Christmas":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Christmas ( Indian )","name":"Indian/Christmas"},"Asia/Dubai":{"offset_string":"UTC+4","offset_value":14400,"readable_name":"+4:00 Dubai ( Asia )","name":"Asia/Dubai"},"America/Dawson":{"offset_string":"UTC-8","offset_value":-28800,"changed_offset_string":"UTC-7","readable_name":"-8:00 Dawson ( America )","changed_offset_value":-25200,"name":"America/Dawson","dst_change_epoch":1394360305,"changed_readable_name":"-7:00 Dawson ( America )"},"Pacific/Kiritimati":{"offset_string":"UTC+14","offset_value":50400,"readable_name":"+14:00 Kiritimati ( Pacific )","name":"Pacific/Kiritimati"},"America/Bahia_Banderas":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Bahia Banderas ( America )","changed_offset_value":-18000,"name":"America/Bahia_Banderas","dst_change_epoch":1396771321,"changed_readable_name":"-5:00 Bahia Banderas ( America )"},"America/Yakutat":{"offset_string":"UTC-9","offset_value":-32400,"changed_offset_string":"UTC-8","readable_name":"-9:00 Yakutat ( America )","changed_offset_value":-28800,"name":"America/Yakutat","dst_change_epoch":1394364102,"changed_readable_name":"-8:00 Yakutat ( America )"},"Asia/Kabul":{"offset_string":"UTC+4:30","offset_value":16200,"readable_name":"+4:30 Kabul ( Asia )","name":"Asia/Kabul"},"America/Danmarkshavn":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Danmarkshavn ( America )","name":"America/Danmarkshavn"},"Europe/Uzhgorod":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Uzhgorod ( Europe )","changed_offset_value":10800,"name":"Europe/Uzhgorod","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Uzhgorod ( Europe )"},"America/Glace_Bay":{"offset_string":"UTC-4","offset_value":-14400,"changed_offset_string":"UTC-3","readable_name":"-4:00 Glace Bay ( America )","changed_offset_value":-10800,"name":"America/Glace_Bay","dst_change_epoch":1394345117,"changed_readable_name":"-3:00 Glace Bay ( America )"},"Africa/Bissau":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Bissau ( Africa )","name":"Africa/Bissau"},"America/Kentucky/Louisville":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Louisville ( America/Kentucky )","changed_offset_value":-14400,"name":"America/Kentucky/Louisville","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Louisville ( America/Kentucky )"},"Africa/Dar_es_Salaam":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Dar es Salaam ( Africa )","name":"Africa/Dar_es_Salaam"},"HST":{"offset_string":"UTC-10","offset_value":-36000,"readable_name":"-10:00 HST","name":"HST"},"Africa/El_Aaiun":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 El Aaiun ( Africa )","name":"Africa/El_Aaiun"},"Asia/Amman":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Amman ( Asia )","changed_offset_value":10800,"name":"Asia/Amman","dst_change_epoch":1395958789,"changed_readable_name":"+3:00 Amman ( Asia )"},"America/La_Paz":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 La Paz ( America )","name":"America/La_Paz"},"America/Costa_Rica":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 Costa Rica ( America )","name":"America/Costa_Rica"},"Pacific/Tongatapu":{"offset_string":"UTC+13","offset_value":46800,"readable_name":"+13:00 Tongatapu ( Pacific )","name":"Pacific/Tongatapu"},"America/Nipigon":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Nipigon ( America )","changed_offset_value":-14400,"name":"America/Nipigon","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Nipigon ( America )"},"Africa/Tunis":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Tunis ( Africa )","name":"Africa/Tunis"},"Asia/Tbilisi":{"offset_string":"UTC+4","offset_value":14400,"readable_name":"+4:00 Tbilisi ( Asia )","name":"Asia/Tbilisi"},"Europe/Simferopol":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Simferopol ( Europe )","changed_offset_value":10800,"name":"Europe/Simferopol","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Simferopol ( Europe )"},"America/Regina":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 Regina ( America )","name":"America/Regina"},"Pacific/Guadalcanal":{"offset_string":"UTC+11","offset_value":39600,"readable_name":"+11:00 Guadalcanal ( Pacific )","name":"Pacific/Guadalcanal"},"Pacific/Enderbury":{"offset_string":"UTC+13","offset_value":46800,"readable_name":"+13:00 Enderbury ( Pacific )","name":"Pacific/Enderbury"},"Indian/Cocos":{"offset_string":"UTC+6:30","offset_value":23400,"readable_name":"+6:30 Cocos ( Indian )","name":"Indian/Cocos"},"Australia/Perth":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Perth ( Australia )","name":"Australia/Perth"},"CST6CDT":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 CST6CDT","changed_offset_value":-18000,"name":"CST6CDT","dst_change_epoch":1394352712,"changed_readable_name":"-5:00 CST6CDT"},"Asia/Kolkata":{"offset_string":"UTC+5:30","offset_value":19800,"readable_name":"+5:30 Kolkata ( Asia )","name":"Asia/Kolkata"},"America/Argentina/Rio_Gallegos":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Rio Gallegos ( America/Argentina )","name":"America/Argentina/Rio_Gallegos"},"America/Porto_Velho":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Porto Velho ( America )","name":"America/Porto_Velho"},"Asia/Magadan":{"offset_string":"UTC+11","offset_value":39600,"changed_offset_string":"UTC+12","readable_name":"+11:00 Magadan ( Asia )","changed_offset_value":43200,"name":"Asia/Magadan","dst_change_epoch":1396106867,"changed_readable_name":"+12:00 Magadan ( Asia )"},"Asia/Phnom_Penh":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Phnom Penh ( Asia )","name":"Asia/Phnom_Penh"},"Atlantic/Canary":{"offset_string":"UTC","offset_value":0,"changed_offset_string":"UTC+1","readable_name":"+0:00 Canary ( Atlantic )","changed_offset_value":3600,"name":"Atlantic/Canary","dst_change_epoch":1396142938,"changed_readable_name":"+1:00 Canary ( Atlantic )"},"America/Kentucky/Monticello":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Monticello ( America/Kentucky )","changed_offset_value":-14400,"name":"America/Kentucky/Monticello","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Monticello ( America/Kentucky )"},"Pacific/Chuuk":{"offset_string":"UTC+10","offset_value":36000,"readable_name":"+10:00 Chuuk ( Pacific )","name":"Pacific/Chuuk"},"America/Swift_Current":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 Swift Current ( America )","name":"America/Swift_Current"},"Europe/Minsk":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Minsk ( Europe )","changed_offset_value":10800,"name":"Europe/Minsk","dst_change_epoch":1396139141,"changed_readable_name":"+3:00 Minsk ( Europe )"},"Pacific/Palau":{"offset_string":"UTC+9","offset_value":32400,"readable_name":"+9:00 Palau ( Pacific )","name":"Pacific/Palau"},"Europe/Helsinki":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Helsinki ( Europe )","changed_offset_value":10800,"name":"Europe/Helsinki","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Helsinki ( Europe )"},"Australia/Melbourne":{"offset_string":"UTC+11","offset_value":39600,"changed_offset_string":"UTC+10","readable_name":"+11:00 Melbourne ( Australia )","changed_offset_value":36000,"name":"Australia/Melbourne","dst_change_epoch":1396714368,"changed_readable_name":"+10:00 Melbourne ( Australia )"},"America/Monterrey":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Monterrey ( America )","changed_offset_value":-18000,"name":"America/Monterrey","dst_change_epoch":1396771321,"changed_readable_name":"-5:00 Monterrey ( America )"},"America/Menominee":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Menominee ( America )","changed_offset_value":-18000,"name":"America/Menominee","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Menominee ( America )"},"America/Cayenne":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Cayenne ( America )","name":"America/Cayenne"},"America/Miquelon":{"offset_string":"UTC-3","offset_value":-10800,"changed_offset_string":"UTC-2","readable_name":"-3:00 Miquelon ( America )","changed_offset_value":-7200,"name":"America/Miquelon","dst_change_epoch":1394341321,"changed_readable_name":"-2:00 Miquelon ( America )"},"America/Iqaluit":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Iqaluit ( America )","changed_offset_value":-14400,"name":"America/Iqaluit","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Iqaluit ( America )"},"Asia/Novosibirsk":{"offset_string":"UTC+6","offset_value":21600,"changed_offset_string":"UTC+7","readable_name":"+6:00 Novosibirsk ( Asia )","changed_offset_value":25200,"name":"Asia/Novosibirsk","dst_change_epoch":1396123953,"changed_readable_name":"+7:00 Novosibirsk ( Asia )"},"Australia/Adelaide":{"offset_string":"UTC+10:30","offset_value":37800,"changed_offset_string":"UTC+9:30","readable_name":"+10:30 Adelaide ( Australia )","changed_offset_value":34200,"name":"Australia/Adelaide","dst_change_epoch":1396716266,"changed_readable_name":"+9:30 Adelaide ( Australia )"},"Europe/Amsterdam":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Amsterdam ( Europe )","changed_offset_value":7200,"name":"Europe/Amsterdam","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Amsterdam ( Europe )"},"Europe/Moscow":{"offset_string":"UTC+3","offset_value":10800,"changed_offset_string":"UTC+4","readable_name":"+3:00 Moscow ( Europe )","changed_offset_value":14400,"name":"Europe/Moscow","dst_change_epoch":1396135345,"changed_readable_name":"+4:00 Moscow ( Europe )"},"Pacific/Rarotonga":{"offset_string":"UTC-10","offset_value":-36000,"readable_name":"-10:00 Rarotonga ( Pacific )","name":"Pacific/Rarotonga"},"Europe/Malta":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Malta ( Europe )","changed_offset_value":7200,"name":"Europe/Malta","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Malta ( Europe )"},"Africa/Banjul":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Banjul ( Africa )","name":"Africa/Banjul"},"Africa/Tripoli":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Tripoli ( Africa )","name":"Africa/Tripoli"},"Indian/Kerguelen":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Kerguelen ( Indian )","name":"Indian/Kerguelen"},"Asia/Urumqi":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Urumqi ( Asia )","name":"Asia/Urumqi"},"Africa/Libreville":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Libreville ( Africa )","name":"Africa/Libreville"},"Africa/Khartoum":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Khartoum ( Africa )","name":"Africa/Khartoum"},"America/Recife":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Recife ( America )","name":"America/Recife"},"America/Argentina/La_Rioja":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 La Rioja ( America/Argentina )","name":"America/Argentina/La_Rioja"},"Europe/Paris":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Paris ( Europe )","changed_offset_value":7200,"name":"Europe/Paris","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Paris ( Europe )"},"Indian/Mayotte":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Mayotte ( Indian )","name":"Indian/Mayotte"},"PST8PDT":{"offset_string":"UTC-8","offset_value":-28800,"changed_offset_string":"UTC-7","readable_name":"-8:00 PST8PDT","changed_offset_value":-25200,"name":"PST8PDT","dst_change_epoch":1394360306,"changed_readable_name":"-7:00 PST8PDT"},"America/Argentina/Salta":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Salta ( America/Argentina )","name":"America/Argentina/Salta"},"Pacific/Funafuti":{"offset_string":"UTC+12","offset_value":43200,"readable_name":"+12:00 Funafuti ( Pacific )","name":"Pacific/Funafuti"},"Europe/Berlin":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Berlin ( Europe )","changed_offset_value":7200,"name":"Europe/Berlin","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Berlin ( Europe )"},"Asia/Choibalsan":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Choibalsan ( Asia )","name":"Asia/Choibalsan"},"America/Montevideo":{"offset_string":"UTC-2","offset_value":-7200,"changed_offset_string":"UTC-3","readable_name":"-2:00 Montevideo ( America )","changed_offset_value":-10800,"name":"America/Montevideo","dst_change_epoch":1394339422,"changed_readable_name":"-3:00 Montevideo ( America )"},"America/Belize":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 Belize ( America )","name":"America/Belize"},"Africa/Djibouti":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Djibouti ( Africa )","name":"Africa/Djibouti"},"America/Argentina/San_Juan":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 San Juan ( America/Argentina )","name":"America/Argentina/San_Juan"},"America/Thunder_Bay":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Thunder Bay ( America )","changed_offset_value":-14400,"name":"America/Thunder_Bay","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Thunder Bay ( America )"},"Asia/Hovd":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Hovd ( Asia )","name":"Asia/Hovd"},"Asia/Novokuznetsk":{"offset_string":"UTC+6","offset_value":21600,"changed_offset_string":"UTC+7","readable_name":"+6:00 Novokuznetsk ( Asia )","changed_offset_value":25200,"name":"Asia/Novokuznetsk","dst_change_epoch":1396123953,"changed_readable_name":"+7:00 Novokuznetsk ( Asia )"},"Indian/Maldives":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Maldives ( Indian )","name":"Indian/Maldives"},"America/Toronto":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Toronto ( America )","changed_offset_value":-14400,"name":"America/Toronto","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Toronto ( America )"},"Australia/Eucla":{"offset_string":"UTC+8:45","offset_value":31500,"readable_name":"+8:45 Eucla ( Australia )","name":"Australia/Eucla"},"Pacific/Galapagos":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 Galapagos ( Pacific )","name":"Pacific/Galapagos"},"Africa/Malabo":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Malabo ( Africa )","name":"Africa/Malabo"},"America/Martinique":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Martinique ( America )","name":"America/Martinique"},"Asia/Aden":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Aden ( Asia )","name":"Asia/Aden"},"Asia/Tehran":{"offset_string":"UTC+3:30","offset_value":12600,"changed_offset_string":"UTC+4:30","readable_name":"+3:30 Tehran ( Asia )","changed_offset_value":16200,"name":"Asia/Tehran","dst_change_epoch":1395434821,"changed_readable_name":"+4:30 Tehran ( Asia )"},"America/Chihuahua":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Chihuahua ( America )","changed_offset_value":-21600,"name":"America/Chihuahua","dst_change_epoch":1396775117,"changed_readable_name":"-6:00 Chihuahua ( America )"},"Australia/Sydney":{"offset_string":"UTC+11","offset_value":39600,"changed_offset_string":"UTC+10","readable_name":"+11:00 Sydney ( Australia )","changed_offset_value":36000,"name":"Australia/Sydney","dst_change_epoch":1396714368,"changed_readable_name":"+10:00 Sydney ( Australia )"},"America/Moncton":{"offset_string":"UTC-4","offset_value":-14400,"changed_offset_string":"UTC-3","readable_name":"-4:00 Moncton ( America )","changed_offset_value":-10800,"name":"America/Moncton","dst_change_epoch":1394345117,"changed_readable_name":"-3:00 Moncton ( America )"},"America/Goose_Bay":{"offset_string":"UTC-4","offset_value":-14400,"changed_offset_string":"UTC-3","readable_name":"-4:00 Goose Bay ( America )","changed_offset_value":-10800,"name":"America/Goose_Bay","dst_change_epoch":1394339422,"changed_readable_name":"-3:00 Goose Bay ( America )"},"America/Detroit":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Detroit ( America )","changed_offset_value":-14400,"name":"America/Detroit","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Detroit ( America )"},"Australia/Lindeman":{"offset_string":"UTC+10","offset_value":36000,"readable_name":"+10:00 Lindeman ( Australia )","name":"Australia/Lindeman"},"Africa/Mbabane":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Mbabane ( Africa )","name":"Africa/Mbabane"},"Africa/Lubumbashi":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Lubumbashi ( Africa )","name":"Africa/Lubumbashi"},"America/Asuncion":{"offset_string":"UTC-3","offset_value":-10800,"changed_offset_string":"UTC-4","readable_name":"-3:00 Asuncion ( America )","changed_offset_value":-14400,"name":"America/Asuncion","dst_change_epoch":1397359836,"changed_readable_name":"-4:00 Asuncion ( America )"},"Antarctica/Vostok":{"offset_string":"UTC+6","offset_value":21600,"readable_name":"+6:00 Vostok ( Antarctica )","name":"Antarctica/Vostok"},"Africa/Lome":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Lome ( Africa )","name":"Africa/Lome"},"America/Indiana/Petersburg":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Petersburg ( America/Indiana )","changed_offset_value":-14400,"name":"America/Indiana/Petersburg","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Petersburg ( America/Indiana )"},"Asia/Harbin":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Harbin ( Asia )","name":"Asia/Harbin"},"Asia/Tashkent":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Tashkent ( Asia )","name":"Asia/Tashkent"},"America/Montreal":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Montreal ( America )","changed_offset_value":-14400,"name":"America/Montreal","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Montreal ( America )"},"Atlantic/St_Helena":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 St Helena ( Atlantic )","name":"Atlantic/St_Helena"},"Africa/Brazzaville":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Brazzaville ( Africa )","name":"Africa/Brazzaville"},"Pacific/Saipan":{"offset_string":"UTC+10","offset_value":36000,"readable_name":"+10:00 Saipan ( Pacific )","name":"Pacific/Saipan"},"Antarctica/Macquarie":{"offset_string":"UTC+11","offset_value":39600,"readable_name":"+11:00 Macquarie ( Antarctica )","name":"Antarctica/Macquarie"},"America/Edmonton":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Edmonton ( America )","changed_offset_value":-21600,"name":"America/Edmonton","dst_change_epoch":1394356508,"changed_readable_name":"-6:00 Edmonton ( America )"},"Asia/Yerevan":{"offset_string":"UTC+4","offset_value":14400,"changed_offset_string":"UTC+5","readable_name":"+4:00 Yerevan ( Asia )","changed_offset_value":18000,"name":"Asia/Yerevan","dst_change_epoch":1396131547,"changed_readable_name":"+5:00 Yerevan ( Asia )"},"Africa/Dakar":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Dakar ( Africa )","name":"Africa/Dakar"},"Europe/London":{"offset_string":"UTC","offset_value":0,"changed_offset_string":"UTC+1","readable_name":"+0:00 London ( Europe )","changed_offset_value":3600,"name":"Europe/London","dst_change_epoch":1396142938,"changed_readable_name":"+1:00 London ( Europe )"},"America/Anguilla":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Anguilla ( America )","name":"America/Anguilla"},"America/Indiana/Indianapolis":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Indianapolis ( America/Indiana )","changed_offset_value":-14400,"name":"America/Indiana/Indianapolis","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Indianapolis ( America/Indiana )"},"Asia/Aqtobe":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Aqtobe ( Asia )","name":"Asia/Aqtobe"},"Africa/Bamako":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Bamako ( Africa )","name":"Africa/Bamako"},"Australia/Lord_Howe":{"offset_string":"UTC+11","offset_value":39600,"changed_offset_string":"UTC+10:30","readable_name":"+11:00 Lord Howe ( Australia )","changed_offset_value":37800,"name":"Australia/Lord_Howe","dst_change_epoch":1396710572,"changed_readable_name":"+10:30 Lord Howe ( Australia )"},"Europe/Rome":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Rome ( Europe )","changed_offset_value":7200,"name":"Europe/Rome","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Rome ( Europe )"},"Europe/Budapest":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Budapest ( Europe )","changed_offset_value":7200,"name":"Europe/Budapest","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Budapest ( Europe )"},"Pacific/Fakaofo":{"offset_string":"UTC-10","offset_value":-36000,"readable_name":"-10:00 Fakaofo ( Pacific )","name":"Pacific/Fakaofo"},"MST":{"offset_string":"UTC-7","offset_value":-25200,"readable_name":"-7:00 MST","name":"MST"},"Africa/Maseru":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Maseru ( Africa )","name":"Africa/Maseru"},"Europe/Oslo":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Oslo ( Europe )","changed_offset_value":7200,"name":"Europe/Oslo","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Oslo ( Europe )"},"Africa/Asmara":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Asmara ( Africa )","name":"Africa/Asmara"},"Africa/Douala":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Douala ( Africa )","name":"Africa/Douala"},"America/Merida":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Merida ( America )","changed_offset_value":-18000,"name":"America/Merida","dst_change_epoch":1396771321,"changed_readable_name":"-5:00 Merida ( America )"},"Asia/Brunei":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Brunei ( Asia )","name":"Asia/Brunei"},"Asia/Rangoon":{"offset_string":"UTC+6:30","offset_value":23400,"readable_name":"+6:30 Rangoon ( Asia )","name":"Asia/Rangoon"},"America/Thule":{"offset_string":"UTC-4","offset_value":-14400,"changed_offset_string":"UTC-3","readable_name":"-4:00 Thule ( America )","changed_offset_value":-10800,"name":"America/Thule","dst_change_epoch":1394345117,"changed_readable_name":"-3:00 Thule ( America )"},"Asia/Macau":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Macau ( Asia )","name":"Asia/Macau"},"Asia/Oral":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Oral ( Asia )","name":"Asia/Oral"},"America/Cancun":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Cancun ( America )","changed_offset_value":-18000,"name":"America/Cancun","dst_change_epoch":1396771321,"changed_readable_name":"-5:00 Cancun ( America )"},"Asia/Singapore":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Singapore ( Asia )","name":"Asia/Singapore"},"Asia/Chongqing":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Chongqing ( Asia )","name":"Asia/Chongqing"},"America/Maceio":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Maceio ( America )","name":"America/Maceio"},"America/St_Vincent":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 St Vincent ( America )","name":"America/St_Vincent"},"America/North_Dakota/Center":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Center ( America/North Dakota )","changed_offset_value":-18000,"name":"America/North_Dakota/Center","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Center ( America/North Dakota )"},"Pacific/Easter":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-6","readable_name":"-5:00 Easter ( Pacific )","changed_offset_value":-21600,"name":"Pacific/Easter","dst_change_epoch":1394335626,"changed_readable_name":"-6:00 Easter ( Pacific )"},"Europe/Prague":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Prague ( Europe )","changed_offset_value":7200,"name":"Europe/Prague","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Prague ( Europe )"},"Africa/Johannesburg":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Johannesburg ( Africa )","name":"Africa/Johannesburg"},"America/Resolute":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Resolute ( America )","name":"America/Resolute"},"America/Indiana/Winamac":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Winamac ( America/Indiana )","changed_offset_value":-14400,"name":"America/Indiana/Winamac","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Winamac ( America/Indiana )"},"Pacific/Noumea":{"offset_string":"UTC+11","offset_value":39600,"readable_name":"+11:00 Noumea ( Pacific )","name":"Pacific/Noumea"},"Asia/Bishkek":{"offset_string":"UTC+6","offset_value":21600,"readable_name":"+6:00 Bishkek ( Asia )","name":"Asia/Bishkek"},"Pacific/Chatham":{"offset_string":"UTC+13:45","offset_value":49500,"changed_offset_string":"UTC+12:45","readable_name":"+13:45 Chatham ( Pacific )","changed_offset_value":45900,"name":"Pacific/Chatham","dst_change_epoch":1396706775,"changed_readable_name":"+12:45 Chatham ( Pacific )"},"America/Eirunepe":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Eirunepe ( America )","name":"America/Eirunepe"},"America/Dominica":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Dominica ( America )","name":"America/Dominica"},"America/Rankin_Inlet":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Rankin Inlet ( America )","changed_offset_value":-18000,"name":"America/Rankin_Inlet","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Rankin Inlet ( America )"},"America/Cambridge_Bay":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Cambridge Bay ( America )","changed_offset_value":-21600,"name":"America/Cambridge_Bay","dst_change_epoch":1394356508,"changed_readable_name":"-6:00 Cambridge Bay ( America )"},"Atlantic/South_Georgia":{"offset_string":"UTC-2","offset_value":-7200,"readable_name":"-2:00 South Georgia ( Atlantic )","name":"Atlantic/South_Georgia"},"Pacific/Tarawa":{"offset_string":"UTC+12","offset_value":43200,"readable_name":"+12:00 Tarawa ( Pacific )","name":"Pacific/Tarawa"},"America/Araguaina":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Araguaina ( America )","name":"America/Araguaina"},"Asia/Yakutsk":{"offset_string":"UTC+9","offset_value":32400,"changed_offset_string":"UTC+10","readable_name":"+9:00 Yakutsk ( Asia )","changed_offset_value":36000,"name":"Asia/Yakutsk","dst_change_epoch":1396112562,"changed_readable_name":"+10:00 Yakutsk ( Asia )"},"Pacific/Efate":{"offset_string":"UTC+11","offset_value":39600,"readable_name":"+11:00 Efate ( Pacific )","name":"Pacific/Efate"},"Pacific/Pitcairn":{"offset_string":"UTC-8","offset_value":-28800,"readable_name":"-8:00 Pitcairn ( Pacific )","name":"Pacific/Pitcairn"},"Atlantic/Cape_Verde":{"offset_string":"UTC-1","offset_value":-3600,"readable_name":"-1:00 Cape Verde ( Atlantic )","name":"Atlantic/Cape_Verde"},"Africa/Gaborone":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Gaborone ( Africa )","name":"Africa/Gaborone"},"Pacific/Johnston":{"offset_string":"UTC-10","offset_value":-36000,"readable_name":"-10:00 Johnston ( Pacific )","name":"Pacific/Johnston"},"America/Argentina/Jujuy":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Jujuy ( America/Argentina )","name":"America/Argentina/Jujuy"},"Africa/Cairo":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Cairo ( Africa )","name":"Africa/Cairo"},"America/Winnipeg":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Winnipeg ( America )","changed_offset_value":-18000,"name":"America/Winnipeg","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Winnipeg ( America )"},"Africa/Windhoek":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+1","readable_name":"+2:00 Windhoek ( Africa )","changed_offset_value":3600,"name":"Africa/Windhoek","dst_change_epoch":1396742844,"changed_readable_name":"+1:00 Windhoek ( Africa )"},"America/St_Lucia":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 St Lucia ( America )","name":"America/St_Lucia"},"Africa/Casablanca":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Casablanca ( Africa )","name":"Africa/Casablanca"},"Africa/Kigali":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Kigali ( Africa )","name":"Africa/Kigali"},"Asia/Vientiane":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Vientiane ( Asia )","name":"Asia/Vientiane"},"Africa/Bangui":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Bangui ( Africa )","name":"Africa/Bangui"},"Asia/Ashgabat":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Ashgabat ( Asia )","name":"Asia/Ashgabat"},"America/Argentina/Tucuman":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Tucuman ( America/Argentina )","name":"America/Argentina/Tucuman"},"Africa/Nouakchott":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Nouakchott ( Africa )","name":"Africa/Nouakchott"},"Europe/Gibraltar":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Gibraltar ( Europe )","changed_offset_value":7200,"name":"Europe/Gibraltar","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Gibraltar ( Europe )"},"America/Pangnirtung":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Pangnirtung ( America )","changed_offset_value":-14400,"name":"America/Pangnirtung","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Pangnirtung ( America )"},"America/Sao_Paulo":{"offset_string":"UTC-2","offset_value":-7200,"changed_offset_string":"UTC-3","readable_name":"-2:00 Sao Paulo ( America )","changed_offset_value":-10800,"name":"America/Sao_Paulo","dst_change_epoch":1392516922,"changed_readable_name":"-3:00 Sao Paulo ( America )"},"Asia/Nicosia":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Nicosia ( Asia )","changed_offset_value":10800,"name":"Asia/Nicosia","dst_change_epoch":1396142937,"changed_readable_name":"+3:00 Nicosia ( Asia )"},"Europe/Andorra":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Andorra ( Europe )","changed_offset_value":7200,"name":"Europe/Andorra","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Andorra ( Europe )"},"Pacific/Midway":{"offset_string":"UTC-11","offset_value":-39600,"readable_name":"-11:00 Midway ( Pacific )","name":"Pacific/Midway"},"Asia/Riyadh":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Riyadh ( Asia )","name":"Asia/Riyadh"},"Europe/Athens":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Athens ( Europe )","changed_offset_value":10800,"name":"Europe/Athens","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Athens ( Europe )"},"Europe/Volgograd":{"offset_string":"UTC+3","offset_value":10800,"changed_offset_string":"UTC+4","readable_name":"+3:00 Volgograd ( Europe )","changed_offset_value":14400,"name":"Europe/Volgograd","dst_change_epoch":1396135345,"changed_readable_name":"+4:00 Volgograd ( Europe )"},"Asia/Qyzylorda":{"offset_string":"UTC+6","offset_value":21600,"readable_name":"+6:00 Qyzylorda ( Asia )","name":"Asia/Qyzylorda"},"Asia/Omsk":{"offset_string":"UTC+6","offset_value":21600,"changed_offset_string":"UTC+7","readable_name":"+6:00 Omsk ( Asia )","changed_offset_value":25200,"name":"Asia/Omsk","dst_change_epoch":1396123953,"changed_readable_name":"+7:00 Omsk ( Asia )"},"Asia/Gaza":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Gaza ( Asia )","changed_offset_value":10800,"name":"Asia/Gaza","dst_change_epoch":1396044219,"changed_readable_name":"+3:00 Gaza ( Asia )"},"America/Sitka":{"offset_string":"UTC-9","offset_value":-32400,"changed_offset_string":"UTC-8","readable_name":"-9:00 Sitka ( America )","changed_offset_value":-28800,"name":"America/Sitka","dst_change_epoch":1394364102,"changed_readable_name":"-8:00 Sitka ( America )"},"Asia/Tokyo":{"offset_string":"UTC+9","offset_value":32400,"readable_name":"+9:00 Tokyo ( Asia )","name":"Asia/Tokyo"},"Asia/Jayapura":{"offset_string":"UTC+9","offset_value":32400,"readable_name":"+9:00 Jayapura ( Asia )","name":"Asia/Jayapura"},"Asia/Thimphu":{"offset_string":"UTC+6","offset_value":21600,"readable_name":"+6:00 Thimphu ( Asia )","name":"Asia/Thimphu"},"Antarctica/Syowa":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Syowa ( Antarctica )","name":"Antarctica/Syowa"},"America/Port-au-Prince":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Port-au-Prince ( America )","name":"America/Port-au-Prince"},"Asia/Damascus":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Damascus ( Asia )","changed_offset_value":10800,"name":"Asia/Damascus","dst_change_epoch":1396562492,"changed_readable_name":"+3:00 Damascus ( Asia )"},"America/Indiana/Marengo":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Marengo ( America/Indiana )","changed_offset_value":-14400,"name":"America/Indiana/Marengo","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Marengo ( America/Indiana )"},"Asia/Qatar":{"offset_string":"UTC+3","offset_value":10800,"readable_name":"+3:00 Qatar ( Asia )","name":"Asia/Qatar"},"America/Fortaleza":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Fortaleza ( America )","name":"America/Fortaleza"},"Europe/Sofia":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Sofia ( Europe )","changed_offset_value":10800,"name":"Europe/Sofia","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Sofia ( Europe )"},"America/Mexico_City":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Mexico City ( America )","changed_offset_value":-18000,"name":"America/Mexico_City","dst_change_epoch":1396771321,"changed_readable_name":"-5:00 Mexico City ( America )"},"America/Belem":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Belem ( America )","name":"America/Belem"},"Atlantic/Azores":{"offset_string":"UTC-1","offset_value":-3600,"changed_offset_string":"UTC","readable_name":"-1:00 Azores ( Atlantic )","changed_offset_value":0,"name":"Atlantic/Azores","dst_change_epoch":1396142937,"changed_readable_name":"+0:00 Azores ( Atlantic )"},"Asia/Hong_Kong":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Hong Kong ( Asia )","name":"Asia/Hong_Kong"},"America/Nome":{"offset_string":"UTC-9","offset_value":-32400,"changed_offset_string":"UTC-8","readable_name":"-9:00 Nome ( America )","changed_offset_value":-28800,"name":"America/Nome","dst_change_epoch":1394364102,"changed_readable_name":"-8:00 Nome ( America )"},"America/Godthab":{"offset_string":"UTC-3","offset_value":-10800,"changed_offset_string":"UTC-2","readable_name":"-3:00 Godthab ( America )","changed_offset_value":-7200,"name":"America/Godthab","dst_change_epoch":1396142937,"changed_readable_name":"-2:00 Godthab ( America )"},"Antarctica/Davis":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Davis ( Antarctica )","name":"Antarctica/Davis"},"America/Scoresbysund":{"offset_string":"UTC-1","offset_value":-3600,"changed_offset_string":"UTC","readable_name":"-1:00 Scoresbysund ( America )","changed_offset_value":0,"name":"America/Scoresbysund","dst_change_epoch":1396142937,"changed_readable_name":"+0:00 Scoresbysund ( America )"},"Australia/Brisbane":{"offset_string":"UTC+10","offset_value":36000,"readable_name":"+10:00 Brisbane ( Australia )","name":"Australia/Brisbane"},"Asia/Kuala_Lumpur":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Kuala Lumpur ( Asia )","name":"Asia/Kuala_Lumpur"},"Asia/Baku":{"offset_string":"UTC+4","offset_value":14400,"changed_offset_string":"UTC+5","readable_name":"+4:00 Baku ( Asia )","changed_offset_value":18000,"name":"Asia/Baku","dst_change_epoch":1396139140,"changed_readable_name":"+5:00 Baku ( Asia )"},"Africa/Lagos":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Lagos ( Africa )","name":"Africa/Lagos"},"Indian/Chagos":{"offset_string":"UTC+6","offset_value":21600,"readable_name":"+6:00 Chagos ( Indian )","name":"Indian/Chagos"},"America/Vancouver":{"offset_string":"UTC-8","offset_value":-28800,"changed_offset_string":"UTC-7","readable_name":"-8:00 Vancouver ( America )","changed_offset_value":-25200,"name":"America/Vancouver","dst_change_epoch":1394360305,"changed_readable_name":"-7:00 Vancouver ( America )"},"Asia/Yekaterinburg":{"offset_string":"UTC+5","offset_value":18000,"changed_offset_string":"UTC+6","readable_name":"+5:00 Yekaterinburg ( Asia )","changed_offset_value":21600,"name":"Asia/Yekaterinburg","dst_change_epoch":1396127750,"changed_readable_name":"+6:00 Yekaterinburg ( Asia )"},"EST5EDT":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 EST5EDT","changed_offset_value":-14400,"name":"EST5EDT","dst_change_epoch":1394348915,"changed_readable_name":"-4:00 EST5EDT"},"Pacific/Port_Moresby":{"offset_string":"UTC+10","offset_value":36000,"readable_name":"+10:00 Port Moresby ( Pacific )","name":"Pacific/Port_Moresby"},"America/Phoenix":{"offset_string":"UTC-7","offset_value":-25200,"readable_name":"-7:00 Phoenix ( America )","name":"America/Phoenix"},"Europe/Copenhagen":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Copenhagen ( Europe )","changed_offset_value":7200,"name":"Europe/Copenhagen","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Copenhagen ( Europe )"},"Antarctica/McMurdo":{"offset_string":"UTC+13","offset_value":46800,"changed_offset_string":"UTC+12","readable_name":"+13:00 McMurdo ( Antarctica )","changed_offset_value":43200,"name":"Antarctica/McMurdo","dst_change_epoch":1396706774,"changed_readable_name":"+12:00 McMurdo ( Antarctica )"},"Asia/Almaty":{"offset_string":"UTC+6","offset_value":21600,"readable_name":"+6:00 Almaty ( Asia )","name":"Asia/Almaty"},"Asia/Kathmandu":{"offset_string":"UTC+5:45","offset_value":20700,"readable_name":"+5:45 Kathmandu ( Asia )","name":"Asia/Kathmandu"},"Asia/Dili":{"offset_string":"UTC+9","offset_value":32400,"readable_name":"+9:00 Dili ( Asia )","name":"Asia/Dili"},"America/Adak":{"offset_string":"UTC-10","offset_value":-36000,"changed_offset_string":"UTC-9","readable_name":"-10:00 Adak ( America )","changed_offset_value":-32400,"name":"America/Adak","dst_change_epoch":1394367899,"changed_readable_name":"-9:00 Adak ( America )"},"America/Argentina/Catamarca":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Catamarca ( America/Argentina )","name":"America/Argentina/Catamarca"},"America/Caracas":{"offset_string":"UTC-4:30","offset_value":-16200,"readable_name":"-4:30 Caracas ( America )","name":"America/Caracas"},"WET":{"offset_string":"UTC","offset_value":0,"changed_offset_string":"UTC+1","readable_name":"+0:00 WET","changed_offset_value":3600,"name":"WET","dst_change_epoch":1396142938,"changed_readable_name":"+1:00 WET"},"America/Curacao":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Curacao ( America )","name":"America/Curacao"},"America/Tegucigalpa":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 Tegucigalpa ( America )","name":"America/Tegucigalpa"},"Pacific/Honolulu":{"offset_string":"UTC-10","offset_value":-36000,"readable_name":"-10:00 Honolulu ( Pacific )","name":"Pacific/Honolulu"},"Pacific/Wallis":{"offset_string":"UTC+12","offset_value":43200,"readable_name":"+12:00 Wallis ( Pacific )","name":"Pacific/Wallis"},"Africa/Niamey":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Niamey ( Africa )","name":"Africa/Niamey"},"America/Ojinaga":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Ojinaga ( America )","changed_offset_value":-21600,"name":"America/Ojinaga","dst_change_epoch":1394356508,"changed_readable_name":"-6:00 Ojinaga ( America )"},"Europe/Tirane":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Tirane ( Europe )","changed_offset_value":7200,"name":"Europe/Tirane","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Tirane ( Europe )"},"America/Rio_Branco":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Rio Branco ( America )","name":"America/Rio_Branco"},"America/Guatemala":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 Guatemala ( America )","name":"America/Guatemala"},"Africa/Ceuta":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Ceuta ( Africa )","changed_offset_value":7200,"name":"Africa/Ceuta","dst_change_epoch":1396142937,"changed_readable_name":"+2:00 Ceuta ( Africa )"},"America/Argentina/San_Luis":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 San Luis ( America/Argentina )","name":"America/Argentina/San_Luis"},"America/Santa_Isabel":{"offset_string":"UTC-8","offset_value":-28800,"changed_offset_string":"UTC-7","readable_name":"-8:00 Santa Isabel ( America )","changed_offset_value":-25200,"name":"America/Santa_Isabel","dst_change_epoch":1396778914,"changed_readable_name":"-7:00 Santa Isabel ( America )"},"Africa/Maputo":{"offset_string":"UTC+2","offset_value":7200,"readable_name":"+2:00 Maputo ( Africa )","name":"Africa/Maputo"},"America/Managua":{"offset_string":"UTC-6","offset_value":-21600,"readable_name":"-6:00 Managua ( America )","name":"America/Managua"},"America/Noronha":{"offset_string":"UTC-2","offset_value":-7200,"readable_name":"-2:00 Noronha ( America )","name":"America/Noronha"},"America/Santiago":{"offset_string":"UTC-3","offset_value":-10800,"changed_offset_string":"UTC-4","readable_name":"-3:00 Santiago ( America )","changed_offset_value":-14400,"name":"America/Santiago","dst_change_epoch":1394335625,"changed_readable_name":"-4:00 Santiago ( America )"},"Asia/Kamchatka":{"offset_string":"UTC+11","offset_value":39600,"changed_offset_string":"UTC+12","readable_name":"+11:00 Kamchatka ( Asia )","changed_offset_value":43200,"name":"Asia/Kamchatka","dst_change_epoch":1396106867,"changed_readable_name":"+12:00 Kamchatka ( Asia )"},"America/Campo_Grande":{"offset_string":"UTC-3","offset_value":-10800,"changed_offset_string":"UTC-4","readable_name":"-3:00 Campo Grande ( America )","changed_offset_value":-14400,"name":"America/Campo_Grande","dst_change_epoch":1392520719,"changed_readable_name":"-4:00 Campo Grande ( America )"},"Europe/Lisbon":{"offset_string":"UTC","offset_value":0,"changed_offset_string":"UTC+1","readable_name":"+0:00 Lisbon ( Europe )","changed_offset_value":3600,"name":"Europe/Lisbon","dst_change_epoch":1396142938,"changed_readable_name":"+1:00 Lisbon ( Europe )"},"Asia/Bangkok":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Bangkok ( Asia )","name":"Asia/Bangkok"},"America/Lima":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Lima ( America )","name":"America/Lima"},"Australia/Darwin":{"offset_string":"UTC+9:30","offset_value":34200,"readable_name":"+9:30 Darwin ( Australia )","name":"Australia/Darwin"},"CET":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 CET","changed_offset_value":7200,"name":"CET","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 CET"},"America/Metlakatla":{"offset_string":"UTC-8","offset_value":-28800,"changed_offset_string":"UTC-7","readable_name":"-8:00 Metlakatla ( America )","changed_offset_value":-25200,"name":"America/Metlakatla","dst_change_epoch":1394360305,"changed_readable_name":"-7:00 Metlakatla ( America )"},"Asia/Seoul":{"offset_string":"UTC+9","offset_value":32400,"readable_name":"+9:00 Seoul ( Asia )","name":"Asia/Seoul"},"Europe/Luxembourg":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Luxembourg ( Europe )","changed_offset_value":7200,"name":"Europe/Luxembourg","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Luxembourg ( Europe )"},"Atlantic/Faroe":{"offset_string":"UTC","offset_value":0,"changed_offset_string":"UTC+1","readable_name":"+0:00 Faroe ( Atlantic )","changed_offset_value":3600,"name":"Atlantic/Faroe","dst_change_epoch":1396142938,"changed_readable_name":"+1:00 Faroe ( Atlantic )"},"America/Boa_Vista":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Boa Vista ( America )","name":"America/Boa_Vista"},"Pacific/Apia":{"offset_string":"UTC-11","offset_value":-39600,"readable_name":"-11:00 Apia ( Pacific )","name":"Pacific/Apia"},"Antarctica/Mawson":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Mawson ( Antarctica )","name":"Antarctica/Mawson"},"Europe/Monaco":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Monaco ( Europe )","changed_offset_value":7200,"name":"Europe/Monaco","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Monaco ( Europe )"},"America/Argentina/Buenos_Aires":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Buenos Aires ( America/Argentina )","name":"America/Argentina/Buenos_Aires"},"America/Santo_Domingo":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Santo Domingo ( America )","name":"America/Santo_Domingo"},"Europe/Kiev":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Kiev ( Europe )","changed_offset_value":10800,"name":"Europe/Kiev","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Kiev ( Europe )"},"Asia/Jakarta":{"offset_string":"UTC+7","offset_value":25200,"readable_name":"+7:00 Jakarta ( Asia )","name":"Asia/Jakarta"},"Africa/Ndjamena":{"offset_string":"UTC+1","offset_value":3600,"readable_name":"+1:00 Ndjamena ( Africa )","name":"Africa/Ndjamena"},"America/Guayaquil":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Guayaquil ( America )","name":"America/Guayaquil"},"America/Chicago":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Chicago ( America )","changed_offset_value":-18000,"name":"America/Chicago","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Chicago ( America )"},"Europe/Samara":{"offset_string":"UTC+3","offset_value":10800,"changed_offset_string":"UTC+4","readable_name":"+3:00 Samara ( Europe )","changed_offset_value":14400,"name":"Europe/Samara","dst_change_epoch":1396135345,"changed_readable_name":"+4:00 Samara ( Europe )"},"America/Indiana/Tell_City":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Tell City ( America/Indiana )","changed_offset_value":-18000,"name":"America/Indiana/Tell_City","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Tell City ( America/Indiana )"},"America/Denver":{"offset_string":"UTC-7","offset_value":-25200,"changed_offset_string":"UTC-6","readable_name":"-7:00 Denver ( America )","changed_offset_value":-21600,"name":"America/Denver","dst_change_epoch":1394356508,"changed_readable_name":"-6:00 Denver ( America )"},"Europe/Zaporozhye":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Zaporozhye ( Europe )","changed_offset_value":10800,"name":"Europe/Zaporozhye","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Zaporozhye ( Europe )"},"Pacific/Auckland":{"offset_string":"UTC+13","offset_value":46800,"changed_offset_string":"UTC+12","readable_name":"+13:00 Auckland ( Pacific )","changed_offset_value":43200,"name":"Pacific/Auckland","dst_change_epoch":1396706775,"changed_readable_name":"+12:00 Auckland ( Pacific )"},"Europe/Vienna":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Vienna ( Europe )","changed_offset_value":7200,"name":"Europe/Vienna","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Vienna ( Europe )"},"America/Argentina/Ushuaia":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Ushuaia ( America/Argentina )","name":"America/Argentina/Ushuaia"},"America/Grand_Turk":{"offset_string":"UTC-5","offset_value":-18000,"changed_offset_string":"UTC-4","readable_name":"-5:00 Grand Turk ( America )","changed_offset_value":-14400,"name":"America/Grand_Turk","dst_change_epoch":1394348914,"changed_readable_name":"-4:00 Grand Turk ( America )"},"Asia/Kuching":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Kuching ( Asia )","name":"Asia/Kuching"},"America/Aruba":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Aruba ( America )","name":"America/Aruba"},"Asia/Karachi":{"offset_string":"UTC+5","offset_value":18000,"readable_name":"+5:00 Karachi ( Asia )","name":"Asia/Karachi"},"Africa/Accra":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Accra ( Africa )","name":"Africa/Accra"},"America/Port_of_Spain":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Port of Spain ( America )","name":"America/Port_of_Spain"},"America/Paramaribo":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Paramaribo ( America )","name":"America/Paramaribo"},"America/North_Dakota/Beulah":{"offset_string":"UTC-6","offset_value":-21600,"changed_offset_string":"UTC-5","readable_name":"-6:00 Beulah ( America/North Dakota )","changed_offset_value":-18000,"name":"America/North_Dakota/Beulah","dst_change_epoch":1394352711,"changed_readable_name":"-5:00 Beulah ( America/North Dakota )"},"America/Anchorage":{"offset_string":"UTC-9","offset_value":-32400,"changed_offset_string":"UTC-8","readable_name":"-9:00 Anchorage ( America )","changed_offset_value":-28800,"name":"America/Anchorage","dst_change_epoch":1394364102,"changed_readable_name":"-8:00 Anchorage ( America )"},"Asia/Taipei":{"offset_string":"UTC+8","offset_value":28800,"readable_name":"+8:00 Taipei ( Asia )","name":"Asia/Taipei"},"Antarctica/Rothera":{"offset_string":"UTC-3","offset_value":-10800,"readable_name":"-3:00 Rothera ( Antarctica )","name":"Antarctica/Rothera"},"Europe/Dublin":{"offset_string":"UTC","offset_value":0,"changed_offset_string":"UTC+1","readable_name":"+0:00 Dublin ( Europe )","changed_offset_value":3600,"name":"Europe/Dublin","dst_change_epoch":1396142938,"changed_readable_name":"+1:00 Dublin ( Europe )"},"Africa/Freetown":{"offset_string":"UTC","offset_value":0,"readable_name":"+0:00 Freetown ( Africa )","name":"Africa/Freetown"},"Atlantic/Bermuda":{"offset_string":"UTC-4","offset_value":-14400,"changed_offset_string":"UTC-3","readable_name":"-4:00 Bermuda ( Atlantic )","changed_offset_value":-10800,"name":"Atlantic/Bermuda","dst_change_epoch":1394345117,"changed_readable_name":"-3:00 Bermuda ( Atlantic )"},"Pacific/Kosrae":{"offset_string":"UTC+11","offset_value":39600,"readable_name":"+11:00 Kosrae ( Pacific )","name":"Pacific/Kosrae"},"Europe/Tallinn":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 Tallinn ( Europe )","changed_offset_value":10800,"name":"Europe/Tallinn","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 Tallinn ( Europe )"},"Pacific/Gambier":{"offset_string":"UTC-9","offset_value":-32400,"readable_name":"-9:00 Gambier ( Pacific )","name":"Pacific/Gambier"},"Australia/Hobart":{"offset_string":"UTC+11","offset_value":39600,"changed_offset_string":"UTC+10","readable_name":"+11:00 Hobart ( Australia )","changed_offset_value":36000,"name":"Australia/Hobart","dst_change_epoch":1396714368,"changed_readable_name":"+10:00 Hobart ( Australia )"},"America/Panama":{"offset_string":"UTC-5","offset_value":-18000,"readable_name":"-5:00 Panama ( America )","name":"America/Panama"},"America/Montserrat":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Montserrat ( America )","name":"America/Montserrat"},"Indian/Reunion":{"offset_string":"UTC+4","offset_value":14400,"readable_name":"+4:00 Reunion ( Indian )","name":"Indian/Reunion"},"Europe/Zurich":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Zurich ( Europe )","changed_offset_value":7200,"name":"Europe/Zurich","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Zurich ( Europe )"},"America/Tortola":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Tortola ( America )","name":"America/Tortola"},"EET":{"offset_string":"UTC+2","offset_value":7200,"changed_offset_string":"UTC+3","readable_name":"+2:00 EET","changed_offset_value":10800,"name":"EET","dst_change_epoch":1396142938,"changed_readable_name":"+3:00 EET"},"America/Puerto_Rico":{"offset_string":"UTC-4","offset_value":-14400,"readable_name":"-4:00 Puerto Rico ( America )","name":"America/Puerto_Rico"},"Atlantic/Madeira":{"offset_string":"UTC","offset_value":0,"changed_offset_string":"UTC+1","readable_name":"+0:00 Madeira ( Atlantic )","changed_offset_value":3600,"name":"Atlantic/Madeira","dst_change_epoch":1396142938,"changed_readable_name":"+1:00 Madeira ( Atlantic )"},"Europe/Stockholm":{"offset_string":"UTC+1","offset_value":3600,"changed_offset_string":"UTC+2","readable_name":"+1:00 Stockholm ( Europe )","changed_offset_value":7200,"name":"Europe/Stockholm","dst_change_epoch":1396142938,"changed_readable_name":"+2:00 Stockholm ( Europe )"},"Indian/Mahe":{"offset_string":"UTC+4","offset_value":14400,"readable_name":"+4:00 Mahe ( Indian )","name":"Indian/Mahe"}},"choices":["Pacific/Apia","Pacific/Midway","Pacific/Niue","Pacific/Pago_Pago","America/Adak","HST","Pacific/Fakaofo","Pacific/Honolulu","Pacific/Johnston","Pacific/Rarotonga","Pacific/Tahiti","Pacific/Marquesas","America/Anchorage","America/Juneau","America/Nome","America/Sitka","America/Yakutat","Pacific/Gambier","America/Dawson","America/Los_Angeles","America/Metlakatla","America/Santa_Isabel","America/Tijuana","America/Vancouver","America/Whitehorse","PST8PDT","Pacific/Pitcairn","America/Boise","America/Cambridge_Bay","America/Chihuahua","America/Dawson_Creek","America/Denver","America/Edmonton","America/Hermosillo","America/Inuvik","America/Mazatlan","America/Ojinaga","America/Phoenix","America/Yellowknife","MST","MST7MDT","America/Bahia_Banderas","America/Belize","America/Cancun","America/Chicago","America/Costa_Rica","America/El_Salvador","America/Guatemala","America/Indiana/Knox","America/Indiana/Tell_City","America/Managua","America/Matamoros","America/Menominee","America/Merida","America/Mexico_City","America/Monterrey","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Rainy_River","America/Rankin_Inlet","America/Regina","America/Swift_Current","America/Tegucigalpa","America/Winnipeg","CST6CDT","Pacific/Galapagos","America/Atikokan","America/Bogota","America/Cayman","America/Detroit","America/Grand_Turk","America/Guayaquil","America/Havana","America/Indiana/Indianapolis","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Iqaluit","America/Jamaica","America/Kentucky/Louisville","America/Kentucky/Monticello","America/Lima","America/Montreal","America/Nassau","America/New_York","America/Nipigon","America/Panama","America/Pangnirtung","America/Port-au-Prince","America/Resolute","America/Thunder_Bay","America/Toronto","EST","EST5EDT","Pacific/Easter","America/Caracas","America/Anguilla","America/Antigua","America/Aruba","America/Barbados","America/Blanc-Sablon","America/Boa_Vista","America/Curacao","America/Dominica","America/Eirunepe","America/Glace_Bay","America/Goose_Bay","America/Grenada","America/Guadeloupe","America/Guyana","America/Halifax","America/La_Paz","America/Manaus","America/Martinique","America/Moncton","America/Montserrat","America/Port_of_Spain","America/Porto_Velho","America/Puerto_Rico","America/Rio_Branco","America/Santo_Domingo","America/St_Kitts","America/St_Lucia","America/St_Thomas","America/St_Vincent","America/Thule","America/Tortola","Atlantic/Bermuda","America/St_Johns","America/Araguaina","America/Argentina/Buenos_Aires","America/Argentina/Catamarca","America/Argentina/Cordoba","America/Argentina/Jujuy","America/Argentina/La_Rioja","America/Argentina/Mendoza","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Asuncion","America/Bahia","America/Belem","America/Campo_Grande","America/Cayenne","America/Cuiaba","America/Fortaleza","America/Godthab","America/Maceio","America/Miquelon","America/Paramaribo","America/Recife","America/Santarem","America/Santiago","Antarctica/Palmer","Antarctica/Rothera","Atlantic/Stanley","America/Montevideo","America/Noronha","America/Sao_Paulo","Atlantic/South_Georgia","America/Scoresbysund","Atlantic/Azores","Atlantic/Cape_Verde","Africa/Abidjan","Africa/Accra","Africa/Bamako","Africa/Banjul","Africa/Bissau","Africa/Casablanca","Africa/Conakry","Africa/Dakar","Africa/El_Aaiun","Africa/Freetown","Africa/Lome","Africa/Monrovia","Africa/Nouakchott","Africa/Ouagadougou","Africa/Sao_Tome","America/Danmarkshavn","Atlantic/Canary","Atlantic/Faroe","Atlantic/Madeira","Atlantic/Reykjavik","Atlantic/St_Helena","Europe/Dublin","Europe/Lisbon","Europe/London","WET","UTC","Africa/Algiers","Africa/Bangui","Africa/Brazzaville","Africa/Ceuta","Africa/Douala","Africa/Kinshasa","Africa/Lagos","Africa/Libreville","Africa/Luanda","Africa/Malabo","Africa/Ndjamena","Africa/Niamey","Africa/Porto-Novo","Africa/Tunis","CET","Europe/Amsterdam","Europe/Andorra","Europe/Belgrade","Europe/Berlin","Europe/Brussels","Europe/Budapest","Europe/Copenhagen","Europe/Gibraltar","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Monaco","Europe/Oslo","Europe/Paris","Europe/Prague","Europe/Rome","Europe/Stockholm","Europe/Tirane","Europe/Vaduz","Europe/Vienna","Europe/Warsaw","Europe/Zurich","MET","Africa/Blantyre","Africa/Bujumbura","Africa/Cairo","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Kigali","Africa/Lubumbashi","Africa/Lusaka","Africa/Maputo","Africa/Maseru","Africa/Mbabane","Africa/Tripoli","Africa/Windhoek","Asia/Amman","Asia/Beirut","Asia/Damascus","Asia/Gaza","Asia/Jerusalem","Asia/Nicosia","EET","Europe/Athens","Europe/Bucharest","Europe/Chisinau","Europe/Helsinki","Europe/Istanbul","Europe/Kaliningrad","Europe/Kiev","Europe/Minsk","Europe/Riga","Europe/Simferopol","Europe/Sofia","Europe/Tallinn","Europe/Uzhgorod","Europe/Vilnius","Europe/Zaporozhye","Africa/Addis_Ababa","Africa/Asmara","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Kampala","Africa/Khartoum","Africa/Mogadishu","Africa/Nairobi","Antarctica/Syowa","Asia/Aden","Asia/Baghdad","Asia/Bahrain","Asia/Kuwait","Asia/Qatar","Asia/Riyadh","Europe/Moscow","Europe/Samara","Europe/Volgograd","Indian/Antananarivo","Indian/Comoro","Indian/Mayotte","Asia/Tehran","Asia/Baku","Asia/Dubai","Asia/Muscat","Asia/Tbilisi","Asia/Yerevan","Indian/Mahe","Indian/Mauritius","Indian/Reunion","Asia/Kabul","Antarctica/Mawson","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Dushanbe","Asia/Karachi","Asia/Oral","Asia/Samarkand","Asia/Tashkent","Asia/Yekaterinburg","Indian/Kerguelen","Indian/Maldives","Asia/Colombo","Asia/Kolkata","Asia/Kathmandu","Antarctica/Vostok","Asia/Almaty","Asia/Bishkek","Asia/Dhaka","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Qyzylorda","Asia/Thimphu","Indian/Chagos","Asia/Rangoon","Indian/Cocos","Antarctica/Davis","Asia/Bangkok","Asia/Ho_Chi_Minh","Asia/Hovd","Asia/Jakarta","Asia/Krasnoyarsk","Asia/Phnom_Penh","Asia/Pontianak","Asia/Vientiane","Indian/Christmas","Antarctica/Casey","Asia/Brunei","Asia/Choibalsan","Asia/Chongqing","Asia/Harbin","Asia/Hong_Kong","Asia/Irkutsk","Asia/Kashgar","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Macau","Asia/Makassar","Asia/Manila","Asia/Shanghai","Asia/Singapore","Asia/Taipei","Asia/Ulaanbaatar","Asia/Urumqi","Australia/Perth","Australia/Eucla","Asia/Dili","Asia/Jayapura","Asia/Pyongyang","Asia/Seoul","Asia/Tokyo","Asia/Yakutsk","Pacific/Palau","Australia/Darwin","Antarctica/DumontDUrville","Asia/Sakhalin","Asia/Vladivostok","Australia/Brisbane","Australia/Lindeman","Pacific/Chuuk","Pacific/Guam","Pacific/Port_Moresby","Pacific/Saipan","Australia/Adelaide","Australia/Broken_Hill","Antarctica/Macquarie","Asia/Anadyr","Asia/Kamchatka","Asia/Magadan","Australia/Currie","Australia/Hobart","Australia/Lord_Howe","Australia/Melbourne","Australia/Sydney","Pacific/Efate","Pacific/Guadalcanal","Pacific/Kosrae","Pacific/Noumea","Pacific/Pohnpei","Pacific/Norfolk","Pacific/Fiji","Pacific/Funafuti","Pacific/Kwajalein","Pacific/Majuro","Pacific/Nauru","Pacific/Tarawa","Pacific/Wake","Pacific/Wallis","Antarctica/McMurdo","Pacific/Auckland","Pacific/Enderbury","Pacific/Tongatapu","Pacific/Chatham","Pacific/Kiritimati"]},
    //"
    auth : {
        user : null,
        token : null,
        tos_verify_required : false,
        cookiename : 'mtngs_mobile_auth',
        cookievalid : 3 * 365
    },

    meetme_themes : [
        '/static/meetme_themes/theme1.jpg',
        '/static/meetme_themes/theme2.jpg',
        '/static/meetme_themes/theme3.jpg',
        '/static/meetme_themes/theme4.jpg',
        '/static/meetme_themes/theme5.jpg',
        '/static/meetme_themes/theme6.jpg',
        '/static/meetme_themes/theme7.jpg',
        '/static/meetme_themes/theme8.jpg',
        '/static/meetme_themes/theme9.jpg',
        '/static/meetme_themes/theme10.jpg',
        '/static/meetme_themes/theme11.jpg',
        '/static/meetme_themes/theme12.jpg'
    ],

        meetme_types : [
        {
            icon_class : 'icon-meetings',
            name : 'Generic'
        },
        {
            icon_class : 'icon-coffee',
            name : 'Coffee'
        },
        {
            icon_class : 'icon-dinner',
            name : 'Dinner'
        },
        {
            icon_class : 'icon-drinks',
            name : 'Drinks'
        },
        {
            icon_class : 'icon-workshop',
            name : 'Workshop'
        },
        {
            icon_class : 'icon-sports',
            name : 'Sports'
        },
        {
            icon_class : 'icon-team',
            name : 'Team'
        },
        {
            icon_class : 'icon-idea',
            name : 'Idea'
        },
        {
            icon_class : 'icon-material_presentation',
            name : 'Board'
        },
        {
            icon_class : 'icon-date_picker',
            name : 'Event'
        },
        {
            icon_class : 'icon-handshake',
            name : 'Business'
        },
        {
            icon_class : 'icon-call',
            name : 'Call'
        },
        {
            icon_class : 'icon-tablet',
            name : 'Tablet'
        },
        {
            icon_class : 'icon-teleconf',
            name : 'Telco'
        },
        {
            icon_class : 'icon-onlineconf',
            name : 'Skype'
        }
    ],

    no_login_pages : [
        'meetme',
        'matchmaker_fragment',
        'user_fragment',
        'underConstruction',
        'under_construction_url'
    ],

    defaults : {
        url_scheme : /^1\./.test( window.AG_CLIENT_VERSION || '1.0.0' ) ? 'meetings://' : 'steroids-scanner://',
        api_host : api_urls[app_mode],
        desktop_link : desktop_links[app_mode],
        new_mobile_redirect_url : mobile_redirect_urls[app_mode],
        return_host : 'http://' + location.host,
        version : 3,
        version_check_url : version_check_urls[app_mode]
    },

    options : {
        build : window.build_mode,
        fetchTimeout : 10000
    },

    contexts : [
            { file : 'index.html', id : 'meetingsPage', no_preload : true },
            { file : 'login.html', id : 'loginPage', load_before_init : true },
            { file : 'profile.html', id : 'profilePage' },
            { file : 'meeting.html', id : 'meetingPage' },
            { file : 'edit.html', id : 'editPage' },
            { file : 'participants.html', id : 'participantsPage' },
            { file : 'participant.html', id : 'participantPage' },
            { file : 'material.html', id : 'materialPage' },
            { file : 'scheduling.html', id : 'schedulingPage' },
            { file : 'addParticipant.html', id : 'addParticipantPage' },
            { file : 'calconfig.html', id : 'calconfigPage' },
            { file : 'meetme.html', id : 'meetmeCover', no_preload : true },
            { file : 'meetmeCalendar.html', id : 'meetmeCalendar', no_preload : true },
            { file : 'meetmeConfig.html', id : 'meetmeConfig', no_preload : true },
            { file : 'edit.html', id : 'singleEditPage' },
            { file : 'editMaterial.html', id : 'editMaterialPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'renameMaterial.html', id : 'renameMaterialPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'connectAccounts.html', id : 'connectAccountsPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'connectCalendar.html', id : 'connectCalendarPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'signup.html', id : 'signupPage' },
            { file : 'apps.html', id : 'apps', no_preload : true },
            { file : 'underConstruction.html', id : 'underConstruction', no_preload : true }
        ],


    models : {},
    collections : {},
    views : {},
    router : null,
    helpers : {

        formQueryString : function( params, randomize ) {
            if ( randomize ) params.m_rand = Math.random();

            var query_options=[];
            var param;

            for ( param in params ) {
                query_options.push( encodeURIComponent(param) + '=' + encodeURIComponent( params[param] ) );
            }

            var query_string = query_options.length ? '?' : '';
            query_string = query_string + query_options.join('&');

            return query_string;
        },

        formContextURL : function( context, params, randomize ) {
            params = params || {};
            params.steroids_preload_id = context.id;
            var query_string = app.helpers.formQueryString( params, randomize );

            return '/' + context.file + query_string;
        },


        getContextForID : function( id ){
            for (var i = 0; i < app.contexts.length; i++) {
                if ( id == app.contexts[i].id ) return app.contexts[i];
            }
            return false;
        },

        switchContext: function( context_id, params, options ) {
            params = params || {};

            var context = app.helpers.getContextForID( context_id );
            if ( ! context ) {
                alert( "unknown context switch: " + context_id );
            }
            window.location = app.helpers.formContextURL( context, params );
        },

        hideContent: function(){
            $('div.content').hide();
            $('div.loader').show();
        },

        tryToSellApps : function() {
            // Check cookie & check param from user??!
            if(! ( navigator.userAgent.match(/iPhone/i) ||  navigator.userAgent.match(/android/i) ) ) return;
            if( app.helpers.getCookie('app_install_shown') ) return;

            // Set the cookie
            var date = new Date();
            date.setTime( date.getTime() + ( 3 * 365 * 24 * 60 * 60 * 1000 ));
            var expires = "; expires=" + date.toGMTString();
            document.cookie = "app_install_shown=1" + expires + "; path=/";

            // Redirect to app page
            localStorage.setItem('apps_return_url', window.location.href);
            window.location.href = '/apps.html';
        },

        getCookie : function(name) {
            var parts = document.cookie.split(name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
            else return false;
        },

        validEmail : function(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            emailAddress = emailAddress.replace(/\".*\" \<(.*)\>|(.*)/, '$1$2'); // " fix syntax hl
                                                return pattern.test(emailAddress);
        },

        fetchTimeoutWatcher : function(timeout, el) {
            var $el = $(el);
            var _this = this;
            this.fetchComplete = false;
            setTimeout( function() {
                if( ! _this.fetchComplete ) {
                    $el.html( templatizer.connectivityError({}) ).trigger('create');
                    $el.one('click', '.reconnect', function(e) {
                        e.preventDefault();
                        $($el).html('<span class="loader"></span>');
                        app.helpers.hideContent();
                        Backbone.history.loadUrl();
                    });
                }
            }, timeout);
            return this;
        },

        dateString : function(time, offset) {
            var o = offset || 0;
            return moment.utc(time + o * 1000).format('ddd, MMM DD');
        },

        dayString : function(time, offset) {
            var o = offset || 0;
            return moment.utc(time + o * 1000).format('dddd');
        },

        hourSpanString : function( start, end, offset ) {
            var o = offset || 0;
            return moment.utc(start + o * 1000).format('h:mm A') + ' - ' + moment.utc(end + o * 1000).format('h:mm A');
        },

        // NOTE: Expects the times to be inside the same day
        fullTimeSpanString : function( start, end, timezone, offset ) {
            var tz = timezone || '';
            var o = offset || 0;
            return app.helpers.hourSpanString( start * 1000 , end * 1000, o ) + ' ' +
                app.helpers.dateString(start * 1000, o) + ' ' + tz;
        }
    },
    init : function() {

        // Check history support
        if( ! Modernizr.history ) {
            $('body').html( templatizer.updateBrowser() );
            return;
        }

        // Login & redirects
        if( ! ( /contextRedirect\.html/.test( window.location.href ) ) ) {
            if( this._requireLogin() ){
                this._doRedirects();
            }
        }

        // Add login details to desktop_link
        if( app.auth.token ) app.defaults.desktop_link += '?dic='+app.auth.token;

        // Remove navigation bar on IOS
        //this._removeIosNav();

        // Add auth token headers to Backbone sync
        Backbone.sync = _.wrap(Backbone.sync, function(originalSync, method, model, options) {
            var new_options =  _.extend({
                beforeSend: function(xhr) {
                    if(app.auth.token) xhr.setRequestHeader('dic', app.auth.token);
                    if(app.auth.user) xhr.setRequestHeader('user_id', app.auth.user);
                }
            }, options);
            return originalSync(method, model, new_options);
        });

        // Add click tracking to backbone
        /*Backbone.View.prototype.delegateEvents = function(events) {
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            if (!(events || (events = _.result(this, 'events')))) return;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) throw new Error('Method "' + events[key] + '" does not exist');
                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                // Wrap method to add tracking
                if( eventName == 'click'){
                    method = _.wrap( method, function(method, e){
                        meetings_tracker.track(e.currentTarget);
                        method(e);
                    });
                }
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method );
                }
            }
        };*/

        // Use fast clicks
        new FastClick(document.body);

        // Start router
        window.router = new app.router();
        Backbone.history.start({pushState: true});
    },
    initializeAuthFromCookie : function() {
        var auth_cookie = this._readAuthCookie() || '';
        var user_and_token = auth_cookie.split(/_(.+)?/,2);
        app.auth.user = user_and_token[0];
        app.auth.token = user_and_token[1];

        return user_and_token[1] ? true : false;
    },

    _requireLogin : function() {

        // Skip if page does not require login
        var i, l = app.no_login_pages.length;
        var noLoginRequired = false;
        for(i=0; i < l; i++) {
            if( window.location.toString().indexOf( app.no_login_pages[i] ) !== -1 ) {
                noLoginRequired = true;
            }
        }

        // Url has auth & user query params
        if( this._readAuthUrlParams() ) {
            return true;
        }
        else if( this.initializeAuthFromCookie() ) {
            return true;
        }
        else if( noLoginRequired ){
            return true;
        }
        else{
            // Throw the user out if no credentials
            if( window.location.toString().indexOf('login.html') === -1 ) {
                app.helpers.switchContext("loginPage", {id : ''} );
                return false;
            }
        }
    },

    _doRedirects : function() {
        var redirect_meeting = this._getUrlParamByName('redirect_to_meeting');
        var redirect_matchmaking_confirmed = this._getUrlParamByName('confirmed_matchmaker_lock_id');
        var matchmaking_response = this._getUrlParamByName('matchmaking_response');
        var matchmaker_fragment = this._getUrlParamByName('matchmaker_fragment') || '';
        var user_fragment = this._getUrlParamByName('user_fragment');
        var under_construction_url = this._getUrlParamByName('under_construction_url');
        var under_construction_message = this._getUrlParamByName('under_construction_message') || '';
        //var redirect_matcmaking_expired = this._getUrlParamByName('expired_matchmaker_lock_id');
        //var redirect_matchmaking_limit = this._getUrlParamByName('limit_reached_for_matchmaking_event_id');

        var proposals = this._getUrlParamByName('proposals');
        var clear = this._getUrlParamByName('clear');

        var chosen_redirect = false;

        // Clear user tokens
        if ( clear == 'true') {
            app.auth.user = '';
            app.auth.token = '';
            return;
        }

        // Show scheduling answering
        else if( under_construction_url ) {
            chosen_redirect = [ 'underConstruction', { url : under_construction_url, message : under_construction_message } ];
        }

        // Show scheduling answering
        else if( proposals === 'answer' && redirect_meeting ) {
            chosen_redirect = [ 'schedulingPage', { mode : 'answer', id : redirect_meeting } ];
        }

        // Show scheduling choosing
        else if( proposals === 'choose' && redirect_meeting ) {
            chosen_redirect = [ 'schedulingPage', { mode : 'choose', id : redirect_meeting } ];
        }

        // Show matchmaking calendar
        else if( user_fragment ) {
            chosen_redirect = ['meetmeCover', { user : user_fragment, cal : matchmaker_fragment } ];
        }

        // Show matchmaking accept / decline
        else if( matchmaking_response && redirect_meeting ) {
            chosen_redirect = [ 'meetingPage', { matchmaking_response : matchmaking_response, id : redirect_meeting } ];
        }

        // Show meeting
        else if( redirect_meeting && redirect_meeting !== 0 && redirect_meeting !== '0' ) {
            chosen_redirect = [ 'meetingPage', { id : redirect_meeting } ];
        }

        // Show matchmaking confirmed after coming from email
        else if( parseInt(redirect_matchmaking_confirmed,10) ) {
            chosen_redirect = [ 'meetmeCalendar', { confirmed_lock_id : redirect_matchmaking_confirmed  } ];
        }

        // Go to meeting page if not on login page
        else if( window.location.toString().indexOf( 'login.html') !== -1 ) {
            chosen_redirect = [ 'meetingsPage' ];
        }

        if ( app.auth.tos_verify_required || window.location.toString().indexOf( 'login.html') !== -1 ) {
            chosen_redirect = chosen_redirect || [ 'meetingsPage' ];
            new app.userModel({ id : 'me' }).fetch( function( response ) {
                if ( ! ( response && response.tos_accepted ) ) {
                    app.helpers.switchContext( 'profilePage', { context_after_tos_accept : JSON.stringify( chosen_redirect ) } );
                }
            } );
        }

        if ( chosen_redirect ) {
            app.helpers.switchContext( chosen_redirect );
        }
    },

    _readAuthUrlParams : function() {
        return this._loginWithParams( this._getUrlParamByName( 'user_id' ), this._getUrlParamByName( 'dic' ) );
    },

    _loginWithParams : function( user, token ) {
        if( user && token ){
            app.auth.user = user;
            app.auth.token = token;
            this._createAuthCookie();
            this.auth.tos_verify_required = 1;
            return true;
        }
        else{
            return false;
        }
    },

    _getUrlParamByName : function( name ) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },

    _readAuthCookie : function(){
        var nameEQ = app.auth.cookiename + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    _createAuthCookie : function() {
        var date = new Date();
        date.setTime( date.getTime() + ( app.auth.cookievalid * 24 * 60 * 60 * 1000 ));
        var expires = "; expires=" + date.toGMTString();
        var value = app.auth.user + '_' + app.auth.token;
        document.cookie = app.auth.cookiename + "=" + value + expires + "; path=/";
    },
    _removeAuthCookie : function() {
        document.cookie = app.auth.cookiename + "=; expires=-1; path=/";
    },
    _getLocalStorage : function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    },

    _removeIosNav : function() {
        /mobile/i.test(navigator.userAgent) && !location.hash &&
            setTimeout(function () { window.scrollBy(0, 1); }, 3000);
    },

    _versionCheck : function(){
        $.getJSON( app.defaults.version_check_url , function(response) {
            // Force update if the current.json value is larger than client version
            if( parseInt(response.version, 10) > app.defaults.version ) {
                app._redirectToUpdate(response.url);
            }
        });
    },
    _redirectToUpdate : function(url) {
        setTimeout(function(){
            alert('You have an old version of the app. You need to update!');
            setTimeout( function(){
                steroids.openURL(url);
            },100);
            app._redirectToUpdate(url);
        },1000);
    },
    openUrlSchemeLink : function(appurl,normurl) {
        var win=window.open(normurl, '_blank');
        win.focus();
        return;
    },

    launchURLForwarder : function() {
        document.removeEventListener("resume", app.launchURLForwarder, false);

        var redirect_uri = "" + steroids.app.getLaunchURL();
        var inapp_url =  redirect_uri.replace( /^[^\:]+\:\/\//, '' );

        if ( inapp_url ) {
            window.location = inapp_url;
        }
    },

    startGoogleConnecting: function( context, redirect_params ) {
        var redirect_uri = 'https://dev.meetin.gs/meetings_global/redirect_mobile/0';
        var host = window.location.protocol + '//' + window.location.host;

        var to_url = host + app.helpers.formContextRedirectUrl( context, redirect_params );
        var params = [
            { "key" : "client_id", "value" : "584216729178.apps.googleusercontent.com" },
            { "key" : "response_type", "value" : "code" },
            { "key" : "access_type", "value" : "offline" },
            { "key" : "scope", "value" : 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.google.com/calendar/feeds/ https://www.google.com/m8/feeds' },
            { "key" : "state", "value" : JSON.stringify( { to : to_url, redirect_uri : redirect_uri } ) },
            { "key" : "approval_prompt", "value" : "force" },
            { "key" : "redirect_uri", "value" : redirect_uri }
        ];

        var string_params = _.map( params,
            function( p ) { return encodeURIComponent( p.key ) + '=' + encodeURIComponent( p.value ); }
        );

        var url = "https://accounts.google.com/o/oauth2/auth?" + string_params.join("&");

        window.location = url;
    },
    showContent: function() {
        $('div.content').show();
        $('div.connectivity').hide();
        $('div.loader').hide().html('<span class="loader"></span>');
    },

    hasInternet : function() {
        return true;
    },

    showConnectivityError : function(type) {
        var $el = $('.connectivity').html( templatizer.connectivityError({ type : type }) ).show();
        $('div.content').hide();
        $('div.loader').hide();
        $el.trigger('create');
        $el.on('click', '.reconnect', function(e) {
            e.preventDefault();
            $el.off('click');
            $el.html('');
            app.helpers.hideContent();
            Backbone.history.loadUrl();
        });
    }
};

$(document).ready(function() {
    // Open panel
    $('div.main-div').swiperight(function() {
        $( "#left-panel" ).panel( "open" );
    });

    // Close panel with click
    $('div.ui-panel-content-wrap,div.ui-panel-dismiss').live('click', function(){
        $( "#left-panel" ).panel( "close" );
    });

    // Make swiping a bit harder
    $.event.special.swipe.horizontalDistanceThreshold = 75;

    app.init();
});

