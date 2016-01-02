/**
  Returns a function that will write the result as a JSON to the response
*/
export var ok = function(res){
  return (data) => {
    res.json(data);
  };
};

/**
  Depending on the error type, will perform the following:

  Object was not found - 404 Not Found
  Invalid or missing input parameter - 400 Bad request
  Not enough privileges - 401 Unauthorized
  Unknown error - 500 Internal server error
*/
export var fail = function(res){
  return (error) => {
    console.log(error);
    res.sendStatus(404).end();
  };
};
