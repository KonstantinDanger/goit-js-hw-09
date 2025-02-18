const emailInput = document.querySelector("input[type='email']");
const messageInput = document.querySelector("textArea[name='message']");
const form = document.querySelector('.feedback-form');

//storage key
const formDataKey = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const loadData = () => {
  let dataStr;
  let loadedData;
  try {
    dataStr = sessionStorage.getItem(formDataKey);
    loadedData = JSON.parse(dataStr);
  } catch (e) {
    alert(e);
  }

  if (!loadedData) return;

  formData = loadedData;

  emailInput.value = formData.email;
  messageInput.value = formData.message;
};

const saveData = formData => {
  const dataStr = JSON.stringify(formData);

  sessionStorage.setItem(formDataKey, dataStr);
};

const submit = e => {
  e.preventDefault();

  console.log('submit');

  if (e.target.tagName !== 'FORM') return;

  if (!formData.email || !formData.message) {
    alert('Please, fill all fields!');
    return;
  }

  console.log(formData);
  formData.email = '';
  formData.message = '';
  emailInput.value = '';
  messageInput.value = '';
  sessionStorage.removeItem(formDataKey);
};

const onFormChanged = e => {
  const target = e.target;
  const saveDataTags = ['INPUT', 'TEXTAREA'];

  if (saveDataTags.includes(target.tagName)) {
    formData.email = emailInput.value;
    formData.message = messageInput.value;

    saveData(formData);
  }
};

form.addEventListener('input', onFormChanged);
form.addEventListener('submit', submit);

loadData();
