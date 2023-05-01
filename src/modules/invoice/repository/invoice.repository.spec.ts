import {Sequelize} from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductModel from "./product.model";
import InvoiceModel from "./invoice.model";
import Invoice from "../domain/invoice.entity";
import Address from "../value-object/address.valueobject";
import Product from "../domain/product.entity";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true},
    });

    await sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const invoiceProps = new Invoice({
      id: new Id("1"),
      name: "Client 1",
      document: "Test",
      address: new Address({
        street: "Street 1",
        number: "12",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "Zip Code 1",
      }),
      items: [new Product({
        id: new Id("1"),
        name: "Product 1",
        price: 10,
      })],
      createdAt: new Date(),
    });
    const invoice = new Invoice(invoiceProps);
    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: {id: invoiceProps.id.id},
      include: [{model: ProductModel}],
    });

    expect(invoiceProps.id.id).toEqual(invoiceDb.id);
    expect(invoiceProps.name).toEqual(invoiceDb.name);
    expect(invoiceProps.document).toEqual(invoiceDb.document);
    expect(invoiceProps.address.street).toEqual(invoiceDb.street);
    expect(invoiceProps.address.number).toEqual(invoiceDb.number);
    expect(invoiceProps.address.complement).toEqual(invoiceDb.complement);
    expect(invoiceProps.address.city).toEqual(invoiceDb.city);
    expect(invoiceProps.address.state).toEqual(invoiceDb.state);
    expect(invoiceProps.address.zipCode).toEqual(invoiceDb.zipCode);
    expect(invoiceProps.items[0].id.id).toEqual(invoiceDb.items[0].id);
    expect(invoiceProps.items[0].name).toEqual(invoiceDb.items[0].name);
    expect(invoiceProps.items[0].price).toEqual(invoiceDb.items[0].price);
    expect(invoiceProps.total).toEqual(10);
  });

  it("should find a invoice", async () => {
    const repository = new InvoiceRepository();

    await InvoiceModel.create({
      id: "1",
      name: "Invoice 1",
      document: "Test",
      street: "Street 1",
      number: "12",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "Zip Code 1",
      items: [{
        id: "1",
        name: "Product 1",
        price: 10,
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [{model: ProductModel}],
    });

    const invoice = await repository.find("1");

    expect(invoice.id.id).toEqual("1");
    expect(invoice.name).toEqual("Invoice 1");
    expect(invoice.document).toEqual("Test");
    expect(invoice.address.street).toEqual("Street 1");
    expect(invoice.address.number).toEqual("12");
    expect(invoice.address.complement).toEqual("Complement 1");
    expect(invoice.address.city).toEqual("City 1");
    expect(invoice.address.state).toEqual("State 1");
    expect(invoice.address.zipCode).toEqual("Zip Code 1");
    expect(invoice.items[0].id.id).toEqual("1");
    expect(invoice.items[0].name).toEqual("Product 1");
    expect(invoice.items[0].price).toEqual(10);
    expect(invoice.total).toEqual(10);
  });

  it("should find not found a invoice", async () => {
    const repository = new InvoiceRepository();

    await expect(() => repository.find("1")).rejects.toThrowError("Invoice not found");
  });
});