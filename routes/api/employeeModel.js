var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('emps');

  lib.getEmployees = (handler)=>{
    empColl.find({}).toArray(handler);
    // implementar
    // obtener todos los documentos
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesById = (id, handler) => {
    var query = { "_id": new ObjectID(id) };
    var projection = { "email": 1, "phone": 1, "name":1,"age":1};
    empColl.findOne(
      query,
      {"projection":projection},
      (err, employee)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, employee);
      }
    )
  
    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByCompany = (company, handler) => {
    var query = {"company":company};
    var projection = { "name": 1, "email": 1, "company":1};
    empColl.find(
      query,
      {"projection":projection}).toArray(
      (err, employees)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, employees);
      }
    )
    // implementar
    // solo mostrar name, email, company
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => { 
    var query = { "$and" : [
      {"age":{"$gte":ageLowLimit}},
      {"age":{"$lte":ageHighLimit}} ]};
    var projection = { "name": 1, "age": 1, "email":1};
    empColl.find(
      query,
      {"projection":projection}).toArray(
      (err, employees)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, employees);
      }
    )
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    var query = {"tags":tag};
    var projection = { "name": 1, "email": 1, "tags":1};
    empColl.find(
      query,
      {"projection":projection}).toArray(
      (err, employees)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, employees);
      }
    )
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    //return handler(new Error("No Implementado"), null);
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    var query = { "_id": new ObjectID(id)};
    var updateCommad = { 
      "$push":{
        "tags": tag
      }
    };
    empColl.updateOne(
      query,
      updateCommad,
      (err, doc)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, doc);
      }
    );
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    //return handler(new Error("No Implementado"), null);
  }

  lib.removeEmployee = (id, handler) => {
    var query = {"_id": new ObjectID(id)};
    empColl.deleteOne(
      query,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );
    //Implementar
    //Se requiere eliminar un documento de la colección
    //return handler(new Error("No Implementado"), null);
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    var updateCommad = { 
      "$inc" :{
        "age": ageDelta
      }
    };
    empColl.updateMany(
      {},
      updateCommad,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    //return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
