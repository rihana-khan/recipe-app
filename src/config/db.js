const mongoose = require("mongoose");

exports.makeDb = () => {
	mongoose.set("useCreateIndex", true);
	mongoose.connect(
		'mongodb+srv://rihana:monikhan@cluster0.ghxaj.mongodb.net/recipe-app?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	);
	mongoose.set("useFindAndModify", false);
}