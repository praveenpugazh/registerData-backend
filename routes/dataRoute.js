import express from "express";
import Users from "../model/userModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Users.find();
  res.json(data);
});
router.post("/", async (req, res) => {
  const { fullname, email, dob, picture, mobile, jobtype } = req.body;

  const user = new Users({
    fullname,
    email,
    dob,
    picture,
    mobile,
    jobtype,
  });
  await user.save();
  res.json(user);
});
router.patch("/:id", async (req, res) => {
  const { fullname, email, dob, picture, mobile, jobtype } = req.body;

  const updateUser = {};
  if (fullname) updateUser.fullname = fullname;
  if (email) updateUser.email = email;
  if (dob) updateUser.dob = dob;
  if (picture) updateUser.picture = picture;
  if (mobile) updateUser.mobile = mobile;
  if (jobtype) updateUser.jobtype = jobtype;
  let user = await Users.findByIdAndUpdate(
    req.params.id,
    { $set: updateUser },
    { new: true }
  );
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  await Users.findByIdAndRemove(req.params.id);
  res.send("data removed successfully");
});

export default router;
