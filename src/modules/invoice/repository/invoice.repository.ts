import Invoice from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";
import InvoiceGateway from "../gateway/invoice.gateway";
import ProductModel from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address.valueobject";
import Product from "../domain/product.entity";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<any> {
    await ProductModel.destroy({
      where: {id: invoice.items.map(item => item.id.id)},
    });

    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }, {
      include: [{model: ProductModel}],
    });
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: {id},
      include: [{model: ProductModel}],
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      }),
      items: invoice.items.map(item => (new Product({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      }))),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }

}