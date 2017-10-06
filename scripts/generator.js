module.exports = function() {
    
    /**
     * Generate new Bulgarian EGN code with random parameters
     *
     * @return {Boolean}
     */
    this.generate = function() {
        // init function
        var date = generateRandomDate(new Date(1800, 0, 1), new Date(2098, 11, 30));
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        var regionId = generateRandomRegion();
        var gender = generateRandomGender();

        if (date < new Date(1900, 0, 1)){
            month += 20;
    
        }else if(date > new Date(1999, 11, 31)){
            month += 40;
        }
        // zero based
        month +=1;
        day +=1;
        year = year % 100;


        // We set always the first number from interval (eg first new born child)
        if(regionId % 2 === 0){
            if(gender === 1) regionId++;
        }else{
            if(gender === 0) regionId++;
        }

        var weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];
        year = padWithZero(year);
        month = padWithZero(month);
        day = padWithZero(day);
        regionId = padWithZeroes(regionId);
        // console.log('year' + year); 
        // console.log('month' + month);
        // console.log('day' + day);
        // console.log('regionid' + regionId);
        var egn = year + '' +
                   month + '' +
                   day + '' +
                  regionId;
        
        var checkSum = 0;
        for(var i = 0; i < weights.length; ++i){
            checkSum +=  weights[i] * Number(egn.charAt(i)); 
        }

        checkSum = checkSum % 11;
        checkSum = checkSum < 10 ? checkSum : 0;

        egn = egn + '' + checkSum;

        return egn;

    };
    
    /**
     * Generate new Bulgarian EGN code with custom parameters
     *
     * 
     * @param {Integer} day, 1-31
     * @param {Integer} month 1-12
     * @param {Integer} year 1800-2099
     * @param {Integer} gender, 0-male, 1-female
     * @param {Integer} region 0 - 999
     */
    // this.generateCustom = function(day, month, year, gender, region) {
        
        
    // };
}

// credits to https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// credits to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function generateNumberInInterval(min, max){
     return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomRegion(){
    return generateNumberInInterval(0, 999);
}

function generateRandomGender(){
    return generateNumberInInterval(0, 1);
}

function padWithZero(number){
    return number < 10 ? '0' + number : number;
}

function padWithZeroes(number){
    if(number < 9){
        return '00' + number;

    }else if(number < 99 && number > 9){
        return '0' + number;
    
    }else{
        return number;
    }
}
// const CODE_BLAGOEVGRAD    = 43; // 000- 043
// 43: {'bg': 'Благоевград', 'en': 'Blagoevgrad'},  # 000 - 043
// 93: {'bg': 'Бургас', 'en': 'Burgas'},  # 044 - 093
// 139: {'bg': 'Варна', 'en': 'Varna'},  # 094 - 139
// 169: {'bg': 'Велико Търново', 'en': 'Veliko Turnovo'},  # 140 - 169
// 183: {'bg': 'Видин', 'en': 'Vidin'},  # 170 - 183
// 217: {'bg': 'Враца', 'en': 'Vratza'},  # 184 - 217
// 233: {'bg': 'Габрово', 'en': 'Gabrovo'},  # 218 - 233
// 281: {'bg': 'Кърджали', 'en': 'Kurdzhali'},  # 234 - 281
// 301: {'bg': 'Кюстендил', 'en': 'Kyustendil'},  # 282 - 301
// 319: {'bg': 'Ловеч', 'en': 'Lovech'},  # 302 - 319
// 341: {'bg': 'Монтана', 'en': 'Montana'},  # 320 - 341
// 377: {'bg': 'Пазарджик', 'en': 'Pazardzhik'},  # 342 - 377
// 395: {'bg': 'Перник', 'en': 'Pernik'},  # 378 - 395
// 435: {'bg': 'Плевен', 'en': 'Pleven'},  # 396 - 435
// 501: {'bg': 'Пловдив', 'en': 'Plovdiv'},  # 436 - 501
// 527: {'bg': 'Разград', 'en': 'Razgrad'},  # 502 - 527
// 555: {'bg': 'Русе', 'en': 'Ruse'},  # 528 - 555
// 575: {'bg': 'Силистра', 'en': 'Silistra'},  # 556 - 575
// 601: {'bg': 'Сливен', 'en': 'Sliven'},  # 576 - 601
// 623: {'bg': 'Смолян', 'en': 'Smolyan'},  # 602 - 623
// 721: {'bg': 'София', 'en': 'Sofia'},  # 624 - 721
// 751: {'bg': 'София (окръг)', 'en': 'Sofia (county)'},  # 722 - 751
// 789: {'bg': 'Стара Загора', 'en': 'Stara Zagora'},  # 752 - 789
// 821: {'bg': 'Добрич', 'en': 'Dobrich'},  # 790 - 821
// 843: {'bg': 'Търговище', 'en': 'Targovishte'},  # 822 - 843
// 871: {'bg': 'Хасково', 'en': 'Haskovo'},  # 844 - 871
// 903: {'bg': 'Шумен', 'en': 'Shumen'},  # 872 - 903
// 925: {'bg': 'Ямбол', 'en': 'Yambol'},  # 904 - 925
// 999: {'bg': 'Друг', 'en': 'Other'}} # 926 - 999

// function getComplement(code) {
//     switch (color) {
//         case COLOR_RED:
//             return COLOR_GREEN;
//         case COLOR_ORANGE:
//             return COLOR_BLUE;
//         case COLOR_YELLOW:
//             return COLOR_VIOLET;
//         case COLOR_GREEN:
//             return COLOR_RED;
//         case COLOR_BLUE:
//             return COLOR_ORANGE;
//         case COLOR_VIOLET:
//             return COLOR_YELLOW;
//         default:
//             throw new Exception('Unknown color: '+color);
//     }
//}