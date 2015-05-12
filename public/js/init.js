"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
	StudentsApp.displayList();

   // bind add task to StudentsApp.addStudent
   $("button#create-button").click(function(){
   	//FIX student variable, should be object,
   	//that takes the values of all three fields!
   	var student = {id: $("input#student-id").val(),
   				   name: $("input#student-name").val(),
   				   email: $("input#student-email").val() };		   
   	StudentsApp.addStudent(student);
      StudentsApp.displayList();
   });

   // bind update task to StudentsApp.updateStudent
   $("button#update-button").click(function(){
      //FIX student variable, should be object,
      //that takes the values of all three fields!
      var student = {id: $("input#student-id").val(),
                  name: $("input#student-name").val(),
                  email: $("input#student-email").val() };        
      StudentsApp.updateStudent(student);
      StudentsApp.displayList();
   });

   // bind delete task to StudentsApp.deleteStudent
   $("button#delete-button").click(function(){
      //FIX student variable, should be object,
      //that takes the values of all three fields!
      var student = {id: $("input#student-id").val(),
                  name: $("input#student-name").val(),
                  email: $("input#student-email").val() };        
      StudentsApp.deleteStudent(student);
      StudentsApp.displayList();
   });
})


