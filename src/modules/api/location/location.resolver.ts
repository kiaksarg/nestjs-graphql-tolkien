import { LocationService } from '@modules/locations/service/location.service';
import { NotFoundException } from '@nestjs/common';
import { Args, ID, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { CharacterListQueryOption } from '../character/character.args';
import { CharacterList } from '../character/models/characterList.model';
import { RequestContext } from '../common/request-context';
import { Ctx } from '../decorators/request-context.decorator';
import { LocationList } from './models/locationList.model';
import { Location } from './models/location.model';
import { LocationListQueryOption } from './location.args';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private locationService: LocationService) {}

  @Query(() => Location, { name: 'location' })
  async getLocation(
    @Ctx() ctx: RequestContext,
    @Args('id', { type: () => ID }) id: bigint,
    @Info() info: GraphQLResolveInfo,
  ) {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);

    const location = await this.locationService.get(
      ctx,
      id,
      !('characters' in simplifiedInfo.fields)
        ? null
        : (simplifiedInfo.fields as any)?.characters?.args ?? {},
    );

    if (!location) {
      throw new NotFoundException(id);
    }
    return location;
  }

  @Query(() => LocationList)
  async locations(
    @Ctx() ctx: RequestContext,
    @Args() args: LocationListQueryOption,
    @Info() info: GraphQLResolveInfo,
  ) {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);

    const locationInfo = (simplifiedInfo.fields as any)?.items?.fieldsByTypeName?.Location ?? {};
    if ('characters' in locationInfo) {
      return this.locationService.pagedUnionLocationCharacters(
        ctx,
        args.options,
        locationInfo?.characters?.args ?? {},
      );
    } else {
      return this.locationService.findAll(ctx, args.options);
    }
  }

  @ResolveField(() => CharacterList)
  async characters(
    @Args() args: CharacterListQueryOption, //this is required...
    @Parent() location: Location,
  ) {
    const { characters } = location;
    return characters;
  }
}
