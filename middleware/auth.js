import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  // console.log(req);
  // console.log(req.body.token);
  // console.log(req.body.id);
  // console.log(req.body.name);
  try {
    // const token = req.header.authorization.split(" ")[1];
    const token = req.body.token;
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
