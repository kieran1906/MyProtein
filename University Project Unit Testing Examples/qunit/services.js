/*
*
*   AUTHOR: Kieran Wild
*
*/
QUnit.test("DataServices: AlertManager", function( assert ) {

    var obj = new AlertManager();

    var valid_priority  = ['LOW', 'MEDIUM', 'HIGH'];
    var valid_level     = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'];
    var valid_message   = ['a problem occurred.']

    var invalid_priority  = ['wrong', '', 200, undefined, null];
    var invalid_level     = invalid_priority;
    var invalid_message   = ['', undefined, null]

    var OK = 0;
    var ERR = 1;

    // Check valid priorities.
    for(var i = 0; i < valid_priority.length; i++)
        assert.equal( obj.newAlert(valid_priority[i], valid_level[0], valid_message[0]),        OK,     "[Priority] Valid " + valid_priority[i] + ": " + OK );

    // Check invalid priorities.
    for(var i = 0; i < invalid_priority.length; i++)
        assert.equal( obj.newAlert(invalid_priority[i], valid_level[0], valid_message[0]),      ERR,    "[Priority] Invalid " + invalid_priority[i] + ": " + ERR );


    // Check valid levels.
    for(var i = 0; i < valid_level.length; i++)
        assert.equal( obj.newAlert(valid_priority[0], valid_level[i], valid_message[0]),        OK,     "[Level] Valid " + valid_level[i] + ": " + OK );

    // Check invalid levels.
    for(var i = 0; i < invalid_level.length; i++)
        assert.equal( obj.newAlert(valid_priority[0], invalid_level[i], valid_message[0]),      ERR,    "[Level] Invalid " + invalid_level[i] + ": " + ERR );


    // Check valid messages.
    for(var i = 0; i < valid_message.length; i++)
        assert.equal( obj.newAlert(valid_priority[0], valid_level[0], valid_message[i]),        OK,     "[Message] Valid " + valid_message[i] + ": " + OK );

    // Check invalid messages.
    for(var i = 0; i < invalid_message.length; i++)
        assert.equal( obj.newAlert(valid_priority[0], valid_level[0], invalid_message[i]),      ERR,    "[Message] Invalid " + invalid_message[i] + ": " + ERR );

});
