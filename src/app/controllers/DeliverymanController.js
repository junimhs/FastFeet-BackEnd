import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import Avatar from '../models/Avatar';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: { message: 'Validations fails.' } });
    }

    const deliverymanExist = await Deliveryman.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (deliverymanExist) {
      return res
        .status(401)
        .json({ error: { message: 'Deliveryman alread exist.' } });
    }

    const { id, name, email, avatar_id } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res
        .status(401)
        .json({ error: { message: 'Deliveryman not found.' } });
    }

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: { message: 'Validations fails.' } });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
    });

    if (!deliveryman) {
      return res
        .status(401)
        .json({ error: { message: 'Deliveryman not found.' } });
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res
        .status(401)
        .json({ error: { message: 'Deliveryman not found.' } });
    }

    await deliveryman.destroy();

    return res.json();
  }
}

export default new DeliverymanController();
