import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class UserAdmin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async userAdmin => {
      if (userAdmin.password) {
        userAdmin.password_hash = await bcrypt.hash(userAdmin.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default UserAdmin;
