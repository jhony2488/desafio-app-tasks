
import { Request, Response } from 'express';
import Task from '../../../models/Tasks';

async function UpdatePropects(req: Request, res: Response) {
  const { id } = req.params;
  const {
    title,
    completed,
  }: {
    title: string
    completed: boolean
  } = req.body;
  const getId=typeof id === 'string' ? parseInt(id) : id;
  // #swagger.tags = ['Tasks']
  // #swagger.description = 'Endpoint para atualizar dados de uma task'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para envio de email de contato",
                required: true,
                schema: { $ref: "#/definitions/SendMail" }
        } */

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
    await Task.update(
      {
        title,
        completed,
      },
      {
        where: {
          id:getId,
        },
      }
    );
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/SendMailResponse" },
               description: 'Enviar email'
        } */
    return res.json({
      message: 'Tarefa atualizada com sucesso',
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default UpdatePropects
