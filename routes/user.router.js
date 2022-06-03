const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
    res.send("Hello World!");
    }
);
router.get("/", (req, res) => {
    res.send("Hello World!");
    }
);
router.get("/:id", (req, res) => {
    res.send("Hello World!");
    }
);
router.patch("/:id", (req, res) => {
    res.send("Hello World!");
    }
);
router.delete("/:id", (req, res) => {
    res.send("Hello World!");
    }
);
module.exports = router;