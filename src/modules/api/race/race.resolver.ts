import { RaceService } from '@modules/races/service/race.service';
import { NotFoundException } from '@nestjs/common';
import { Args, ID, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import {
  CharacterListQueryOption,
  characterPropertiesRelationMap,
} from '../character/character.args';

import { CharacterList } from '../character/models/characterList.model';
import { RequestContext } from '../common/request-context';
import { Ctx } from '../decorators/request-context.decorator';
import { Race } from './models/race.model';
import { RaceList } from './models/raceList.model';
import { RaceListQueryOption } from './race.args';

@Resolver(() => Race)
export class RaceResolver {
  constructor(private raceService: RaceService) {}

  @Query(() => Race, { name: 'race' })
  async getRace(
    @Ctx() ctx: RequestContext,
    @Args('id', { type: () => ID }) id: bigint,
    @Info() info: GraphQLResolveInfo,
  ) {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);

    const race = await this.raceService.get(
      ctx,
      id,
      !('characters' in simplifiedInfo.fields)
        ? null
        : (simplifiedInfo.fields as any)?.characters?.args ?? {},
    );

    if (!race) {
      throw new NotFoundException(id);
    }
    return race;
  }

  @Query(() => RaceList)
  async races(
    @Ctx() ctx: RequestContext,
    @Args() args: RaceListQueryOption,
    @Info() info: GraphQLResolveInfo,
  ) {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);

    const raceInfo = (simplifiedInfo.fields as any)?.items?.fieldsByTypeName?.Race ?? {};
    if ('characters' in raceInfo) {
      return this.raceService.pagedUnionRaceCharacters(
        ctx,
        args.options,
        raceInfo?.characters?.args ?? {},
      );
    } else {
      return this.raceService.findAll(ctx, args.options);
    }
  }

  @ResolveField(() => CharacterList)
  async characters(
    @Args() args: CharacterListQueryOption, //this is required...
    @Parent() race: Race,
  ) {
    const { characters } = race;
    return characters;
  }
}
