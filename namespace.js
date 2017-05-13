'use strict';


const Namespace = require('oktopost-namespace');
const Classy = require('oktopost-classy');


const container = {
	Classy: Classy
};

const Plankton = new Namespace(container);


Plankton.namespace('Plankton');


module.exports = {
	Plankton: container.Plankton,
	namespace: Plankton.getCreator()
};