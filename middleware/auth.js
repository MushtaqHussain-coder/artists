const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    await prisma.user.create({ data: user });
    res.status(201).send('User registered');
  } catch {
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { name: req.body.name } });

  if (!user) {
    return res.status(400).send('User not found');
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken });
    } else {
      res.status(403).send('Invalid password');
    }
  } catch {
    res.status(500).send('Error during authentication');
  }
});

module.exports = router;
