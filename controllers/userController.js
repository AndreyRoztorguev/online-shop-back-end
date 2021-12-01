const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id: id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  }); // jwt.sign(payload, secretKey, options)
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return next(ApiError.badRequest("Не корректный email или password"));
      }

      const candidate = await User.findOne({ where: { email, password } });

      if (candidate) {
        return next(
          ApiError.badRequest(`Пользователь с email: ${email} уже существует`)
        );
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });

      const basket = await Basket.create({ userId: user.id });

      const token = generateJwt(user.id, user.email, user.role);

      return res.json({ token });
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден!"));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        return next(ApiError.badRequest("Не верный пароль"));
      }

      const token = generateJwt(user.email, user.password, user.role);

      return res.json({ token });
    } catch (error) {
      return next(ApiError(error.message));
    }
  }
  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (error) {
      return next(ApiError(error.message));
    }
  }
}

module.exports = new UserController();
