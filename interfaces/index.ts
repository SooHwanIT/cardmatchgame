// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type note = {
  
    id:number;
    mainname:string;
    subname:string;
    words: word[];
    editedDate: Date;
    
}

export type word = {
  index?: number;
  before:string;
  after: string;
  isStar: boolean;
}

export type  wordIdProps ={
    uuid: string;
    mainname: string;
  subname: string;
        editedDate: Date;
}