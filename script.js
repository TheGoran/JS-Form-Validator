/*
1. First we will write a simple validation with bunch of IF statements.
2. Then we will refactor the code to look much cleaner, so if we were to add more fields
we wouldnt have to add more IF statements, but instead have own Function for each type of validation.
3. The simple validation code is commented OUT and  stays for reference.
*/

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message(used for simple and refactored)
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Show Success outline (used for simple and refactored)
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//Check if Email is valid(used for simple and refactored)
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields (this function is used only in the code refactoring)
function checkRequired(arrOfInputs) {
  //High order Array method.
  arrOfInputs.forEach(function (input) {
    //We use trim() to get rid from any whitespaces, that might be considered as input values.
    if (input.value.trim() === '') {
      //here we use ES6 template string, so we can include variables/expressions like this: ${expression}
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less then ${max}`);
  } else {
    showSuccess(input);
  }
}

//Check if passwords match
function checkPassMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

//Get field/input name. (used in refactoring only)
function getFieldName(input) {
  //Taking the first letter of the word, making it Upper case, then adding the rest of the word with slice.
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // The following basic/simple validations is commented OUT and stays for reference
  /*
  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }
  if (email.value === '') {
    showError(email, 'Email is required');
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Email is not valid');
  } else {
    showSuccess(email);
  }
  if (password.value === '') {
    showError(password, 'Password is required');
  } else {
    showSuccess(password);
  }
  if (password2.value === '') {
    showError(password2, 'You must repeat the password');
  } else {
    showSuccess(password2);
  }*/
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassMatch(password, password2);
});
