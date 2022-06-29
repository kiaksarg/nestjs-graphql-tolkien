import { ArtefactService } from '@modules/artefacts/service/artefact.service';
import { NotFoundException } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { RequestContext } from '../common/request-context';
import { Ctx } from '../decorators/request-context.decorator';
import { ArtefactListQueryOption } from './artefact.args';
import { Artefact } from './models/artefact.model';
import { ArtefactList } from './models/artefactList.model';

@Resolver(() => Artefact)
export class ArtefactResolver {
  constructor(private artefactService: ArtefactService) {}

  @Query(() => Artefact, { name: 'artefact' })
  async getArtefact(@Ctx() ctx: RequestContext, @Args('id', { type: () => ID }) id: bigint) {
    const artefact = await this.artefactService.get(ctx, id);

    if (!artefact) {
      throw new NotFoundException(id);
    }
    return artefact;
  }

  @Query(() => ArtefactList)
  async artefacts(@Ctx() ctx: RequestContext, @Args() args: ArtefactListQueryOption) {
    return this.artefactService.findAll(ctx, args.options);
  }
}
