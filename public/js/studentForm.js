async function newFormHandler(event) {
    event.preventDefault();
  
    const student_name = document.querySelector('#student_name').value;
    const behavior = document.querySelector('#behavior').value;
    const behavior = document.querySelector('#behaviorNote').value;
    var addButton = document.querySelector('.addButton');

    

      if (firstName && lastName && behavior && behaviorNote) {
        const response = await fetch (`/api/students`, {
          method: 'POST',
          body: JSON.stringify({ firstName, lastName, behavior, behaviorNote }),
          headers: { 'Content-Type': 'application/json'},
        }),
        
        if (response.ok) {
          document.location.replace('/studentForm');
        } else {
          alert('Failed to add.');
        }
     }  
  };


document
.querySelector('.add-student-behavior')
.addEventListener('submit', newFormHandler);




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
