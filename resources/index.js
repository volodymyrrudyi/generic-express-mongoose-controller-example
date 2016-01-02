import { Router } 						from 'express';
import { CountriesController,
				 CitiesController,
			 	 LanguagesController
			 }											from './controllers';

export default function() {
	var api = Router();
	api.use('/countries', new CountriesController().route());
	api.use('/cities', new CitiesController().route());
	api.use('/languages', new LanguagesController().route());
	return api;
}
