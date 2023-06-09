
import { Request, Response } from 'express';
import Task  from "../../../models/Tasks";

async function getTasks(req: Request, res: Response){
  const { id } = req.query;
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para obter dados de tasks'

    /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

    try {
      const result = await id ? Task.findOne({where: {id}}): Task.findAll();
      /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/SendMailResponse" },
               description: 'Obtido as tasks'
        } */
      return res.json({
        result
      });
    } catch (err) {
      /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
      return res.status(400).json({ message: err.message});
    }
  }

  export default getTasks;
