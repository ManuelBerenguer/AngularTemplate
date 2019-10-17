import { Component, OnInit, TemplateRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { FileUtils, IDictionary } from 'shared-lib';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  fileuploadModalRef: BsModalRef;
  maxFilesErrorModalRef: BsModalRef;
  extensionsErrorModalRef: BsModalRef;

  fileUploadForm: FormGroup;

  @ViewChild(ModalDirective, { static: false }) fileUploadModal: ModalDirective;
  @ViewChild('maxFilesErrorModal', {static: false}) maxFilesErrorModal: BsModalRef;
  @ViewChild('extensionsErrorModal', {static: false}) extensionsErrorModal: BsModalRef;

  constructor(private modalService: BsModalService, private fb: FormBuilder,
    public storeLitePresentation: StoreLitePresentation) { }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      linked: ['', [Validators.required]],
      assets: ['', [Validators.required]]
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

  async handleAssets(files: FileList) {
    this.fileuploadModalRef.hide();

    let filesCheck: IDictionary<any>;
    filesCheck = await this.storeLitePresentation.isUploadValid(files);

    if(filesCheck[this.storeLitePresentation.UPLOAD_VALID_KEY])
      alert("Ok");
    else{
      if(!filesCheck[this.storeLitePresentation.UPLOAD_NUMBER_OF_FILES_VALID_KEY]) {
        this.maxFilesErrorModalRef = this.modalService.show(
          this.maxFilesErrorModal,
          Object.assign({}, { class: 'modal-dialog-centered' }) // Vertically centered adding the correspondent bootstrap class
        );
      }
      else {
        if(!filesCheck[this.storeLitePresentation.UPLOAD_FILE_TYPES_VALID_KEY]) {
          this.extensionsErrorModalRef = this.modalService.show(
            this.extensionsErrorModal,
            Object.assign({}, { class: 'modal-dialog-centered' }) // Vertically centered adding the correspondent bootstrap class
          );
        }
      }
    }
  }

  selectFiles(template: TemplateRef<any>) {
    this.maxFilesErrorModalRef.hide();

    this.fileUploadModal.show();
    //this.openModal(template);


  }

  submitFileUploadForm() {
    console.log(this.myLinkedControl.value);
    return false;
  }
}
