import mongoose from 'mongoose';

const postModel = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is require'],
  },
  color: {
    type: String,
    required: [true, 'price is require'],
  },
  price: {
    type: String,
    required: [true, 'Price is require'],
  },
});

const modelPost =
  mongoose.models.postModel || mongoose.model('postModel', postModel);

export default modelPost;
