const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SettingsSchema = new Schema({
    categories:[String]
})

const Settings = mongoose.model('Settings', SettingsSchema);
module.exports = Settings;