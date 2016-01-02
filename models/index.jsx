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

export { mongoose.model('Country', CountrySchema)   as Country    };
export { mongoose.model('City', CitySchema)         as City       };
export { mongoose.model('Language', LanguageSchema) as Language   };
