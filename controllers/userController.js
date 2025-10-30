const UserProfile = require('../models/UserProfile');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ _id: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    // Don't send the PIN in the response for security
    const { sexLifePin, ...profileWithoutPin } = profile.toObject();
    res.status(200).json(profileWithoutPin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update user profile
exports.createOrUpdateUserProfile = async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { _id: req.user._id },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    const deletedProfile = await UserProfile.findOneAndDelete();
    if (!deletedProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set or verify sex life PIN
exports.setSexLifePin = async (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin || pin.length < 4) {
      return res.status(400).json({ message: 'PIN must be at least 4 digits' });
    }
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { _id: req.user._id },
      { sexLifePin: pin },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ message: 'PIN set successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Verify sex life PIN
exports.verifySexLifePin = async (req, res) => {
  try {
    const { pin } = req.body;
    const profile = await UserProfile.findOne({ _id: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    if (profile.sexLifePin === pin) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
