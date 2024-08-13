import axios from 'axios';
import { BASE_URL } from '../../utils/constants.ts';

export class OrdersApi {
  async create(ids: string[]): Promise<number> {
    try {
      const response = await axios.post(`${BASE_URL}orders`, {
        ingredients: ids,
      });
      return response.data.order.number;
    } catch (err) {
      throw new Error('Не удалось создать заказ');
    }
  }
}
