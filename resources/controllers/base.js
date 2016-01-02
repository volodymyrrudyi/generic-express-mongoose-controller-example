import { Router } from 'express';
import co from "co";
import pluralize from "pluralize";
import {ok, fail} from "./utils";
const MAX_RESULTS = 100;

/**
  Generic controller that provides CRUD operations for a given Mongoose model
*/
export default class BaseController{

  /**
    @param model Mongoose model
    @param key primary key of the model that will be used for searching, removing
    and reading
  */
  constructor(model, key){
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.key = key;
  }

  create(data, success, failure) {
    const model = this.model;
    const modelName = this.modelName;

    co(function*(){
      const modelInstance = yield model.create(data);
      var response = {};
      response[modelName] = modelInstance;
      success(response);
    }).catch(failure);
  }


  read(id, success, failure) {
    const model = this.model;
    const modelName = this.modelName;
    const key = this.key;

    co(function *(){

      var filter = {};
      filter[key] = id;
      var modelInstance = yield model.findOne(filter).exec();
      var response = {};
      response[modelName] = modelInstance;
      success(response);
    }).catch(failure);
  }


  list(success, failure, range, filters, sorting) {
    const model = this.model;
    const modelName = this.modelName;

    co(function *(){
      var modelInstances = yield model.find({}).limit(MAX_RESULTS).exec();
      var response = {};
      response[pluralize(modelName)] = modelInstances;
      success(response);
    }).catch(failure);
  }

  remove(id, success, failure) {
    const model = this.model;
    const modelName = this.modelName;
    const key = this.key;

    co(function*(){
      var filter = {};
      filter[key] = id;
      yield model.remove(filter);
      success({});
    }).catch(failure);
  }


  /**
   */
  update(id, data, success, failure) {
    const model = this.model;
    const modelName = this.modelName;
    const key = this.key;

    co(function *(){
      var filter = {};
      filter[key] = id;
      var modelInstance = yield model.findOne(filter).exec();

      for (var attribute in data){
        if (data.hasOwnProperty(attribute) && attribute !== key && attribute !== "_id"){
          modelInstance[attribute] = data[attribute];
        }
      }

      var updatedModelInstance = yield modelInstance.save();
      var response = {};
      response[modelName] = updatedModelInstance;
      success(response);
    }).catch(failure);
  }

  init(){
    const key = this.key;
    const modelName = this.modelName;
    const router = Router();
    const controller = this;

    router.get("/", (req, res) => {
      controller
        .list(ok(res), fail(res));
    });

    router.post("/", (req, res) => {
      controller
        .create(req.body, ok(res), fail(res));
    });

    router.get("/:key", (req, res) => {
      controller
        .read(req.params.key, ok(res), fail(res));
    });

    router.put("/:key", (req, res) => {
      controller
        .update(req.params.key, req.body, ok(res), fail(res));
    });

    router.delete("/:key", (req, res) => {
      controller
        .remove(req.params.key, ok(res), fail(res));
    });

    return router;
  }
}
