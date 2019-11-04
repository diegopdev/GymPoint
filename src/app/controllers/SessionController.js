import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import UserAdmin from '../models/UserAdmin';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    /**
     * Schemas Yup
     */
    const emailSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    const passwordSchema = Yup.object().shape({
      password: Yup.string()
        .required()
        .min(6),
    });

    /**
     * Schemas Yup Validation
     */

    if (!(await emailSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'email is required' });
    }

    if (!(await passwordSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'password is required' });
    }

    const { email, password } = req.body;

    const user = await UserAdmin.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not macth' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
