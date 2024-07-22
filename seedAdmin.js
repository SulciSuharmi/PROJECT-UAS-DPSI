const bcrypt = require('bcryptjs');
const { Akun } = require('./models');

const createInitialAdmin = async () => {
  try {
    const admin = await Akun.findOne({ where: { username: 'adminPerpus' } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('2200016113Sulci', 10);
      await Akun.create({
        username: 'adminPerpus',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createInitialAdmin();
