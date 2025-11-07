require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Trainer = require('../models/Trainer');
const Class = require('../models/Class');
const Membership = require('../models/Membership');

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitin5';
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected for seeding');
}

async function clearCollections() {
  await Promise.all([
    User.deleteMany({}),
    Trainer.deleteMany({}),
    Class.deleteMany({}),
    Membership.deleteMany({}),
  ]);
  console.log('Cleared Users, Trainers, Classes, Memberships');
}

async function seedUsers() {
  const users = [
    {
      name: 'Shruti Admin',
      email: 'shrutirudra246@gmail.com',
      password: 'shruti246',
      role: 'admin',
      roleBase: 1,
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password@123',
      role: 'user',
      roleBase: 0,
    },
  ];

  // Use create to trigger pre-save hooks (hash passwords)
  const created = [];
  for (const u of users) {
    const doc = await User.create(u);
    created.push(doc);
  }
  console.log(`Seeded ${created.length} users (passwords hashed)`);
  return created;
}

async function seedMemberships() {
  const plans = [
    {
      name: 'Basic',
      duration: 1,
      price: 9.99,
      features: [
        'Access to beginner classes',
        'Community support',
        'Monthly progress tips',
      ],
    },
    {
      name: 'Pro',
      duration: 3,
      price: 24.99,
      features: [
        'All Basic features',
        'Intermediate classes',
        'Priority support',
      ],
    },
    {
      name: 'Elite',
      duration: 12,
      price: 79.99,
      features: [
        'All Pro features',
        'Advanced programs',
        'Quarterly 1:1 coach session',
      ],
    },
  ];
  const created = await Membership.insertMany(plans);
  console.log(`Seeded ${created.length} membership plans`);
  return created;
}

async function seedTrainers() {
  const trainers = [
    {
      name: 'Aisha Khan',
      specialty: 'Yoga',
      bio: 'Certified yoga instructor with 6 years of experience in Vinyasa and Hatha yoga.',
      experience: 6,
      photo: '',
    },
    {
      name: 'Rahul Verma',
      specialty: 'Strength',
      bio: 'Strength and conditioning coach helping clients build muscle and move better.',
      experience: 8,
      photo: '',
    },
    {
      name: 'Maya Patel',
      specialty: 'Cardio',
      bio: 'High-energy cardio and HIIT specialist focused on sustainable results.',
      experience: 5,
      photo: '',
    },
  ];
  const created = await Trainer.insertMany(trainers);
  console.log(`Seeded ${created.length} trainers`);
  return created;
}

function buildFiveMinuteRoutine() {
  // 5 minutes -> 10 steps of 30 seconds each
  const exercises = [
    'Jumping Jacks',
    'Bodyweight Squats',
    'High Knees',
    'Push-ups',
    'Mountain Climbers',
    'Lunges',
    'Plank',
    'Butt Kicks',
    'Sit-ups',
    'Burpees',
  ];
  return Array.from({ length: 10 }).map((_, i) => ({
    timeElapsed: (i + 1) * 30,
    exercise: exercises[i % exercises.length],
    instructions: 'Maintain good form. Breathe steadily.',
    reps: '30s',
  }));
}

async function seedClasses(trainers) {
  const classes = [
    {
      name: 'Morning Yoga Flow',
      description: 'A gentle 5-minute vinyasa flow to wake up your body and mind.',
      duration: 5,
      trainer: trainers.find(t => t.specialty === 'Yoga')._id,
      routine: buildFiveMinuteRoutine(),
    },
    {
      name: 'HIIT Quick Burn',
      description: 'A fast-paced HIIT sequence to elevate your heart rate and burn calories.',
      duration: 5,
      trainer: trainers.find(t => t.specialty === 'Cardio')._id,
      routine: buildFiveMinuteRoutine(),
    },
    {
      name: 'Strength Circuit',
      description: 'A short strength circuit focusing on full-body compound movements.',
      duration: 5,
      trainer: trainers.find(t => t.specialty === 'Strength')._id,
      routine: buildFiveMinuteRoutine(),
    },
  ];
  const created = await Class.insertMany(classes);
  console.log(`Seeded ${created.length} classes`);
  return created;
}

async function run() {
  try {
    await connectDB();
    await clearCollections();
    await seedUsers();
    await seedMemberships();
    const trainers = await seedTrainers();
    await seedClasses(trainers);
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message || err);
    process.exit(1);
  }
}

run();
