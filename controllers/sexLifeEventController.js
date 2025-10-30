const SexLifeEvent = require('../models/SexLifeEvent');

// Get all sex life events
exports.getAllSexLifeEvents = async (req, res) => {
  try {
    const events = await SexLifeEvent.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single sex life event
exports.getSexLifeEvent = async (req, res) => {
  try {
    const event = await SexLifeEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Sex life event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create sex life event
exports.createSexLifeEvent = async (req, res) => {
  try {
    const event = new SexLifeEvent({
      ...req.body,
      userId: req.user._id,
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update sex life event
exports.updateSexLifeEvent = async (req, res) => {
  try {
    const updatedEvent = await SexLifeEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Sex life event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete sex life event
exports.deleteSexLifeEvent = async (req, res) => {
  try {
    const deletedEvent = await SexLifeEvent.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Sex life event not found' });
    }
    res.status(200).json({ message: 'Sex life event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
