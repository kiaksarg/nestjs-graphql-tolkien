import { registerEnumType } from '@nestjs/graphql';

export const TRANSACTION_MANAGER_KEY = Symbol('TRANSACTION_MANAGER');

export const REQUEST_CONTEXT_KEY = 'NGLRequestContext';

export enum UserStatusEnum {
  Active = 'active',
  Blocked = 'blocked',
  Inactive = 'inactive',
}

export enum DocTypeEnum {
  Document,
  MainCat,
  Course,
  Episode,
  Book,
  Post,
  Article,
  Chunk,
  Page,
  video,
  photo,
  file,
  forward,
  draft,
}

export enum DocViewEnum {
  DefaultView,
  Series,
}

export enum TeamTypeEnum {
  Team = 'team',
  Repository = 'repository',
  University = 'university',
  Company = 'company',
  Institution = 'institution',
  Organization = 'organization',
}

export type Maybe<T> = T | null;

export type ScalarsEnum = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum SortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum OperatorEnum {
  And = 'And',
  Or = 'Or',
}

export enum ConceptTypeEnum {
  richText,
  image,
  audio,
  longman,
  file,
  url,
  doc,
}

export enum GenderEnum {
  male = 'Male',
  female = 'Female',
}

registerEnumType(GenderEnum, { name: 'GenderEnum' });

registerEnumType(UserStatusEnum, { name: 'UserStatusEnum' });
registerEnumType(DocTypeEnum, { name: 'DocTypeEnum' });
registerEnumType(DocViewEnum, { name: 'DocViewEnum' });
registerEnumType(SortOrderEnum, { name: 'SortOrderEnum' });
registerEnumType(OperatorEnum, { name: 'OperatorEnum' });
registerEnumType(ConceptTypeEnum, { name: 'ConceptTypeEnum' });
