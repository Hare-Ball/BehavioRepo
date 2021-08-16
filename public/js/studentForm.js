async function editFormHandler(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const behavior = document.querySelector('#behavior').value;
    
    var addButton = document.querySelector('.addButton');

    addButton.addEventListener('click', function() {

      if (firstName === '' && lastName === '') {
        const response = await fetch (`/api/students`, {
          method: 'POST',
          body: JSON.stringify({ behavior }),
          headers: { 'Content-Type': 'application/json'},
        }),
        
        if (response.ok) {
          document.location.replace('/studentForm');
        } else {
          alert('Failed, check name spelling.');
        }
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
