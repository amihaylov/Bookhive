var StudentsApp = (function() {

  var addStudent = function(student) {
    //var test = {id: "kiro2", name: "Kiro Ananasov", email: "kiro@test.com"};
    $.ajax({
      type: "POST",
      url: '/students',
      data: student
    });
  };

  //TODO Make selector for id
  var updateStudent = function(student) {
    $.ajax({
      type: "PUT",
      url: '/students/' + student.id,
      data: student
    });
  };

  //TODO Make selector for id
  var deleteStudent = function(student) {
    $.ajax({
      type: "DELETE",
      url: '/students/' + student.id,
      data: student
    });
  };

  var displayList = function() {

    $.get( "/students", function( data ) {
      $( ".result" ).html( data );
      var container = $("#students-database > tbody");
      container.empty();

      //Add the database
      for (var i=0; i<data.length; i+=1){
        //Add classes TODO!
        var row = $("<tr></tr>");
        var cellId = $("<td></td>").text(data[i].id);
        var cellName = $("<td></td>").text(data[i].name);
        var cellEmail = $("<td></td>").text(data[i].email);
        row.append(cellId).append(cellName).append(cellEmail);
        container.append(row);
      }

    },"json");
    
  };

  // public api
  return {
    addStudent: addStudent,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent,
    displayList: displayList
  };
})();
 
