import * as Yup from 'yup';
import Students from '../models/Students';
import UserAdmin from '../models/UserAdmin';

class StudentsController {
  /**
   * create students
   */
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

    const ageSchema = Yup.object().shape({
      age: Yup.string().required(),
    });

    const heightSchema = Yup.object().shape({
      height: Yup.string().required(),
    });

    const weightSchema = Yup.object().shape({
      weight: Yup.string().required(),
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

    if (!(await ageSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'age is required' });
    }

    if (!(await heightSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'heigth is required' });
    }

    if (!(await weightSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'weight is required' });
    }

    const { userId } = req;
    const admin = await UserAdmin.findOne({
      where: { id: userId },
    });

    if (!admin) {
      return res.status(400).json({ error: 'is required a user admin' });
    }

    const { name, email, age, weight, height } = req.body;
    const emailExistis = await Students.findAll({
      where: { email },
    });

    if (emailExistis) {
      return res.status(400).json({ error: 'email already exists' });
    }

    const students = await Students.create({
      name,
      email,
      age,
      weight,
      height,
    });

    const { id } = students;

    return res.json({ id, name, email, age, weight, height });
  }

  /**
   * update students
   */
  async update(req, res) {
    const { id } = req.query;

    /**
     * Schemas Yup
     */
    const emailSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    const idSchema = Yup.object().shape({
      id: Yup.number().required(),
    });

    /**
     * Schemas Yup Validation
     */

    if (!(await emailSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'email is required' });
    }

    if (!(await idSchema.isValid(req.query))) {
      return res.status(400).json({ error: 'id of student is required' });
    }

    const student = await Students.findByPk(id);
    const { email } = req.body;

    if (email !== student.email) {
      const emailExists = await Students.findOne({
        where: { email },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'email already exists. ' });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({ id, name, email, age, weight, height });
  }

  async index(req, res) {
    const students = await Students.findAll({
      attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
    });
    res.json(students);
  }
}

export default new StudentsController();
