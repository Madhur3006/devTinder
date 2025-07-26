const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: "Not a valid status"
        }
    }
}, { timestamps: true})

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1})          // these are compound indexes which helps in efficient data retreival 

connectionRequestSchema.pre("save", function(next) {                                 // event handler to pre save function 
    const connectionRequest = this;                                            // alternate method to put condition before saving 

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself")
    }
    next()     // very imp 
})

const ConnectionRequestModel = new mongoose.model('ConnectionRequest', connectionRequestSchema)

module.exports = ConnectionRequestModel;