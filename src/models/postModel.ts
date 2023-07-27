import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
});

const PostModel =
  mongoose.models.postModel || mongoose.model('postModel', postSchema);

export default PostModel;
