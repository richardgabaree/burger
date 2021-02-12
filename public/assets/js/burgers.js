// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  // UPDATE
  const changeDevourBtns = document.querySelectorAll('.change-devour');

  // Set up the event listener for the create button
  if (changeDevourBtns) {
    changeDevourBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
          console.log('click')
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const newDevour = e.target.getAttribute('data-newdevour');

        const newDevourState = {
          devour: newDevour,
        };

        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // make sure to serialize the JSON body
          body: JSON.stringify(newDevourState),
        }).then((response) => {
            console.log('HELLO',response)
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed burger to: ${newDevour}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

  // CREATE
  const createSubmitOrder = document.getElementById('create-form');

  if (createSubmitOrder) {
    createSubmitOrder.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        burger_name: document.getElementById('ca').value.trim(),
        devour: false,
      };

      // Send POST request to create a new quote
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('ca').value = '';

        // Reload the page so the user can see the new quote
        console.log('Created a new burger!');
        location.reload();
      });
    });
  }

  // DELETE
  const deleteBurgerBtns = document.querySelectorAll('.delete-burger');

  // Set up the event listeners for each delete 
  deleteBurgerBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      console.log('DELETE', id);

      // Send the delete request
      fetch(`/api/burgers/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log('DELETE RES', res);
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
});
