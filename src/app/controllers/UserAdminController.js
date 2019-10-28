import * as Yup from 'yup';
import UserAdmin from '../models/UserAdmin';

class UserAdminController {
  async store(req, res) {
    /**
     * Schemas Yup
     */

    const nameSchema = Yup.object().shape({
      name: Yup.string().required(),
    });

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

    if (!(await nameSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'name is required' });
    }

    if (!(await emailSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'email is required' });
    }

    if (!(await passwordSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'password is required' });
    }

    /**
     * check email exists
     */
    const emailExistis = await UserAdmin.findOne({
      where: { email: req.body.email },
    });

    if (emailExistis) {
      return res.status(400).json({ error: 'User already exists. ' });
    }

    /**
     * inserts data into bank
     */
    const { name, email, password } = req.body;
    const userAdmin = await UserAdmin.create({
      name,
      email,
      password,
    });

    return res.json({ userAdmin });
  }
}

export default new UserAdminController();
