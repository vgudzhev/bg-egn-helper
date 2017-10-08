var util = require('./utils/generator-helper.js')();

module.exports = function() {
    
    /**
     * Generate new Bulgarian EGN code with by ggiven custom parameters.
     * If you do not provide a given parameter it will be random generated
     *
     * @param {String} year, Number 1900-2099
     * @param {String} month, Number 1-12
     * @param {String} day, Number 1-31
     * @param {String} gender, 0-male, 1-female
     * @param {String} region, Number 0 - 999
     
     * @return {String} valid EGN number
     */
    this.generate = function(year, month, day, gender, region) {
 
        var args = init(day, month, year, gender, region);
        var egn = computeValidEGN(args.year, args.month, args.day, args.regionId);
 
        return egn;
    };
}

function init(day, month, year, gender, regionId){
    var args = {};

    if(day && month && year){
        args.date = new Date(year, month, day);
    }else{
        args.date = generateRandomDate(new Date(1917, 0, 1), new Date(2098, 11, 30));
    }

    args.year = year || args.date.getFullYear();
    args.month = month || args.date.getMonth();
    args.day = day || args.date.getDay();

    if (args.date < new Date(1900, 0, 1)){
        args.month += 20;

    }else if(args.date > new Date(1999, 11, 31)){
        args.month += 40;
    }

    // zero based
    args.month +=1;
    args.day +=1;
    args.year = args.year % 100;

    args.regionId = regionId || generateRandomRegion();
    args.gender = gender || generateRandomGender();

    args.regionId = initRegion(args.regionId, args.gender);

    return args;
}

function initRegion(regionId, gender){

    if(regionId % 2 === 0){
        if(gender === 1) regionId++;

    }else{
        if(gender === 0) regionId++;
    }

    return gender;
}

function computeValidEGN(year, month, day, regionId){

    var weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    year = padWithZero(year);
    month = padWithZero(month);
    day = padWithZero(day);
    regionId = padWithZeroes(regionId);

    var egn = year  + '' +
              month + '' +
              day   + '' +
              regionId;
    
    var checkSum = 0;
    for(var i = 0; i < weights.length; ++i){
        checkSum +=  weights[i] * Number(egn.charAt(i)); 
    }

    checkSum = checkSum % 11;
    checkSum = checkSum < 10 ? checkSum : 0;

    return egn + '' + checkSum;
}
