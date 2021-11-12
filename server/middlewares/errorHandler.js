const errorHandler = (err, req, res, next) => {
  /* CONTOH FORMAT ERROR */
  // throw { name: "CatNotFound", message: "Cat with ID <id> not found"}
  /// nama PascalCase, kata pertama adalah Entitas, kata-kata berikutnya kata kunci error. Properti 'message' opsional, bisa ditaruh pada Controller, atau di errorHandler.

  let message = []; // PAKAI KALAU ERROR MESSAGE LEBIH DARI SATU

  switch (err.name) {
    /* SEQUELIZE ERRORS */
    case "SequelizeValidationError":
      err.errors.map((error) => {
        message.push(error.message);
      });
      res.status(400).json({
        message:
          message ||
          err.errors[0].validatorArgs[0]?.message ||
          err.errors[0].message ||
          err,
      });
      // res.status(400).json({ message })
      // res.status(400).json(err)
      break;
    case "SequelizeUniqueConstraintError":
      err.errors.map((error) => {
        message.push(error.message);
      });
      res.status(400).json({ message });
      break;
    case "SequelizeForeignKeyConstraintError":
      err.errors.map((error) => {
        message.push(error.message);
      });
      res.status(400).json({ message });
      break;
    case "SequelizeDatabaseError":
      res.status(400).json({ message: err });
      break;

    /* USER ERRORS */
    // Bisa dipisah antara Student, Teacher dan Admin errors
    case "UserNotFound":
      res.status(404).json({ message: err.message || `User with ID ${err?.id} not found` })
      break

    /* CLASS ERRORS */
    case "ClassNotFound":
      res
        .status(404)
        .json({ message: err.message || `Class with ID ${err?.id} not found` });
      break;

    /* STUDENTCLASS ERRORS */
    case "StudentClassNotFound":
      res.status(404).json({ message: err.message || `Student Class Data with ID ${err?.id} not found` })
      break
    /* TASK ERRORS */

    /* SCORE ERRORS */

    /* LEVEL ERRORS */
    case "InvalidLevelId":
    case "InvalidCategoryId":
    case "InvalidMaterialId":
    case "InvalidClassId":
    case "InvalidStudentClassId":
    case "InvalidUserId":
      res.status(401).json({ message: `Please check your ID` })
      break
    case "MaterialNotFound":
      res.status(404).json({ message: err.message || `Material with ID ${err?.id} not found` })
      break

    /* CATEGORIES ERRORS */
    case "CategoryNotFound":
      res.status(404).json({ message: err.message || `Category with ID ${err?.id} not found` })
      break

    /* MATERIAL ERRORS */
    case "MaterialNotFound":
      res.status(404).json({
        message: err.message || `Material with ID ${err?.id} not found`,
      });
      break;

    case "LevelNotFound":
      res.status(404).json({ message: err.message || `Level with ID ${err?.id} not found` })
      break


    /* AUTHS ERRORS */
    case "LoginError":
      res.status(401).json({ message: "Invalid email/password" });
      break;
    case "MissingToken":
      res.status(401).json({
        message: err.message || "Please provide a valid access token",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: err.message });
      break;
    case "Unauthorized":
      res.status(403).json({ message: err.message || "Unauthorized access" });
      break;

    case "duplicate class":
      res.status(400).json({ message: err.name });
      break;

    /* WE HAVENT HANDLED THAT ONE YET ERROR */
    default:
      // res.status(500).json(err)  // For troubleshooting
      console.log(err, "<<< 500 ERRORHANDLER"); // For testing purpoises
      res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errorHandler;
