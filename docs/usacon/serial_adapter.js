"use strict";

function SerialAdapterXtermJS2(element, bus, apiHandler)
{
    this.element = element;
    this.handler = apiHandler;

    if(!window["Terminal"])
    {
        return;
    }

    var term = this.term = new window["Terminal"]({
        fontFamily: '"Courier New","Monaco"',
        cursorBlink: true
    });
    term["setOption"]("logLevel", "off");
    term.resize(128,40);
    term.writeln("Initializing usacloud virtual machine...");

    term["onData"]((data) => {
        new TextEncoder().encode(data).map(v => bus.send("serial0-input", v));
    });

    bus.register("serial0-output-data", function(data){
        term.write(new Uint8Array([data]));
    }, this);

    bus.register("serial1-output-line-data", function(data){
        let line = new TextDecoder().decode(new Uint8Array(data)).trim();

        if (line.length > 0) {
            if (!!this.handler) {
                this.handler(line);
            }
        }

    }, this);
}

SerialAdapterXtermJS2.prototype.show = function()
{
    this.term && this.term.open(this.element);
};
