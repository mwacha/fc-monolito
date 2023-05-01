import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate Invoice UseCase unit test", () => {
  it("should generate a invoice", async () => {
    const repository = MockRepository();
    const useCase = new GenerateInvoiceUseCase(repository);

    const input = {
      id: "1",
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

    const result = await useCase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items).toEqual(input.items);
    expect(result.total).toEqual(10);
  });
});