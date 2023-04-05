const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create an album
router.post('/', async (req, res) => {
  const { title, year, artistId } = req.body;

  try {
    const newAlbum = await prisma.album.create({
      data: {
        title,
        year,
        artistId,
      },
    });

    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ message: 'Error creating album', error });
  }
});

// Get all albums
router.get('/', async (req, res) => {
  try {
    const albums = await prisma.album.findMany({
      include: {
        artist: true,
        songs: true,
      },
    });

    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums', error });
  }
});

// Get album by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const album = await prisma.album.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        artist: true,
        songs: true,
      },
    });

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching album', error });
  }
});

// Update album by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, year, artistId } = req.body;

  try {
    const updatedAlbum = await prisma.album.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        year,
        artistId,
      },
    });

    if (!updatedAlbum) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.status(200).json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ message: 'Error updating album', error });
  }
});

// Delete album by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAlbum = await prisma.album.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(deletedAlbum);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting album', error });
  }
});

module.exports = router;
