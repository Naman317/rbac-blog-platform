const Announcement = require('../models/Announcement');

exports.Sendmsg = async (req, res) => {
  try {
    const { title, message } = req.body;

    const msg = new Announcement({ title, message });
    await msg.save();

    res.status(201).json({ message: 'Announcement is successfully published', msg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getmsg= async (req, res) => {
  try {
    const msg = await Announcement.find().sort({ createdAt: -1 });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
