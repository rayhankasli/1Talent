/**
 * @author Rayhan Kasli
 * @createdDate 22-03-2019
 * @description EnvironmentConfig class is model type its contain baseUrl
 *
 */
/**
 * EnvironmentConfig is model class use for set urls for the server
 */
export class EnvironmentConfig {
    /** baseUrl define url of the server */
    public baseUrl: string;
    /** Url for authority of environment config */
    public authorityUrl: string;
    /** Url for frontend */
    public angularUrl: string;
    /** Authority client id of environment config */
    public authorityClientId: string;
    /** Authority client api of environment config */
    public authorityClientApi: string;

}
