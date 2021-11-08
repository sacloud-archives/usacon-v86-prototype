"use strict";

function SacloudAPIHandler() {
}

SacloudAPIHandler.prototype.Handle = function(line) {
    // Debug
    console.log("HandleAPI", line);
    let req;
    try {
        req = JSON.parse(line);
        if (!req.UUID) {console.error("Invalid JSON: field 'UUID' required", "line" , line)}
        if (!req.Method) {console.error("Invalid JSON: field 'Method' required", "line" , line)}
        if (!req.URL) {console.error("Invalid JSON: field 'URL' required", "line" , line)}
    }catch (e) {
        console.log("invalid JSON received:", e);
        return;
    }

    let reqOpt = {
        method: req.Method,
        headers: {
            'Content-Type': 'application/json',
            'X-Sakura-Bigint-As-Int': '1',
            'User-Agent': 'libsacloud-v86',
            'Authorization': "Basic " + btoa("user" + ":" + "pass") // TODO ダミー
        },
    }
    if (!!req.Body) {
        reqOpt.body = req.Body;
    }

    fetch(req.URL, reqOpt)
      .then((response) => response.text())
      .then((body) => {
          // TODO handle response
          console.log(body)
          let res = {
              Result: body
          }
          emulator.create_file("/usacloud/" + req.UUID, new TextEncoder().encode(JSON.stringify(res)) ,function(e){
              if (!!e) {
                  console.error(e);
              }else {
                  emulator.create_file("/usacloud/" + req.UUID + ".done", "");
              }
          });
      })
      .catch((error) => {
          // TODO handle response
          console.log(error.toString());
          let res = {
              Error: error
          }
          emulator.create_file("/usacloud/" + req.UUID, new TextEncoder().encode(JSON.stringify(res)), function (e) {
              if (!!e) {
                  console.error(e);
              } else {
                  emulator.create_file("/usacloud/" + req.UUID + ".done", "");
              }
          });
      } );
}
