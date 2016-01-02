import should          from 'should';
import { Country }     from '../models';
import BaseController  from '../resources/controllers/base';
import mongoose        from 'mongoose';
import faker           from 'faker';

describe('BaseController Unit Test', () => {

  beforeEach(function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/generic-controller-example', done);
  });


  const controller = new BaseController(Country, 'isocode');


  it('Test create()', (done) => {
    const data = {
      'isocode' : faker.address.countryCode(),
      'name' : faker.address.country()
    };

    controller.create(data)
    .then((response) => {
      response.should.have.property('country');
      response.country.isocode.should.equal(data.isocode);
      response.country.name.should.equal(data.name);
      done();
    })
    .then(null, done);
  });

  it('Test read()', (done) => {
    const data = {
      'isocode' : faker.address.countryCode(),
      'name' : faker.address.country()
    };

    controller.create(data)
    .then((response) => {
      return controller.read(response.country.isocode);
    })
    .then((response) => {
      response.should.have.property('country');
      response.country.isocode.should.equal(data.isocode);
      response.country.name.should.equal(data.name);
      done();
    })
    .then(null, done);

  });

  it('Test update()', (done) => {
    const data = {
      'isocode' : faker.address.countryCode(),
      'name' : faker.address.country()
    };

    const updatedData = {
      'name' : faker.address.country()
    };

    controller.create(data)
    .then((response) => {
      return controller.update(response.country.isocode, updatedData);
    })
    .then((response) => {
      response.should.have.property('country');
      response.country.isocode.should.equal(data.isocode);
      response.country.name.should.equal(updatedData.name);
      done();
    })
    .then(null, done);
  });

  it('Test delete()', (done) => {
    const data = {
      'isocode' : faker.address.countryCode(),
      'name' : faker.address.country()
    };

    controller.create(data)
    .then((response) => {
      return controller.read(response.country.isocode);
    })
    .then((response) => {
      return controller.delete(response.country.isocode);
    })
    .then ((response) => {
      return controller.read(data.isocode);
    })
    .then ((response) => {
      should(response.country).not.be.ok();
      done();
    })
    .then(null, (error) => {
      done(error);
    });
  });

  it('Test list()', (done) => {
    const data = {
      'isocode' : faker.address.countryCode(),
      'name' : faker.address.country()
    };

    controller.create(data)
    .then((response) => {
      return controller.list();
    })
    .then((response) => {
      response.should.have.property('countries');
      response.countries.should.be.instanceOf(Array).and.not.empty;
      done();
    })
    .then(null, done);
  });
});
