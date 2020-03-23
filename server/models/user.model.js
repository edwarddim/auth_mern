const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      // VALIDATES FOR EMAIL REGEX
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
      
  }, {timestamps: true});

// WE DO NOT WANT TO SAVE THE CONFIRM PASSWORD SO WE CREATE A 
// VIRTUAL ATTRIBUTE SO THAT WE CAN STILL RUN VALIDATIONS
UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

// BEFORE VALIDATION IS RUN ON ALL OF THE OTHER ATTRIBUTES
// WE RUN A VALIDATION FOR CONFIRM PASSWORD, AFTERWARDS THE VALIDATIONS ARE RUN
// FOR THE OTHER ATTRBIUTES
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// IF ALL VALIDATIONS ARE SUCCESSFULL, BEFORE WE SAVE OUR DATA WE TURN
// OUR PASSWORD INTO A HASHED VERSION
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
      .then(hash => {
          this.password = hash;
          next();
      });
});


const User = mongoose.model("User", UserSchema)
module.exports = User