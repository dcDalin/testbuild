"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _couch = require("./db/couch");

var routes = _interopRequireWildcard(require("./routes"));

// all routes
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var app, staticFiles;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // instanciate express
          app = (0, _express["default"])(); // enable cors

          app.use((0, _cors["default"])()); // Enable body parser

          app.use(_bodyParser["default"].urlencoded({
            extended: false
          }));
          app.use(_bodyParser["default"].json());
          staticFiles = _express["default"]["static"](_path["default"].join(__dirname, '../../react-frontend/build'));
          app.use(staticFiles); // Routes

          app.use('/api/setup', routes.setupRouter);
          app.use('/api/auth', routes.authRouter);
          app.use('/api/wifi', routes.wifiRouter);
          app.use('/api/pump', routes.pumpRouter); // React page

          app.use('/*', staticFiles);
          _context.next = 14;
          return (0, _couch.findMissingDbs)();

        case 14:
          app.listen(process.env.PORT, function () {
            return (// eslint-disable-next-line no-console
              console.log("App listening on port ".concat(process.env.PORT))
            );
          }); // Listen on port

          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          // eslint-disable-next-line no-console
          console.error('Server could not start: ', _context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 17]]);
}))();