import { CultureService } from '@modules/cultures/service/culture.service';
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
import { CultureListQueryOption } from './culture.args';
import { Culture } from './models/culture.model';
import { CultureList } from './models/cultureList.model';

@Resolver(() => Culture)
export class CultureResolver {
  constructor(private cultureService: CultureService) {}

  @Query(() => Culture, { name: 'culture' })
  async getCulture(
    @Ctx() ctx: RequestContext,
    @Args('id', { type: () => ID }) id: bigint,
    @Info() info: GraphQLResolveInfo,
  ) {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);

    const culture = await this.cultureService.get(
      ctx,
      id,
      !('characters' in simplifiedInfo.fields)
        ? null
        : (simplifiedInfo.fields as any)?.characters?.args ?? {},
    );

    if (!culture) {
      throw new NotFoundException(id);
    }
    return culture;
  }

  @Query(() => CultureList)
  async cultures(
    @Ctx() ctx: RequestContext,
    @Args() args: CultureListQueryOption,
    @Info() info: GraphQLResolveInfo,
  ) {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);

    const cultureInfo = (simplifiedInfo.fields as any)?.items?.fieldsByTypeName?.Culture ?? {};
    if ('characters' in cultureInfo) {
      return this.cultureService.pagedUnionCultureCharacters(
        ctx,
        args.options,
        cultureInfo?.characters?.args ?? {},
      );
    } else {
      return this.cultureService.findAll(ctx, args.options);
    }
  }

  @ResolveField(() => CharacterList)
  async characters(
    @Args() args: CharacterListQueryOption, //this is required...
    @Parent() culture: Culture,
  ) {
    const { characters } = culture;
    return characters;
  }

  // @ResolveField(() => CharacterList)
  // async characters(
  //   @Ctx() ctx: RequestContext,
  //   @Args() args: CharacterListQueryOption,
  //   @Parent() culture: Culture,
  // ) {
  //   const { id } = culture;
  //   const res = await this.cultureService.pagedCultureCharactersByCultureId(ctx, id, args.options);
  //   return res;
  // }
}
