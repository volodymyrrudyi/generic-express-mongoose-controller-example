import mongoose from 'mongoose';

export default function(callback) {
	mongoose.connect('mongodb://localhost/generic-controller-example');
	callback();
}
