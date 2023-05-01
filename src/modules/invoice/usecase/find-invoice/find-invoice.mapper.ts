import Invoice from "../../domain/invoice.entity";
import {FindInvoiceUseCaseOutputDTO} from "./find-invoice.dto";

export default class FindInvoiceMapper {
  static toOutput(entity: Invoice): FindInvoiceUseCaseOutputDTO {
    return {
      id: entity.id.id,
      name: entity.name,
      document: entity.document,
      address: {
        street: entity.address.street,
        number: entity.address.number,
        complement: entity.address.complement,
        city: entity.address.city,
        state: entity.address.state,
        zipCode: entity.address.zipCode,
      },
      items: entity.items.map(item => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
        }
      }),
      total: entity.total,
      createdAt: entity.createdAt,
    }
  }
}