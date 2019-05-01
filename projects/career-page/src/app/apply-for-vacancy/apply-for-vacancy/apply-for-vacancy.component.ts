import { Component, OnInit } from '@angular/core';
import { VacancyDetailsService } from '../../vacancy-details/vacancy-details/vacancy-details.service';
import { VacancyDetails } from '../../vacancy-details/vacancy-details/vacancy-details.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'one-talent-apply-for-vacancy',
  templateUrl: './apply-for-vacancy.component.html',
  styleUrls: ['./apply-for-vacancy.component.scss']
})
export class ApplyForVacancyComponent implements OnInit {
  /** Selected Vacancy for vacancy card id of vacancy details component */
  public jobId:number;
   /** Job title of is input field of the banner component pass it vacancy details component */
  public jobTitle: string;
   /** Job location of is input field of the banner component of pass it vacancy details component */
  public jobDescription: string;

  public vacancyData:VacancyDetails;
 /** ApplyVacancyForm is the FormGroup */
 public applyVacancyForm: FormGroup;
 
  constructor(private route: ActivatedRoute,private vacancyDetailService: VacancyDetailsService,private fb: FormBuilder,private toastr:ToastrService) {
    this.jobId = this.route.snapshot.params.id
   }

  /** Frist time Call on this component */
  ngOnInit() {
    this.getVacancyDetails();
    this.applyVacancyForm =this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      gender:['',Validators.required],
      dob:['',Validators.required],
      address:['',Validators.required],
      contact:['',Validators.required],
      email:['',Validators.required],
      qualification:['',Validators.required],
      experience:['',Validators.required],
      domain:['',Validators.required],
      technology:['',Validators.required],
      resumeFile:['',Validators.required],
    });
  }

  /** Gets vacancy details */
  getVacancyDetails(){
    this.vacancyDetailService.getVacancyDetail(this.jobId).subscribe((response:VacancyDetails)=>{
      this.vacancyData = response;
      this.jobTitle=this.vacancyData.jobName;
      this.jobDescription="Location: " + this.vacancyData.countryName; 
      
    })
  }

  /** Applyfors job Vaildation check */
  public applyforJob():void{
    if(this.applyVacancyForm.invalid){
      this.toastr.error('Please Required all the field','Error');
    }
  }

  public get formControls(){
    return this.applyVacancyForm.controls;
  }
}
