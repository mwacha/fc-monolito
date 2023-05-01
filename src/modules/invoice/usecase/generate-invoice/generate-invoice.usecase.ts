import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.dto";
import GenerateInvoiceMapper from "./generate-invoice.mapper";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private repository: InvoiceGateway;

  constructor(repository: InvoiceGateway) {
    this.repository = repository;
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = GenerateInvoiceMapper.toEntity(input);
    await this.repository.generate(invoice);
    return GenerateInvoiceMapper.toOutput(invoice);
  }
}