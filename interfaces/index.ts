// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type note = {
  
    id:number;
    mainname:string;
    subname:string;
    words:word[];
}

export type word = {
  index: number;
  before:string;
  after:string;
}