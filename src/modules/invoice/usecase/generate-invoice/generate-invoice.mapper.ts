import Invoice from "../../domain/invoice.entity";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.dto";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import Address from "../../value-object/address.valueobject";

export default class GenerateInvoiceMapper {
  static toEntity(input: GenerateInvoiceUseCaseInputDto): Invoice {
    return new Invoice({
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map(item => {
        return new Product({
          id: new Id(item.id),
          name: item.name,
          price: item.price
        });
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toOutput(entity: Invoice): GenerateInvoiceUseCaseOutputDto {
    return {
      id: entity.id.id,
      name: entity.name,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipCode: entity.address.zipCode,
      items: entity.items.map(item => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
        }
      }),
      total: entity.total,
    }
  }
}