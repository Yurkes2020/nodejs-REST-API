const app = require('./app');
const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;
mongoose.set('strictQuery', false);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        'Server running. Use our API on port: 3000',
        '\nDatabase connection successful'
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

console.log(process.argv[1]);
