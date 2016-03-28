/*
*
*   AUTHOR: Kieran Wild
*
*/
QUnit.test("DataStrategies", function( assert ) {

    // Strategy classes to test...
    var classes = [
        {
            obj: new DefaultStrat(),
            obj_name: "[ DefaultStrat ]",

            name: "Unknown",
            description: "Unknown data type.",
            format: ["50"],
            format_after: ["50"]
        },
        {
            obj: new TemperatureStrat(),
            obj_name: "[ TemperatureStrat ]",

            name: "Temperature",
            description: "The current temperature reading.",
            format: ["20"],
            format_after: ["20°c"]
        }
    ];

    for(var i = 0; i < classes.length; i++) {
        var s = classes[i];

        assert.equal( s.obj.getName(),                      s.name,             s.obj_name + " Name: " + s.name );
        assert.equal( s.obj.getDescription(),               s.description,      s.obj_name + " Description: " + s.description );

        for(var j = 0; j < s.format.length; j++)
        assert.equal( s.obj.formatData(s.format[j]),        s.format_after[j],  s.obj_name + " Format Data (" + s.format[j] + "): " + s.format_after[j]);
    }

});
