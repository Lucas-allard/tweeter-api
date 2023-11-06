module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            author: {type: String, required: true},
            title: {type: String, required: true},
            content: {type: String, required: true},
            likes: Number,
        },
        {
            timestamps: true
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("tweet", schema);
}