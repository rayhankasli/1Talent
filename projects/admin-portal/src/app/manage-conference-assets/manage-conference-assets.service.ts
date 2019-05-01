/**
 * @author Rayhan Kasli
 * @createdDate 29-04-2019
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/';
import { ConferenceAssets } from './conference-assets.model';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfigService } from '../core/environment-config/environment-config.service';
/** Injectable */
@Injectable({
  providedIn: 'root'
})
export class ManageConferenceAssetsService {

 /** serviceUrl store url of server */
 public serviceUrl: string;

 /** insertAsset */
 public insertAsset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

 /** updateAssetById */
 public updateAssetById: BehaviorSubject<ConferenceAssets> = new BehaviorSubject<ConferenceAssets>(null);

  /**
   * Creates an instance of manage asset service.
   * @param httpClient inject HttpClient class to interact with server
   * @param environmentConfigService inject environmentConfigService class for  interact with server
   */
 constructor (private httpClient: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.serviceUrl = environmentConfigService.getBaseUrl();
   }

  /**
   * Gets all assets data using get method of HttpClient
   * @returns all assets data from server
   */
 public getAllAssets (): Observable<ConferenceAssets []> {
    return this.httpClient.get<ConferenceAssets[]>(this.serviceUrl + 'asset');
  }

   /**
    * addNewAsset used for add new asset
    * @param asset get the asset data from component
    * @returns assets observable
    */
 public addNewAsset (asset: {[key: string]: string}): Observable<ConferenceAssets> {
    return this.httpClient.post<ConferenceAssets>(this.serviceUrl + 'asset', asset);
  }

  /**
   * updateAsset is used to Update asset as per asset id
   * @param asset get the updated data of asset
   * @returns assets Observable
   */
 public updateAsset (asset: {[key: string]: number | string}): Observable<ConferenceAssets> {
    return this.httpClient.put<ConferenceAssets>(this.serviceUrl + 'asset/' + asset.assetTypeId, asset);
  }

  /**
   * Delete aseet
   * @param assetId get unique asset id for delete asset
   * @returns asset Observable
   */
 public deleteAsset (assetId: number): Observable<ConferenceAssets> {
    return this.httpClient.delete<ConferenceAssets>(this.serviceUrl + 'asset/' + assetId);
  }

   /**
    * setAssetInsert
    * @param flagInsert
    */
 public setAssetInsert (flagInsert: boolean): void {
    this.insertAsset.next(flagInsert);
  }

  /**
   * setAssetForUpdate
   * @data
   */
 public setAssetForUpdate (data: ConferenceAssets): void {
    this.updateAssetById.next(data);
  }

  /**
   * getAssetForUpdate
   * @returns data as observeble
   */
 public getAssetForUpdate (): Observable<ConferenceAssets> {
    return this.updateAssetById.asObservable();
  }
}
