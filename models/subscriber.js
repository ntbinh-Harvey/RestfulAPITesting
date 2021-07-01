import mongoose from 'mongoose';
const subscribersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscriberToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
})
export default mongoose.model('Subscriber', subscribersSchema); 