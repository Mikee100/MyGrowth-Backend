const UserProfile = require('../models/UserProfile');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update user profile
exports.createOrUpdateUserProfile = async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      {},
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
