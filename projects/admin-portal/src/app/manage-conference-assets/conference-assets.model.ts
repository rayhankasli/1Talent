/**
 * @author Rayhan Kasli
 * @createdDate 25-04-2019
 * @description ConferenceAssets, ManageAssetModal and  ManageOverlayHeading
 *              classes are model class which contain some property of the manage conference assets module
 */
/** ConferenceAssets class is used for contain assets data */
export class ConferenceAssets {
    /** Asset type id of conference assets */
    public assetTypeId: number;
    /** Asset type of conference asset */
    public assetType: string;
}

/**
 * ManageAssetModal enum is use to display error messages
 */
export enum ManageAssetModal {
    /** InvalidValue is use for display message when user pass blank form */
    InvalidValue = 'Please fill in mandatory fields!',
    /** ErrorMessage define heading of toster message when error is occur */
    ErrorMessage = 'Error',
    /** NotFound indicate server can not find requested resource */
    NotFound = 'Page Not Found',
    /** InternalServerError indicates the server has encountered a situation it doesn't know how to handle.  */
    InternalServerError = '500 Internal Server Error',
    /** MethodNotAllowed indicates the request method has been disabled and cannot be used  */
    MethodNotAllowed = '405 Method Not Allowed',
    /** BadRequest indicate 400 Bad Request */
    BadRequest = '400 Bad Request',
    /** NoContent indicates no content to send for this request, but the headers may be useful */
    NoContent = '204 No Content',
    /** 
     *  UnauthorizedAccess indicates that the request has not been applied because it 
     *  lacks valid authentication credentials for the target resource 
     */
    UnauthorizedAccess = 'Unauthorized Access'
}

/**
 * ManageOverlayHeading handle heading of overlay modal for add and edit asset
 */
export enum ManageOverlayHeading {
    /** AddNewAsset set heading when new asset is create   */
    AddNewAsset = 'Add New Asset',
    /** EditAsset set heading when edit existing asset */
    EditAsset = 'Edit Asset'
}
