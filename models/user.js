// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя пользователя не может быть пустым'],
    minlength: [2, 'Имя пользователя должно быть не короче 2 символов'],
    maxlength: [30, 'Имя пользователя должно быть не длиннее 30 символов'],
  },
  about: {
    type: String,
    required: [true, '`О себе` не может быть пустым'],
    minlength: [2, '`О себе` должно быть не короче 2 символов'],
    maxlength: [30, '`О себе` должно быть не длиннее 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Аватар не может быть пустым'],
    validate: {
      validator: (value) => {
        const urlRegex = /^(http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
      },
      message: (props) => `Ссылка '${props.value}' некорректна`,
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
