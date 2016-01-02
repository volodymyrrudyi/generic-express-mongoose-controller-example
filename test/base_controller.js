import should          from 'should';
import { Country }     from '../models';
import BaseController  from '../resources/controllers/base';


describe('BaseController Unit Test', () => {
  const controller = new BaseController(Country, 'isocode');


  it('Should provide GET /', () => {

  });

  it('Should provide GET /<entity>/:id', () => {

  });

  it('Should provide PUT /<entity>/:id', () => {

  });

  it('Should provide DELETE /<entity>/:id', () => {

  });
});
