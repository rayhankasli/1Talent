/**
 * @author Bhumi Desai
 * @createdDate 01-04-2019
 */
import { EnvironmentConfigService } from './environment-config/environment-config.service';

/**
 * getEnvironment get the envormenr like dev, qa etc
 * @param environmentConfigService  inject the EnvironmentConfigService service
 */
export function getEnvironment (environmentConfigService: EnvironmentConfigService): () => Promise<string> {
    // Initializes the environment variables
    environmentConfigService.initializeApplicationEnvironment(window.location.host);
    // Authenticates the user.
    return () => new Promise(function (resolve) {
        // Save Data
        resolve();
    });
}
