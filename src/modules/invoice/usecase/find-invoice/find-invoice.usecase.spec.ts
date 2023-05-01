import FindInvoiceUseCase from "./find-invoice.usecase";
import Invoice from "../../domain/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../value-object/address.valueobject";
import Product from "../../domain/product.entity";

const invoice = new Invoice({
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

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockResolvedValue(invoice),
  };
};

describe("Find Invoice UseCase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const useCase = new FindInvoiceUseCase(repository);

    const input = {id: "1"};

    const result = await useCase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address.street).toEqual(invoice.address.street);
    expect(result.address.number).toEqual(invoice.address.number);
    expect(result.address.complement).toEqual(invoice.address.complement);
    expect(result.address.city).toEqual(invoice.address.city);
    expect(result.address.state).toEqual(invoice.address.state);
    expect(result.address.zipCode).toEqual(invoice.address.zipCode);
    expect(result.items[0].id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.total).toEqual(invoice.total);
  });
});