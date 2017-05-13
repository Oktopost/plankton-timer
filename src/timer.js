require('../namespace').namespace('Plankton', function(root) {
	'use strict';
	
	
	var classify = root.Classy.classify;
	
	
	/**
	 * @class Plankton.timer
	 * 
	 * @property {callback} _callback
	 * @property {Number} _interval
	 * @property {boolean} _isRunning
	 * 
	 * @param {callback} callback
	 * @param {Number=} interval
	 */
	var timer = function (callback, interval) {
		this._callback		= callback;
		this._interval		= interval || 1000;
		this._timeoutID		= null;
		this._nextTick		= -1;
		
		
		classify(this);
	};
	
	
	
	timer.prototype._onInterval = function () {
		var callback = this._callback;
		callback();
		
		if (this._timeoutID === null) {
			return;
		}
		
		var interval = this._interval;
		var now = Date.now();
		
		if (this._interval !== 0) {
			while (this._nextTick < now) {
				this._nextTick += this._interval;
			}
			
			interval = this._nextTick - now;
		}
		
		this._timeoutID = setTimeout(this._onInterval, interval);
	};
	
	
	
	timer.prototype.start = function () {
		this.stop();
		this._timeoutID = setTimeout(this._onInterval, this._interval);
		this._nextTick = Date.now() + this._interval;
	};
	
	timer.prototype.stop = function () {
		if (this._timeoutID === null) {
			return;
		}
		
		clearTimeout(this._timeoutID);
		this._timeoutID = null;
	};
	
	timer.prototype.interval = function () {
		return this._interval;
	};
	
	timer.prototype.setInterval = function (ms) {
		if (ms < 0) {
			ms = 0;
		}
		
		this._interval = ms;
		
		if (this.isRunning()) {
			this.stop();
			this.start();
		}
	};
	
	timer.prototype.callback = function () {
		return this._callback;
	};
	
	timer.prototype.setCallback = function (callback) {
		this._callback = callback;
	};
	
	timer.prototype.isRunning = function () {
		return this._timeoutID !== null;
	};
	
	
	this.timer = timer;
});