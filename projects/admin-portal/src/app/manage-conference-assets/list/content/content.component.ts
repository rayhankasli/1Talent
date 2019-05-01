/**
 * @author Rayhan Kasli
 * @createdDate 29-04-2019
 * @description This component file is used to dispaly assets data
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConferenceAssets } from '../../conference-assets.model';

/**
 * ContentComponent used to display assets data as well as passing assetId for update and delete asset
 */
@Component({
  selector: 'one-talent-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent  {

 /** Input contentData used for display assets data in table */
 @Input() public contentData: ConferenceAssets;

 /** Output deleteEvent used for emit the asset id for delete asset */
 @Output() public deleteEvent: EventEmitter<number> = new EventEmitter<number>();

 /** Output updateEvent used for emit the asset data to overlay modal for update  */
 @Output() public updateEvent: EventEmitter<ConferenceAssets> = new EventEmitter<ConferenceAssets>();

 /**
  * deleteAsset get id for delete asset
  * @param deleteId contain the unique id of asset for delete
  * @author Rayhan Kasli
  * @createdDate 26-04-2019
  */
 public deleteAsset (deleteId: number): void {
   this.deleteEvent.emit(deleteId);
 }

 /**
  * editAsset get the asset data and emit the data
  * @param updateData contain the asset data for upadte
  * @author Rayhan Kasli
  * @createdDate 26-04-2019
  */
 public editAsset (updateData: ConferenceAssets): void {
   this.updateEvent.emit(updateData);
 }

}
