import Sequelize from 'sequelize';

import UserAdmin from '../app/models/UserAdmin';

import databaseConfig from '../config/database';

const models = [UserAdmin];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
