const Post = require('../models/Post')

module.exports = {

    /**
     * Increments the like param from a Post photo
     */
    async store(req, res) {
        const post = await Post.findById(req.params.id)

        post.likes += 1

        await post.save()

        // Emitting for all users connected that there is a like on a post
        req.io.emit('like', post)

        return res.json(post)
    }
}