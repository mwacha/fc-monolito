import {
    FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto,
    GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto
  } from "./invoice.facade.dto";
  
  export default interface InvoiceFacadeInterface {
    generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
    findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
  }