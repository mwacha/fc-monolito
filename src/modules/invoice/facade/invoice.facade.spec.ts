import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/facade.factory";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Client 1",
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
    };

    const invoice = await facade.generateInvoice(input);

    expect(invoice).toBeDefined();
    expect(input.name).toEqual(invoice.name);
    expect(input.document).toEqual(invoice.document);
    expect(input.street).toEqual(invoice.street);
    expect(input.number).toEqual(invoice.number);
    expect(input.complement).toEqual(invoice.complement);
    expect(input.city).toEqual(invoice.city);
    expect(input.state).toEqual(invoice.state);
    expect(input.zipCode).toEqual(invoice.zipCode);
    expect(input.items[0].id).toEqual(invoice.items[0].id);
    expect(input.items[0].name).toEqual(invoice.items[0].name);
    expect(input.items[0].price).toEqual(invoice.items[0].price);
  });

  it("should find invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Client 1",
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
    };

    const invoiceSaved = await facade.generateInvoice(input);

    const result = await facade.findInvoice({id: invoiceSaved.id});

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(result.name);
    expect(result.document).toEqual(result.document);
    expect(result.address.street).toEqual(result.address.street);
    expect(result.address.number).toEqual(result.address.number);
    expect(result.address.complement).toEqual(result.address.complement);
    expect(result.address.city).toEqual(result.address.city);
    expect(result.address.state).toEqual(result.address.state);
    expect(result.address.zipCode).toEqual(result.address.zipCode);
    expect(result.items[0].id).toEqual(result.items[0].id);
    expect(result.items[0].name).toEqual(result.items[0].name);
    expect(result.items[0].price).toEqual(result.items[0].price);
    expect(result.total).toEqual(result.total);
  });
});