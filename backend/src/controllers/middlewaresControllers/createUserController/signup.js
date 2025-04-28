module.exports = async (userModel, req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input (add more validation as needed)
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Create a new user
    const newUser = new userModel({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
