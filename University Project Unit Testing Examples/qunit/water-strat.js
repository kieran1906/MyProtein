/*
*
*   AUTHOR: Kieran Wild
*
*/
QUnit.test("DataStrategies", function( assert ) {
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
            obj: new WaterStrat(),
            obj_name: "[ WaterStrat ]",

            name: "Water",
            description: "Water in the Smart Cup.",
            format: ["100"],
            format_after: ["100ml"]
        }
    ];

    for(var i = 0; i < classes.length; i++) {
        var s = classes[i];

        assert.equal( s.obj.getName(),                      s.name,             s.obj_name + " Name: " + s.name );
        assert.equal( s.obj.getDescription(),               s.description,      s.obj_name + " Description: " + s.description );
    }

});
