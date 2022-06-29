import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Artefact } from './artefact.model';

@ObjectType({ isAbstract: true })
class PaginatedArtefactList {
  @Field(() => [Artefact], { nullable: 'itemsAndList' })
  items: PaginatedArtefactList[];
  @Field(() => Int)
  totalItems: number;
}

@ObjectType()
export class ArtefactList extends PaginatedArtefactList {}
