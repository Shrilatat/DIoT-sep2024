var express = require('express');
var app = express();
const bodyParser = require('body-parser');  //parses the body of the request and lets us react to it
const cors = require('cors');   //cross-origin resource sharing

app.use(cors({
    //origin: 'http://localhost:4200/'
    origin: '*'
}));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let courses = [
           {id:1,name:'Java'},
           {id:2,name:'AJAX'},
		     {id:3,name:'Angular'}];

app.get('/', function(req, res){
   let str = "<h1>Hello World </h1>"
   str += "Do you want to <a href='AddCourse.html'>Add new course</a>"
   res.send(str);
});

app.get('/AddCourse.html', function(req, res){
   res.sendFile('AddCourse.html' , { root : __dirname});
});

app.get('/api/courses', function(req, res){
   //res.send([10,20,30,40]);
   res.send(courses);
});

//logic to look for  a course with given id
app.get('/api/courses/:id', function(req, res){
   var course;
   for(c in courses){
	   if(courses[c].id == parseInt(req.params.id)){
		   console.log("found ");
		   course = courses[c];
	   }
   }
   res.send(course);
});

app.post('/api/courses',function(req,res){
      console.log(req.body)
      let obj = req.body
      //obj.id = courses.length+1
      obj.id = courses[courses.length-1].id+1
      console.log(obj)
		courses.push(obj);
	res.send("Added course : " + JSON.stringify(obj));
});
	
app.delete('/api/courses/:id', function(req, res){
   var course = {}, index=0;
   for(c in courses){
	   if(courses[index].id == parseInt(req.params.id)){
		   console.log("course found for delete  " + courses[index].toString(), index);
		   course = courses[index];
         break;
	   }
      index++;
   }
   courses.splice(index,1)
   res.send(course)
   //res.send("course with id " + req.params.id + "  deleted");
});

app.listen(4000, function(){
   console.log("Server is running")
});