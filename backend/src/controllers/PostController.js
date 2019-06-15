const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {

  /**
   * Lists all posts sorted by create Date
   */
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  /**
   * Create post and save at mongodb
   */
  async store(req, res) {
    const {
      author,
      place,
      description,
      hashtags,
    } = req.body;
    const { filename: image } = req.file;

    // Changing the file extension
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    // Resizing the photo using sharp
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName),
      );

    // removing original file from path
    fs.unlinkSync(req.file.path);

    // saving post on mongo
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    // Emitting for all users connected that there is a new post
    req.io.emit('post', post);

    return res.json(post);
  },
};
