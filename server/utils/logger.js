const SystemLog = require('../models/SystemLog');

const logEvent = async ({ level, message, user, meta = {} }) => {
  try {
    await SystemLog.create({
      level,
      message,
      user,
      meta,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Failed to write system log:', error);
  }
};

module.exports = logEvent;
