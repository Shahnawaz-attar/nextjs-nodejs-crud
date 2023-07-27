import mongoose from 'mongoose';

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connection has established');
    });

    connection.on('error', (err) => {
      console.log(`error has encountered please check ${err}`);
      process.exit();
    });
  } catch (error) {
    console.log(error);
    console.log('something went wrong');
  }
};
