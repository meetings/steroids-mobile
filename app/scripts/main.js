// JQM configs
$(document).bind("mobileinit", function(){
    $.mobile.ajaxEnabled = false;
    $.mobile.buttonMarkup.hoverDelay = 10;
    $.mobile.defaultPageTransition = 'none';
    $.mobile.touchOverflowEnabled = true;
    $.mobile.hashListeningEnabled = false;
    $.mobile.ajaxLinksEnabled = false;
});

window.production_mode = false;

// TODO: Generic close function, which removes child views

// TODO: FUCKING REMEMBER TO REMOVE
WebSocket = undefined;

window.app = {
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
        '/static/meetme_themes/theme8.jpg'
    ],

    timezones: {"data":{"America/Whitehorse":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Whitehorse ( America )","name":"America/Whitehorse"},"America/Bogota":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Bogota ( America )","name":"America/Bogota"},"Africa/Kinshasa":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Kinshasa ( Africa )","name":"Africa/Kinshasa"},"Antarctica/Palmer":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Palmer ( Antarctica )","name":"Antarctica/Palmer"},"America/Mazatlan":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Mazatlan ( America )","name":"America/Mazatlan"},"America/Indiana/Vincennes":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Vincennes ( America/Indiana )","name":"America/Indiana/Vincennes"},"Asia/Manila":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Manila ( Asia )","name":"Asia/Manila"},"Africa/Conakry":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Conakry ( Africa )","name":"Africa/Conakry"},"Europe/Belgrade":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Belgrade ( Europe )","name":"Europe/Belgrade"},"Asia/Dhaka":{"offset_value":21600,"offset_string":"UTC+6","readable_name":"+6:00 Dhaka ( Asia )","name":"Asia/Dhaka"},"America/Nassau":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Nassau ( America )","name":"America/Nassau"},"Asia/Aqtau":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Aqtau ( Asia )","name":"Asia/Aqtau"},"America/Los_Angeles":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Los Angeles ( America )","name":"America/Los_Angeles"},"Asia/Dushanbe":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Dushanbe ( Asia )","name":"Asia/Dushanbe"},"Europe/Vaduz":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Vaduz ( Europe )","name":"Europe/Vaduz"},"Africa/Bujumbura":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Bujumbura ( Africa )","name":"Africa/Bujumbura"},"Asia/Baghdad":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Baghdad ( Asia )","name":"Asia/Baghdad"},"Asia/Beirut":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Beirut ( Asia )","name":"Asia/Beirut"},"America/Juneau":{"offset_value":-28800,"offset_string":"UTC-8","readable_name":"-8:00 Juneau ( America )","name":"America/Juneau"},"America/St_Kitts":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 St Kitts ( America )","name":"America/St_Kitts"},"America/Inuvik":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Inuvik ( America )","name":"America/Inuvik"},"Asia/Pyongyang":{"offset_value":32400,"offset_string":"UTC+9","readable_name":"+9:00 Pyongyang ( Asia )","name":"Asia/Pyongyang"},"Africa/Nairobi":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Nairobi ( Africa )","name":"Africa/Nairobi"},"Pacific/Norfolk":{"offset_value":41400,"offset_string":"UTC+11:30","readable_name":"+11:30 Norfolk ( Pacific )","name":"Pacific/Norfolk"},"America/St_Johns":{"offset_value":-9000,"offset_string":"UTC-2:30","readable_name":"-2:30 St Johns ( America )","name":"America/St_Johns"},"Pacific/Guam":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Guam ( Pacific )","name":"Pacific/Guam"},"Australia/Currie":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Currie ( Australia )","name":"Australia/Currie"},"America/Hermosillo":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Hermosillo ( America )","name":"America/Hermosillo"},"Asia/Muscat":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Muscat ( Asia )","name":"Asia/Muscat"},"America/Indiana/Knox":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Knox ( America/Indiana )","name":"America/Indiana/Knox"},"America/Grenada":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Grenada ( America )","name":"America/Grenada"},"Asia/Bahrain":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Bahrain ( Asia )","name":"Asia/Bahrain"},"Asia/Samarkand":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Samarkand ( Asia )","name":"Asia/Samarkand"},"Africa/Addis_Ababa":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Addis Ababa ( Africa )","name":"Africa/Addis_Ababa"},"America/Halifax":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Halifax ( America )","name":"America/Halifax"},"Asia/Ulaanbaatar":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Ulaanbaatar ( Asia )","name":"Asia/Ulaanbaatar"},"Asia/Jerusalem":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Jerusalem ( Asia )","name":"Asia/Jerusalem"},"America/Indiana/Vevay":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Vevay ( America/Indiana )","name":"America/Indiana/Vevay"},"America/Guyana":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Guyana ( America )","name":"America/Guyana"},"America/Cayman":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Cayman ( America )","name":"America/Cayman"},"Europe/Chisinau":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Chisinau ( Europe )","name":"Europe/Chisinau"},"Asia/Kuwait":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Kuwait ( Asia )","name":"Asia/Kuwait"},"Atlantic/Reykjavik":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Reykjavik ( Atlantic )","name":"Atlantic/Reykjavik"},"Pacific/Wake":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Wake ( Pacific )","name":"Pacific/Wake"},"Europe/Bucharest":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Bucharest ( Europe )","name":"Europe/Bucharest"},"Asia/Krasnoyarsk":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Krasnoyarsk ( Asia )","name":"Asia/Krasnoyarsk"},"Pacific/Tahiti":{"offset_value":-36000,"offset_string":"UTC-10","readable_name":"-10:00 Tahiti ( Pacific )","name":"Pacific/Tahiti"},"America/North_Dakota/New_Salem":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 New Salem ( America/North Dakota )","name":"America/North_Dakota/New_Salem"},"America/Dawson_Creek":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Dawson Creek ( America )","name":"America/Dawson_Creek"},"Africa/Blantyre":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Blantyre ( Africa )","name":"Africa/Blantyre"},"Europe/Istanbul":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Istanbul ( Europe )","name":"Europe/Istanbul"},"Pacific/Fiji":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Fiji ( Pacific )","name":"Pacific/Fiji"},"Pacific/Marquesas":{"offset_value":-34200,"offset_string":"UTC-9:30","readable_name":"-9:30 Marquesas ( Pacific )","name":"Pacific/Marquesas"},"America/Matamoros":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Matamoros ( America )","name":"America/Matamoros"},"America/Bahia":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Bahia ( America )","name":"America/Bahia"},"America/Atikokan":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Atikokan ( America )","name":"America/Atikokan"},"Australia/Broken_Hill":{"offset_value":34200,"offset_string":"UTC+9:30","readable_name":"+9:30 Broken Hill ( Australia )","name":"Australia/Broken_Hill"},"EST":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 EST","name":"EST"},"America/Antigua":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Antigua ( America )","name":"America/Antigua"},"America/New_York":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 New York ( America )","name":"America/New_York"},"Pacific/Pohnpei":{"offset_value":39600,"offset_string":"UTC+11","readable_name":"+11:00 Pohnpei ( Pacific )","name":"Pacific/Pohnpei"},"America/El_Salvador":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 El Salvador ( America )","name":"America/El_Salvador"},"America/Blanc-Sablon":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Blanc-Sablon ( America )","name":"America/Blanc-Sablon"},"Africa/Harare":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Harare ( Africa )","name":"Africa/Harare"},"Asia/Shanghai":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Shanghai ( Asia )","name":"Asia/Shanghai"},"Indian/Comoro":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Comoro ( Indian )","name":"Indian/Comoro"},"Africa/Porto-Novo":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Porto-Novo ( Africa )","name":"Africa/Porto-Novo"},"Pacific/Nauru":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Nauru ( Pacific )","name":"Pacific/Nauru"},"Europe/Warsaw":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Warsaw ( Europe )","name":"Europe/Warsaw"},"UTC":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 UTC","name":"UTC"},"Europe/Brussels":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Brussels ( Europe )","name":"Europe/Brussels"},"Antarctica/Casey":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Casey ( Antarctica )","name":"Antarctica/Casey"},"America/Havana":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Havana ( America )","name":"America/Havana"},"America/Guadeloupe":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Guadeloupe ( America )","name":"America/Guadeloupe"},"America/Barbados":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Barbados ( America )","name":"America/Barbados"},"Pacific/Kwajalein":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Kwajalein ( Pacific )","name":"Pacific/Kwajalein"},"Africa/Ouagadougou":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Ouagadougou ( Africa )","name":"Africa/Ouagadougou"},"Africa/Abidjan":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Abidjan ( Africa )","name":"Africa/Abidjan"},"America/Rainy_River":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Rainy River ( America )","name":"America/Rainy_River"},"Asia/Makassar":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Makassar ( Asia )","name":"Asia/Makassar"},"MET":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 MET","name":"MET"},"Asia/Vladivostok":{"offset_value":39600,"offset_string":"UTC+11","readable_name":"+11:00 Vladivostok ( Asia )","name":"Asia/Vladivostok"},"America/Santarem":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Santarem ( America )","name":"America/Santarem"},"Asia/Pontianak":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Pontianak ( Asia )","name":"Asia/Pontianak"},"Africa/Lusaka":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Lusaka ( Africa )","name":"Africa/Lusaka"},"Africa/Luanda":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Luanda ( Africa )","name":"Africa/Luanda"},"Europe/Kaliningrad":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Kaliningrad ( Europe )","name":"Europe/Kaliningrad"},"America/Argentina/Mendoza":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Mendoza ( America/Argentina )","name":"America/Argentina/Mendoza"},"Europe/Madrid":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Madrid ( Europe )","name":"Europe/Madrid"},"Africa/Mogadishu":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Mogadishu ( Africa )","name":"Africa/Mogadishu"},"America/Yellowknife":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Yellowknife ( America )","name":"America/Yellowknife"},"Pacific/Majuro":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Majuro ( Pacific )","name":"Pacific/Majuro"},"Atlantic/Stanley":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Stanley ( Atlantic )","name":"Atlantic/Stanley"},"America/St_Thomas":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 St Thomas ( America )","name":"America/St_Thomas"},"America/Jamaica":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Jamaica ( America )","name":"America/Jamaica"},"Indian/Antananarivo":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Antananarivo ( Indian )","name":"Indian/Antananarivo"},"Asia/Kashgar":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Kashgar ( Asia )","name":"Asia/Kashgar"},"America/Argentina/Cordoba":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Cordoba ( America/Argentina )","name":"America/Argentina/Cordoba"},"Asia/Anadyr":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Anadyr ( Asia )","name":"Asia/Anadyr"},"MST7MDT":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 MST7MDT","name":"MST7MDT"},"Indian/Mauritius":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Mauritius ( Indian )","name":"Indian/Mauritius"},"Asia/Irkutsk":{"offset_value":32400,"offset_string":"UTC+9","readable_name":"+9:00 Irkutsk ( Asia )","name":"Asia/Irkutsk"},"America/Cuiaba":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Cuiaba ( America )","name":"America/Cuiaba"},"Asia/Sakhalin":{"offset_value":39600,"offset_string":"UTC+11","readable_name":"+11:00 Sakhalin ( Asia )","name":"Asia/Sakhalin"},"Pacific/Niue":{"offset_value":-39600,"offset_string":"UTC-11","readable_name":"-11:00 Niue ( Pacific )","name":"Pacific/Niue"},"America/Manaus":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Manaus ( America )","name":"America/Manaus"},"Africa/Sao_Tome":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Sao Tome ( Africa )","name":"Africa/Sao_Tome"},"Africa/Monrovia":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Monrovia ( Africa )","name":"Africa/Monrovia"},"Asia/Ho_Chi_Minh":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Ho Chi Minh ( Asia )","name":"Asia/Ho_Chi_Minh"},"America/Tijuana":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Tijuana ( America )","name":"America/Tijuana"},"Africa/Algiers":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Algiers ( Africa )","name":"Africa/Algiers"},"Europe/Riga":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Riga ( Europe )","name":"Europe/Riga"},"Europe/Vilnius":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Vilnius ( Europe )","name":"Europe/Vilnius"},"Asia/Colombo":{"offset_value":19800,"offset_string":"UTC+5:30","readable_name":"+5:30 Colombo ( Asia )","name":"Asia/Colombo"},"Antarctica/DumontDUrville":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 DumontDUrville ( Antarctica )","name":"Antarctica/DumontDUrville"},"America/Boise":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Boise ( America )","name":"America/Boise"},"Pacific/Pago_Pago":{"offset_value":-39600,"offset_string":"UTC-11","readable_name":"-11:00 Pago Pago ( Pacific )","name":"Pacific/Pago_Pago"},"Africa/Kampala":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Kampala ( Africa )","name":"Africa/Kampala"},"Indian/Christmas":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Christmas ( Indian )","name":"Indian/Christmas"},"Asia/Dubai":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Dubai ( Asia )","name":"Asia/Dubai"},"America/Dawson":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Dawson ( America )","name":"America/Dawson"},"Pacific/Kiritimati":{"offset_value":50400,"offset_string":"UTC+14","readable_name":"+14:00 Kiritimati ( Pacific )","name":"Pacific/Kiritimati"},"America/Bahia_Banderas":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Bahia Banderas ( America )","name":"America/Bahia_Banderas"},"America/Yakutat":{"offset_value":-28800,"offset_string":"UTC-8","readable_name":"-8:00 Yakutat ( America )","name":"America/Yakutat"},"Asia/Kabul":{"offset_value":16200,"offset_string":"UTC+4:30","readable_name":"+4:30 Kabul ( Asia )","name":"Asia/Kabul"},"America/Danmarkshavn":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Danmarkshavn ( America )","name":"America/Danmarkshavn"},"Europe/Uzhgorod":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Uzhgorod ( Europe )","name":"Europe/Uzhgorod"},"America/Glace_Bay":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Glace Bay ( America )","name":"America/Glace_Bay"},"Africa/Bissau":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Bissau ( Africa )","name":"Africa/Bissau"},"America/Kentucky/Louisville":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Louisville ( America/Kentucky )","name":"America/Kentucky/Louisville"},"Africa/Dar_es_Salaam":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Dar es Salaam ( Africa )","name":"Africa/Dar_es_Salaam"},"HST":{"offset_value":-36000,"offset_string":"UTC-10","readable_name":"-10:00 HST","name":"HST"},"Asia/Amman":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Amman ( Asia )","name":"Asia/Amman"},"Africa/El_Aaiun":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 El Aaiun ( Africa )","name":"Africa/El_Aaiun"},"America/Costa_Rica":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Costa Rica ( America )","name":"America/Costa_Rica"},"America/La_Paz":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 La Paz ( America )","name":"America/La_Paz"},"Pacific/Tongatapu":{"offset_value":46800,"offset_string":"UTC+13","readable_name":"+13:00 Tongatapu ( Pacific )","name":"Pacific/Tongatapu"},"America/Nipigon":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Nipigon ( America )","name":"America/Nipigon"},"Asia/Tbilisi":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Tbilisi ( Asia )","name":"Asia/Tbilisi"},"Africa/Tunis":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Tunis ( Africa )","name":"Africa/Tunis"},"Europe/Simferopol":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Simferopol ( Europe )","name":"Europe/Simferopol"},"Pacific/Guadalcanal":{"offset_value":39600,"offset_string":"UTC+11","readable_name":"+11:00 Guadalcanal ( Pacific )","name":"Pacific/Guadalcanal"},"America/Regina":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Regina ( America )","name":"America/Regina"},"Pacific/Enderbury":{"offset_value":46800,"offset_string":"UTC+13","readable_name":"+13:00 Enderbury ( Pacific )","name":"Pacific/Enderbury"},"Indian/Cocos":{"offset_value":23400,"offset_string":"UTC+6:30","readable_name":"+6:30 Cocos ( Indian )","name":"Indian/Cocos"},"Australia/Perth":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Perth ( Australia )","name":"Australia/Perth"},"CST6CDT":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 CST6CDT","name":"CST6CDT"},"Asia/Kolkata":{"offset_value":19800,"offset_string":"UTC+5:30","readable_name":"+5:30 Kolkata ( Asia )","name":"Asia/Kolkata"},"America/Argentina/Rio_Gallegos":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Rio Gallegos ( America/Argentina )","name":"America/Argentina/Rio_Gallegos"},"Asia/Phnom_Penh":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Phnom Penh ( Asia )","name":"Asia/Phnom_Penh"},"Asia/Magadan":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Magadan ( Asia )","name":"Asia/Magadan"},"America/Porto_Velho":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Porto Velho ( America )","name":"America/Porto_Velho"},"Atlantic/Canary":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Canary ( Atlantic )","name":"Atlantic/Canary"},"America/Kentucky/Monticello":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Monticello ( America/Kentucky )","name":"America/Kentucky/Monticello"},"Pacific/Chuuk":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Chuuk ( Pacific )","name":"Pacific/Chuuk"},"America/Swift_Current":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Swift Current ( America )","name":"America/Swift_Current"},"Europe/Minsk":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Minsk ( Europe )","name":"Europe/Minsk"},"Pacific/Palau":{"offset_value":32400,"offset_string":"UTC+9","readable_name":"+9:00 Palau ( Pacific )","name":"Pacific/Palau"},"Europe/Helsinki":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Helsinki ( Europe )","name":"Europe/Helsinki"},"Australia/Melbourne":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Melbourne ( Australia )","name":"Australia/Melbourne"},"America/Monterrey":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Monterrey ( America )","name":"America/Monterrey"},"America/Menominee":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Menominee ( America )","name":"America/Menominee"},"America/Cayenne":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Cayenne ( America )","name":"America/Cayenne"},"America/Miquelon":{"offset_value":-7200,"offset_string":"UTC-2","readable_name":"-2:00 Miquelon ( America )","name":"America/Miquelon"},"America/Iqaluit":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Iqaluit ( America )","name":"America/Iqaluit"},"Asia/Novosibirsk":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Novosibirsk ( Asia )","name":"Asia/Novosibirsk"},"Australia/Adelaide":{"offset_value":34200,"offset_string":"UTC+9:30","readable_name":"+9:30 Adelaide ( Australia )","name":"Australia/Adelaide"},"Pacific/Rarotonga":{"offset_value":-36000,"offset_string":"UTC-10","readable_name":"-10:00 Rarotonga ( Pacific )","name":"Pacific/Rarotonga"},"Europe/Moscow":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Moscow ( Europe )","name":"Europe/Moscow"},"Europe/Amsterdam":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Amsterdam ( Europe )","name":"Europe/Amsterdam"},"Europe/Malta":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Malta ( Europe )","name":"Europe/Malta"},"Indian/Kerguelen":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Kerguelen ( Indian )","name":"Indian/Kerguelen"},"Africa/Tripoli":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Tripoli ( Africa )","name":"Africa/Tripoli"},"Africa/Banjul":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Banjul ( Africa )","name":"Africa/Banjul"},"Asia/Urumqi":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Urumqi ( Asia )","name":"Asia/Urumqi"},"Africa/Khartoum":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Khartoum ( Africa )","name":"Africa/Khartoum"},"Africa/Libreville":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Libreville ( Africa )","name":"Africa/Libreville"},"America/Recife":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Recife ( America )","name":"America/Recife"},"America/Argentina/La_Rioja":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 La Rioja ( America/Argentina )","name":"America/Argentina/La_Rioja"},"Europe/Paris":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Paris ( Europe )","name":"Europe/Paris"},"Indian/Mayotte":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Mayotte ( Indian )","name":"Indian/Mayotte"},"PST8PDT":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 PST8PDT","name":"PST8PDT"},"Pacific/Funafuti":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Funafuti ( Pacific )","name":"Pacific/Funafuti"},"America/Argentina/Salta":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Salta ( America/Argentina )","name":"America/Argentina/Salta"},"Europe/Berlin":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Berlin ( Europe )","name":"Europe/Berlin"},"Asia/Choibalsan":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Choibalsan ( Asia )","name":"Asia/Choibalsan"},"America/Montevideo":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Montevideo ( America )","name":"America/Montevideo"},"Africa/Djibouti":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Djibouti ( Africa )","name":"Africa/Djibouti"},"America/Belize":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Belize ( America )","name":"America/Belize"},"America/Argentina/San_Juan":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 San Juan ( America/Argentina )","name":"America/Argentina/San_Juan"},"America/Thunder_Bay":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Thunder Bay ( America )","name":"America/Thunder_Bay"},"Asia/Hovd":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Hovd ( Asia )","name":"Asia/Hovd"},"Indian/Maldives":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Maldives ( Indian )","name":"Indian/Maldives"},"Asia/Novokuznetsk":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Novokuznetsk ( Asia )","name":"Asia/Novokuznetsk"},"Australia/Eucla":{"offset_value":31500,"offset_string":"UTC+8:45","readable_name":"+8:45 Eucla ( Australia )","name":"Australia/Eucla"},"America/Toronto":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Toronto ( America )","name":"America/Toronto"},"Pacific/Galapagos":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Galapagos ( Pacific )","name":"Pacific/Galapagos"},"Asia/Tehran":{"offset_value":16200,"offset_string":"UTC+4:30","readable_name":"+4:30 Tehran ( Asia )","name":"Asia/Tehran"},"Asia/Aden":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Aden ( Asia )","name":"Asia/Aden"},"America/Martinique":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Martinique ( America )","name":"America/Martinique"},"Africa/Malabo":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Malabo ( Africa )","name":"Africa/Malabo"},"America/Chihuahua":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Chihuahua ( America )","name":"America/Chihuahua"},"Australia/Sydney":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Sydney ( Australia )","name":"Australia/Sydney"},"America/Moncton":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Moncton ( America )","name":"America/Moncton"},"America/Goose_Bay":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Goose Bay ( America )","name":"America/Goose_Bay"},"America/Detroit":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Detroit ( America )","name":"America/Detroit"},"Australia/Lindeman":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Lindeman ( Australia )","name":"Australia/Lindeman"},"Africa/Mbabane":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Mbabane ( Africa )","name":"Africa/Mbabane"},"Africa/Lubumbashi":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Lubumbashi ( Africa )","name":"Africa/Lubumbashi"},"America/Asuncion":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Asuncion ( America )","name":"America/Asuncion"},"Antarctica/Vostok":{"offset_value":21600,"offset_string":"UTC+6","readable_name":"+6:00 Vostok ( Antarctica )","name":"Antarctica/Vostok"},"Africa/Lome":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Lome ( Africa )","name":"Africa/Lome"},"America/Indiana/Petersburg":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Petersburg ( America/Indiana )","name":"America/Indiana/Petersburg"},"Asia/Harbin":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Harbin ( Asia )","name":"Asia/Harbin"},"Asia/Tashkent":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Tashkent ( Asia )","name":"Asia/Tashkent"},"America/Montreal":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Montreal ( America )","name":"America/Montreal"},"Atlantic/St_Helena":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 St Helena ( Atlantic )","name":"Atlantic/St_Helena"},"Africa/Brazzaville":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Brazzaville ( Africa )","name":"Africa/Brazzaville"},"Pacific/Saipan":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Saipan ( Pacific )","name":"Pacific/Saipan"},"Antarctica/Macquarie":{"offset_value":39600,"offset_string":"UTC+11","readable_name":"+11:00 Macquarie ( Antarctica )","name":"Antarctica/Macquarie"},"America/Edmonton":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Edmonton ( America )","name":"America/Edmonton"},"Asia/Yerevan":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Yerevan ( Asia )","name":"Asia/Yerevan"},"Africa/Dakar":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Dakar ( Africa )","name":"Africa/Dakar"},"Europe/London":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 London ( Europe )","name":"Europe/London"},"America/Anguilla":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Anguilla ( America )","name":"America/Anguilla"},"America/Indiana/Indianapolis":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Indianapolis ( America/Indiana )","name":"America/Indiana/Indianapolis"},"Asia/Aqtobe":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Aqtobe ( Asia )","name":"Asia/Aqtobe"},"Africa/Bamako":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Bamako ( Africa )","name":"Africa/Bamako"},"Australia/Lord_Howe":{"offset_value":37800,"offset_string":"UTC+10:30","readable_name":"+10:30 Lord Howe ( Australia )","name":"Australia/Lord_Howe"},"Europe/Rome":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Rome ( Europe )","name":"Europe/Rome"},"Europe/Budapest":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Budapest ( Europe )","name":"Europe/Budapest"},"Pacific/Fakaofo":{"offset_value":-36000,"offset_string":"UTC-10","readable_name":"-10:00 Fakaofo ( Pacific )","name":"Pacific/Fakaofo"},"MST":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 MST","name":"MST"},"Africa/Maseru":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Maseru ( Africa )","name":"Africa/Maseru"},"Europe/Oslo":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Oslo ( Europe )","name":"Europe/Oslo"},"Africa/Asmara":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Asmara ( Africa )","name":"Africa/Asmara"},"Africa/Douala":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Douala ( Africa )","name":"Africa/Douala"},"America/Merida":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Merida ( America )","name":"America/Merida"},"Asia/Brunei":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Brunei ( Asia )","name":"Asia/Brunei"},"Asia/Rangoon":{"offset_value":23400,"offset_string":"UTC+6:30","readable_name":"+6:30 Rangoon ( Asia )","name":"Asia/Rangoon"},"America/Thule":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Thule ( America )","name":"America/Thule"},"Asia/Macau":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Macau ( Asia )","name":"Asia/Macau"},"Asia/Oral":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Oral ( Asia )","name":"Asia/Oral"},"America/Cancun":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Cancun ( America )","name":"America/Cancun"},"Asia/Singapore":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Singapore ( Asia )","name":"Asia/Singapore"},"Asia/Chongqing":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Chongqing ( Asia )","name":"Asia/Chongqing"},"America/Maceio":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Maceio ( America )","name":"America/Maceio"},"America/St_Vincent":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 St Vincent ( America )","name":"America/St_Vincent"},"America/North_Dakota/Center":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Center ( America/North Dakota )","name":"America/North_Dakota/Center"},"Pacific/Easter":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Easter ( Pacific )","name":"Pacific/Easter"},"Europe/Prague":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Prague ( Europe )","name":"Europe/Prague"},"Africa/Johannesburg":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Johannesburg ( Africa )","name":"Africa/Johannesburg"},"America/Resolute":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Resolute ( America )","name":"America/Resolute"},"America/Indiana/Winamac":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Winamac ( America/Indiana )","name":"America/Indiana/Winamac"},"Pacific/Noumea":{"offset_value":39600,"offset_string":"UTC+11","readable_name":"+11:00 Noumea ( Pacific )","name":"Pacific/Noumea"},"Asia/Bishkek":{"offset_value":21600,"offset_string":"UTC+6","readable_name":"+6:00 Bishkek ( Asia )","name":"Asia/Bishkek"},"Pacific/Chatham":{"offset_value":45900,"offset_string":"UTC+12:45","readable_name":"+12:45 Chatham ( Pacific )","name":"Pacific/Chatham"},"America/Dominica":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Dominica ( America )","name":"America/Dominica"},"America/Eirunepe":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Eirunepe ( America )","name":"America/Eirunepe"},"America/Rankin_Inlet":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Rankin Inlet ( America )","name":"America/Rankin_Inlet"},"Atlantic/South_Georgia":{"offset_value":-7200,"offset_string":"UTC-2","readable_name":"-2:00 South Georgia ( Atlantic )","name":"Atlantic/South_Georgia"},"America/Cambridge_Bay":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Cambridge Bay ( America )","name":"America/Cambridge_Bay"},"Pacific/Tarawa":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Tarawa ( Pacific )","name":"Pacific/Tarawa"},"Pacific/Pitcairn":{"offset_value":-28800,"offset_string":"UTC-8","readable_name":"-8:00 Pitcairn ( Pacific )","name":"Pacific/Pitcairn"},"Pacific/Efate":{"offset_value":39600,"offset_string":"UTC+11","readable_name":"+11:00 Efate ( Pacific )","name":"Pacific/Efate"},"Asia/Yakutsk":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Yakutsk ( Asia )","name":"Asia/Yakutsk"},"America/Araguaina":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Araguaina ( America )","name":"America/Araguaina"},"Atlantic/Cape_Verde":{"offset_value":-3600,"offset_string":"UTC-1","readable_name":"-1:00 Cape Verde ( Atlantic )","name":"Atlantic/Cape_Verde"},"Africa/Gaborone":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Gaborone ( Africa )","name":"Africa/Gaborone"},"Pacific/Johnston":{"offset_value":-36000,"offset_string":"UTC-10","readable_name":"-10:00 Johnston ( Pacific )","name":"Pacific/Johnston"},"America/Argentina/Jujuy":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Jujuy ( America/Argentina )","name":"America/Argentina/Jujuy"},"Africa/Cairo":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Cairo ( Africa )","name":"Africa/Cairo"},"Africa/Windhoek":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Windhoek ( Africa )","name":"Africa/Windhoek"},"America/Winnipeg":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Winnipeg ( America )","name":"America/Winnipeg"},"America/St_Lucia":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 St Lucia ( America )","name":"America/St_Lucia"},"Africa/Casablanca":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Casablanca ( Africa )","name":"Africa/Casablanca"},"Africa/Kigali":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Kigali ( Africa )","name":"Africa/Kigali"},"Asia/Vientiane":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Vientiane ( Asia )","name":"Asia/Vientiane"},"Africa/Bangui":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Bangui ( Africa )","name":"Africa/Bangui"},"Asia/Ashgabat":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Ashgabat ( Asia )","name":"Asia/Ashgabat"},"Africa/Nouakchott":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Nouakchott ( Africa )","name":"Africa/Nouakchott"},"America/Argentina/Tucuman":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Tucuman ( America/Argentina )","name":"America/Argentina/Tucuman"},"Europe/Gibraltar":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Gibraltar ( Europe )","name":"Europe/Gibraltar"},"America/Pangnirtung":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Pangnirtung ( America )","name":"America/Pangnirtung"},"America/Sao_Paulo":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Sao Paulo ( America )","name":"America/Sao_Paulo"},"Pacific/Midway":{"offset_value":-39600,"offset_string":"UTC-11","readable_name":"-11:00 Midway ( Pacific )","name":"Pacific/Midway"},"Europe/Andorra":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Andorra ( Europe )","name":"Europe/Andorra"},"Asia/Nicosia":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Nicosia ( Asia )","name":"Asia/Nicosia"},"Asia/Riyadh":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Riyadh ( Asia )","name":"Asia/Riyadh"},"Europe/Volgograd":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Volgograd ( Europe )","name":"Europe/Volgograd"},"Europe/Athens":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Athens ( Europe )","name":"Europe/Athens"},"Asia/Qyzylorda":{"offset_value":21600,"offset_string":"UTC+6","readable_name":"+6:00 Qyzylorda ( Asia )","name":"Asia/Qyzylorda"},"Asia/Gaza":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Gaza ( Asia )","name":"Asia/Gaza"},"Asia/Omsk":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Omsk ( Asia )","name":"Asia/Omsk"},"Asia/Tokyo":{"offset_value":32400,"offset_string":"UTC+9","readable_name":"+9:00 Tokyo ( Asia )","name":"Asia/Tokyo"},"America/Sitka":{"offset_value":-28800,"offset_string":"UTC-8","readable_name":"-8:00 Sitka ( America )","name":"America/Sitka"},"Asia/Thimphu":{"offset_value":21600,"offset_string":"UTC+6","readable_name":"+6:00 Thimphu ( Asia )","name":"Asia/Thimphu"},"Asia/Jayapura":{"offset_value":32400,"offset_string":"UTC+9","readable_name":"+9:00 Jayapura ( Asia )","name":"Asia/Jayapura"},"Antarctica/Syowa":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Syowa ( Antarctica )","name":"Antarctica/Syowa"},"America/Port-au-Prince":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Port-au-Prince ( America )","name":"America/Port-au-Prince"},"Asia/Damascus":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Damascus ( Asia )","name":"Asia/Damascus"},"America/Indiana/Marengo":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Marengo ( America/Indiana )","name":"America/Indiana/Marengo"},"Asia/Qatar":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Qatar ( Asia )","name":"Asia/Qatar"},"Europe/Sofia":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Sofia ( Europe )","name":"Europe/Sofia"},"America/Fortaleza":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Fortaleza ( America )","name":"America/Fortaleza"},"America/Mexico_City":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Mexico City ( America )","name":"America/Mexico_City"},"Atlantic/Azores":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Azores ( Atlantic )","name":"Atlantic/Azores"},"America/Belem":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Belem ( America )","name":"America/Belem"},"Asia/Hong_Kong":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Hong Kong ( Asia )","name":"Asia/Hong_Kong"},"America/Godthab":{"offset_value":-7200,"offset_string":"UTC-2","readable_name":"-2:00 Godthab ( America )","name":"America/Godthab"},"America/Nome":{"offset_value":-28800,"offset_string":"UTC-8","readable_name":"-8:00 Nome ( America )","name":"America/Nome"},"Antarctica/Davis":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Davis ( Antarctica )","name":"Antarctica/Davis"},"America/Scoresbysund":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Scoresbysund ( America )","name":"America/Scoresbysund"},"Australia/Brisbane":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Brisbane ( Australia )","name":"Australia/Brisbane"},"Africa/Lagos":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Lagos ( Africa )","name":"Africa/Lagos"},"Asia/Baku":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Baku ( Asia )","name":"Asia/Baku"},"Asia/Kuala_Lumpur":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Kuala Lumpur ( Asia )","name":"Asia/Kuala_Lumpur"},"Indian/Chagos":{"offset_value":21600,"offset_string":"UTC+6","readable_name":"+6:00 Chagos ( Indian )","name":"Indian/Chagos"},"EST5EDT":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 EST5EDT","name":"EST5EDT"},"Asia/Yekaterinburg":{"offset_value":21600,"offset_string":"UTC+6","readable_name":"+6:00 Yekaterinburg ( Asia )","name":"Asia/Yekaterinburg"},"America/Vancouver":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Vancouver ( America )","name":"America/Vancouver"},"Pacific/Port_Moresby":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Port Moresby ( Pacific )","name":"Pacific/Port_Moresby"},"America/Phoenix":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Phoenix ( America )","name":"America/Phoenix"},"Europe/Copenhagen":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Copenhagen ( Europe )","name":"Europe/Copenhagen"},"Antarctica/McMurdo":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 McMurdo ( Antarctica )","name":"Antarctica/McMurdo"},"Asia/Almaty":{"offset_value":21600,"offset_string":"UTC+6","readable_name":"+6:00 Almaty ( Asia )","name":"Asia/Almaty"},"Asia/Kathmandu":{"offset_value":20700,"offset_string":"UTC+5:45","readable_name":"+5:45 Kathmandu ( Asia )","name":"Asia/Kathmandu"},"Asia/Dili":{"offset_value":32400,"offset_string":"UTC+9","readable_name":"+9:00 Dili ( Asia )","name":"Asia/Dili"},"America/Argentina/Catamarca":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Catamarca ( America/Argentina )","name":"America/Argentina/Catamarca"},"America/Adak":{"offset_value":-32400,"offset_string":"UTC-9","readable_name":"-9:00 Adak ( America )","name":"America/Adak"},"WET":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 WET","name":"WET"},"America/Caracas":{"offset_value":-16200,"offset_string":"UTC-4:30","readable_name":"-4:30 Caracas ( America )","name":"America/Caracas"},"America/Curacao":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Curacao ( America )","name":"America/Curacao"},"America/Tegucigalpa":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Tegucigalpa ( America )","name":"America/Tegucigalpa"},"Pacific/Honolulu":{"offset_value":-36000,"offset_string":"UTC-10","readable_name":"-10:00 Honolulu ( Pacific )","name":"Pacific/Honolulu"},"Pacific/Wallis":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Wallis ( Pacific )","name":"Pacific/Wallis"},"Africa/Niamey":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Niamey ( Africa )","name":"Africa/Niamey"},"Europe/Tirane":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Tirane ( Europe )","name":"Europe/Tirane"},"America/Ojinaga":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Ojinaga ( America )","name":"America/Ojinaga"},"America/Guatemala":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Guatemala ( America )","name":"America/Guatemala"},"America/Rio_Branco":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Rio Branco ( America )","name":"America/Rio_Branco"},"Africa/Ceuta":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Ceuta ( Africa )","name":"Africa/Ceuta"},"America/Argentina/San_Luis":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 San Luis ( America/Argentina )","name":"America/Argentina/San_Luis"},"Africa/Maputo":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Maputo ( Africa )","name":"Africa/Maputo"},"America/Santa_Isabel":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Santa Isabel ( America )","name":"America/Santa_Isabel"},"America/Managua":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Managua ( America )","name":"America/Managua"},"America/Noronha":{"offset_value":-7200,"offset_string":"UTC-2","readable_name":"-2:00 Noronha ( America )","name":"America/Noronha"},"America/Santiago":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Santiago ( America )","name":"America/Santiago"},"Europe/Lisbon":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Lisbon ( Europe )","name":"Europe/Lisbon"},"America/Campo_Grande":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Campo Grande ( America )","name":"America/Campo_Grande"},"Asia/Kamchatka":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Kamchatka ( Asia )","name":"Asia/Kamchatka"},"America/Lima":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Lima ( America )","name":"America/Lima"},"Asia/Bangkok":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Bangkok ( Asia )","name":"Asia/Bangkok"},"CET":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 CET","name":"CET"},"Australia/Darwin":{"offset_value":34200,"offset_string":"UTC+9:30","readable_name":"+9:30 Darwin ( Australia )","name":"Australia/Darwin"},"America/Metlakatla":{"offset_value":-25200,"offset_string":"UTC-7","readable_name":"-7:00 Metlakatla ( America )","name":"America/Metlakatla"},"Europe/Luxembourg":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Luxembourg ( Europe )","name":"Europe/Luxembourg"},"Asia/Seoul":{"offset_value":32400,"offset_string":"UTC+9","readable_name":"+9:00 Seoul ( Asia )","name":"Asia/Seoul"},"Atlantic/Faroe":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Faroe ( Atlantic )","name":"Atlantic/Faroe"},"America/Boa_Vista":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Boa Vista ( America )","name":"America/Boa_Vista"},"Pacific/Apia":{"offset_value":-39600,"offset_string":"UTC-11","readable_name":"-11:00 Apia ( Pacific )","name":"Pacific/Apia"},"Europe/Monaco":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Monaco ( Europe )","name":"Europe/Monaco"},"Antarctica/Mawson":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Mawson ( Antarctica )","name":"Antarctica/Mawson"},"America/Argentina/Buenos_Aires":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Buenos Aires ( America/Argentina )","name":"America/Argentina/Buenos_Aires"},"Europe/Kiev":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Kiev ( Europe )","name":"Europe/Kiev"},"America/Santo_Domingo":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Santo Domingo ( America )","name":"America/Santo_Domingo"},"Asia/Jakarta":{"offset_value":25200,"offset_string":"UTC+7","readable_name":"+7:00 Jakarta ( Asia )","name":"Asia/Jakarta"},"Africa/Ndjamena":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Ndjamena ( Africa )","name":"Africa/Ndjamena"},"America/Guayaquil":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Guayaquil ( America )","name":"America/Guayaquil"},"America/Chicago":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Chicago ( America )","name":"America/Chicago"},"Europe/Samara":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Samara ( Europe )","name":"Europe/Samara"},"America/Indiana/Tell_City":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Tell City ( America/Indiana )","name":"America/Indiana/Tell_City"},"Europe/Zaporozhye":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Zaporozhye ( Europe )","name":"Europe/Zaporozhye"},"America/Denver":{"offset_value":-21600,"offset_string":"UTC-6","readable_name":"-6:00 Denver ( America )","name":"America/Denver"},"Pacific/Auckland":{"offset_value":43200,"offset_string":"UTC+12","readable_name":"+12:00 Auckland ( Pacific )","name":"Pacific/Auckland"},"Europe/Vienna":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Vienna ( Europe )","name":"Europe/Vienna"},"America/Grand_Turk":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Grand Turk ( America )","name":"America/Grand_Turk"},"America/Argentina/Ushuaia":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Ushuaia ( America/Argentina )","name":"America/Argentina/Ushuaia"},"Asia/Kuching":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Kuching ( Asia )","name":"Asia/Kuching"},"America/Aruba":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Aruba ( America )","name":"America/Aruba"},"Asia/Karachi":{"offset_value":18000,"offset_string":"UTC+5","readable_name":"+5:00 Karachi ( Asia )","name":"Asia/Karachi"},"Africa/Accra":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Accra ( Africa )","name":"Africa/Accra"},"America/Port_of_Spain":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Port of Spain ( America )","name":"America/Port_of_Spain"},"America/Anchorage":{"offset_value":-28800,"offset_string":"UTC-8","readable_name":"-8:00 Anchorage ( America )","name":"America/Anchorage"},"America/North_Dakota/Beulah":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Beulah ( America/North Dakota )","name":"America/North_Dakota/Beulah"},"America/Paramaribo":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Paramaribo ( America )","name":"America/Paramaribo"},"Asia/Taipei":{"offset_value":28800,"offset_string":"UTC+8","readable_name":"+8:00 Taipei ( Asia )","name":"Asia/Taipei"},"Antarctica/Rothera":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Rothera ( Antarctica )","name":"Antarctica/Rothera"},"Europe/Dublin":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Dublin ( Europe )","name":"Europe/Dublin"},"Atlantic/Bermuda":{"offset_value":-10800,"offset_string":"UTC-3","readable_name":"-3:00 Bermuda ( Atlantic )","name":"Atlantic/Bermuda"},"Africa/Freetown":{"offset_value":0,"offset_string":"UTC","readable_name":"+0:00 Freetown ( Africa )","name":"Africa/Freetown"},"Pacific/Kosrae":{"offset_value":39600,"offset_string":"UTC+11","readable_name":"+11:00 Kosrae ( Pacific )","name":"Pacific/Kosrae"},"Europe/Tallinn":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 Tallinn ( Europe )","name":"Europe/Tallinn"},"Pacific/Gambier":{"offset_value":-32400,"offset_string":"UTC-9","readable_name":"-9:00 Gambier ( Pacific )","name":"Pacific/Gambier"},"Australia/Hobart":{"offset_value":36000,"offset_string":"UTC+10","readable_name":"+10:00 Hobart ( Australia )","name":"Australia/Hobart"},"Indian/Reunion":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Reunion ( Indian )","name":"Indian/Reunion"},"America/Montserrat":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Montserrat ( America )","name":"America/Montserrat"},"America/Panama":{"offset_value":-18000,"offset_string":"UTC-5","readable_name":"-5:00 Panama ( America )","name":"America/Panama"},"Europe/Zurich":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Zurich ( Europe )","name":"Europe/Zurich"},"EET":{"offset_value":10800,"offset_string":"UTC+3","readable_name":"+3:00 EET","name":"EET"},"America/Tortola":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Tortola ( America )","name":"America/Tortola"},"Atlantic/Madeira":{"offset_value":3600,"offset_string":"UTC+1","readable_name":"+1:00 Madeira ( Atlantic )","name":"Atlantic/Madeira"},"America/Puerto_Rico":{"offset_value":-14400,"offset_string":"UTC-4","readable_name":"-4:00 Puerto Rico ( America )","name":"America/Puerto_Rico"},"Indian/Mahe":{"offset_value":14400,"offset_string":"UTC+4","readable_name":"+4:00 Mahe ( Indian )","name":"Indian/Mahe"},"Europe/Stockholm":{"offset_value":7200,"offset_string":"UTC+2","readable_name":"+2:00 Stockholm ( Europe )","name":"Europe/Stockholm"}},"choices":["Pacific/Apia","Pacific/Midway","Pacific/Niue","Pacific/Pago_Pago","HST","Pacific/Fakaofo","Pacific/Honolulu","Pacific/Johnston","Pacific/Rarotonga","Pacific/Tahiti","Pacific/Marquesas","America/Adak","Pacific/Gambier","America/Anchorage","America/Juneau","America/Nome","America/Sitka","America/Yakutat","Pacific/Pitcairn","America/Dawson","America/Dawson_Creek","America/Hermosillo","America/Los_Angeles","America/Metlakatla","America/Phoenix","America/Santa_Isabel","America/Tijuana","America/Vancouver","America/Whitehorse","MST","PST8PDT","America/Belize","America/Boise","America/Cambridge_Bay","America/Chihuahua","America/Costa_Rica","America/Denver","America/Edmonton","America/El_Salvador","America/Guatemala","America/Inuvik","America/Managua","America/Mazatlan","America/Ojinaga","America/Regina","America/Swift_Current","America/Tegucigalpa","America/Yellowknife","MST7MDT","Pacific/Easter","Pacific/Galapagos","America/Atikokan","America/Bahia_Banderas","America/Bogota","America/Cancun","America/Cayman","America/Chicago","America/Guayaquil","America/Indiana/Knox","America/Indiana/Tell_City","America/Jamaica","America/Lima","America/Matamoros","America/Menominee","America/Merida","America/Mexico_City","America/Monterrey","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Panama","America/Port-au-Prince","America/Rainy_River","America/Rankin_Inlet","America/Resolute","America/Winnipeg","CST6CDT","EST","America/Caracas","America/Anguilla","America/Antigua","America/Aruba","America/Asuncion","America/Barbados","America/Blanc-Sablon","America/Boa_Vista","America/Campo_Grande","America/Cuiaba","America/Curacao","America/Detroit","America/Dominica","America/Eirunepe","America/Grand_Turk","America/Grenada","America/Guadeloupe","America/Guyana","America/Havana","America/Indiana/Indianapolis","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Iqaluit","America/Kentucky/Louisville","America/Kentucky/Monticello","America/La_Paz","America/Manaus","America/Martinique","America/Montreal","America/Montserrat","America/Nassau","America/New_York","America/Nipigon","America/Pangnirtung","America/Port_of_Spain","America/Porto_Velho","America/Puerto_Rico","America/Rio_Branco","America/Santiago","America/Santo_Domingo","America/St_Kitts","America/St_Lucia","America/St_Thomas","America/St_Vincent","America/Thunder_Bay","America/Toronto","America/Tortola","Antarctica/Palmer","Atlantic/Stanley","EST5EDT","America/Araguaina","America/Argentina/Buenos_Aires","America/Argentina/Catamarca","America/Argentina/Cordoba","America/Argentina/Jujuy","America/Argentina/La_Rioja","America/Argentina/Mendoza","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Bahia","America/Belem","America/Cayenne","America/Fortaleza","America/Glace_Bay","America/Goose_Bay","America/Halifax","America/Maceio","America/Moncton","America/Montevideo","America/Paramaribo","America/Recife","America/Santarem","America/Sao_Paulo","America/Thule","Antarctica/Rothera","Atlantic/Bermuda","America/St_Johns","America/Godthab","America/Miquelon","America/Noronha","Atlantic/South_Georgia","Atlantic/Cape_Verde","Africa/Abidjan","Africa/Accra","Africa/Bamako","Africa/Banjul","Africa/Bissau","Africa/Casablanca","Africa/Conakry","Africa/Dakar","Africa/El_Aaiun","Africa/Freetown","Africa/Lome","Africa/Monrovia","Africa/Nouakchott","Africa/Ouagadougou","Africa/Sao_Tome","America/Danmarkshavn","America/Scoresbysund","Atlantic/Azores","Atlantic/Reykjavik","Atlantic/St_Helena","UTC","Africa/Algiers","Africa/Bangui","Africa/Brazzaville","Africa/Douala","Africa/Kinshasa","Africa/Lagos","Africa/Libreville","Africa/Luanda","Africa/Malabo","Africa/Ndjamena","Africa/Niamey","Africa/Porto-Novo","Africa/Tunis","Africa/Windhoek","Atlantic/Canary","Atlantic/Faroe","Atlantic/Madeira","Europe/Dublin","Europe/Lisbon","Europe/London","WET","Africa/Blantyre","Africa/Bujumbura","Africa/Cairo","Africa/Ceuta","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Kigali","Africa/Lubumbashi","Africa/Lusaka","Africa/Maputo","Africa/Maseru","Africa/Mbabane","Africa/Tripoli","CET","Europe/Amsterdam","Europe/Andorra","Europe/Belgrade","Europe/Berlin","Europe/Brussels","Europe/Budapest","Europe/Copenhagen","Europe/Gibraltar","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Monaco","Europe/Oslo","Europe/Paris","Europe/Prague","Europe/Rome","Europe/Stockholm","Europe/Tirane","Europe/Vaduz","Europe/Vienna","Europe/Warsaw","Europe/Zurich","MET","Africa/Addis_Ababa","Africa/Asmara","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Kampala","Africa/Khartoum","Africa/Mogadishu","Africa/Nairobi","Antarctica/Syowa","Asia/Aden","Asia/Amman","Asia/Baghdad","Asia/Bahrain","Asia/Beirut","Asia/Damascus","Asia/Gaza","Asia/Jerusalem","Asia/Kuwait","Asia/Nicosia","Asia/Qatar","Asia/Riyadh","EET","Europe/Athens","Europe/Bucharest","Europe/Chisinau","Europe/Helsinki","Europe/Istanbul","Europe/Kaliningrad","Europe/Kiev","Europe/Minsk","Europe/Riga","Europe/Simferopol","Europe/Sofia","Europe/Tallinn","Europe/Uzhgorod","Europe/Vilnius","Europe/Zaporozhye","Indian/Antananarivo","Indian/Comoro","Indian/Mayotte","Asia/Dubai","Asia/Muscat","Asia/Tbilisi","Europe/Moscow","Europe/Samara","Europe/Volgograd","Indian/Mahe","Indian/Mauritius","Indian/Reunion","Asia/Kabul","Asia/Tehran","Antarctica/Mawson","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Baku","Asia/Dushanbe","Asia/Karachi","Asia/Oral","Asia/Samarkand","Asia/Tashkent","Asia/Yerevan","Indian/Kerguelen","Indian/Maldives","Asia/Colombo","Asia/Kolkata","Asia/Kathmandu","Antarctica/Vostok","Asia/Almaty","Asia/Bishkek","Asia/Dhaka","Asia/Qyzylorda","Asia/Thimphu","Asia/Yekaterinburg","Indian/Chagos","Asia/Rangoon","Indian/Cocos","Antarctica/Davis","Asia/Bangkok","Asia/Ho_Chi_Minh","Asia/Hovd","Asia/Jakarta","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Phnom_Penh","Asia/Pontianak","Asia/Vientiane","Indian/Christmas","Antarctica/Casey","Asia/Brunei","Asia/Choibalsan","Asia/Chongqing","Asia/Harbin","Asia/Hong_Kong","Asia/Kashgar","Asia/Krasnoyarsk","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Macau","Asia/Makassar","Asia/Manila","Asia/Shanghai","Asia/Singapore","Asia/Taipei","Asia/Ulaanbaatar","Asia/Urumqi","Australia/Perth","Australia/Eucla","Asia/Dili","Asia/Irkutsk","Asia/Jayapura","Asia/Pyongyang","Asia/Seoul","Asia/Tokyo","Pacific/Palau","Australia/Adelaide","Australia/Broken_Hill","Australia/Darwin","Antarctica/DumontDUrville","Asia/Yakutsk","Australia/Brisbane","Australia/Currie","Australia/Hobart","Australia/Lindeman","Australia/Melbourne","Australia/Sydney","Pacific/Chuuk","Pacific/Guam","Pacific/Port_Moresby","Pacific/Saipan","Australia/Lord_Howe","Antarctica/Macquarie","Asia/Sakhalin","Asia/Vladivostok","Pacific/Efate","Pacific/Guadalcanal","Pacific/Kosrae","Pacific/Noumea","Pacific/Pohnpei","Pacific/Norfolk","Antarctica/McMurdo","Asia/Anadyr","Asia/Kamchatka","Asia/Magadan","Pacific/Auckland","Pacific/Fiji","Pacific/Funafuti","Pacific/Kwajalein","Pacific/Majuro","Pacific/Nauru","Pacific/Tarawa","Pacific/Wake","Pacific/Wallis","Pacific/Chatham","Pacific/Enderbury","Pacific/Tongatapu","Pacific/Kiritimati"]},
    //"

    no_login_pages : [
        'meetme',
        'matchmaker_fragment',
        'underConstruction'
    ],

    defaults : {
        url_scheme : /^1\./.test( window.AG_CLIENT_VERSION || '1.0.0' ) ? 'meetings://' : 'steroids-scanner://',
        api_host : window.production_mode ? 'https://api.meetin.gs' : 'https://api-dev.meetin.gs',
        desktop_link : window.production_mode ? 'https://meetin.gs/meetings_global/detect' : 'https://dev.meetin.gs/meetings_global/detect',
        return_host : 'http://' + location.host,
        version : 2,
        version_check_url : window.production_mode ? 'http://versions.meetin.gs/'+ window.build_mode +'/current.json' : 'http://versions.meetin.gs/'+ window.build_mode +'/current-dev.json' // affected build_modes: ios & android
    },

    options: {

        // Appmode will be web, ios or android
        build : window.build_mode
    },

    models : {},
    collections : {},
    views : {},
    router : null,
    mixins : {},
    helpers : {
        validEmail : function(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            emailAddress = emailAddress.replace(/\".*\" \<(.*)\>|(.*)/, '$1$2');
            return pattern.test(emailAddress);
        },

        dateString : function(time, offset) {
            var o = offset || 0;
            return moment.utc(time + o * 1000).format('dddd, MMM DD');
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
        // TODO: Hack router to work without history too
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
                AppGyver.switchContext("loginPage", {id : ''} );
                return false;
            }
        }
    },

    _doRedirects : function() {
        var redirect_meeting = this._getUrlParamByName('redirect_to_meeting');
        var redirect_matchmaking_confirmed = this._getUrlParamByName('confirmed_matchmaker_lock_id');
        var matchmaking_response = this._getUrlParamByName('matchmaking_response');
        var matchmaker_fragment = this._getUrlParamByName('matchmaker_fragment');
        var user_fragment = this._getUrlParamByName('user_fragment');
        var under_construction_url = this._getUrlParamByName('under_construction_url');
        var under_construction_message = this._getUrlParamByName('under_construction_message');
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
            chosen_redirect = [ 'underConstruction', { url : under_construction_url, message : under_construction_message || '' } ];
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
            if( matchmaker_fragment ) {
                chosen_redirect = ['meetmeCalendar', { user : user_fragment, cal : matchmaker_fragment } ];
            }
            else {
                chosen_redirect = ['meetmeCover', { user : user_fragment } ];
            }
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
                    AppGyver.switchContext( 'profilePage', { context_after_tos_accept : JSON.stringify( chosen_redirect ) } );
                }
            } );
        }

        if ( chosen_redirect ) {
            AppGyver.switchContext.apply( AppGyver, chosen_redirect );
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
        if( app.options.build === 'web' ) {
            var win=window.open(normurl, '_blank');
            win.focus();
            return;
        }
        document.location = appurl;
        var time = (new Date()).getTime();
        setTimeout(function(){
            var now = (new Date()).getTime();
            if((now-time) < 400) {
                document.location = normurl;
            }
        }, 300);
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

        if ( app.options.build !== 'web' ) {
            host = app.defaults.url_scheme;
        }

        var to_url = host + AppGyver.formContextRedirectUrl( context, redirect_params );
        var params = [
            { key : "client_id", "value" : "584216729178.apps.googleusercontent.com" },
            { key : "response_type", "value" : "code" },
            { key : "access_type", "value" : "offline" },
            { key : "scope", value : "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.google.com/calendar/feeds/ https://www.google.com/m8/feeds" },
            { key : "state", value : JSON.stringify( { to : to_url, redirect_uri : redirect_uri } ) },
            { key : "approval_prompt", "value" : "force" },
            { key : "redirect_uri", "value" : redirect_uri }
        ];

        var string_params = _.map( params,
            function( p ) { return encodeURIComponent( p.key ) + '=' + encodeURIComponent( p.value ); }
        );

        var url = "https://accounts.google.com/o/oauth2/auth?" + string_params.join("&");

        if( app.options.build === 'web' ) {
            window.location = url;
        }
        else {
            document.addEventListener("resume", app.launchURLForwarder, false);
            steroids.openURL( url );
        }
    },
    showContent: function() {
        $('div.content').show();
        $('div.connectivity').hide();
        $('div.loader').hide();
    },

    hasInternet : function() {
        if( app.options.build !== 'web' ) {
            if(navigator.connection.type === Connection.NONE ) {
                app.showConnectivityError('nointernet');
                return false;
            }
        }
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
            AppGyver.hideContent();
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

    // mobile app, do preloads & app inits etc.
    if (app.options.build === 'web') {
        app.init();
    } else {
        AppGyver.init();
    }
});

