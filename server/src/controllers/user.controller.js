import { catchAsync } from "../utils/catchAsync";

const profile = catchAsync(async (req, res) => {
  res.send(req.user);
});

export default { profile };
