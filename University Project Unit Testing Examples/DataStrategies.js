'use strict';

/*
*
*   AUTHOR: Kieran Wild
*
*/
class AbstractDataStrat {
    constructor() {}

    getName() {}
    getDescription() {}

    sanitiseData(data) {}
    newData(data) {}
    getTitleData() {}

    getTextColour() {}
    getDefaultBackgroundColour() {}
    adaptColoursToData(value) {}

    cardClick() {}
}


class WaterStrat extends AbstractDataStrat {

    constructor(data) {
        super();
        this.data = this.sanitiseData(data);
        this.textColour = "rgb(255, 255, 255)";
        this.backgroundColour = "#0A93FC";
        this.newVal
        this.oldVal = 780;
    }

    getName() { return "Water"; }
    getDescription() { return "Water in the Smart Cup."; }

    sanitiseData(data) {
        var max = 700;
        var oldVal = 2000;
        var newData = data;

        var degrees = parseInt((newData * (180 / Math.PI)) - 5);

        // negative value = upright
        if(degrees < 0){
            degrees = -degrees;

            this.newVal = parseInt(max * (degrees / 85));
            var remain = ((100 * (this.newVal / max) + 15)).toFixed(0);
            var gone = (100 - remain).toFixed(0);

            if(this.newVal <= this.oldVal){
                this.oldVal = this.newVal;
                this.adaptColoursToData(gone);
                this.getTitleData();
            }

            if(remain < 100 && this.newVal < this.oldVal){
                // determine the percentage of the water that is remaining, and style background so that
                // the dark blue colour fills the equivalent percentage of the card's background
                this.adaptColoursToData(this.newVal);

                DS.getService(DS.HEALTH_MANAGER).waterUpdate(gone);
            }

        } else {

        }
    }
    newData(data) {
        this.data = this.sanitiseData(data);
    }
    getTitleData() {
        if(this.oldVal != undefined)
            return Math.round(this.oldVal) + "ml";
        else
            return "?";
    }

    getTextColour() { return this.textColour; }
    getBackgroundColour() { return this.backgroundColour; }

    adaptColoursToData(value) {
        this.backgroundColour = "linear-gradient(to bottom, #CCE9FF 0%, #CCE9FF " + value + "%, #CCE9FF " + value + "%, #0A93FC " + value + "%, #0A93FC 100%)";
    }

    cardClick() {
        this.backgroundColour = "#0A93FC";
        this.gone = 700;
    }
}


/*
*   Used for unknown data types.
*/
class DefaultStrat extends AbstractDataStrat {

    constructor(data, type) {
        super();
        this.type = type;
        this.data = this.sanitiseData(data);
    }

    getName() { return this.type; }
    getDescription() { return "Unknown data type."; }

    sanitiseData(data) {
        if(data != undefined) {
            var data = String(this.data);
            data = (data.length > 3 ? data.substring(0, 3) + "..." : data);
        }
        return data;
    }
    newData(data) {
        this.data = this.sanitiseData(data);
    }
    getTitleData() { return (this.data != undefined ? this.data : "?"); }

    getTextColour() { return "rgb(0, 0, 0)"; }
    getBackgroundColour() { return "rgb(255, 255, 255)"; }

    adaptColoursToData(value) {}

    cardClick() {}
}




class FridgeStrat extends AbstractDataStrat {

    constructor(data) {
        super();
        this.data = this.sanitiseData(data);
        this.textColour = "rgb(255, 255, 255)";
        this.backgroundColour = "rgb(51, 0, 51)";
    }

    getName() { return "Fridge"; }
    getDescription() { return "The current temperature of the fridge and its contents."; }

    sanitiseData(data) {
        var d;
        if(data != undefined) {
            var vals = String(data).split(',');
            if(vals.length == 2 && !isNaN(vals[0]) && !isNaN(vals[1]) && vals[0].length > 0 && vals[1].length > 0) {
                d = {};
                d.LIGHT = vals[0];
                d.TEMP  = vals[1];
                return d;
            }
        }

        return undefined;
    }

    newData(data) {
        this.data = this.sanitiseData(data);

        if(this.data != undefined)
            this.adaptColoursToData(this.data.LIGHT);

        return (this.data != undefined);
    }
    getTitleData() {
        if(this.data != undefined)
            return Math.round(this.data.TEMP) + "°c";
        else
            return "?";
    }

    getTextColour() { return this.textColour; }
    getBackgroundColour() { return this.backgroundColour; }
    adaptColoursToData(value) {
        //console.log("FRIDGE STRAT ADAPT " + value);
        var newBackgroundColour;
        var newTextColour;

        if(value <= 100 )        { newBackgroundColour = "rgb(51, 0, 51)"; newTextColour = "rgb(255, 255, 255)"; }
        else                    { newBackgroundColour = "rgb(255, 204, 0)"; newTextColour = "rgb(0, 0, 0)"; }

        this.backgroundColour   = newBackgroundColour;
        this.textColour         = newTextColour;
    }

    cardClick() {
        console.log("FRIDGE: cardClick");
        $('#fridgeModal').modal('show');
    }
}





/*
*   Used for temp data type recognised as temperature data.
*/
class TemperatureStrat extends AbstractDataStrat {

    constructor(data) {
        super();
        this.data = this.sanitiseData(data);
        this.textColour = "rgb(255, 255, 255)";
        this.backgroundColour = "rgb(255, 0, 0)";
    }

    getName() { return "Temperature"; }
    getDescription() { return "The current temperature reading."; }

    sanitiseData(data) {
        if(!isNaN(data))
            return data;
        else
            return undefined;
    }
    newData(data) {
        this.data = this.sanitiseData(data);
        if(this.data != undefined)
            this.adaptColoursToData(this.data);
    }
    getTitleData() { return (this.data != undefined ? Math.round(this.data) + "°c" : "?"); }

    getTextColour() { return this.textColour; }
    getBackgroundColour() { return this.backgroundColour; }

    adaptColoursToData(value) {
        var newBackgroundColour;
        var newTextColour;

        if(value <= 15 )        newBackgroundColour = "rgb(255, 179, 128)";
        else if(value <= 17)    newBackgroundColour = "rgb(255, 163, 102)";
        else if(value <= 19)    newBackgroundColour = "rgb(255, 148, 77)";
        else if(value <= 21)    newBackgroundColour = "rgb(255, 117, 26)";
        else if(value <= 23)    newBackgroundColour = "rgb(255, 102, 0)";
        else if(value <= 25)    newBackgroundColour = "rgb(255, 71, 26)";
        else if(value <= 27)    newBackgroundColour = "rgb(255, 51, 0)";
        else if(value <= 29)    newBackgroundColour = "rgb(230, 46, 0)";
        else if(value <= 31)    newBackgroundColour = "rgb(230, 0, 0)";
        else if(value <= 33)    newBackgroundColour = "rgb(204, 0, 0)";
        else                    newBackgroundColour = "rgb(179, 0, 0)";

        if(value <= 17)         newTextColour = "rgb(0, 0, 0)";
        else                    newTextColour = "rgb(255, 255, 255)";

        this.backgroundColour   = newBackgroundColour;
        this.textColour         = newTextColour;
    }

    cardClick() {}
}

class LightStrat extends AbstractDataStrat {

    constructor(data) {
        super();
        this.data = data;
        this.textColour = "rgb(255, 255, 255)";
        this.backgroundColour = "rgb(102, 102, 255)";
    }

    getName() { return "Light"; }
    getDescription() { return "The current light reading."; }

    sanitiseData(data) {
        if(!isNaN(data))
            return data;
        else
            return undefined;
    }
    newData(data) { this.data = this.sanitiseData(data); }
    getTitleData() { return (this.data != undefined ? this.data : "?"); }

    getTextColour() { return this.textColour; }
    getBackgroundColour() { return this.backgroundColour; }

    adaptColoursToData(value) {
        var newBackgroundColour;
        var newTextColour;

        if(value <= 5 )         newBackgroundColour = "rgb(0, 0, 51)";
        else if(value <= 10)    newBackgroundColour = "rgb(0, 0, 102)";
        else if(value <= 15)    newBackgroundColour = "rgb(0, 0, 204)";
        else if(value <= 20)    newBackgroundColour = "rgb(0, 0, 255)";
        else if(value <= 25)    newBackgroundColour = "rgb(51, 51, 255)";
        else if(value <= 30)    newBackgroundColour = "rgb(102, 102, 255)";
        else if(value <= 35)    newBackgroundColour = "rgb(153, 153, 255)";
        else                    newBackgroundColour = "rgb(204, 204, 255)";

        if(value <= 30)         newTextColour = "rgb(255, 255, 255)";
        else                    newTextColour = "rgb(0, 0, 0)";

        this.backgroundColour   = newBackgroundColour;
        this.textColour         = newTextColour;

    }

    cardClick() {}
}
