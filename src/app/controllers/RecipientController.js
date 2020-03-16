import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const recipients = await Recipient.findAll({
      offset: (page - 1) * 10,
      limit: 10,
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: { message: 'Validations fails' } });
    }

    const recipientExist = await Recipient.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (recipientExist) {
      return res
        .status(401)
        .json({ error: { message: 'Recipient already exist.' } });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async show(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res
        .status(401)
        .json({ error: { message: 'Recipient not found.' } });
    }

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: { message: 'Validations fails' } });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res
        .status(401)
        .json({ error: { message: 'Recipient not found.' } });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
