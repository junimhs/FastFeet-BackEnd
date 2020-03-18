import Sequelize from 'sequelize';
import sequelizeConfig from '../config/database';

// Importando os models
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Avatar from '../app/models/Avatar';
import Deliveryman from '../app/models/Deliveryman';
import Signature from '../app/models/Signature';
import Delivery from '../app/models/Delivery';

const models = [User, Recipient, Avatar, Deliveryman, Signature, Delivery];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(sequelizeConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
