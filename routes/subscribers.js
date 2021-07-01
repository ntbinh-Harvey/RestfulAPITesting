import express from 'express';
import Subscriber from '../models/subscriber.js';
const router = express.Router(); 

// getting all
router.get('/', async (req, res) => {
    try {
        const subscriber = await Subscriber.find();
        res.json(subscriber);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})
// getting once
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})
// creating once
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
})
// updating once
router.patch ('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null && req.body.subscriberToChannel != null) {
        res.subscriber.name = req.body.name;
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
})
router.put ('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null && req.body.subscriberToChannel != null) {
        res.subscriber.name = req.body.name;
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
})
// deleting once
router.delete ('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({message: "Delete user successfully!"})
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
})
// middleware setup
async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null) {
            return res.status(404).json({message: "cannot find subscriber"})
        }
    }
    catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.subscriber = subscriber;
    next();
}
export default router;