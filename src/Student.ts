export class Student {
    /**
     *
     */
    constructor(
      public  name: String,
      public id: Number,
      public address: String,
      public phone: Number,
      public active: Boolean,
      public average: Number,
      public leaveDate:Date | undefined,
      public flag : Boolean ,
      public DeleteStudent: Boolean = false
      
    ) {}
}