import { Router } 						from 'express';
import { CountriesController,
				 CitiesController,
			 	 LanguagesController
			 }											from './controllers';

export default function() {
	var api = Router();
	api.use('/countries', new CountriesController().init());
	api.use('/cities', new CitiesController().init());
	api.use('/languages', new LanguagesController().init());
	return api;
}
