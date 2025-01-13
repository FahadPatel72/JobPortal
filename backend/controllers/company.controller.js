import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {

    try {
        const { companyName } = req.body;
       
        if (!companyName) {
            return res.status(400).json({
                message: "Company not found",
                success: false,
            })
        }

        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "Company name already exist",
                success: false,
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.user.id,
        })

        return res.status(201).json({
            message: "Company register Successfully",
            company,
            success: true,
        })



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Company registration failed",
            success: false,
        })
    }

}

export const getCompany = async (req, res) => {

    try {
        const userId = req.user.id;
        const companies = await Company.find({ userId });

        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false,
            })
        }

        return res.status(200).json({
            success: true,
            companies,
            message: "Company found successfull",
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Internal Server Error",
            success: false
        })
    }

}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id.trim();

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            })
        }

        return res.status(200).json({
            success: true,
            company,
            message: "Company Found",
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        //cloudinary baadme add krenge

        const updateData = { name, description, website, location }

        const company = await Company.findByIdAndUpdate(req.params.id.trim(), updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            })
        }

        return res.status(200).json({
            success: true,
            company,
            message: "Company details updated successfull",
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Company updation failed",
            success: false
        })
    }
}

