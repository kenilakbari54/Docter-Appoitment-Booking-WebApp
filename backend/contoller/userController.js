import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import BookingSchema from "../models/BookingSchema.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res
            .status(200)
            .json({
                success: true,
                message: "Successfully updated",
                data: updatedUser,
            });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(
            id,
        );
        res
            .status(200)
            .json({
                success: true,
                message: "Successfully deleted",
            });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
}
export const getSigleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(
            id
        );
        res
            .status(200)
            .json({
                success: true,
                message: "user found",
                data: user,
            });
    } catch (err) {
        res.status(500).json({ success: false, message: "no user found" });
    }
}
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res
            .status(200)
            .json({
                success: true,
                message: "user found",
                data: users,
            });
    } catch (err) {
        res.status(500).json({ success: false, message: "not found" });
    }
}
export const getUserProfile = async (req, res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User Not Found' })
        }
        const { password, ...rest } = user._doc
        res.status(200).json({ success: true, message: "Profile info getting", data: { ...rest } })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong," })
    }
}
export const getMyAppointment = async (req, res) => {
    const userId = req.userId
    try {

        const bookings = await BookingSchema.find({ user: req.userId })
        const doctorIds = bookings.map(el => el.Doctor.id)
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password')

        res.status(200).json({ success: true, message: "appointment are getting", data: doctors })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong," })
    }
}
