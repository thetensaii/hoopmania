import { Container } from "inversify";
import { ApiClient } from "./infra/ApiClient";
import { AuthenticatedGameService } from "./domain/AuthenticatedGameService";
import { ApiAuthenticatedGameService } from "./infra/ApiAuthenticatedGameService";
import { GuestGameService } from "./domain/GuestGameService";
import { ApiGuestGameService } from "./infra/ApiGuestGameService";
import { ApiLeaderboardService } from "./infra/ApiLeaderboardService";
import { LeaderboardService } from "./domain/LeaderboardService";
import { AuthenticatedBestScoreService } from "./domain/AuthenticatedBestScoreService";
import { ApiAuthenticatedBestScoreService } from "./infra/ApiAuthenticatedBestScoreService";
import { GuestBestScoreService } from "./domain/GuestBestScoreService";
import { LocalGuestBestScoreService } from "./infra/LocalGuestBestScoreService";
import { LocalGuestPlayerNameService } from "./infra/LocalGuestPlayerNameService";
import { GuestPlayerNameService } from "./domain/GuestPlayerNameService";

const container = new Container()
container.bind(ApiClient).toSelf().inSingletonScope()
container.bind(ApiAuthenticatedGameService).toSelf().inSingletonScope()
container.bind(AuthenticatedGameService).to(ApiAuthenticatedGameService)
container.bind(ApiGuestGameService).toSelf().inSingletonScope()
container.bind(GuestGameService).to(ApiGuestGameService)
container.bind(ApiLeaderboardService).toSelf().inSingletonScope()
container.bind(LeaderboardService).to(ApiLeaderboardService)
container.bind(ApiAuthenticatedBestScoreService).toSelf().inSingletonScope()
container.bind(AuthenticatedBestScoreService).to(ApiAuthenticatedBestScoreService)
container.bind(LocalGuestBestScoreService).toSelf().inSingletonScope()
container.bind(GuestBestScoreService).to(LocalGuestBestScoreService)
container.bind(LocalGuestPlayerNameService).toSelf().inSingletonScope()
container.bind(GuestPlayerNameService).to(LocalGuestPlayerNameService)

export { container }
