import { Component, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FileUtils, IDictionary, UsersRepository } from 'shared-lib';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  fileuploadModalRef: BsModalRef;

  fileUploadForm: FormGroup;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private fileUtilsService: FileUtils,
    private userRepository: UsersRepository, public storeLitePresentation: StoreLitePresentation) { }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      linked: ['', [Validators.required]],
      assets: [null, [Validators.required]]
    });


  }

  get myLinkedControl() {
    return this.fileUploadForm.get('linked');
  }

  get myFilesControl() {
    return this.fileUploadForm.get('assets');
  }

  openModal(template: TemplateRef<any>) {
    this.fileuploadModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' }) // Vertically centered adding the correspondent bootstrap class
      );
  }

  handleAssets(files: FileList) {
    this.fileuploadModalRef.hide();

    let filesCheck: IDictionary<any>;
    filesCheck = this.fileUtilsService.isUploadValid(files, this.storeLitePresentation.loggedUser.maxAssetsPerUpload, null);

    if(filesCheck[this.fileUtilsService.UPLOAD_VALID_KEY])
      alert("Ok");
    else
      alert("Error");
  }

  submitFileUploadForm() {
    console.log(this.myLinkedControl.value);
    return false;
  }
}
