
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      let decodedData;
      if (token) {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.id = decodedData?.id;
        next()
      }
    } catch (error) {
      console.log("error", error);
        res.status(500).json("Something went wrong!!!");
    }
  } else {
    console.log("you are unathorized");
    res.status(401).json("you need to login to access this route")
  }
};

export default userAuth;