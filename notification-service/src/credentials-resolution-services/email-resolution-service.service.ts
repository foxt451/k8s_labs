import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import credResolutionConfiguration from 'src/config/credentialsResolution.config';

type TrimmedUser = {
  email: string;
  id: string;
  createdAt: Date;
};

@Injectable()
export class EmailResolutionService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(credResolutionConfiguration.KEY)
    private credResolutionConfig: ConfigType<
      typeof credResolutionConfiguration
    >,
  ) {}

  public async resolveEmailByUID(uid: string): Promise<string> {
    const { data: user } = await firstValueFrom(
      this.httpService.get<TrimmedUser>(
        `${this.credResolutionConfig.authServiceUrl}/profile/${uid}`,
      ),
    );
    return user.email;
  }
}
