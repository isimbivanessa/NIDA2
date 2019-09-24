var cors = require("cors");
var router = require("express")();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var wsdl = "http://192.168.50.20/kyc/KYCService.asmx?wsdl";
var controller = require("rest-to-soap-mapper");

router.get(
  "/",
  cors(corsOptions),
  controller(wsdl, "AuthenticateDocument", setArgs)
);

function setArgs(req) {
  return {
    documentNumber: req.query.doc,
    BankCode: req.query.code
  };
}

let PORT = process.env.PORT ? process.env.PORT : 3500;
// let PORT = 3500;

router.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
