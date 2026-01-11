import { Container } from "inversify";
import { ApiClient } from "./infra/ApiClient";
import { AuthenticatedGameService } from "./domain/AuthenticatedGameService";
import { ApiAuthenticatedGameService } from "./infra/ApiAuthenticatedGameService";
import { UnauthenticatedGameService } from "./domain/UnauthenticatedGameService";
import { ApiUnauthenticatedGameService } from "./infra/ApiUnauthenticatedGameService";
import { ApiLeaderboardService } from "./infra/ApiLeaderboardService";
import { LeaderboardService } from "./domain/LeaderboardService";
import { AuthenticatedBestScoreService } from "./domain/AuthenticatedBestScoreService";
import { ApiAuthenticatedBestScoreService } from "./infra/ApiAuthenticatedBestScoreService";
import { UnauthenticatedBestScoreService } from "./domain/UnauthenticatedBestScoreService";
import { LocalUnauthenticatedBestScoreService } from "./infra/LocalUnauthenticatedBestScoreService";

const container = new Container()
container.bind(ApiClient).toSelf().inSingletonScope()
container.bind(ApiAuthenticatedGameService).toSelf().inSingletonScope()
container.bind(AuthenticatedGameService).to(ApiAuthenticatedGameService)
container.bind(ApiUnauthenticatedGameService).toSelf().inSingletonScope()
container.bind(UnauthenticatedGameService).to(ApiUnauthenticatedGameService)
container.bind(ApiLeaderboardService).toSelf().inSingletonScope()
container.bind(LeaderboardService).to(ApiLeaderboardService)
container.bind(ApiAuthenticatedBestScoreService).toSelf().inSingletonScope()
container.bind(AuthenticatedBestScoreService).to(ApiAuthenticatedBestScoreService)
container.bind(LocalUnauthenticatedBestScoreService).toSelf().inSingletonScope()
container.bind(UnauthenticatedBestScoreService).to(LocalUnauthenticatedBestScoreService)

export { container }
