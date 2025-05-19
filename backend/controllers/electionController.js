const { v4: uuid } = require("uuid")
const cloudinary = require("../utils/cloudinary")
const path = require("path")
const ElectionModel = require("../models/electionModal")
const CandidateModel = require("../models/candidateModal")
const HttpError = require('../models/ErrorModal')




// ------------add NEW election--------------
//post: api/electionss

//protexted only(admin)

const addElection = async (req, res, next) => {
    try {
        // Check if user is admin
        if (!req.user || !req.user.isAdmin) {
            return next(new HttpError("Only an admin can perform this action", 403));
        }

        const { title, description, startDate, endDate, startTime, endTime } = req.body;

        // Validate required fields
        if (!title || !description || !startDate || !endDate || !startTime || !endTime) {
            return next(new HttpError("Fill all fields, including start date, end date, and times.", 422));
        }

        // Validate correct time format (HH:mm)
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // 24-hour format
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return next(new HttpError("Invalid time format. Use HH:mm (24-hour format).", 422));
        }

        // Ensure startDate and endDate are valid
        if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
            return next(new HttpError("Invalid date format. Use YYYY-MM-DD.", 422));
        }

        // Convert to Date objects correctly
        const start = new Date(`${startDate}T${startTime}:00.000Z`);
        const end = new Date(`${endDate}T${endTime}:00.000Z`);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return next(new HttpError("Invalid date or time values. Please check input values.", 422));
        }

        // Ensure startDateTime is before endDateTime
        if (start >= end) {
            return next(new HttpError("Start date and time must be before end date and time.", 422));
        }

        // Check if thumbnail exists
        if (!req.files || !req.files.thumbnail) {
            return next(new HttpError("Choose a thumbnail.", 422));
        }

        const { thumbnail } = req.files;

        // Check file size limit (1MB)
        if (thumbnail.size > 1000000) {
            return next(new HttpError("File size too big. Should be less than 1MB.", 422));
        }

        // Generate unique file name
        const fileExtension = path.extname(thumbnail.name); // Get file extension
        const fileName = `${uuid()}${fileExtension}`;

        // Move file to a temporary location before uploading
        const tempFilePath = path.join(__dirname, "../uploads", fileName);
        await thumbnail.mv(tempFilePath);

        // Upload image to Cloudinary
        cloudinary.uploader.upload(tempFilePath, { resource_type: "image" }, async (error, result) => {
            if (error || !result.secure_url) {
                return next(new HttpError("Couldn't upload image to Cloudinary.", 422));
            }

            // Save Election to database
            const newElection = await ElectionModel.create({
                title,
                description,
                thumbnail: result.secure_url,
                startDate,
                endDate,
                startTime,
                endTime
            });

            res.json(newElection);
        });

    } catch (err) {
        return next(new HttpError(err.message || "Something went wrong.", 500));
    }
};

// const addElection = async (req, res, next) => {
//     try {
//         // Check if user is admin
//         if (!req.user || !req.user.isAdmin) {
//             return next(new HttpError("Only an admin can perform this action", 403));
//         }

//         const { title, description, startDate, endDate, startTime, endTime } = req.body;

//         // Validate required fields
//         if (!title || !description || !startDate || !endDate || !startTime || !endTime) {
//             return next(new HttpError("Fill all fields, including start date, end date, and times.", 422));
//         }

//         // Validate correct time format (HH:mm)
//         const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // 24-hour format
//         if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
//             return next(new HttpError("Invalid time format. Use HH:mm (24-hour format).", 422));
//         }

//         // Ensure startDate and endDate are valid
//         if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
//             return next(new HttpError("Invalid date format. Use YYYY-MM-DD.", 422));
//         }

//         // Convert to Date objects correctly
//         const start = new Date(`${startDate}T${startTime}:00.000Z`);
//         const end = new Date(`${endDate}T${endTime}:00.000Z`);

//         if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//             return next(new HttpError("Invalid date or time values. Please check input values.", 422));
//         }

//         // Ensure startDateTime is before endDateTime
//         if (start >= end) {
//             return next(new HttpError("Start date and time must be before end date and time.", 422));
//         }

//         // Check if thumbnail exists
//         if (!req.files || !req.files.thumbnail) {
//             return next(new HttpError("Choose a thumbnail.", 422));
//         }

//         const { thumbnail } = req.files;

//         // Check file size limit (1MB)
//         if (thumbnail.size > 1000000) {
//             return next(new HttpError("File size too big. Should be less than 1MB.", 422));
//         }

//         // Generate unique file name
//         const fileExtension = path.extname(thumbnail.name); // Get file extension
//         const fileName = `${uuidv4()}${fileExtension}`;

//         // Upload image to Cloudinary
//         const result = await cloudinary.uploader.upload_stream(
//             { resource_type: "image" },
//             async (error, result) => {
//                 if (error || !result.secure_url) {
//                     return next(new HttpError("Couldn't upload image to Cloudinary.", 422));
//                 }

//                 // Save Election to database
//                 const newElection = await ElectionModel.create({
//                     title,
//                     description,
//                     thumbnail: result.secure_url,
//                     startDate,
//                     endDate,
//                     startTime,
//                     endTime
//                 });

//                 res.json(newElection);
//             }
//         );

//         thumbnail.mv(result);

//     } catch (err) {
//         return next(new HttpError(err.message || "Something went wrong.", 500));
//     }
// };
// const addElection = async (req, res, next) => {
//     try {
//         // Only an admin can add an election
//         if (!req.user.isAdmin) {
//             return next(new HttpError("Only an admin can perform this action", 403));
//         }

//         const { title, description, startDate, endDate, startTime, endTime } = req.body;

//         // Validate required fields
//         if (!title || !description || !startDate || !endDate || !startTime || !endTime) {
//             return next(new HttpError("Fill all fields, including start date, end date, and times.", 422));
//         }

//         // Validate correct time format (HH:mm)
//         const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // 24-hour format
//         if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
//             return next(new HttpError("Invalid time format. Use HH:mm (24-hour format).", 422));
//         }

//         // Ensure startDate and endDate are valid
//         if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
//             return next(new HttpError("Invalid date format. Use YYYY-MM-DD.", 422));
//         }

//         // Convert to Date objects correctly
//         const start = new Date(`${startDate}T${startTime}:00.000Z`);
//         const end = new Date(`${endDate}T${endTime}:00.000Z`);

//         if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//             return next(new HttpError("Invalid date or time values. Please check input values.", 422));
//         }

//         // Ensure startDateTime is before endDateTime
//         if (start >= end) {
//             return next(new HttpError("Start date and time must be before end date and time.", 422));
//         }
//         if (!req.files || !req.files.thumbnail) {
//             return next(new HttpError("Choose a thumbnail.", 422));
//         }

//         // Check if thumbnail exists
//         if (!req.files || !req.files.thumbnail) {
//             return next(new HttpError("Choose a thumbnail.", 422));
//         }

//         const { thumbnail } = req.files;
//         if (thumbnail.size > 1000000) {
//             return next(new HttpError("File size too big. Should be less than 1MB.", 422));
//         }

//         // Rename the image
//         // let fileName = thumbnail.name.split(".");
//         let fileName = thumbnail.name ? thumbnail.name.split(".") : null;
//         fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

//         // Upload file to the server
//         await thumbnail.mv(path.join(__dirname, "..", "uploads", fileName), async (err) => {
//             if (err) {
//                 return next(new HttpError("Error moving file.", 500));
//             }

//             // Upload image to Cloudinary
//             const result = await cloudinary.uploader.upload(
//                 path.join(__dirname, "..", "uploads", fileName),
//                 { resource_type: "image" }
//             );

//             if (!result.secure_url) {
//                 return next(new HttpError("Couldn't upload image to Cloudinary.", 422));
//             }

//             // Save Election to database
//             const newElection = await ElectionModel.create({
//                 title,
//                 description,
//                 thumbnail: result.secure_url,
//                 startDate,
//                 endDate,
//                 startTime,
//                 endTime
//             });

//             res.json(newElection);
//         });

//     } catch (err) {
//         return next(new HttpError(err.message || "Something went wrong.", 500));
//     }
// };

// const addElection = async (req, res, next) => {
//     try {
//         // Only an admin can add an election
//         if (!req.user.isAdmin) {
//             return next(new HttpError("Only an admin can perform this action", 403));
//         }

//         const { title, description, startDate, endDate } = req.body;

//         // Validate required fields
//         if (!title || !description || !startDate || !endDate) {
//             return next(new HttpError("Fill all fields including start and end date.", 422));
//         }

//         // Validate date format
//         const start = new Date(startDate);
//         const end = new Date(endDate);


//         if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//             return next(new HttpError("Invalid date format. Use YYYY-MM-DD.", 422));
//         }

//         // Ensure startDate is before endDate
//         if (start >= end) {
//             return next(new HttpError("Start date must be before end date.", 422));
//         }
//         // const formattedStartDate = start.toISOString().split("T")[0];
//         // const formattedEndDate = end.toISOString().split("T")[0];
//         // Check if thumbnail exists
//         if (!req.files || !req.files.thumbnail) {
//             return next(new HttpError("Choose a thumbnail.", 422));
//         }

//         const { thumbnail } = req.files;
//         if (thumbnail.size > 1000000) {
//             return next(new HttpError("File size too big. Should be less than 1MB.", 422));
//         }

//         // Rename the image
//         let fileName = thumbnail.name.split(".");
//         fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

//         // Upload file to the server
//         await thumbnail.mv(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
//             if (err) {
//                 return next(new HttpError("Error moving file.", 500));
//             }

//             // Upload image to Cloudinary
//             const result = await cloudinary.uploader.upload(
//                 path.join(__dirname, '..', "uploads", fileName),
//                 { resource_type: "image" }
//             );

//             if (!result.secure_url) {
//                 return next(new HttpError("Couldn't upload image to Cloudinary.", 422));
//             }

//             // Save Election to database
//             const newElection = await ElectionModel.create({
//                 title,
//                 description,
//                 thumbnail: result.secure_url,
//                 startDate: start, // Save as Date object
//                 endDate: end      // Save as Date object
//             });

//             res.json(newElection);
//         });

//     } catch (err) {
//         return next(new HttpError(err.message || "Something went wrong.", 500));
//     }
// };

// const addElection = async (req, res, next) => {
//     try {
//         // res.json(req.files.thumbnail )

//         // only admin can add election
//         if (!req.user.isAdmin) {
//             return next(new HttpError("Only an admin can perform this action", 403))
//         }

//         const { title, description, startDate, endDate } = req.body;
//         if (!title || !description || !startDate || !endDate) {
//             return next(new HttpError("Fill all fields .", 422))
//         }

//         if (!req.files.thumbnail) {
//             return next(new HttpError("Choose a thumbnail,", 422))
//         }

//         const { thumbnail } = req.files;
//         //image should be less than 1mb
//         if ((thumbnail.size) > 1000000) {
//             return next(new HttpError("File Size too big .Shou;d be less than 1mb"))
//         }

//         //rename the image
//         let fileName = thumbnail.name;
//         fileName = fileName.split(".")
//         fileName = fileName[0] + uuid() + "." + fileName[(fileName.length) - 1]

//         //uploads file to uploads folder
//         await thumbnail.mv(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
//             if (err) {
//                 return next(HttpError(err))
//             }
//             //store imageon cloudianry
//             const result = await cloudinary.uploader.upload(path.join(__dirname, '..', "uploads", fileName), { resource_type: "image" })
//             if (!result.secure_url) {
//                 return next(new HttpError("Couldn't upload image to cloudinary", 422));
//             }
//             //save Election to db
//             const newElection = await ElectionModel.create({ title, description, thumbnail: result.secure_url })
//             res.json(newElection)
//         })
//     } catch (err) {
//         return next(new HttpError(err))
//     }

// }







// ------------get election--------------
//post: api/elections
//protexted 


const getElections = async (req, res, next) => {
    try {
        const elections = await ElectionModel.find();
        res.status(200).json(elections)
    } catch (error) {
        return next(new HttpError(error)
        )
    }
}








// ------------get single election--------------
//post: api/elections/:id
//protected 
const getElection = async (req, res, next) => {
    try {
        const { id } = req.params;
        const election = await ElectionModel.findById(id)
        res.status(200).json(election)
    } catch (error) {
        return next(new HttpError(error)
        )
    }
}

// ------------get election candidate--------------
//post: api/elections/id/candidates
//protexted only(admin)
const getCandidateOfElection = async (req, res, next) => {
    try {
        const { id } = req.params;
        const candidates = await CandidateModel.find({ election: id })
        res.status(200).json(candidates)
    } catch (error) {
        return next(new HttpError(error)
        )
    }
}






// ------------get voters of election--------------
//post: api/elections/:id/voters
//protexted
const getElectionVoters = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await ElectionModel.findById(id).populate('voters')
        res.status(200).json(response.voters)
    } catch (error) {
        return next(new HttpError(error)
        )
    }
}






// ------------update election--------------
//post: api/elections/:id
//protexted only(admin)
// const updateElection = async (req, res, next) => {
//     try {
//         // Only an admin can update election details
//         if (!req.user.isAdmin) {
//             return next(new HttpError("Only an admin can perform this action", 403));
//         }

//         const { id } = req.params;
//         const { title, description, startDate, startTime, endDate, endTime } = req.body;

//         // Ensure all required fields are provided
//         if (!title || !description || !startDate || !startTime || !endDate || !endTime) {
//             return next(new HttpError("Fill in all fields", 422));
//         }

//         // Convert startDate and endDate to valid Date objects
//         const formattedStartDate = new Date(`${startDate}T${startTime}:00.000Z`);
//         const formattedEndDate = new Date(`${endDate}T${endTime}:00.000Z`);

//         // Check if dates are valid
//         if (isNaN(formattedStartDate) || isNaN(formattedEndDate)) {
//             return next(new HttpError("Invalid date format", 422));
//         }

//         // If a new thumbnail is uploaded, handle image processing
//         if (req.files?.thumbnail) {
//             const { thumbnail } = req.files;

//             // Validate image size (should be < 1MB)
//             if (thumbnail.size > 1000000) {
//                 return next(new HttpError("Image size too big. Should be less than 1MB", 422));
//             }

//             // Rename the image
//             let fileName = thumbnail.name.split(".");
//             fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

//             // Move image to server uploads folder
//             const filePath = path.join(__dirname, '..', 'uploads', fileName);
//             thumbnail.mv(filePath, async (err) => {
//                 if (err) {
//                     return next(new HttpError("Error moving image", 500));
//                 }

//                 // Upload image to Cloudinary
//                 const result = await cloudinary.uploader.upload(filePath, { resource_type: "image" });

//                 // Validate Cloudinary upload
//                 if (!result.secure_url) {
//                     return next(new HttpError("Image upload to Cloudinary not successful", 422));
//                 }

//                 // Update election with new image
//                 await ElectionModel.findByIdAndUpdate(id, {
//                     title,
//                     description,
//                     startDate: formattedStartDate,
//                     endDate: formattedEndDate,
//                     thumbnail: result.secure_url
//                 });

//                 res.json({ message: "Election updated successfully" });
//             });
//         } else {
//             // Update election without modifying the thumbnail
//             await ElectionModel.findByIdAndUpdate(id, {
//                 title,
//                 description,
//                 startDate: formattedStartDate,
//                 endDate: formattedEndDate
//             });

//             res.json({ message: "Election updated successfully" });
//         }
//     } catch (error) {
//         return next(new HttpError(error.message, 500));
//     }
// };


const updateElection = async (req, res, next) => {

    try {
        //only admin can add election
        if (!req.user.isAdmin) {
            return next(new HttpError("Only an admin can perform this action", 403))
        }

        const { id } = req.params;
        // const { title, description } = req.body;
        // if (!title || !description) {
        //     return next(new HttpError("Fill in all fields", 422))
        // }
        const { title, description, startDate, startTime, endDate, endTime } = req.body;
        if (!title || !description || !startDate || !startTime || !endDate || !endTime) {
            return next(new HttpError("Fill in all fields", 422))
        }
        if (req.files.thumbnail) {
            const { thumbnail } = req.files;
            //image size should be 1mb
            if (thumbnail.size > 1000000) {
                return next(new HttpError("Image size too bog.should be less than 1000000", 422))
            }
            //rename the imge
            let fileName = thumbnail.name;
            fileName = fileName.split(".")
            fileName = fileName[0] + uuid() + "." + fileName[(fileName.length) - 1]


            thumbnail.mv(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if (err) {
                    return next(HttpError(err))
                }
                //store imageon cloudianry
                const result = await cloudinary.uploader.upload(path.join(__dirname, '..', "uploads", fileName), { resource_type: "image" })
                //check if cloudinary storage 
                if (!result.secure_url) {
                    return next(new HttpError("  image upload cloudinary not succesful", 422));
                }
                await ElectionModel.findByIdAndUpdate(id, { title, description, startDate, startTime, endDate, endTime, thumbnail: result.secure_url })
                res.json("Eleection updates successfully")
            })
        }

    } catch (error) {
        return next(new HttpError(error)
        )
    }
}




// ------------delete election--------------
//post: api/elections/:id






//protexted only(admin)
const removeElection = async (req, res, next) => {

    try {
        //only admin can add election
        if (!req.user.isAdmin) {
            return next(new HttpError("Only an admin can perform this action", 403))
        }
        const { id } = req.params;
        await ElectionModel.findByIdAndDelete(id);
        //delete candidate that belong to the election
        await CandidateModel.deleteMany({ election: id });
        res.status(200).json("Election deleted successfully", 200);

    } catch (error) {
        return next(new HttpError(error)
        )
    }
}


module.exports = { addElection, getElection, getElections, updateElection, removeElection, getCandidateOfElection, getElectionVoters }


