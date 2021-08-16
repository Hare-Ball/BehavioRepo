async function editFormHandler(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const behavior = document.querySelector('#behavior').value;
    
    var addButton = document.querySelector('.addButton');

    function showStudents(data) {
      var student = [];
      var behavior = [];

      for (var i = 0; i < data.length; i++) {
        var studentData = data[i];
        student.push(studentData.name);
        behavior.push(studentData.behavior);
      }
    }

    addButton.addEventListener('click', function() {
      var stuFirstName = firstName.value;
      var stuLastName = lastName.value;
      var stuBehavior = behavior.value;

      if (stuFirstName === '' && stuLastName === '') {
        student.push({
          behavior: stuBehavior
        });
      }
        showStudents(student);

    });
showsStudents(student)
  }







//     const response = await fetch(`/api/behavior`, {
//       method: 'POST',
//       body: JSON.stringify({
//         title,
//         content
//       }),
//       headers: {
//         'Behavior Content-Type': 'application/json'
//       }
//     });
  
//   };
  
// document.querySelector('#new-behavior-form').addEventListener('submit', newFormHandler);
