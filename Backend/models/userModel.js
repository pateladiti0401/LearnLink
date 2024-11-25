const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  repoProgress: [
    {
      repo: { type: String, required: true },
      sections: [
        {
          name: { type: String, required: true },
          status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
          lastAccessed: { type: Date, default: Date.now }
        }
      ]
    }
  ]
});

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

// Method to track progress for each section in a repo
userSchema.methods.trackRepoSectionProgress = async function(repoName, sectionName, status) {
  const repoIndex = this.repoProgress.findIndex(r => r.repo === repoName);
  
  if (repoIndex !== -1) {
    const sectionIndex = this.repoProgress[repoIndex].sections.findIndex(s => s.name === sectionName);
    if (sectionIndex !== -1) {
      // Update existing section progress
      this.repoProgress[repoIndex].sections[sectionIndex].status = status;
      this.repoProgress[repoIndex].sections[sectionIndex].lastAccessed = new Date();
    } else {
      // Add new section progress
      this.repoProgress[repoIndex].sections.push({
        name: sectionName,
        status,
        lastAccessed: new Date()
      });
    }
  } else {
    // Add new repo and section progress
    this.repoProgress.push({
      repo: repoName,
      sections: [{
        name: sectionName,
        status,
        lastAccessed: new Date()
      }]
    });
  }
  await this.save();
};

const User = mongoose.model('user', userSchema);

module.exports = User;
