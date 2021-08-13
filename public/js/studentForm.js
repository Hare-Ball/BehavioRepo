async function newFormHandler(event) {
    event.preventDefault();
  
    const studentBehavior = document.querySelector('input[name="behavior-form"]').value;
    const behaviorContent = document.querySelector('input[name="behavior content"]').value;
  
    const response = await fetch(`/api/behavior`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Behavior Content-Type': 'application/json'
      }
    });
  
  };
  
document.querySelector('#new-behavior-form').addEventListener('submit', newFormHandler);
