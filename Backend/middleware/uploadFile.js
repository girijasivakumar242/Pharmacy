import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];

  if (allowed.includes(file.mimetype)) return cb(null, true);
  return cb(new Error("Only CSV or XLSX files are allowed"));
};

export default multer({ storage, fileFilter });
