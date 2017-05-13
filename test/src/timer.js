const Plankton = require('../../index');

const timer = Plankton.timer;
const assert = require('chai').assert;



suite('timer', () => {
	
	suite('isRunning', () => {
		test('New object, not running', () => {
			assert.isFalse((new timer(() => {})).isRunning());
		});
		
		test('Timer started, return true', () => {
			var t = new timer(() => {});
			t.start();
			assert.isTrue(t.isRunning());
		});
		
		test('Stop called, return false', () => {
			var t = new timer(() => {});
			t.start();
			t.stop();
			assert.isFalse(t.isRunning());
		});
	});
});