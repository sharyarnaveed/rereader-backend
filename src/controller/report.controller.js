const ReportModel = require("../models/report.model");

const saveReport = async (req, res) => {
  try {
    const reportedby= req.user.id
    const {   productid } = req.body;
    console.log(reportedby, productid);

    if ( !reportedby || !productid) {
      return res.json({
        message: "Report Not Saved",
        success: false,
      });
    }

    const savereprot = await ReportModel.create({
      reportedby,
      productid,
    });

    if (savereprot) {
      return res.json({
        message: "Report Saved",
        success: true,
      });
    } else {
      return res.json({
        message: "Report Not Saved",
        success: false,
      });
    }
  } catch (error) {
    console.log("error in saving report", error);
    return res.json({
      message: "Report Not Saved",
      success: false,
    });
  }
};


module.exports={saveReport}