/*
validation and sanitisation

Validation: Validation is the process of ensuring that input data falls within the expected domain of valid program input. 

Sanitization may include the elimination of unwanted characters from the input by means of removing, replacing, encoding, or escaping the characters.
----------------------------------------------------------------------

mongoose provides validation but limited. we will use npm validator to validate complex data like valid email, credit card, hash, url etc

1. validate using mongoose
2. validate using validator
3. trim & lowercase on email using mongoose - remove the white spaces from the string at both ends (not in btwn)
4. set default value on age
5. set min length

*/
const mongoose = require("mongoose");

// g)
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
