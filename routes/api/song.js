const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a song
router.post('/', async (req, res) => {
  const { title, length, albumId } = req.body;

  try {
    const newSong = await prisma.song.create({
      data: {
        title,
        length,
        albumId,
      },
    });

    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: 'Error creating song', error });
  }
});

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await prisma.song.findMany({
      include: {
        album: true,
      },
    });

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error });
  }
});

// Get song by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const song = await prisma.song.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        album: true,
      },
    });

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song', error });
  }
});

// Update song by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, length, albumId } = req.body;
  
    try {
      const updatedSong = await prisma.song.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          length,
          albumId,
        },
      });
  
      if (!updatedSong) {
        return res.status(404).json({ message: 'Song not found' });
      }
  
      res.status(200).json(updatedSong);
    } catch (error) {
      res.status(500).json({ message: 'Error updating song', error });
    }
  });
  
  // Delete song by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedSong = await prisma.song.delete({
        where: {
          id: parseInt(id),
        },
      });
  
      res.status(200).json(deletedSong);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting song', error });
    }
  });
  
  module.exports = router;