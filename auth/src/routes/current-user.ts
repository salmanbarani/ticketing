import express  from "express";
import Jwt  from "jsonwebtoken";

const router = express.Router()

router.get("/api/users/currentuser", (req, res) => {
    if (!req.session?.jwt){
        return res.send({currentUser: null});
    }

    try{
        const currentUser = Jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        );
        res.send({currentUser: currentUser});

    }catch (err) {
        res.send({currentUser: null});
    }


});


export {router as currentUserRouter};

