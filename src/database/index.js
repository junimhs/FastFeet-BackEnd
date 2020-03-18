import Sequelize from 'sequelize';
import sequelizeConfig from '../config/database';

// Importando os models
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Avatar from '../app/models/Avatar';

const models = [User, Recipient, Avatar];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(sequelizeConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
