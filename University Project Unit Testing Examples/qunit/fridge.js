/*
*
*   AUTHOR: Kieran Wild
*
*/
QUnit.test("HealthManager : updateHealthData", function( assert ) {

    var i = new HealthManager();
    var stats = { calories: {} };
    var food;

    // establish dates for testing calories
    var date = new Date();
    var today = getFormattedDate(date);

    date.setDate(date.getDate() - 1);
    var past = getFormattedDate(date);

    date.setDate(date.getDate() + 2);
    var future = getFormattedDate(date);

    console.log("PAST   : " + past);
    console.log("TODAY  : " + today);
    console.log("FUTURE : " + future);

    /*
    *   the return value is an array like arr[0, 0, 0], where:
    *   arr[0] => food is appropriate to eat when considering diet
    *   arr[1] => food not expired and would go against the diet
    *   arr[2] => food has expired and should not be eaten
    */

    // tests that should fail i.e. not write any foods to the screen

    //- INVALID DATA
    assert.deepEqual(i.updateHealthData(undefined, undefined),          [0, 0, 0],        "undefined, undefined");
    assert.deepEqual(i.updateHealthData(null, null),                    [0, 0, 0],        "null, null");
    assert.deepEqual(i.updateHealthData('', ''),                        [0, 0, 0],        "'', ''");
    assert.deepEqual(i.updateHealthData({}, {}),                        [0, 0, 0],        "{}, {}");


    // Tests that should succeed i.e. put foods in correct places on modal
    stats.calories[today] = 500;
    food = { TURKEY: { calories: 500, expiry: future } };
    assert.deepEqual(i.updateHealthData(stats, food),                   [1, 0, 0],        "one food, not expired, diet appropriate");

    food = { TURKEY: { calories: 2200, expiry: future } };
    assert.deepEqual(i.updateHealthData(stats, food),                   [0, 1, 0],        "one food, not expired, diet inappropriate");

    food = { TURKEY: { calories: 500, expiry: past } };
    assert.deepEqual(i.updateHealthData(stats, food),                   [0, 0, 1],        "one food, expired, diet appropriate");
});

var getFormattedDate = function(date) {
    var day   = date.getDate();
    var month = date.getMonth() + 1;
    var year  = date.getFullYear();

    if(day < 10)    day = "0" + day;
    if(month < 10)  month = "0" + month;
    return day + "-" + month + "-" + year;
}

QUnit.test("FridgeStrat : getTitleData", function( assert ) {

    //- INVALID DATA
    var data_undefined      = undefined;
    var data_null           = null;
    var data_emptystring    = "";
    var data_emptyobj       = {};
    var data_nonemptyobj    = { HELLO: "world" };

    var data_stringnocomma  = "qwertyuiop";
    var data_stringscomma   = "hello,world";
    var data_oneinteger     = "20";
    var data_oneintcomma    = "20,";

    //- VALID DATA
    var data_lightandtemp   = "5,20";   // <light>,<temperature>

    //- RUNNING TESTS: invalid data should return "?", valid data should return temperature
    assert.deepEqual(new FridgeStrat(data_undefined).getTitleData(),            "?",        "undefined");
    assert.deepEqual(new FridgeStrat(data_null).getTitleData(),                 "?",        "null");
    assert.deepEqual(new FridgeStrat(data_emptystring).getTitleData(),          "?",        "empty string");
    assert.deepEqual(new FridgeStrat(data_emptyobj).getTitleData(),             "?",        "empty object");
    assert.deepEqual(new FridgeStrat(data_nonemptyobj).getTitleData(),          "?",        "non-empty object");

    assert.deepEqual(new FridgeStrat(data_stringnocomma).getTitleData(),        "?",        "string no comma");
    assert.deepEqual(new FridgeStrat(data_stringscomma).getTitleData(),         "?",        "two strings separated by comma");
    assert.deepEqual(new FridgeStrat(data_oneinteger).getTitleData(),           "?",        "one integer");
    assert.deepEqual(new FridgeStrat(data_oneintcomma).getTitleData(),          "?",        "one integer and comma");

    assert.deepEqual(new FridgeStrat(data_lightandtemp).getTitleData(),         "20°c",     "temp and light data, both numeric");
});
