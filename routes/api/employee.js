var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all            
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  router.get('/all', (req, res, next) => {
    empModel.getEmployees((err, docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(docs);
    });
  });// all

  router.get('/byid/:id',(req, res)=>{
    var id =  req.params.id ;
    empModel.getEmployeesById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
  });//ByID

  router.get('/bycompany/:company',(req, res)=>{
    var company =  req.params.company ;
    empModel.getEmployeesByCompany(company, (err, docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(docs);
    });
  });//ByCompany

  router.get('/byagerange/:min/:max',(req, res)=>{
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);
    empModel.getEmployeesByAgeRange(min,max,(err, docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(docs);
    });
  });//ByAgeRange

  router.get('/bytag/:tag',(req, res)=>{
    var tag =  req.params.tag ;
    empModel.getEmployeesByTag(tag, (err, docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(docs);
    });
  });//ByTags

  router.post('/addtag/:id', (req, res)=>{
    var id =  req.params.id;
    var tag = req.body.tag;
    empModel.addEmployeeATag(tag,id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({error:'error'});
      }
      return res.status(200).json(doc);
      }); 
  });//Add Tag

  router.delete('/delete/:id', (req, res)=>{
    var id = req.params.id;
    empModel.removeEmployee(id, (err, deletedDoc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(deletedDoc);
    }); 
  });//delete
  
  router.post('/makeolder', (req, res)=>{
    var agedelta =parseInt(req.body.agedelta);
    empModel.increaseAgeToAll(agedelta, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({error:'error'});
      }
      return res.status(200).json(doc);
      }); 
  });//Make People older
  
  return router;
}

module.exports = initEmployee;
