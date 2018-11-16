export class PaidToeflList {
  constructor(
                 public examNo: number,
                 public examLevel: string,
                 public examPrice?: number,
                 public paidDate?: Date
  ) {}
}
