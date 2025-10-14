const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB');
}).catch(error => {
  console.log('error connecting to MongoDB:', error.message);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    require: true,
  },
  number: {
    type: String,
    require: true,
    validate: {
      validator: v => {
        const regex = /^\d{2,3}-\d+$/;
        return regex.test(v) && v.length >= 8;
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);