"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * pca9685.js
 * Simulator for pca9685
 * https://github.com/101100/pca9685
 *
 * Simulation library for PCA9685 I2C 16-channel PWM/servo driver.
 *
 * Copyright (c) 2020 H2Yo, Inc.
 */
var constants = {
  stepsPerCycle: 4096,
  defaultAddress: 0x40,
  defaultFrequency: 50
};

var Pca9685Driver = /*#__PURE__*/function () {
  /**
   * Constructs a new PCA9685 driver.
   *
   * @param options
   *     Configuration options for the driver.
   * @param callback
   *     Callback called once the driver has been initialized.
   */
  function Pca9685Driver(options, callback) {
    (0, _classCallCheck2["default"])(this, Pca9685Driver);
    this.i2c = options.i2c;
    this.address = options.address || constants.defaultAddress;
    this.commandSubject = '';
    this.frequency = options.frequency || constants.defaultFrequency;
    var cycleLengthMicroSeconds = 1000000 / this.frequency;
    this.stepLengthMicroSeconds = cycleLengthMicroSeconds / constants.stepsPerCycle;
    console.log("PCA9685_SIM new with options: ".concat(JSON.stringify(options)));
  }
  /**
   * Clean up the PCA9685 driver by turning off all channels and preventing future commands.
   */


  (0, _createClass2["default"])(Pca9685Driver, [{
    key: "dispose",
    value: function dispose() {
      console.log('PCA9685_SIM dispose');
    }
    /**
     * Sets the on and off steps for the given channel.
     *
     * @param channel
     *     Output channel to configure.
     * @param onStep
     *     The step number when the channel should turn on.
     * @param offStep
     *     The step number when the channel should turn off.
     * @param callback
     *     Optional callback called once the  on and off steps has been set for the given channel.
     */

  }, {
    key: "setPulseRange",
    value: function setPulseRange(channel, onStep, offStep, callback) {
      console.log("PCA9685_SIM setPulseRange called on channel ".concat(channel, " onStep ").concat(onStep, " offStep ").concat(offStep, "."));
    }
    /**
     * Sets the pulse length for the given channel.
     *
     * @param channel
     *     Output channel to configure.
     * @param pulseLengthMicroSeconds
     *     The length of the pulse for the given channel in microseconds.
     * @param onStep
     *     Optional The step number when the channel should turn on (defaults
     *     to 0).
     * @param callback
     *     Optional callback called once the pulse length has been set for the given channel.
     */

  }, {
    key: "setPulseLength",
    value: function setPulseLength(channel, pulseLengthMicroSeconds, onStep, callback) {
      console.log("PCA9685_SIM setPulseLength called on channel ".concat(channel, " with pulseLength ").concat(pulseLengthMicroSeconds, " and onStep ").concat(onStep, "."));
    }
    /**
     * Sets the duty cycle for the given channel.
     *
     * @param channel
     *     Output channel to configure.
     * @param dutyCycleDecimalPercentage
     *     The duty cycle for the given channel as a decimal percentage.
     * @param onStep
     *     Optional The step number when the channel should turn on (defaults
     *     to 0).
     * @param callback
     *     Optional callback called once the duty cycle has been set for the given channel.
     */

  }, {
    key: "setDutyCycle",
    value: function setDutyCycle(channel, dutyCycleDecimalPercentage, onStep, callback) {
      console.log("PCA9685_SIM setDutyCycle called for channel ".concat(channel, " with duty percentage ").concat(dutyCycleDecimalPercentage, " and onStep ").concat(onStep, "."));
    }
    /**
     * Turns all channels off.
     *
     * @param callback
     *     Optional callback called once all of the channels have been turned off.
     */

  }, {
    key: "allChannelsOff",
    value: function allChannelsOff(callback) {
      console.log('PCA9685_SIM allChannelsOff called');
    }
    /**
     * Turns off the given channel.
     *
     * @param channel
     *     Output channel to turn off.
     * @param callback
     *     Optional callback called once the channel has been turned off.
     */

  }, {
    key: "channelOff",
    value: function channelOff(channel, callback) {
      console.log("PCA9685_SIM channelOff called for channel ".concat(channel));
    }
    /**
     * Turns on the given channel.
     *
     * @param channel
     *     Output channel to turn on.
     * @param callback
     *     Optional callback called once the channel has been turned on.
     */

  }, {
    key: "channelOn",
    value: function channelOn(channel, callback) {
      console.log("PCA9685_SIM channelOn called for channel ".concat(channel));
    }
  }]);
  return Pca9685Driver;
}();

module.exports = Pca9685Driver;