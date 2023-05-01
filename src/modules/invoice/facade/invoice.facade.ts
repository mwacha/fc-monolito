import InvoiceFacadeInterface from "./invoice.facade.interface";
import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto
} from "./invoice.facade.dto";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";

export interface UseCasesProps {
  generateUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private generateInvoiceUseCase: UseCaseInterface;
  private findInvoiceUseCase: UseCaseInterface;

  constructor(useCasesProps: UseCasesProps) {
    this.generateInvoiceUseCase = useCasesProps.generateUseCase;
    this.findInvoiceUseCase = useCasesProps.findUseCase;
  }

  findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return this.findInvoiceUseCase.execute(input);
  }

  generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return this.generateInvoiceUseCase.execute(input);
  }
}