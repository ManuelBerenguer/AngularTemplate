import { Component, OnInit, TemplateRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { IDictionary } from 'shared-lib';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  fileUploadModalRef: BsModalRef;
  maxFilesErrorModalRef: BsModalRef;
  extensionsErrorModalRef: BsModalRef;

  fileUploadForm: FormGroup;

  @ViewChild(ModalDirective, { static: false }) fileUploadModal: ModalDirective;
  @ViewChild('maxFilesErrorModal', {static: false}) maxFilesErrorModal: BsModalRef;
  @ViewChild('extensionsErrorModal', {static: false}) extensionsErrorModal: BsModalRef;

  constructor(private modalService: BsModalService, private fb: FormBuilder,
    public storeLitePresentation: StoreLitePresentation) { }

  ngOnInit() {
    // We init the Reactive Form
    this.fileUploadForm = this.fb.group({
      linked: ['', [Validators.required]], // radio button for linked control
      assets: ['', [Validators.required]] // file input to select files from disk
    });
  }

  /**
   * getter to acces the linked control
   */
  get myLinkedControl() {
    return this.fileUploadForm.get('linked');
  }

  /**
   * getter to acces the file control
   */
  get myFilesControl() {
    return this.fileUploadForm.get('assets');
  }

  /**
   *
   * @param template the modal window template
   *
   * @description Opens the file upload modal window based on the template provided
   */
  openFileUploadModal(template: TemplateRef<any>) {
    this.fileUploadModalRef = this.showModalCentered(template);
  }

  /**
   *
   * @param files HTML input file list
   *
   * @description Handles how we should proceed once the user has selected some files from the disk to be uploaded.L0
   * First, we check if they fit the restrictions and if they do we upload them to the server. If they don't fit the requirements we show the correspondent error.
   */
  async handleAssets(files: FileList) {

    // We hide the upload file modal window
    this.fileUploadModalRef.hide();
    // We check if the files selected fit the requirements to be uploaded
    let filesCheck: IDictionary<any> = await this.storeLitePresentation.isUploadValid(files);

    // If we can proceed with the upload
    if(filesCheck[this.storeLitePresentation.UPLOAD_VALID_KEY])
      alert("Ok");
    else{
      // If there is an error with the number of files
      if(!filesCheck[this.storeLitePresentation.UPLOAD_NUMBER_OF_FILES_VALID_KEY]) {
        this.showNumberOfFilesModalError();
      }
      else {
        // If there is an error with the extensions allowed
        if(!filesCheck[this.storeLitePresentation.UPLOAD_FILE_TYPES_VALID_KEY]) {
          this.showFileTypesModalError();
        }
      }
    }
  }

  private showNumberOfFilesModalError() {
    this.maxFilesErrorModalRef = this.showModalCentered(this.maxFilesErrorModal);
  }

  private showFileTypesModalError() {
    this.extensionsErrorModalRef = this.showModalCentered(this.extensionsErrorModal);
  }

  private showModalCentered(modal: any) {
    return this.modalService.show(
      modal,
      Object.assign({}, { class: 'modal-dialog-centered' }) // Vertically centered adding the correspondent bootstrap class
    );
  }
}
