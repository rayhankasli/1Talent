/**
 * @author Rayhan Kasli
 * @createdDate 05-04-2019
 * @description This component file is perform add and edit technology
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../core/loader/loader.service';
import { Domain } from '../../manage-domain/domain.model';
import { ManageTechnologyService } from '../manage-technology.service';
import { ManageOverlayHeading, ManageTechnologyModal, Skill, Technology, ManageDomainName } from '../technology.model';
import { TagModel } from 'ngx-chips/core/accessor';
import { validateName } from '../validation/form.validator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** OverlayModalComponent used for create new or update existing new technology as well as create,update and delete chips for add skill */
@Component({
  selector: 'one-talent-overlay-modal',
  styleUrls: ['./overlay-modal.component.scss'],
  templateUrl: './overlay-modal.component.html'
})
export class OverlayModalComponent implements OnInit, OnDestroy {

  /** domainList contain domain list data like domain id, domain name etc */
  public domainList: Domain[];

  /** skills is used to store diffrent type of skill for technology */
  public skills: Skill[] = [];

  /** skills is used to store diffrent type of skill for technology */
  public intialArray: Skill[] = [];

  /** addTechnologyForm define the formgroup for add or update technology  */
  public addTechnologyForm: FormGroup;

  /** modalHeading define the heading of model like and new domain or edit domain */
  public modalHeading: string = ManageOverlayHeading.AddNewTechnology;

  /** data stands for get index of skill at a time for update */
  public data: any;

  /** update skill of overlay modal component */
  public updateSkill: any = {};

  /** hideElement used to hide some elements for specific domains */
  public hideElement: boolean = true;

  /** validators used to set validation on skill chips */
  public validators: any = this.chipsValidation;

  /** errorMessages is used when user entered more then 20 charecters in skill chips */
  public errorMessages: { [key: string]: string } = {
    check_length: ManageTechnologyModal.ChipsErrorMessages
  };
  /** isModalShow it is used emitting value for open or close overlay modal */
  @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** destroy$ are use for unsubscribe the subscribe observable */
  public destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates an instance of overlay modal component.
   * @param manageTechnologyService inject the ManageTechnologyService
   * @param formBuilder inject Form Builder for to create a form group
   * @param toastr inject ToastrService for display Toastr message
   * @param loaderService inject the LoaderService for display loader until the data is not renderd
   */
  constructor(private manageTechnologyService: ManageTechnologyService, private formBuilder: FormBuilder,
              private toastr: ToastrService, private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.addTechnologyForm = this.formBuilder.group({
      description: ['', Validators.compose([Validators.maxLength(200)])],
      domainId: [Validators.required],
      skills: ['', Validators.compose([Validators.required])],
      technologyId: [''],
      technologyName: ['', Validators.compose([Validators.required, Validators.maxLength(30), validateName])]
    });
    this.getDomainList();
    this.manageTechnologyService.updateTechnologyById.pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: Technology) => {
      if (response) {
        this.editTechnology();
      }
    });
    this.manageTechnologyService.setTechnologyForUpdate(null);
  }

  /** Gets technology validation */
  // tslint:disable-next-line:typedef
  public get technologyValidation() {
    return this.addTechnologyForm.controls;
  }

  /**
   * getDomainList gett all the domain data and fill in domain dropdown list
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public getDomainList(): void {
    this.manageTechnologyService.getDomain().pipe(
      takeUntil(this.destroy$)
    ).subscribe((domainData: Domain[]) => {
      this.domainList = domainData;
    });
  }
  /**
   * addTechnology used for add new or update existing technology 
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public addTechnology(): void {
    const technologyData: Technology = this.addTechnologyForm.value;
    const technologyId: Technology = this.addTechnologyForm.controls.technologyId.value;
    let formSkill: Skill[] = technologyData.skills;
    if (this.addTechnologyForm.invalid) {
      this.toastr.error(ManageTechnologyModal.InvalidValue, ManageTechnologyModal.ErrorMessage);
    } else if (technologyId) {
      let upadatedSkills: Skill[] = [];
      formSkill = formSkill.filter((currentSkillValue: Skill) => {
        return !this.intialArray.find((previouseSkillValue: Skill) => {
          return previouseSkillValue.skill === currentSkillValue.skill;
        });
      });
      for (let updateValue of formSkill) {
        upadatedSkills.push(updateValue);
      }
      const updateTechnologyData: { [key: string]: number | string | Skill[] } = {
        description: technologyData.description,
        domainId: technologyData.domainId,
        skills: upadatedSkills,
        technologyId: technologyData.technologyId,
        technologyName: technologyData.technologyName
      };
      this.manageTechnologyService.updateTechnology(updateTechnologyData).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.addTechnologyFormHide();
        this.manageTechnologyService.setTechnologyInsert(true);
      },          (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
    } else {
      this.loaderService.displayLoader(true);
      const addNewTechnologyData: { [key: string]: number | string | Skill[] } = {
        description: technologyData.description,
        domainId: technologyData.domainId,
        skills: this.skills,
        technologyName: technologyData.technologyName
      };
      this.manageTechnologyService.addNewTechnology(addNewTechnologyData)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this.addTechnologyFormHide();
          this.manageTechnologyService.setTechnologyInsert(true);
        },          (error: HttpErrorResponse) => {
          this.errorHandler(error);
        });

    }
  }
  /**
   * editTechnology method is use to fill data into form for update
   * @author Rayhan Kasli
   * @createdDate 25-03-2019
   */
  public editTechnology(): void {
    this.manageTechnologyService.getTechnologyForUpdate()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((technology: Technology) => {
        this.loaderService.displayLoader(true);
        if (technology) {
          const skillArray: Skill[] = technology.skills;
          this.modalHeading = ManageOverlayHeading.EditTechnology;
          this.addTechnologyForm.controls.technologyId.setValue(technology.technologyId);
          this.addTechnologyForm.controls.domainId.setValue(technology.domainId);
          this.addTechnologyForm.controls.technologyName.setValue(technology.technologyName);
          this.addTechnologyForm.controls.description.setValue(technology.description);
          this.addTechnologyForm.controls.skills.setValue(technology.skills);
          for (let skill of skillArray) {
            this.intialArray.push(skill);
          }
        }
        this.loaderService.displayLoader(false);
      },          (error: HttpErrorResponse) => {

        this.errorHandler(error);
      });
  }
  /**
   * addTechnologyFormHide method is use to hide the technology form
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public addTechnologyFormHide(): void {
    this.addTechnologyForm.reset();
    this.modalHeading = ManageOverlayHeading.AddNewTechnology;
    this.isModalShow.emit(false);
  }


  /** getDomain used for validation for desable technology field for some domain */
  public getDomain(event: KeyboardEvent): void {
    const selectedOptions: HTMLOptionsCollection = (<HTMLSelectElement>event.target).options;
    const selectedIndex: number = selectedOptions.selectedIndex;
    const selectElementText: string = selectedOptions[selectedIndex].text;
    if (selectElementText.toLowerCase() === ManageDomainName.HR || selectElementText.toLowerCase() === ManageDomainName.HumanResource) {
      this.addTechnologyForm.controls.technologyName.disable();
      this.addTechnologyForm.controls.description.disable();
      this.hideElement = false;
    } else {
      this.addTechnologyForm.controls.technologyName.enable();
      this.addTechnologyForm.controls.description.enable();
      this.hideElement = true;
    }
  }

  /**
   * onTagEdited used when existing chip is edit
   * @param item contain updated skill data
   */
  public onTagEdited(item: TagModel): void {
    this.updateSkill = item.toString;
    this.data = item;
    this.Editing();
  }

  /** Editing overlay modal component */
  public Editing(): void {
    for (let skillIndex: number = 0; skillIndex < this.skills.length; skillIndex++) {
      if (skillIndex === this.data.index) {
        this.skills[skillIndex].skill = this.updateSkill;
      }
    }
  }
  /**
   * onItemAdded used to create new chip
   * @param item it contain new skill
   */
  public onItemAdded(item: any): void {
    const newskill: string = item.skill;
    const skillValue: string = newskill.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    this.skills.push({ skill: skillValue });
  }


  /**
   * remove used to delete skill chip
   * @param event get the skill id and technology id for remove skill
   */
  public remove(event: Skill): void {
    const checkSkill: Skill[] = this.skills.filter((skill: Skill) => skill.skill === event.skill);
    for (let removeIndex: number = 0; removeIndex < this.intialArray.length; removeIndex++) {
      if (this.intialArray[removeIndex].skill === event.skill) {
        this.intialArray.splice(removeIndex, 1);
        break;
      }
    }
    if (checkSkill.length === 0) {
      this.manageTechnologyService.deleteSkill(event.technologyId, event.skillId).subscribe();
    } else {
      for (let removeIndex: number = 0; removeIndex < this.skills.length; removeIndex++) {
        if (this.skills[removeIndex].skill === event.skill) {
          this.skills.splice(removeIndex, 1);
          break;
        }
      }
    }
  }

  /**
   * chipsValidation set the validation for skill chips
   * @param control contain tag-input value
   * @returns boolean value either true or false
   */
  public chipsValidation(control: AbstractControl): { [key: string]: boolean } {

    if (control.value !== '' && (control.value.length >= 20)) {
      return { check_length: true };
    }
    return null;
  }

  /** Avoids first blank space */
  public avoidFirstBlankSpace(event: any): void {
    if (event.keyCode === 32 && event.target.selectionStart === 0 && event.keyCode !== 9) {
      event.preventDefault();
    }
  }
  /**
   * errorHandler handle the server error
   * @param error contains error which is throw by server
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public errorHandler(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.toastr.error(ManageTechnologyModal.NotFound, ManageTechnologyModal.ErrorMessage);
    } else if (error.status === 400) {
      this.toastr.error(error.error.errors[0].TechnologyTitle, ManageTechnologyModal.ErrorMessage);
    } else if (error.status === 500) {
      this.toastr.error(ManageTechnologyModal.InternalServerError, ManageTechnologyModal.ErrorMessage);
    } else if (error.status === 405) {
      this.toastr.error(ManageTechnologyModal.MethodNotAllowed, ManageTechnologyModal.ErrorMessage);
    }
    this.loaderService.displayLoader(false);
  }
  /** ngOnDestroy for unsubscribe */
  public ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
}