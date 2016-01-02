import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
  isocode: String,
  name: String,
  description: String
});

const CitySchema = new mongoose.Schema({
  name: String,
  description: String,
  country: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
});


const LanguageSchema = new mongoose.Schema({
  isocode: String,
  name: String
});


const Country  = mongoose.model('Country', CountrySchema);
const City     = mongoose.model('City', CitySchema);
const Language = mongoose.model('Language', LanguageSchema);

export {Country, City, Language}
