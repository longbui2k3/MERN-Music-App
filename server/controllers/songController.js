const Song = require('../models/songModel');

const getAllSongs = async(req, res, next) => {
        await Song.find()
            .then(result => {
                res.status(200).json({
                    status: 'success', 
                    data: result
                })
            })
            .catch(err => {
                return next(err);
            })


}

const getSong = async(req, res, next) => {
        const id = req.params.id;
        await Song.findById(id)
                .then(result => {
                    res.status(200).json({
                        status: "success",
                        data: result
                    })
                })
                .catch((err) => {
                    return next(err);
                })
}

const createSong = async(req, res, next) => {
    const song = await Song.create(req.body);

    song.save()
        .then(result => {
            res.status(201).json({
                status: "success", song
            })
        })
        .catch(err => {
            return next(err)
        })
}

const deleteSong = async(req, res, next) => {
    const id = req.params.id;

    await Song.findByIdAndDelete(id)
                .then(result => {
                    res.status(200).json({
                        status: "success"
                    })
                })
                .catch(err => {
                    return next(err)
                })
}

const updateSong = async(req, res, next) => {
    const id = req.params.id;

    await Song.findByIdAndUpdate(id,req.body,
        {
        new: true,
        runValidators: true,
      })
        .then(result => {
            res.status(200).json({
                status: "success",
                updatedData: result
            })
        })
        .catch(err => {
            return next(err);
        })
}

module.exports = {
    getAllSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong
}