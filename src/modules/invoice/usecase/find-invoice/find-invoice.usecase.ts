import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.dto";
import FindInvoiceMapper from "./find-invoice.mapper";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";

export default class FindInvoiceUseCase implements UseCaseInterface {
  private repository: InvoiceGateway;

  constructor(repository: InvoiceGateway) {
    this.repository = repository;
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.repository.find(input.id);
    return FindInvoiceMapper.toOutput(invoice);
  }
}